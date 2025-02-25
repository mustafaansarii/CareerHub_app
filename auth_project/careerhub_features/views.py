from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Question, UserQuestion, Resume, Roadmap, UserResume, UserRoadmap
from .serializers import QuestionSerializer, UserQuestionSerializer, ResumeSerializer, RoadmapSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Prefetch, Exists, OuterRef, Case, When, Value, BooleanField
from django.db.models.functions import Coalesce
from google import genai
import os
from django.http import StreamingHttpResponse
import json
from openai import OpenAI
# Create your views here.

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = self.request.user
        return Question.objects.annotate(
            is_done=Coalesce(
                UserQuestion.objects.filter(
                    question=OuterRef('pk'),
                    user=user
                ).values('is_done')[:1],
                Value(False)
            ),
            is_favorite=Coalesce(
                UserQuestion.objects.filter(
                    question=OuterRef('pk'),
                    user=user
                ).values('is_favorite')[:1],
                Value(False)
            ),
            completed_at=UserQuestion.objects.filter(
                question=OuterRef('pk'),
                user=user
            ).values('completed_at')[:1]
        ).prefetch_related('userquestion_set')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def toggle_done(self, request, pk=None):
        question = self.get_object()
        user_question, created = UserQuestion.objects.select_related('question').get_or_create(
            user=request.user,
            question=question
        )
        
        user_question.is_done = not user_question.is_done
        if user_question.is_done:
            user_question.completed_at = timezone.now()
        else:
            user_question.completed_at = None
        user_question.save()
        
        return Response({
            'is_done': user_question.is_done,
            'completed_at': user_question.completed_at
        })

    @action(detail=True, methods=['POST'])
    def toggle_favorite(self, request, pk=None):
        question = self.get_object()
        user_question, created = UserQuestion.objects.select_related('question').get_or_create(
            user=request.user,
            question=question
        )
        user_question.is_favorite = not user_question.is_favorite
        user_question.save()
        return Response({'is_favorite': user_question.is_favorite})

class ResumeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Resume.objects.annotate(
            is_favorite=Coalesce(
                UserResume.objects.filter(
                    resume=OuterRef('pk'),
                    user=user
                ).values('is_favorite')[:1],
                Value(False)
            )
        ).prefetch_related('userresume_set')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def toggle_favorite(self, request, pk=None):
        resume = self.get_object()
        user_resume, created = UserResume.objects.get_or_create(
            user=request.user,
            resume=resume
        )
        user_resume.is_favorite = not user_resume.is_favorite
        user_resume.save()
        return Response({'is_favorite': user_resume.is_favorite})

class RoadmapViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Roadmap.objects.all()
    serializer_class = RoadmapSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Roadmap.objects.annotate(
            is_favorite=Coalesce(
                UserRoadmap.objects.filter(
                    roadmap=OuterRef('pk'),
                    user=user
                ).values('is_favorite')[:1],
                Value(False)
            ),
            last_accessed=UserRoadmap.objects.filter(
                roadmap=OuterRef('pk'),
                user=user
            ).values('last_accessed')[:1]
        ).prefetch_related('userroadmap_set')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def toggle_favorite(self, request, pk=None):
        roadmap = self.get_object()
        user_roadmap, created = UserRoadmap.objects.get_or_create(
            user=request.user,
            roadmap=roadmap
        )
        user_roadmap.is_favorite = not user_roadmap.is_favorite
        user_roadmap.save()
        return Response({'is_favorite': user_roadmap.is_favorite})

    @action(detail=True, methods=['POST'])
    def update_last_accessed(self, request, pk=None):
        roadmap = self.get_object()
        user_roadmap, created = UserRoadmap.objects.get_or_create(
            user=request.user,
            roadmap=roadmap
        )
        user_roadmap.last_accessed = timezone.now()
        user_roadmap.save()
        return Response({'last_accessed': user_roadmap.last_accessed})
    
    



client = OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key=os.environ.get("LLM_API_KEY"),
)

@api_view(['POST'])
def generate(request):
    try:
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({'error': 'Prompt is required'}, status=status.HTTP_400_BAD_REQUEST)

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an AI assistant who knows everything."},
                {"role": "user", "content": prompt},
            ],
        )
        
        return Response({'response': response.choices[0].message.content})
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


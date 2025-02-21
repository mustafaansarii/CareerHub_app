from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Question, UserQuestion, Resume, Roadmap, UserResume, UserRoadmap
from .serializers import QuestionSerializer, UserQuestionSerializer, ResumeSerializer, RoadmapSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Prefetch

# Create your views here.

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return Question.objects.all().prefetch_related(
            Prefetch(
                'userquestion_set',
                queryset=UserQuestion.objects.filter(user=self.request.user),
                to_attr='user_questions'
            )
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        # Get all user questions in a single query
        user_questions = UserQuestion.objects.filter(
            user=request.user,
            question__in=queryset
        ).select_related('question').values(
            'question_id',
            'is_done',
            'completed_at',
            'is_favorite'
        )
        
        # Create a lookup dictionary
        user_question_map = {
            uq['question_id']: uq 
            for uq in user_questions
        }
        
        # Serialize all questions at once
        serializer = self.get_serializer(queryset, many=True)
        response_data = []
        
        for question_data in serializer.data:
            uq = user_question_map.get(question_data['id'], {})
            question_data.update({
                'is_done': uq.get('is_done', False),
                'completed_at': uq.get('completed_at'),
                'is_favorite': uq.get('is_favorite', False)
            })
            response_data.append(question_data)
            
        return Response(response_data)

    @action(detail=True, methods=['POST'])
    def toggle_done(self, request, pk=None):
        question = self.get_object()
        user_question, created = UserQuestion.objects.get_or_create(
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
        user_question, created = UserQuestion.objects.get_or_create(
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
        queryset = Resume.objects.all()
        pick = self.request.query_params.get('pick', None)
        if pick:
            queryset = queryset.filter(pick=pick)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        resumes = []
        
        for resume in queryset:
            user_resume = UserResume.objects.filter(
                user=request.user,
                resume=resume
            ).first()
            
            resume_data = ResumeSerializer(resume).data
            resume_data['is_favorite'] = user_resume.is_favorite if user_resume else False
            resumes.append(resume_data)
            
        return Response(resumes)

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

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        roadmaps = []
        
        for roadmap in queryset:
            user_roadmap = UserRoadmap.objects.filter(
                user=request.user,
                roadmap=roadmap
            ).first()
            
            roadmap_data = RoadmapSerializer(roadmap).data
            roadmap_data['is_favorite'] = user_roadmap.is_favorite if user_roadmap else False
            roadmaps.append(roadmap_data)
            
        return Response(roadmaps)

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

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Question, UserQuestion, Resume, Roadmap, UserResume, UserRoadmap
from .serializers import QuestionSerializer, UserQuestionSerializer, ResumeSerializer, RoadmapSerializer

# Create your views here.

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Question.objects.all()
        topic = self.request.query_params.get('topic', None)
        if topic:
            queryset = queryset.filter(topic=topic)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        questions = []
        
        for question in queryset:
            user_question = UserQuestion.objects.filter(
                user=request.user,
                question=question
            ).first()
            
            question_data = QuestionSerializer(question).data
            question_data['is_done'] = user_question.is_done if user_question else False
            question_data['completed_at'] = user_question.completed_at if user_question else None
            question_data['is_favorite'] = user_question.is_favorite if user_question else False
            questions.append(question_data)
            
        return Response(questions)

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

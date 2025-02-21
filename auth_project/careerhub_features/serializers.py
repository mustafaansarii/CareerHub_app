from rest_framework import serializers
from .models import Question, UserQuestion, Resume, Roadmap

class QuestionSerializer(serializers.ModelSerializer):
    is_done = serializers.BooleanField(read_only=True)
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'topic', 'link', 'is_done', 'is_favorite']

class UserQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuestion
        fields = ['question', 'is_done', 'completed_at']

class ResumeSerializer(serializers.ModelSerializer):
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = Resume
        fields = ['id', 'imglink', 'title', 'description', 'hreflink', 'pick', 'authorname', 'is_favorite']

class RoadmapSerializer(serializers.ModelSerializer):
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = Roadmap
        fields = ['id', 'fieldname', 'roadmaplink', 'is_favorite'] 
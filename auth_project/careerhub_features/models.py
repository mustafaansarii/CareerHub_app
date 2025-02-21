from django.db import models
from accounts.models import CustomUser

# Create your models here.

class Question(models.Model):
    title = models.CharField(max_length=255)
    topic = models.CharField(max_length=100)
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class UserQuestion(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_index=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, db_index=True)
    is_done = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_favorite = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user', 'question']

    def __str__(self):
        return f"{self.user.username} - {self.question.title}"

class Resume(models.Model):
    imglink = models.URLField(max_length=200)
    title = models.CharField(max_length=100)
    description = models.TextField()
    hreflink = models.URLField(max_length=200)
    pick = models.CharField(max_length=50)
    authorname = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class UserResume(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    is_favorite = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user', 'resume']

class Roadmap(models.Model):
    fieldname = models.CharField(max_length=100)
    roadmaplink = models.URLField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fieldname

class UserRoadmap(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    is_favorite = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user', 'roadmap']

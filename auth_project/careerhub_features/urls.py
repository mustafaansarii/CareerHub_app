from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import generate

router = DefaultRouter()
router.register(r'questions', views.QuestionViewSet)
router.register(r'resumes', views.ResumeViewSet)
router.register(r'roadmaps', views.RoadmapViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api/generate/', generate, name='generate'),
] 
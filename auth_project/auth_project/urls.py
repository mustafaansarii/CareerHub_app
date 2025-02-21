from django.contrib import admin
from django.urls import path, include
from accounts.views import GoogleLogin, GoogleCallback
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('auth/', include('social_django.urls', namespace='social')),
    path('api/auth/google/login/', GoogleLogin.as_view(), name='google_login'),
    path('api/auth/google/callback/', GoogleCallback.as_view(), name='google_callback'),
    path('api/careerhub/', include('careerhub_features.urls')),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

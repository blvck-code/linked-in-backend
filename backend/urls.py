
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from account.api.views import api_overview
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

urlpatterns = [
    path('', api_overview),
    path('admin/', admin.site.urls),
    path('api/auth/', include('account.api.urls', 'account_api')),
    path('api/posts/', include('posts.api.urls', 'posts_api')),
    path('api/', include('profiles.api.urls', 'profile_api')),
    # path('api/education/', include('education.api.urls', 'education_api')),
    path('api/', include('experience.api.urls', 'experience_api')),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

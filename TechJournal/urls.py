from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/news/', include("news.urls")),
    path('api/v1/users/', include("users.urls")),
    path('api/v1/comments/', include("comments.urls")),
    path('api/v1/categories/', include("categories.urls")),
    path('api/v1/auth/', include("jwt_auth.urls")),
    path('api/v1/base-auth/', include("rest_framework.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
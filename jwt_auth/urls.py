from django.urls import path
from jwt_auth.views import CustomTokenObtainPairView, RegisterUser, Profile, ProfileImage
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('profile/', Profile.as_view(), name='profile'),
    path('profile/image/', ProfileImage.as_view(), name='profile_image'),
]
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from jwt_auth.serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

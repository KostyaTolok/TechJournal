from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from jwt_auth.serializers import CustomTokenObtainPairSerializer, RegisterSerializer, ProfileSerializer
from users.models import UserProfile, User
from jwt_auth.tasks import send_greetings_email_task


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterUser(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        send_greetings_email_task.delay(request.data.get("email"), request.data.get("username"))
        return Response({'message': 'User registered'})


class Profile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_profile = UserProfile.objects.filter(user=user).first()
        serializer = ProfileSerializer(user_profile, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        user_profile = UserProfile.objects.filter(user=user).first()
        serializer = ProfileSerializer(user_profile, data=request.data, context={'request': request}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Profile updated'})
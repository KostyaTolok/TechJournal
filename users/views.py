import datetime as dt
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from users.serializers import *
from TechJournal.settings import JWT_SECRET_KEY


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Wrong password')

        payload = {
            'id': user.id,
            'exp': dt.datetime.utcnow() + dt.timedelta(hours=1),
            'iat': dt.datetime.utcnow()
        }

        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')

        response = Response()
        response.set_cookie('token', token, httponly=True)
        response.data = {'message': 'Login successful'}

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('token')

        if token is None:
            raise AuthenticationFailed('User unauthorized')

        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):
    def get(self, request):
        response = Response()
        response.delete_cookie('token')
        response.data = {'message': 'Logout successful'}
        return response

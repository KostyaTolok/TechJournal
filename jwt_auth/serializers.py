from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from users.models import User, UserProfile


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['is_staff'] = user.is_staff

        return token


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()

        user_profile = UserProfile.objects.create(user=instance)
        user_profile.save()

        return instance


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer()

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'image')

    def get_photo_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        instance.image = validated_data.get('image', instance.image)
        instance.save()

        if user_data:
            user = instance.user
            user.username = user_data.get('username', user.username)
            user.email = user_data.get('email', user.email)
            user.save()

        return instance

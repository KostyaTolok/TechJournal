from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from users.models import User, UserProfile


class RegisterTestCase(APITestCase):

    def test_register(self):
        data = {'username': 'user', 'email': 'user@gmail.com', 'password': 'password'}
        response = self.client.post(reverse('register'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.last().username, 'user')
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.last().user, User.objects.last())

    def test_register_with_existing_username(self):
        User.objects.create_user(username='user')
        data = {'username': 'user', 'email': 'user@gmail.com', 'password': 'password'}
        response = self.client.post(reverse('register'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_without_password(self):
        data = {'username': 'user', 'email': 'user@gmail.com'}
        response = self.client.post(reverse('register'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TokensTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='user')
        user.set_password('password')
        user.save()

    def test_login(self):
        data = {'username': 'user', 'password': 'password'}
        response = self.client.post(reverse('token_obtain_pair'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(response.data['access'])
        self.assertIsNotNone(response.data['refresh'])

    def test_login_with_wrong_password(self):
        data = {'username': 'user', 'password': 'wrong_password'}
        response = self.client.post(reverse('token_obtain_pair'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh(self):
        data = {'username': 'user', 'password': 'password'}
        response = self.client.post(reverse('token_obtain_pair'), data, format='json')
        refresh_token = response.data['refresh']
        response = self.client.post(reverse('token_refresh'), {'refresh': refresh_token}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(response.data['access'])
        self.assertIsNotNone(response.data['refresh'])

    def test_refresh_with_wrong_token(self):
        response = self.client.post(reverse('token_refresh'), {'refresh': 'wrong_token'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_with_expired_token(self):
        data = {'username': 'user', 'password': 'password'}
        response = self.client.post(reverse('token_obtain_pair'), data, format='json')
        refresh_token = response.data['refresh']
        self.client.post(reverse('token_refresh'), {'refresh': refresh_token}, format='json')
        response = self.client.post(reverse('token_refresh'), {'refresh': refresh_token}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ProfileTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='user')
        user.set_password('password')
        user.save()

    def test_profile(self):
        data = {'username': 'user', 'password': 'password'}
        response = self.client.post(reverse('token_obtain_pair'), data, format='json')
        access_token = response.data['access']
        response = self.client.get(reverse('profile'), HTTP_AUTHORIZATION='Bearer ' + access_token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_profile_with_wrong_token(self):
        response = self.client.get(reverse('profile'), HTTP_AUTHORIZATION='Bearer wrong_token')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
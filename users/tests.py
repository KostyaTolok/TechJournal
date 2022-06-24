from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from users.models import User


class UsersTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username='user')
        User.objects.create_user(username='admin', is_staff=True)

    def setUp(self) -> None:
        self.client.force_authenticate(User.objects.get(username='admin'))

    def test_users_list(self):
        response = self.client.get(reverse('list_users'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_users_list_unauthorized(self):
        self.client.force_authenticate(User.objects.get(username='user'))
        response = self.client.get(reverse('list_users'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_detail(self):
        response = self.client.get(reverse('detail_user', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'user')

    def test_user_detail_unauthorized(self):
        self.client.force_authenticate(User.objects.get(username='user'))
        response = self.client.get(reverse('detail_user', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_change_user_status(self):
        response = self.client.put(reverse('change_user_status', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(User.objects.get(username='user').is_active)

    def test_change_user_status_unauthorized(self):
        self.client.force_authenticate(User.objects.get(username='user'))
        response = self.client.put(reverse('change_user_status', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

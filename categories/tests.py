from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from categories.models import Category
from users.models import User


class CategoriesTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='user', is_staff=True)
        user.set_password('password')
        Category.objects.create(id=1, name='Test category', author=user, slug='test-category')
        Category.objects.create(id=2, name='Test category 2', author=user, slug='second-test-category')

    def setUp(self) -> None:
        self.client.force_authenticate(User.objects.get(username='user'))

    def test_categories_list(self):
        response = self.client.get(reverse('list_category'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_category_detail(self):
        response = self.client.get(reverse('detail_category', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test category')

    def test_category_create(self):
        data = {'name': 'New Category', 'slug': 'new-category'}
        response = self.client.post(reverse('create_category'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 3)

    def test_category_create_unauthorized(self):
        self.client.force_authenticate(None)
        data = {'name': 'New Category', 'slug': 'new-category'}
        response = self.client.post(reverse('create_category'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_category_update(self):
        data = {'name': 'Updated Category', 'slug': 'new-category', 'author': 1}
        response = self.client.put(reverse('update_category', kwargs={'pk': 1}), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.get(pk=1).name, 'Updated Category')

    def test_category_update_unauthorized(self):
        self.client.force_authenticate(None)
        data = {'name': 'Updated Category', 'slug': 'new-category', 'author': 1}
        response = self.client.put(reverse('update_category', kwargs={'pk': 1}), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_category_delete(self):
        response = self.client.delete(reverse('delete_category', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), 1)

    def test_category_delete_unauthorized(self):
        self.client.force_authenticate(None)
        response = self.client.delete(reverse('delete_category', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

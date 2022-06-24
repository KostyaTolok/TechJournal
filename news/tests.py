from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

from categories.models import Category
from news.models import NewsItem
from users.models import User


class NewsTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='user', is_staff=True)
        user.set_password('password')
        first_category = Category.objects.create(name='First category', author=user, slug='first-category')
        second_category = Category.objects.create(name='Second category', author=user, slug='second-category')
        NewsItem.objects.create(headline='Test title', content='Test text', author=user, category=first_category)
        NewsItem.objects.create(headline='Test title 2', content='Test text 2', author=user,
                                category=second_category)

    def setUp(self) -> None:
        self.client.force_authenticate(User.objects.get(username='user'))

    def test_news_list(self):
        response = self.client.get(reverse('news_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_news_list_category(self):
        response = self.client.get(reverse('news_list'), {'category': 'second-category'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['headline'], 'Test title 2')

    def test_news_item_detail(self):
        response = self.client.get(reverse('detail_news_item', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['headline'], 'Test title')

    def test_news_item_create(self):
        data = {'headline': 'Test title', 'content': 'Test text', 'author': 1, 'category': 1}
        response = self.client.post(reverse('create_news_item'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsItem.objects.count(), 3)

    def test_news_item_create_without_author(self):
        data = {'headline': 'Test title', 'content': 'Test text', 'category': 1}
        response = self.client.post(reverse('create_news_item'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsItem.objects.count(), 3)
        self.assertEqual(NewsItem.objects.last().author.id, 1)

    def test_news_item_create_without_category(self):
        data = {'headline': 'Test title', 'content': 'Test text', 'author': 1}
        response = self.client.post(reverse('create_news_item'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsItem.objects.count(), 3)
        self.assertEqual(NewsItem.objects.last().category.id, 1)

    def test_news_item_create_unauthorized(self):
        self.client.force_authenticate(None)
        data = {'headline': 'Test title', 'content': 'Test text', 'author': 1, 'category': 1}
        response = self.client.post(reverse('create_news_item'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_news_item_update(self):
        data = {'headline': 'New Test title', 'content': 'Test text', 'author': 1, 'category': 1}
        response = self.client.put(reverse('update_news_item', kwargs={'pk': 1}), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(NewsItem.objects.get(pk=1).headline, 'New Test title')

    def test_news_item_update_unauthorized(self):
        self.client.force_authenticate(None)
        data = {'headline': 'New Test title', 'content': 'Test text', 'author': 1, 'category': 1}
        response = self.client.put(reverse('update_news_item', kwargs={'pk': 1}), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_news_item_delete(self):
        NewsItem.objects.create(id=3, headline='Test title', content='Test text',
                                author=User.objects.get(username='user'),
                                category=Category.objects.get(slug='first-category'))
        response = self.client.delete(reverse('delete_news_item', kwargs={'pk': 3}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(NewsItem.objects.count(), 2)

    def test_news_item_delete_unauthorized(self):
        self.client.force_authenticate(None)
        response = self.client.delete(reverse('delete_news_item', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

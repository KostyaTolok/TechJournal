from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from categories.models import Category
from comments.models import Comment
from news.models import NewsItem
from users.models import User


class CommentsTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='user', is_staff=True)
        user.set_password('password')
        first_category = Category.objects.create(name='Test category', author=user, slug='test-category')
        second_category = Category.objects.create(name='Test category 2', author=user, slug='second-test-category')
        first_news_item = NewsItem.objects.create(headline='Test news item', content="Text", author=user,
                                                  category=first_category)
        second_news_item = NewsItem.objects.create(headline='Test news item 2', content="Text", author=user,
                                                   category=second_category)
        Comment.objects.create(text='Test comment', author=user, news_item=first_news_item)
        Comment.objects.create(text='Test comment 2', author=user, news_item=second_news_item)

    def setUp(self) -> None:
        self.client.force_authenticate(User.objects.get(username='user'))

    def test_comments_list(self):
        response = self.client.get(reverse('list_comments'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_comment_detail(self):
        response = self.client.get(reverse('detail_comment', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['text'], 'Test comment')

    def test_comment_create(self):
        data = {'text': 'Test comment', 'author': 1, 'news_item': 1}
        response = self.client.post(reverse('create_comment'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 3)

    def test_comment_create_unauthorized(self):
        self.client.force_authenticate(None)
        data = {'text': 'Test comment', 'author': 1, 'news_item': 1}
        response = self.client.post(reverse('create_comment'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_comment_delete(self):
        response = self.client.delete(reverse('detail_comment', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Comment.objects.count(), 1)

    def test_comment_delete_unauthorized(self):
        self.client.force_authenticate(None)
        response = self.client.delete(reverse('detail_comment', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_comment_delete_not_found(self):
        response = self.client.delete(reverse('detail_comment', kwargs={'pk': 3}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_comment_delete_not_owner(self):
        User.objects.create_user(username='user2')
        self.client.force_authenticate(User.objects.get(username='user2'))
        response = self.client.delete(reverse('detail_comment', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

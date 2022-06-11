from django.db import models
from users.models import User
from news.models import NewsItem


class Comment(models.Model):
    author = models.ForeignKey(User, verbose_name="Автор", on_delete=models.CASCADE)
    news_item = models.ForeignKey(NewsItem, verbose_name="Новость", on_delete=models.CASCADE)
    text = models.TextField(verbose_name="Текст комментария")
    created_at = models.DateTimeField(verbose_name="Дата добавления", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления", auto_now=True)

    def __str__(self):
        return self.text

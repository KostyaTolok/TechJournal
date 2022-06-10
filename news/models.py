from django.db import models
from users.models import User


class NewsItem(models.Model):
    headline = models.CharField(verbose_name="Заголовок новости", max_length=255)
    content = models.TextField(verbose_name="Текст Новости")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    author = models.ForeignKey(User, verbose_name="Автор", on_delete=models.CASCADE)


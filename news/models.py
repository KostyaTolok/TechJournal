from django.db import models
from users.models import User
from categories.models import Category


class NewsItem(models.Model):
    headline = models.CharField(verbose_name="Заголовок новости", max_length=255)
    content = models.TextField(verbose_name="Текст Новости")
    image = models.ImageField(verbose_name="Изображение", upload_to='news/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    author = models.ForeignKey(User, verbose_name="Автор", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, verbose_name="Категория", on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.headline

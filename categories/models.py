from django.utils import timezone

from django.db import models
from users.models import User


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название категории")
    slug = models.SlugField(max_length=100, verbose_name="Слаг категории")
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Автор категории", default=1)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    class Meta:
        verbose_name_plural = "Caterories"

    def __str__(self):
        return self.name

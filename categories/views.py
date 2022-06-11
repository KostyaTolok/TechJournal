from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from categories.models import Category
from categories.serializers import *


class CreateCategory(generics.CreateAPIView):
    serializer_class = CategoryDetailSerializer
    permission_classes = (IsAdminUser,)


class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategoriesListSerializer
    queryset = Category.objects.all()


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()
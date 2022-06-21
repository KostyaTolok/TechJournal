from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from categories.models import Category
from categories.serializers import *


class CreateCategory(generics.CreateAPIView):
    serializer_class = CategoryDetailSerializer
    permission_classes = (IsAdminUser,)


class CategoryList(generics.ListAPIView):
    serializer_class = CategoriesListSerializer
    queryset = Category.objects.all()


class CategoryDetail(generics.RetrieveAPIView):
    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()


class CategoryUpdate(generics.UpdateAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()


class CategoryDelete(generics.DestroyAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()

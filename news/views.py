from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from news.permissions import *
from news.serializers import *


class NewsList(generics.ListCreateAPIView):
    serializer_class = NewsItemListSerializer
    queryset = NewsItem.objects.all()


class CreateNewsItem(generics.CreateAPIView):
    serializer_class = NewsItemDetailSerializer
    permission_classes = (IsAdminUser,)


class NewsItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NewsItemDetailSerializer
    queryset = NewsItem.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)



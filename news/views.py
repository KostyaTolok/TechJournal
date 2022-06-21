from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from TechJournal.permissions import *
from news.serializers import *


class NewsList(generics.ListCreateAPIView):
    serializer_class = NewsListSerializer

    def get_queryset(self):
        queryset = NewsItem.objects.all()
        category = self.request.query_params.get('category', None)

        if category is not None:
            queryset = queryset.filter(category__slug=category)

        queryset = queryset.order_by('-created_at')
        return queryset


class CreateNewsItem(generics.CreateAPIView):
    serializer_class = NewsItemSerializer
    permission_classes = (IsAdminUser,)


class NewsItemDetail(generics.RetrieveAPIView):
    serializer_class = NewsItemSerializer
    queryset = NewsItem.objects.all()


class UpdateNewsItem(generics.UpdateAPIView):
    serializer_class = NewsItemSerializer
    queryset = NewsItem.objects.all()
    permission_classes = (IsAdminUser,)


class DestroyNewsItem(generics.DestroyAPIView):
    serializer_class = NewsItemSerializer
    queryset = NewsItem.objects.all()
    permission_classes = (IsAdminUser,)




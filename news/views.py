from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from TechJournal.permissions import *
from news.serializers import *


class NewsList(generics.ListCreateAPIView):
    serializer_class = NewsItemListSerializer

    def get_queryset(self):
        queryset = NewsItem.objects.all()
        category = self.request.query_params.get('category', None)

        if category is not None:
            queryset = queryset.filter(category_id=category)

        return queryset


class CreateNewsItem(generics.CreateAPIView):
    serializer_class = NewsItemDetailSerializer
    permission_classes = (IsAdminUser,)


class NewsItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NewsItemDetailSerializer
    queryset = NewsItem.objects.all()
    permission_classes = (IsOwnerOrReadOnly)




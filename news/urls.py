from django.urls import path
from .views import *

urlpatterns = [
    path('create', CreateNewsItem.as_view(), name='create_news_item'),
    path('list', NewsList.as_view(), name='list_news_item'),
    path('detail/<int:pk>', NewsItemDetail.as_view(), name='detail_news_item'),
]
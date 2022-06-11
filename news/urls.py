from django.urls import path
from news.views import *

urlpatterns = [
    path('create', CreateNewsItem.as_view(), name='create_news_item'),
    path('', NewsList.as_view(), name='list_news_item'),
    path('<int:pk>', NewsItemDetail.as_view(), name='detail_news_item'),
]
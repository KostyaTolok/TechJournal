from django.urls import path
from news.views import *

urlpatterns = [
    path('create', CreateNewsItem.as_view(), name='create_news_item'),
    path('list', NewsList.as_view()),
    path('detail/<int:pk>', NewsItemDetail.as_view(), name='detail_news_item'),
    path('update/<int:pk>', UpdateNewsItem.as_view(), name='update_news_item'),
    path('delete/<int:pk>', DestroyNewsItem.as_view(), name='delete_news_item'),
]
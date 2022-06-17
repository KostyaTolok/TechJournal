from django.urls import path
from comments.views import *

urlpatterns = [
    path('list', CommentsList.as_view(), name='list_comments'),
    path('create', CreateComment.as_view(), name='create_comment'),
    path('<int:pk>', CommentDetail.as_view(), name='detail_comment'),
]
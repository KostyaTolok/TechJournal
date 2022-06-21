from django.urls import path
from users.views import *

urlpatterns = [
    path('list', UsersList.as_view(), name='list_users'),
    path('detail/<int:pk>', UserDetail.as_view(), name='detail_user'),
    path('change-status/<int:pk>', ChangeUserStatus.as_view(), name='change_user_status'),
]
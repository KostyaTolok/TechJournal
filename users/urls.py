from django.urls import path
from users.views import *

urlpatterns = [
    path('', UsersList.as_view(), name='list_users'),
]
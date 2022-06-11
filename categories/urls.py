from django.urls import path
from categories.views import *

urlpatterns = [
    path('create', CreateCategory.as_view(), name='create_category'),
    path('', CategoryList.as_view(), name='list_category'),
    path('<int:pk>', CategoryDetail.as_view(), name='detail_category'),
]
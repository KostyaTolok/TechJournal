from django.urls import path
from categories.views import *

urlpatterns = [
    path('create', CreateCategory.as_view(), name='create_category'),
    path('list', CategoryList.as_view(), name='list_category'),
    path('detail/<int:pk>', CategoryDetail.as_view(), name='detail_category'),
    path('update/<int:pk>', CategoryUpdate.as_view(), name='update_category'),
    path('delete/<int:pk>', CategoryDelete.as_view(), name='delete_category'),
]
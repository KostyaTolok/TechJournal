from rest_framework import serializers
from news.models import *


class NewsItemDetailSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = NewsItem
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class NewsItemListSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = NewsItem
        fields = ("id", "headline", "content", "created_at", "updated_at", "author", "category")
        read_only_fields = ("created_at", "updated_at")
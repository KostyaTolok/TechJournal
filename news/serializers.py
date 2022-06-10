from rest_framework import serializers

from news.models import NewsItem


class NewsItemDetailSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = NewsItem
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class NewsItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ("id", "headline", "content", "created_at")
        read_only_fields = ("created_at", "updated_at")
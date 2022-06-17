from rest_framework import serializers

from categories.serializers import CategoryDetailSerializer
from news.models import *


class NewsItemSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category = CategoryDetailSerializer()

    class Meta:
        model = NewsItem
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_at'] = instance.created_at.strftime("%d.%m.%Y %H:%M")
        return representation
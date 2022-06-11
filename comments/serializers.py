from rest_framework import serializers
from comments.models import Comment


class CommentDetailSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
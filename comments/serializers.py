from rest_framework import serializers
from comments.models import Comment
from users.models import UserProfile
from users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_at'] = instance.created_at.strftime("%d.%m.%Y %H:%M")
        request = self.context.get('request')
        representation['image'] = request.build_absolute_uri(UserProfile.objects.get(user=instance.author).image.url)
        return representation
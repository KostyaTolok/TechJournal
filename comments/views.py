from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from comments.models import Comment
from comments.serializers import CommentDetailSerializer


class CreateComment(generics.CreateAPIView):
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
    permission_classes = (IsAuthenticated,)


class CommentsList(generics.ListCreateAPIView):
    serializer_class = CommentDetailSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        news_item = self.request.query_params.get('news_item', None)

        if news_item is not None:
            queryset = queryset.filter(news_item_id=news_item)

        return queryset


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()

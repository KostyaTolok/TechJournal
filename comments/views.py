from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from TechJournal.permissions import IsOwnerOrReadOnly
from comments.models import Comment
from comments.serializers import CommentSerializer


class CreateComment(generics.CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentsList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        news_item = self.request.query_params.get('news_item', None)

        if news_item is not None:
            queryset = queryset.filter(news_item_id=news_item)

        queryset = queryset.order_by('-created_at')
        return queryset


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)

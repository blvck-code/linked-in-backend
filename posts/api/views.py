from posts.api.serializers import PostSerializer, CreatePostSerializer
from rest_framework.response import Response
from rest_framework import status
from posts.models import Post
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.filters import SearchFilter, OrderingFilter

# Detail Post API
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
@authentication_classes([TokenAuthentication, ])
def detailPost(request, slug):
    try:
        posts = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(posts)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Post List API
@api_view(['GET', ])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def postsListAPI(request):
    experience = Post.objects.order_by("-date_updated")
    serializer = PostSerializer(experience, many=True)
    return Response(serializer.data)

class PostListView(ListAPIView):
	queryset = Post.objects.order_by("-date_updated")
	serializer_class = PostSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	pagination_class = PageNumberPagination
	filter_backends = (SearchFilter, OrderingFilter)
	search_fields = ('title', 'body', 'author__username')

# Create Post API
@api_view(['POST',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def createPostAPI(request):
    post = Post(account=request.user)

    serializer = CreatePostSerializer(post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Post API
@api_view(['DELETE',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def deletePost(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({"error":"Post not found"},status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if post.account != user:
        return Response({'response': "You don't have permission to delete that."})

    if request.method == 'DELETE':
        operation = post.delete()
        data = {}
        if operation:
            data['response'] = 'Delete Success'
        return Response(data=data, status=status.HTTP_200_OK)
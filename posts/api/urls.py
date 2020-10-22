from django.urls import path
from posts.api.views import detailPost, postsListAPI, createPostAPI,PostListView, deletePost, postsListAPI

app_name = 'posts'

urlpatterns = [
    path('<slug>/', detailPost),
    path('', PostListView.as_view()),
    # path('', postsListAPI),
    path('create', createPostAPI),
    path('<int:id>/delete', deletePost)
]

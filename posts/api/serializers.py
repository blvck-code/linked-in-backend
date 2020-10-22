from rest_framework import serializers
from posts.models import Post
from account.models import Account

class PostSerializer(serializers.ModelSerializer):

    author = serializers.SerializerMethodField('get_author')
    profession = serializers.SerializerMethodField('get_profession')
    profile = serializers.SerializerMethodField('get_slug')

    dp = serializers.SerializerMethodField('get_profile')


    class Meta:
        model = Post
        fields = ['id', 'body', 'image', 'date_updated', 'profile', 'author', 'profession', 'dp', ]

    def get_author(self, post):
        first_name = post.account.first_name
        last_name = post.account.last_name
        return f'{first_name} {last_name}'

    def get_profession(self, post):
        profession = post.account.profile.profession
        return profession

    def get_profile(self, post):
        profession = post.account.profile.profile_pic
        return profession

    def get_slug(self, post):
        slug = post.account.profile.slug
        return slug


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['image', 'body']

    # def get_dp(self, post):
    #     dp = post.account.profile.profile_pic
    #     return dp




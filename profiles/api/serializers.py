from rest_framework import serializers
from profiles.models import Profile, Contact

class AllProfilesSerializer(serializers.ModelSerializer):

    first_name = serializers.SerializerMethodField('get_firstname')
    last_name = serializers.SerializerMethodField('get_lastname')

    class Meta:
        model = Profile
        fields = ['id', 'profession', 'profile_pic', 'country', 'location', 'headline', 'first_name',
                  'last_name', 'slug']

    def get_firstname(self, profile):
        firstname = profile.account.first_name
        return firstname

    def get_lastname(self, profile):
        lastname = profile.account.last_name
        return lastname

class ProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.SerializerMethodField('get_firstname')
    last_name = serializers.SerializerMethodField('get_lastname')

    class Meta:
        model = Profile
        fields = ['id', 'profession', 'bg_pic', 'profile_pic', 'country', 'location', 'headline', 'first_name',
                  'last_name', 'slug']

    def get_firstname(self, profile):
        firstname = profile.account.first_name
        return firstname

    def get_lastname(self, profile):
        lastname = profile.account.last_name
        return lastname

class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ['id', 'devsworld', 'website_url', 'website_url_type', 'phone', 'twitter_username', 'github_username', 'phone_type', 'address', 'birthday']




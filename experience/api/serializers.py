from rest_framework import serializers
from ..models import Experience, Education


class ExperienceSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField('get_firstname')
    last_name = serializers.SerializerMethodField('get_lastname')

    class Meta:
        model = Experience
        fields = ['id', 'job', 'employment_type', 'company', 'location', 'start',
                  'end', 'description', 'date_updated',  'first_name', 'last_name']

    def get_firstname(self, profile):
        firstname = profile.account.first_name
        return firstname

    def get_lastname(self, profile):
        lastname = profile.account.last_name
        return lastname

class EducationSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField('get_firstname')
    last_name = serializers.SerializerMethodField('get_lastname')
    class Meta:
        model = Education
        fields = ['id', 'school', 'degree', 'study_field', 'start', 'end', 'description', 'first_name', 'last_name']

    def get_firstname(self, profile):
        firstname = profile.account.first_name
        return firstname

    def get_lastname(self, profile):
        lastname = profile.account.last_name
        return lastname

class UpdateEducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = ['id','school', 'degree', 'study_field', 'start', 'end', 'description', ]
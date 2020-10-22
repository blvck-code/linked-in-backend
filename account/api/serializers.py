from rest_framework import serializers
from ..models import Account
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'first_name', 'last_name',  'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):
        account = Account(
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name = self.validated_data['last_name']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})
        account.set_password(password)
        account.save()
        return account


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=60)
    password = serializers.CharField(max_length=30)

    class Meta:
        model = Account
        fields = ("email", "password")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Invalid login')


class UserAPI(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'first_name', 'username', 'last_name']




from account.api.serializers import RegisterSerializer, UserAPI, LoginSerializer
from django.contrib.auth import authenticate
from profiles.models import Profile
from rest_framework.response import Response
from validate_email import validate_email
import json
from rest_framework import status
from django.http import JsonResponse
from account.models import Account
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

@api_view(['GET', ])
@permission_classes([])
@authentication_classes([])
def api_overview(request):
    api_url = {
        'Register(Post)':'/api/auth/register',
        'Login(Post)':'/api/auth/login',
        'User (Get)':'/api/auth/user',
        'Validate first name (Post)':'/api/auth/validate-firstname',
        'Validate last name (Post)':'/api/auth/validate-lastname',
        'Validate password (Post)':'/api/auth/validate-password',
        'Validate confirm password (Post)':'/api/auth/confirm-password',
        'Logout(Post)':'/api/auth/logout',
        'User(GET)':'/api/auth/user',

        'Posts (Get)':'/api/posts',
        'Developer single (Get)':'/api/developers/<slug>',
        'Update profile (Put)':'/api/profile/<int:id>/update',
        'Developer profile (Get)':'/api/profile/user-profile',
        'Developers list (Get)':'/api/profile/list ',
        'Create profile':'/api/profile/create ',
        
        'Developers contact list':'/api/contact/user-contact  ',
        'Developer contact update':'/api/contact/<int:id>/update ',
        'Developer contact update':'/api/contact/developers/<slug> ',
        'Experience detail':'/api/experience/<int:id>/ ',
        'Experience update':'/api/experience/<int:id>/update  ',
        'Experience delete':'/api/experience/<int:id>/delete   ',
        'Experience create':'/api/experience/create ',
        'Single Developer Experience create':'/api/experience/developers/<slug>',
        'Experience list':'/api/ experience/list',
        
        'Education detail':'/api/education/<int:id>/',
        'Education update':'/api/education/<int:id>/update',
        'Education delete':'/api/education/<int:id>/delete',
        'Education list':'/api/education/list',
        'Developer Education':'/api/education/developers/<slug>',

    }
    return Response(api_url)

@api_view(['POST', ])
@permission_classes([])
@authentication_classes([])
def validateEmail(request):
    data = json.loads(request.body)
    email = data['email']

    if validate_email(email):
        if Account.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email address already taken."})
        return JsonResponse({"email_valid": True})
    return JsonResponse({"error":"Enter a valid email address."})


    if Account.objects.filter(email=email).exists():
        return JsonResponse({"error": "Email address already taken."})
    return JsonResponse({"email_valid": True})



@api_view(['POST', ])
@permission_classes([])
@authentication_classes([])
def validateFirstname(request):
    data = json.loads(request.body)
    first_name = data['first_name']

    if not str(first_name).isalnum():
        return JsonResponse({"error": "Name should only contain alphanumeric characters"})
    return JsonResponse({"firstname_valid": True})

@api_view(['POST', ])
@permission_classes([])
@authentication_classes([])
def validateLastname(request):
    last_name = request.data['last_name']

    if not str(last_name).isalnum():
        return Response({"error": "Name should only contain alphanumeric characters"})
    return Response({"lastname_valid": True})

@api_view(['POST', ])
@permission_classes([])
@authentication_classes([])
def validatePassword(request):
    data = json.loads(request.body)
    password = data['password']
    if len(password) < 6:
        return Response({"password_error": "Password should be atleast 6 characters long"})
    return JsonResponse({"password_valid":True})

@api_view(['POST', ])
@permission_classes([])
@authentication_classes([])
def confirmPassword(request):
    data = json.loads(request.body)
    password = data['password']
    password2 = data['password2']

    if password != password2:
        return Response({"password_error": "Passwords don`t match"})
        return JsonResponse({"password_valid": True})


@api_view(['POST', ])
@permission_classes([])
@authentication_classes([])
def registerAPI(request):
    if request.method == 'POST':
        data = {}

        email = request.data.get('email', '0').lower()
        if check_email(email) != None:
            data['error_message'] = ''
            data['response'] = 'Error'
            return Response({"error":"That email is already in use."}, status=status.HTTP_400_BAD_REQUEST)


    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        account = serializer.save()
        # profile = Profile.objects.get(account=account)

        data['response'] = f'Account created successfully for {account.email}, you can now login'
        # data['email'] = account.email
        # data['first_name'] = account.first_name
        # data['last_name'] = account.last_name
        # data['pk'] = account.pk
        # token = Token.objects.get(user=account).key
        # data['token'] = token
        # data['slug'] = profile.slug
        # data['profile_pic'] = profile.profile_pic
    else:
        data = serializer.errors
    return Response(data)


def check_email(email):
    account = None
    try:
        account = Account.objects.get(email=email)
    except Account.DoesNotExist:
        return None
    if account != None:
        return email


# Login API
@api_view(['POST'])
@permission_classes([])
@authentication_classes([])
def loginAPI(request):
    serializer = LoginSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        account = serializer.validated_data
        profile = Profile.objects.get(account=account)
        data['first_name'] = account.first_name
        data['last_name'] = account.last_name
        data['email'] = account.email
        data['token'] = Token.objects.get(user=account).key
        data['slug'] = profile.slug
        data['profile_pic'] = profile.profile_pic

    else:
        data = serializer.errors
    return Response(data)

# User API
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
@authentication_classes([TokenAuthentication, ])
def userAPI(request):

    user = request.user
    profile = Profile.objects.get(account=user)

    data = {}
    serializer = UserAPI(user)
    data['email'] = user.email
    data['first_name'] = user.first_name
    data['username'] = user.username
    data['last_name'] = user.last_name
    data['token'] = Token.objects.get(user=user).key
    data['profile_pic'] = profile.profile_pic
    data['slug'] = profile.slug


    return Response(data)


# Logout API
@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
@authentication_classes([TokenAuthentication, ])
def logoutAPI(request):
    return Response(status=204)

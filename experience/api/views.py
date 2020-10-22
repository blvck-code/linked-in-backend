from ..models import Experience, Education
from profiles.models import Profile
from rest_framework import status
from .serializers import ExperienceSerializer, EducationSerializer, UpdateEducationSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.generics import ListAPIView


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def developerExperienceAPI(request, slug):
    try:
        profile = Profile.objects.get(slug=slug)
        experience = Experience.objects.filter(account=profile.account)
    except Experience.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ExperienceSerializer(experience, many=True)
    return Response(serializer.data)

@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def detailExperienceAPI(request, id):
    try:
        experience = Experience.objects.get(pk=id)
    except Experience.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ExperienceSerializer(experience)
    return Response(serializer.data)


@api_view(['PUT', ])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def updateExperienceAPI(request, id):
    try:
        experience = Experience.objects.get(pk=id)
    except Experience.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if experience.account != request.user:
        return Response({"error": "You don`t have permission to edit that"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ExperienceSerializer(experience, data=request.data)
    data = {}
    if serializer.is_valid():
        experience = serializer.save()
        data['job'] = experience.job
        data['company'] = experience.company
        data['start'] = experience.start
        data['end'] = experience.end
        data['description'] = experience.description
        return Response(data=data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', ])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def deleteExperienceAPI(request, id):
    try:
        experience = Experience.objects.get(pk=id)
    except Experience.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if experience.account != request.user:
        return Response({"error": "You don`t have permission to delete that"}, status=status.HTTP_400_BAD_REQUEST)

    operation = experience.delete()
    data = {}
    if operation:
        data['success'] = 'deleted successfully'
        return Response(data=data, status=status.HTTP_200_OK)
    else:
        data['fail'] = 'delete failed'
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def createExperienceAPI(request):
    user = request.user
    experience = Experience(account=user)

    serializer = ExperienceSerializer(experience, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def experienceListAPI(request):
    experience = Experience.objects.order_by('-date_updated')
    serializer = ExperienceSerializer(experience, many=True)
    return Response(serializer.data)


@api_view(['GET', ])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def currentUserExperienceAPI(request):
    experience = Experience.objects.filter(account=request.user).order_by('-date_updated')
    serializer = ExperienceSerializer(experience, many=True)
    return Response(serializer.data)

@api_view(['GET',])
@authentication_classes([])
@permission_classes([])
def detailEducationAPI(request, id):
    try:
        education = Education.objects.get(pk=id)
    except Education.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = EducationSerializer(education)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT',])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def updateEducationAPI(request, id):
    try:
        education = Education.objects.get(pk=id)
    except Education.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if education.account != request.user:
        return Response({"error": "You don`t have permission to edit that"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UpdateEducationSerializer(education, data=request.data)
    data = {}
    if serializer.is_valid():
        education = serializer.save()
        data['school'] = education.school
        data['degree'] = education.degree
        data['study_field'] = education.study_field
        data['start'] = education.start
        data['end'] = education.end
        data['description'] = education.description
        return Response(data=data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', ])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def deleteEducationAPI(request, id):
    try:
        education = Education.objects.get(pk=id)
    except Education.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if education.account != request.user:
        return Response({"error": "You don`t have permission to delete that"}, status=status.HTTP_400_BAD_REQUEST)

    operation = education.delete()
    data= {}
    if operation:
        data['success'] = 'deleted successfully'
        return Response(data=data, status=status.HTTP_200_OK)
    else:
        data['fail'] = 'delete failed'
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', ])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def createEducationAPI(request):
    user = request.user
    education = Education(account=user)

    serializer = EducationSerializer(education, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def educationListAPI(request):
    education = Education.objects.all()
    serializer = EducationSerializer(education, many=True)
    return Response(serializer)

@api_view(['GET', ])
@authentication_classes([TokenAuthentication, ])
@permission_classes([IsAuthenticated, ])
def currentUserEducationAPI(request):
    education = Education.objects.filter(account=request.user)
    serializer = EducationSerializer(education, many=True)
    return Response(serializer.data)

@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def developerEducationAPI(request, slug):
    try:
        profile = Profile.objects.get(slug=slug)
        education = Education.objects.filter(account=profile.account)
    except Education.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = EducationSerializer(education, many=True)
    return Response(serializer.data)



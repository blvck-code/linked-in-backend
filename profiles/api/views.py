from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from ..models import Profile, Contact
from profiles.api.serializers import ProfileSerializer, ContactSerializer, AllProfilesSerializer

@api_view(['GET',])
@permission_classes([])
@authentication_classes([])
def profileAPI(request, slug):
    try:
        profile = Profile.objects.get(slug=slug)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AllProfilesSerializer(profile)
    return Response(serializer.data)

@api_view(['GET',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def userProfileAPI(request):
    user = request.user
    try:
        profile = Profile.objects.get(account=user)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def createProfileAPI(request):

    profile = Profile(account=request.user)

    serializer = ProfileSerializer(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def updateProfileAPI(request, id):

    try:
        profile = Profile.objects.get(id=id)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if profile.account != request.user:
        return Response({'error':'You don`t have permission to edit that!'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ProfileSerializer(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfilesListView(ListAPIView):
	queryset = Profile.objects.all().order_by("-id")
	serializer_class = ProfileSerializer
	authentication_classes = ()
	permission_classes = ()
	pagination_class = PageNumberPagination
	# filter_backends = (SearchFilter, OrderingFilter)
	# search_fields = ('title', 'body', 'author__username')
@api_view(['GET',])
@permission_classes([])
@authentication_classes([])
def profilesList(request):
    profiles = Profile.objects.order_by("-id")
    serializer = AllProfilesSerializer(profiles, many=True)

    return Response(serializer.data)

# @api_view(['GET',])
# @permission_classes([])
# @authentication_classes([])
# def devContactAPI(request, slug):
#     slug = Profile.objects.filter(slug=slug)
#     try:
#         contact = Contact.objects.get(account=user)
#     except Contact.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     serializer = ContactSerializer(contact)
#     return Response(serializer.data)

@api_view(['GET',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def userContactAPI(request):
    user = request.user
    try:
        contact = Contact.objects.get(account=user)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ContactSerializer(contact)
    return Response(serializer.data)

@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def developerContactAPI(request, slug):
    try:
        profile = Profile.objects.get(slug=slug)
        contact = Contact.objects.get(account=profile.account)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ContactSerializer(contact)
    return Response(serializer.data)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def updateContactAPI(request, id):
    user = request.user
    try:
        contact = Contact.objects.get(id=id, account=user)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ContactSerializer(contact, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


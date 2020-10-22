from django.urls import path
from .views import updateContactAPI, developerContactAPI, userContactAPI, ProfilesListView, profileAPI, userProfileAPI, createProfileAPI, updateProfileAPI

app_name = 'profile'

urlpatterns  = [
    #profile
    path('developers/<slug>/', profileAPI),
    path('profile/<int:id>/update', updateProfileAPI),
    path('profile/user-profile', userProfileAPI),
    path('profile/list', ProfilesListView.as_view()),
    path('profile/create', createProfileAPI),

    #contact
    path('contact/user-contact', userContactAPI),
    path('contact/<int:id>/update', updateContactAPI),
    path('contact/developers/<slug>', developerContactAPI),
]
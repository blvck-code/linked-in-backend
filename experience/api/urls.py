from django.urls import path
from .views import (
    detailExperienceAPI,
    experienceListAPI,
    currentUserExperienceAPI,
    updateExperienceAPI,
    deleteExperienceAPI,
developerExperienceAPI,
    createExperienceAPI,
    detailEducationAPI,
    educationListAPI,
    createEducationAPI,
    updateEducationAPI,
    deleteEducationAPI,
currentUserEducationAPI,
developerEducationAPI
)

app_name = 'info'

urlpatterns = [
    #experience
    path('experience/<int:id>/', detailExperienceAPI),
    path('experience/<int:id>/update', updateExperienceAPI),
    path('experience/<int:id>/delete', deleteExperienceAPI),
    path('experience/create', createExperienceAPI),
    path('experience/developers/<slug>', developerExperienceAPI),
    path('experience/list', experienceListAPI),
    path('experience/user-experience', currentUserExperienceAPI),

    #education
    path('education/<int:id>/', detailEducationAPI),
    path('education/<int:id>/update', updateEducationAPI),
    path('education/<int:id>/delete', deleteEducationAPI),
    path('education/list', educationListAPI),
    path('education/create', createEducationAPI),
    path('education/user-education', currentUserEducationAPI),
    path('education/developers/<slug>', developerEducationAPI),
]



from django.urls import path
from account.api.views import registerAPI, loginAPI, userAPI, logoutAPI,  validateEmail, validateLastname, validateFirstname, validatePassword, confirmPassword

app_name = 'account'

urlpatterns = [
    path('register', registerAPI, name="register"),
    path('login', loginAPI, name="login"),
    path('user', userAPI, name="'user"),
    path('validate-email', validateEmail, name="'validate-email"),
    path('validate-firstname', validateFirstname, name="'validate-firstname"),
    path('validate-lastname', validateLastname, name="'validate-lastname"),
    path('validate-password', validatePassword, name="'validate-password"),
    path('confirm-password', confirmPassword, name="'confirm-password"),
    path('logout', logoutAPI, name="logout")
]

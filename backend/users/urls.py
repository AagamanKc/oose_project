from django.urls import path
from .views import Login, Register
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView


urlpatterns = [
    path("login/", Login.as_view()),
    path("register/", Register.as_view()),
    path("token/",TokenObtainPairView.as_view(),name="get_token"),
    path("token/refresh/",TokenRefreshView.as_view(),name="refresh"),
]
from django.urls import path,include
from rest_framework import routers
from .views import Reviews

urlpatterns = [
    path("", Reviews.as_view(), name="predicts")
]
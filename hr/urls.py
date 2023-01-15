from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
# router.register('menu_elements', views.MenuElementViewset, 'menu_elements')

urlpatterns = [
    path('', include(router.urls))
]
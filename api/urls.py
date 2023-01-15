from django.urls import path, include


urlpatterns = [
    path('campaigns/', include('campaigns.urls')),
    path('hr/', include('hr.urls')),
    path('auth/', include('rest_framework.urls')),

]

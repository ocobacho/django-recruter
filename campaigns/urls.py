from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register('r_campaings', views.CampaignViewset, 'campaigns')
router.register('c_candidates', views.CandidateViewset, 'candidates_crud')
router.register('r_campaings', views.TechnologyExperienceViewset, 'campaigns')

urlpatterns = [
    path('', include(router.urls))
]
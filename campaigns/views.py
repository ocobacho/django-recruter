from django.shortcuts import render
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from url_filter.integrations.drf import DjangoFilterBackend

from .models import Campaign, Candidate, TechnologyExperience
# Create your views here.
from .serializers import CampaignSerializer, CandidateApplySerializer, CandidateSerializer, \
    TechnologyExperienceSerializer


class CampaignViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    filter_fields = ('name', 'active',)
    search_fields = ('name', 'description')
    ordering_fields = ('name', 'active',)

    @action(methods=['PUT'], detail=True, serializer_class=CandidateSerializer)
    def apply(self, request, pk):
        serialized = CandidateApplySerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        cand = serialized.save()
        self.get_object().candidates.add(cand)

        return Response(serialized.data, status=status.HTTP_201_CREATED)


class CandidateViewset(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer


class TechnologyExperienceViewset(viewsets.ModelViewSet):
    queryset = TechnologyExperience.objects.all()
    serializer_class = TechnologyExperienceSerializer

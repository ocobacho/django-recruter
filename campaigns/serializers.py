from .models import Campaign, Candidate, TechnologyExperience
from rest_framework import serializers


class CampaignSerializer(serializers.ModelSerializer):
    active_txt = serializers.SerializerMethodField()

    def get_active_txt(self, obj):
        if obj.active:
            return "Active"
        return "Finish"

    class Meta:
        model = Campaign
        fields = ('id', 'name', 'description', 'active', 'active_txt')


class CandidateApplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = (
            'id',
            'first_name',
            'last_name',
            'personal_id',
            'current_address',
            'edad',
            'sex',
        )


class TechnologyExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyExperience
        fields = ('id', 'technology', 'years_xp', 'candidate')


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = (
            'id',
            'first_name',
            'last_name',
            'personal_id',
            'current_address',
            'edad',
            'sex',
            'accepted',
            'technologies'
        )

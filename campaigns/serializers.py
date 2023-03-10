from django.db import IntegrityError
from django.db.models import UniqueConstraint

from .models import Campaign, Candidate, TechnologyExperience, Technology
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


class TechnologyExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyExperience
        fields = ('id', 'technology', 'years_xp',)


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ('id', 'name',)


class CandidateApplySerializer(serializers.ModelSerializer):
    technologies = serializers.ListSerializer(child=TechnologyExperienceSerializer(), write_only=True, required=True)

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
            'technologies'
        )

    def validate_technologies(self, value):
        if len(value) == 0:
            raise serializers.ValidationError("You must have at least one technology experience")
        return value

    def create(self, validated_data):
        technologies = validated_data.pop('technologies')
        candidate = Candidate.objects.create(**validated_data)
        print(validated_data, technologies)
        for tech in technologies:
            print(tech)
            if not TechnologyExperience.objects.filter(technology=tech["technology"], candidate=candidate).exists():
                TechnologyExperience.objects.create(**tech, candidate=candidate)
            else:
                candidate.delete()
                raise serializers.ValidationError(
                    {'technologies': ['Technology Experience with this Technology and Candidate already exists.']})
        return candidate


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


# -*- coding: utf-8 -*-
from django.contrib import admin, messages
from django.core.exceptions import ValidationError

from .models import Candidate, Campaign, Technology, TechnologyExperience
from .services import make_bulk_employee


@admin.action(description='Make selected employess')
def make_employee_admin(modeladmin, request, queryset):
    try:
        make_bulk_employee(queryset)
        messages.add_message(request, messages.SUCCESS, 'Candidates were successfully made employees')
    except ValidationError as e:
        messages.add_message(request, messages.ERROR, e.message)



@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'first_name',
        'last_name',
        'personal_id',
        'current_address',
        'edad',
        'sex',
        'accepted',
    )
    list_filter = (
        'campaign',
        'sex',
        'accepted',
        'edad',

    )

    # filter_horizontal = ('technologies',)

    raw_id_fields = ('technologies',)
    actions = [make_employee_admin]


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    def enlisted_candidates(self, obj):
        candidates_name = [str(x) for x in obj.candidates.all()[:5]]
        r = ", ".join(candidates_name)
        if obj.candidates.all().count() > 5:
            r += " ..."
        return r

    list_display = ('id', 'name', 'enlisted_candidates', 'active')
    list_filter = ('active',)
    ordering = ('name', 'active')
    fields = ('name','candidates',)
    search_fields = ('name',)


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(TechnologyExperience)
class TechnologyExperienceAdmin(admin.ModelAdmin):
    list_display = ('id', 'technology', 'years_xp', 'candidate')
    list_filter = ('technology', 'candidate')



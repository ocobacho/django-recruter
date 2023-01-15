# -*- coding: utf-8 -*-
from django.utils.translation import gettext_lazy as _
from django.contrib import admin, messages
from django.core.exceptions import ValidationError
import csv
from django.http import HttpResponse

from .models import Candidate, Campaign, Technology, TechnologyExperience
from .services import make_bulk_employee


class TechnologiesExperienceInline(admin.TabularInline):
    model = TechnologyExperience
    extra = 1


@admin.action(description=_('Make selected candidates employees'))
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
        'technologies',
    )

    search_fields = ('first_name', 'last_name',)
    inlines = [TechnologiesExperienceInline]
    # filter_horizontal = ('technologies',)

    # raw_id_fields = ('technologies',)
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
    fields = ('name', 'description', 'candidates')
    search_fields = ('name', 'description')


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.action(description=_('Export candidate selected as .csv'))
def export_as_csv(self, request, queryset):
    file_name = 'CandidateTechnolgyExperience'
    meta = self.model._meta

    field_names = [field.name for field in meta.fields]

    custom_names = ('technology',
                   'years_xp',
                   'first_name',
                   'last_name',
                   'personal_id',
                   'current_address',
                   'edad',
                   'sex',
                   'accepted',)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename={}.csv'.format(file_name)
    writer = csv.writer(response)

    writer.writerow(custom_names)
    for obj in queryset:

        # row = writer.writerow([getattr(obj, field) for field in field_names])
        row = writer.writerow([
            obj.technology,
            obj.years_xp,
            obj.candidate.first_name,
            obj.candidate.last_name,
            obj.candidate.personal_id,
            obj.candidate.current_address,
            obj.candidate.edad,
            obj.candidate.sex,
            obj.candidate.accepted,
        ])

    return response


@admin.register(TechnologyExperience)
class TechnologyExperienceAdmin(admin.ModelAdmin):
    list_display = ('id', 'technology', 'years_xp', 'candidate',)
    list_filter = ('technology', 'candidate', 'candidate__campaign')
    actions = [export_as_csv]

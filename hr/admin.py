# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'first_name',
        'last_name',
        'personal_id',
        'current_address',
        'edad',
        'sex',
        'employee_type',
        'user',
        'candidate',
    )
    list_filter = ('sex', 'employee_type',)
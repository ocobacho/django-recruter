from django.core.exceptions import ValidationError

from hr.models import Employee


def make_bulk_employee(candidate_queryset):
    for candidate in candidate_queryset:
        if not Employee.objects.filter(personal_id=candidate.personal_id).exists():
            Employee.objects.create(
                first_name=candidate.first_name,
                last_name=candidate.last_name,
                personal_id=candidate.personal_id,
                current_address=candidate.current_address,
                edad=candidate.edad,
                sex=candidate.sex,
                employee_type='developer'

            )
            candidate.accepted = True
            candidate.save()
        else:
            raise ValidationError(f'There already is an employee with id {candidate.personal_id}')

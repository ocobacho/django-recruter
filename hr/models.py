from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.db import models


class Person(models.Model):
    SEX = (
        ('m', 'M'),
        ('f', 'F')
    )

    first_name = models.CharField(_('First name'), max_length=150)
    last_name = models.CharField(_('Last name'), max_length=150)
    personal_id = models.CharField(_('ID'), max_length=11)
    current_address = models.CharField(_('Current Address'), max_length=200)
    edad = models.PositiveSmallIntegerField(_('Age'))
    sex = models.CharField(_('Sex'), choices=SEX, max_length=3)

    class Meta:
        abstract = True


# Create your models here.
class Employee(Person):
    E_TYPE = (
        ('developer', _("Developer")),
        ('others', _("Others")),
    )

    employee_type = models.CharField(_('Type'), choices=E_TYPE, max_length=140)
    user = models.OneToOneField(get_user_model(), verbose_name=_('User'), on_delete=models.SET_NULL, null=True)
    candidate = models.OneToOneField('campaigns.Candidate', verbose_name=_("Candidate"), null=True,
                                     on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db import models


# Nombre y Apellidos, CI, dirección actual, edad y sexo
from hr.models import Person

def validate_edad(value):
    if value < 16 or value > 65:
        raise ValidationError(
             _('The age must be between 16 and 65')
        )

class Candidate(Person):
    SEX = (
        ('m', 'M'),
        ('f', 'F')
    )


    first_name = models.CharField(_('First name'), max_length=150)
    last_name = models.CharField(_('Last name'), max_length=150)
    personal_id = models.CharField(_('Personal ID'), max_length=11, unique=True)
    current_address = models.CharField(_('Current Address'), max_length=200)
    edad = models.PositiveSmallIntegerField(_('Age'), validators=[validate_edad])
    sex = models.CharField(_('Sex'), choices=SEX, max_length=3)
    accepted = models.BooleanField(default=False)
    technologies = models.ManyToManyField('campaigns.Technology', through='TechnologyExperience')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Campaign(models.Model):
    name = models.CharField(_('Name'), max_length=150)
    description = models.TextField(null=True, blank=True)
    candidates = models.ManyToManyField(Candidate, verbose_name=_('Candidates'), blank=True )
    active = models.BooleanField(_('Active'), default=True)

    def __str__(self):
        return self.name


class Technology(models.Model):
    name = models.CharField(_('Name'), max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Technologies')


class TechnologyExperience(models.Model):
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE)
    years_xp = models.PositiveSmallIntegerField()
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.candidate.first_name} {self.technology.name} {self.years_xp}"

    class Meta:
        unique_together = ('technology', 'candidate',)
        ordering = ('-years_xp',)
        verbose_name = _('Technology Experience')
        verbose_name_plural = _('Technologies Experience')
from django.core.exceptions import ValidationError
from django.test import TestCase

# Create your tests here
from campaigns.models import Candidate
from campaigns.services import make_bulk_employee
from hr.models import Employee


class FinanzasRestTest(TestCase):
    def setUp(self):
        self.candidate1 = Candidate.objects.create(
            first_name="first_name1",
            last_name='last_name1',
            personal_id='1111',
            current_address='address1',
            edad=20,
            sex='m'
        )

        self.candidate2 = Candidate.objects.create(
            first_name="first_name2",
            last_name='last_name2',
            personal_id='2222',
            current_address='address2',
            edad=24,
            sex='f'
        )

    def test_make_bulk_employee(self):
        self.assertFalse(Employee.objects.filter(personal_id=self.candidate1.personal_id).exists())
        self.assertFalse(Employee.objects.filter(personal_id=self.candidate2.personal_id).exists())

        q = Candidate.objects.filter(id__in=[self.candidate1.id, self.candidate2.id])
        self.assertGreater(q.count(), 0)
        make_bulk_employee(q)

        self.assertTrue(Employee.objects.filter(personal_id=self.candidate1.personal_id).exists())
        self.assertTrue(Employee.objects.filter(personal_id=self.candidate2.personal_id).exists())

        candidate1 = Candidate.objects.get(id=self.candidate1.id)
        candidate2 = Candidate.objects.get(id=self.candidate2.id)

        self.assertFalse(self.candidate1.accepted)
        self.assertFalse(self.candidate1.accepted)
        self.assertTrue(candidate1.accepted)
        self.assertTrue(candidate2.accepted)
        # self.assertRaises(ValidationError, make_bulk_employee(q))

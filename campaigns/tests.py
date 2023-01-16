from django.core.exceptions import ValidationError
from django.test import TestCase

# Create your tests here
from rest_framework.test import APITestCase

from campaigns.models import Candidate, Campaign, Technology
from campaigns.services import make_bulk_employee
from hr.models import Employee


class FinanzasTest(TestCase):
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


class FinanzasRestTest(APITestCase):
    def setUp(self) -> None:
        self.Campaign1 = Campaign.objects.create(
            name="C1",
            description="desc",
            active=True,
        )

    def test_candidate_apply(self):
        url = "/api/v1/campaigns/r_campaings"
        tech1 = Technology.objects.create(name="react")
        tech2 = Technology.objects.create(name="django")

        data = {
            'first_name': 'Jesus',
            'last_name': 'Cobacho',
            'personal_id': '123123',
            'current_address': 'fiiid',
            'edad': 25,
            'sex': 'm',
            'technologies': [
                {'technology': tech1.id, 'years_xp': 12,},
                {'technology': tech2.id, 'years_xp': 10,},
            ]
        }

        response = self.client.post(url + f"/{self.Campaign1.id}/apply", data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 201)
        q = Candidate.objects.filter(personal_id=data['personal_id'])
        self.assertTrue(q.exists())
        self.assertTrue(self.Campaign1.candidates.filter(personal_id=data['personal_id']).exists())
        candidate = q.get()
        self.assertEqual(candidate.technologies.all().count(), len(data['technologies']))


    def test_candidate_apply_expierience_unique(self):
        url = "/api/v1/campaigns/r_campaings"
        tech1 = Technology.objects.create(name="react")

        data = {
            'first_name': 'Jesus',
            'last_name': 'Cobacho',
            'personal_id': '123123',
            'current_address': 'fiiid',
            'edad': 25,
            'sex': 'm',
            'technologies': [
                {'technology': tech1.id, 'years_xp': 12,},
                {'technology': tech1.id, 'years_xp': 12,},
            ]
        }

        response = self.client.post(url + f"/{self.Campaign1.id}/apply", data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['technologies'][0], 'Technology Experience with this Technology and Candidate already exists.')

    def test_candidate_apply_expierience_empty(self):
        url = "/api/v1/campaigns/r_campaings"
        tech1 = Technology.objects.create(name="react")

        data = {
            'first_name': 'Jesus',
            'last_name': 'Cobacho',
            'personal_id': '123123',
            'current_address': 'fiiid',
            'edad': 25,
            'sex': 'm',
            'technologies': [
            ]
        }

        response = self.client.post(url + f"/{self.Campaign1.id}/apply", data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['technologies'][0], 'You must have at least one technology experience')
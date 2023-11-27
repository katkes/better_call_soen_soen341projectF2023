"""
Module Docstring: Define tests for the accounts app.

This module contains tests for the models, forms, and views in the accounts app.
"""

from django.test import Client, TestCase
from django.urls import reverse
from utils.__init__ import create_test_user, create_test_broker, create_test_property
from django.contrib.auth import get_user_model
from .models import Property, Offer
from accounts.models import Broker
from .forms import PropertyForm, OfferForm

class PropertyViewsTests(TestCase):
    def setUp(self):
        self.user = create_test_user()
        self.client = Client()

    def test_property_list_view(self):
        response = self.client.get(reverse('property_list'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'property_list.html')

    def test_create_property_view(self):
        self.client.force_login(self.user)
        response = self.client.post(reverse('create_property'), {
            'price': 100000.00,
            'size': 1500,
            'num_of_bathrooms': 2,
            'num_of_bedrooms': 3,
        })
        self.assertEqual(response.status_code, 302)  # Redirects after successful POST
        self.assertTrue(Property.objects.exists())

    def test_property_detail_view(self):
        property_obj = create_test_property()
        response = self.client.get(reverse('property_detail', args=[property_obj.property_id]))
        self.assertEqual(response.status_code, 200)

class OfferViewsTests(TestCase):
    def setUp(self):
        self.broker_user = create_test_broker()
        self.client = Client()

    def test_submit_offer_view(self):
        property_obj = create_test_property()
        self.client.force_login(self.broker_user[0])
        response = self.client.post(reverse('submit_offer', args=[property_obj.property_id]), {
            'buyer_name': 'Buyer Name',
            'buyer_address': 'Buyer Address',
            'buyer_email': 'buyer@example.com',
            'price_offered': 120000.00,
            'deed_of_sale_date': '2023-12-01',
            'occupancy_date': '2024-01-01',
        })
        self.assertEqual(response.status_code, 302)  # Redirects after successful POST
        self.assertTrue(Offer.objects.exists())

    def test_reject_offer_view(self):
        offer = Offer.objects.create(
            buyer_broker=self.broker_user[1],
            buyer_name='Buyer Name',
            buyer_address='Buyer Address',
            buyer_email='buyer@example.com',
            property=create_test_property(),
            price_offered=120000.00,
            deed_of_sale_date='2023-12-01',
            occupancy_date='2024-01-01',
        )
        response = self.client.post(reverse('reject_offer', args=[offer.offer_id]))
        self.assertEqual(response.status_code, 302)  # Redirects after successful POST
        self.assertFalse(Offer.objects.exists())

class PropertyFormTests(TestCase):
    """
    Test case for the PropertyForm.
    """
    def test_property_form_valid_data(self):
        """
        Test the PropertyForm with valid data.
        """
        user = create_test_user()
        self.client.force_login(user)

        form_data = {
            'price': 100000.00,
            'size': 1500,
            'num_of_bathrooms': 2,
            'num_of_bedrooms': 3,
        }

        form = PropertyForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_property_form_invalid_data(self):
        """
        Test the PropertyForm with invalid data.
        """
        form_data = {
            'price': 'invalid_price',
            'size': -500,
            'num_of_bathrooms': 'invalid_value',
            'num_of_bedrooms': 'invalid_value',
        }

        form = PropertyForm(data=form_data)
        self.assertFalse(form.is_valid())

class OfferFormTests(TestCase):
    """
    Test case for the OfferForm.
    """
    def test_offer_form_valid_data(self):
        """
        Test the OfferForm with valid data.
        """
        user = create_test_broker()
        user = user[0]
        self.client.force_login(user)

        property_obj = create_test_property()

        form_data = {
            'buyer_name': 'Buyer Name',
            'buyer_address': 'Buyer Address',
            'buyer_email': 'buyer@example.com',
            'price_offered': 120000.00,
            'deed_of_sale_date': '2023-12-01',
            'occupancy_date': '2024-01-01',
        }

        form = OfferForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_offer_form_invalid_data(self):
        """
        Test the OfferForm with invalid data.
        """
        form_data = {
            'buyer_name': '',
            'buyer_address': 'Buyer Address',
            'buyer_email': 'invalid_email',
            'price_offered': 'invalid_price',
            'deed_of_sale_date': 'invalid_date',
            'occupancy_date': 'invalid_date',
        }

        form = OfferForm(data=form_data)
        self.assertFalse(form.is_valid())

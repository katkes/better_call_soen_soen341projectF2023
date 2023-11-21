from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Property, Offer
from .forms import PropertyForm, OfferForm


class PropertyFormTests(TestCase):
    def test_property_form_valid_data(self):
        user = get_user_model().objects.create_user(
            email='test@example.com',
            name='Test User',
            phone_number='1234567890',  # Provide a phone number
            role='user',  # Provide a role
            password='password123'
        )
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
        form_data = {
            'price': 'invalid_price',
            'size': -500,
            'num_of_bathrooms': 'invalid_value',
            'num_of_bedrooms': 'invalid_value',
        }

        form = PropertyForm(data=form_data)
        self.assertFalse(form.is_valid())


class OfferFormTests(TestCase):
    def test_offer_form_valid_data(self):
        user = get_user_model().objects.create_user(
            email='broker@example.com',
            name='Broker User',
            phone_number='1234567890',  # Provide a phone number
            role='broker',  # Provide a role
            password='password123'
        )
        self.client.force_login(user)

        property = Property.objects.create(
            price=150000.00,
            size=2000,
            num_of_bathrooms=2,
            num_of_bedrooms=3,
            rating=4.5
        )

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

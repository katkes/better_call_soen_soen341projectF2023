"""
Module Docstring: Define tests for the accounts app.

This module contains tests for the models, forms, and views in the accounts app.
"""

import json
from django.test import TestCase
from django.urls import reverse
from utils.__init__ import create_test_user, create_test_broker
from .models import Broker, CustomUser
from .forms import SignUpForm, LoginForm, UserUpdateForm

# Static variables
TEST_USER_EMAIL = 'test@example.com'
TEST_USER_NAME = 'Test User'
TEST_USER_PHONE_NUMBER = '1234567890'
TEST_USER_PASSWORD = 'password123'
TEST_USER_ROLE = 'user'

TEST_BROKER_EMAIL = 'broker@example.com'
TEST_BROKER_NAME = 'Broker User'
TEST_BROKER_PHONE_NUMBER = '1234567890'
TEST_BROKER_PASSWORD = 'password123'

TEST_ADMIN_EMAIL = 'admin@example.com'
TEST_ADMIN_PASSWORD = 'adminpassword'
class CustomUserModelTests(TestCase):
    """
    Test cases for the CustomUser model.
    """
    def test_create_user(self):
        """
        Test creating a regular user.
        """
        user = create_test_user()
        self.assertEqual(user.email, TEST_USER_EMAIL)
        self.assertEqual(user.name, TEST_USER_NAME)
        self.assertEqual(user.phone_number, TEST_USER_PHONE_NUMBER)
        self.assertEqual(user.role, TEST_USER_ROLE)
        self.assertTrue(user.check_password(TEST_USER_PASSWORD))

    def test_create_superuser(self):
        """
        Test creating a superuser.
        """
        admin_user = CustomUser.objects.create_superuser(
            email=TEST_ADMIN_EMAIL,
            password=TEST_ADMIN_PASSWORD
        )
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.check_password('adminpassword'))


class SignUpFormTests(TestCase):
    """
    Test cases for the SignUpForm.
    """
    def test_signup_form_valid_data(self):
        """
        Test valid data for the signup form.
        """
        form_data = {
            'name': TEST_USER_NAME,
            'phone_number': TEST_USER_PHONE_NUMBER,
            'email': TEST_USER_EMAIL,
            'password': TEST_USER_PASSWORD,
            'password_confirmation': TEST_USER_PASSWORD,
            'role': TEST_USER_ROLE,
        }
        form = SignUpForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_signup_form_invalid_data(self):
        """
        Test invalid data for the signup form.
        """
        form_data = {
            'name': TEST_USER_NAME,
            'phone_number': TEST_USER_PHONE_NUMBER,
            'email': 'invalid_email',
            'password': TEST_USER_PASSWORD,
            'password_confirmation': TEST_USER_PASSWORD,
            'role': TEST_USER_ROLE,
        }
        form = SignUpForm(data=form_data)
        self.assertFalse(form.is_valid())


class LoginFormTests(TestCase):
    """
    Test cases for the LoginForm.
    """
    def test_login_form_valid_data(self):
        """
        Test valid data for the login form.
        """
        form_data = {
            'email': TEST_USER_EMAIL,
            'password': TEST_USER_PASSWORD,
        }
        form = LoginForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_login_form_invalid_data(self):
        """
        Test invalid data for the login form.
        """
        form_data = {
            'email': 'invalid_email',
            'password': TEST_USER_PASSWORD,
        }
        form = LoginForm(data=form_data)
        self.assertFalse(form.is_valid())


class UserUpdateFormTests(TestCase):
    """
    Test cases for the UserUpdateForm.
    """
    def test_user_update_form_valid_data(self):
        """
        Test valid data for the user update form.
        """
        user = create_test_user()
        form_data = {
            'email': TEST_USER_EMAIL,
            'name': 'Updated User',
            'phone_number': '9876543210',
            'role': 'updated_role',
        }
        form = UserUpdateForm(data=form_data, instance=user)
        self.assertTrue(form.is_valid())

    def test_phone_number_validation(self):
        """
        Test phone number validation in the user update form.
        """
        form_data = {'phone_number': 'invalid_phone'}
        form = UserUpdateForm(data=form_data)

        # Assert that the form is invalid for the phone_number field
        self.assertFalse(form.is_valid())
        self.assertIn('phone_number', form.errors)

    def test_user_update_form_invalid_data(self):
        """
        Test invalid data for the user update form.
        """
        user = create_test_user()
        form_data = {
            'email': 'updated@example.com',  # Updated email
            'name': 'Updated User',
            'phone_number': 'invalid_phone',
            'role': 'updated_role',
        }
        form = UserUpdateForm(data=form_data, instance=user)

        # Assert that the form is invalid
        self.assertFalse(
            form.is_valid(), f"Form is valid. Errors: {form.errors}")

        # Assert specific validation errors
        self.assertDictEqual(form.errors, {'phone_number': [
                             'Enter a valid phone number.']},
                             "Phone number field should have validation error")


class AuthViewsTests(TestCase):
    """
    Test cases for authentication views.
    """
    def test_signup_view(self):
        """
        Test the signup view.
        """
        response = self.client.post(reverse('signup'), data=json.dumps({
            'name': TEST_USER_NAME,
            'phone_number': TEST_USER_PHONE_NUMBER,
            'email': TEST_USER_EMAIL,
            'password': TEST_USER_PASSWORD,
            'password_confirmation': TEST_USER_PASSWORD,
            'role': TEST_USER_ROLE,
        }), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        # Add more assertions based on your view's behavior

    def test_login_view(self):
        """
        Test the login view.
        """
        create_test_user()
        response = self.client.post(reverse('login'), data=json.dumps({
            'email': TEST_USER_EMAIL,
            'password': TEST_USER_PASSWORD,
            }), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        # Add more assertions based on your view's behavior

    def test_search_brokers_view(self):
        """
        Test the search brokers view.
        """
        create_test_broker()
        response = self.client.post(reverse('search_brokers'), data=json.dumps({
            'query': 'Broker',
        }), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        # Add more assertions based on your view's behavior


class BrokerModelTests(TestCase):
    """
    Test cases for the Broker model.
    """
    def test_broker_model_str(self):
        """
        Test the string representation of the Broker model.
        """
        user = create_test_broker()
        broker = Broker.objects.create(
            user=user, license_number='123ABC', agency='Test Agency')
        self.assertEqual(str(broker), 'Broker User broker@example.com')

"""
Module Docstring: for shared function amongst files
"""
from django.db import models
from django.contrib.auth import get_user_model

def big_auto_field():
    """
    Returns a BigAutoField with specific attributes.

    This function is a utility for creating a BigAutoField with common
    attributes such as auto_created, primary_key, serialize, and verbose_name.

    Returns:
        models.BigAutoField: An instance of BigAutoField.
    """
    return models.BigAutoField(
        auto_created=True,
        primary_key=True,
        serialize=False,
        verbose_name='ID'
    )

def create_test_user(email='test@example.com',
                     name='Test User',
                     phone_number='1234567890',
                     role='user',
                     password='password123'):
    """
    Create a test user.

    Args:
        email (str): The email of the user.
        name (str): The name of the user.
        phone_number (str): The phone number of the user.
        role (str): The role of the user.
        password (str): The password of the user.

    Returns:
        User: The created user instance.
    """
    return get_user_model().objects.create_user(
        email=email,
        name=name,
        phone_number=phone_number,
        role=role,
        password=password
    )

# tests/helpers.py
def create_test_broker(email='broker@example.com',
                       name='Broker User',
                       phone_number='1234567890',
                       password='password123'):
    """
    Create a test broker.

    Args:
        email (str): The email of the broker.
        name (str): The name of the broker.
        phone_number (str): The phone number of the broker.
        password (str): The password of the broker.

    Returns:
        User: The created broker instance.
    """
    return create_test_user(
        email=email,
        name=name,
        phone_number=phone_number,
        role='broker',
        password=password
    )

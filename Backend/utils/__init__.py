"""
Module Docstring: for shared function amongst files
"""
from django.db import models
from django.contrib.auth import get_user_model
import uuid

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
    email_prefix = "test"
    existing_user = get_user_model().objects.filter(email=email).first()
    if existing_user:
            email = f'{email_prefix}_{uuid.uuid4()}@example.com' 

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
    from accounts.models import Broker  # Move the import here to avoid circular import issue

    broker_user = create_test_user(
        email=email,
        name=name,
        phone_number=phone_number,
        role='broker',
        password=password
    )
    broker = Broker.objects.create(user=broker_user,
        license_number='123ABC',
        agency='ABC Realty')
    return broker_user,broker

def create_test_property():
    from properties.models import Property

    # Create a test broker user
    broker_user = create_test_broker()
    
    # Create a test broker profile
    broker = broker_user[0]

    # Create a test property
    test_property = Property.objects.create(
        price=300000.00,
        city='Test City',
        rating=4.0,
        image='path/to/test_image.jpg',  # Replace with your actual image path
        assigned_user=broker,
        for_sale=True,
        size=1500,
        num_of_bedrooms=3,
        num_of_bathrooms=2,
        type_of_property='House'
    )

    return test_property

    
    
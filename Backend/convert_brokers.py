import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')

# Initialize Django
django.setup()

from accounts.models import CustomUser, Broker

# Get all existing CustomUser objects with role 'broker'
brokers = CustomUser.objects.filter(role='broker')

for broker in brokers:
    new_broker = Broker(
        user=broker,
        license_number='Default License Number',
        agency='Default Agency'
    )
    new_broker.save()

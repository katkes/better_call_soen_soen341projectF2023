"""
Admin configuration for the accounts app.

This module defines the admin configurations for the models in the accounts app.
"""

from django.contrib import admin
from .models import CustomUser

admin.site.register(CustomUser)

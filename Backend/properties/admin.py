"""
Admin configuration for the properties app.
"""

from django.contrib import admin
from .models import Property, PropertyAdmin

admin.site.register(Property, PropertyAdmin)

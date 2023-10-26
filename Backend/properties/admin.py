from django.contrib import admin

# Register your models here.
# admin.py
from .models import Property, PropertyAdmin

admin.site.register(Property, PropertyAdmin)

from django.db import models
from django.contrib import admin


class Property(models.Model):
    property_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    country = models.CharField(max_length=50)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    image = models.ImageField(upload_to='property_images/')


class PropertyAdmin(admin.ModelAdmin):
    list_display = ('property_id', 'name', 'price', 'country', 'rating')

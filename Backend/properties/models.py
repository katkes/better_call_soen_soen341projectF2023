"""
Module Docstring: Define models for the properties app.

This module contains the Proerty model and related models for the properties app.
"""

from django.db import models
from django.contrib import admin
from django.contrib.auth import get_user_model

from accounts.models import Broker

class Property(models.Model):
    """
    Model representing a real estate property.

    Attributes:
        property_id (AutoField): The primary key for the property.
        price (DecimalField): The price of the property.
        city (CharField): The city where the property is located.
        rating (DecimalField): The rating of the property.
        image (ImageField): An image of the property.
        assigned_user (ForeignKey): The user assigned to the property.
        for_sale (BooleanField): Indicates whether the property is for sale.
        size (DecimalField): The size of the property.
        num_of_bedrooms (PositiveIntegerField): The number of bedrooms in the property.
        num_of_bathrooms (PositiveIntegerField): The number of bathrooms in the property.
        type_of_property (CharField): The type of the property (e.g., House).

    Methods:
        None
    """
    property_id = models.AutoField(primary_key=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    city = models.CharField(max_length=50, default="Dorval")
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    image = models.ImageField(upload_to='property_images/')
    assigned_user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, null=True, blank=True)
    for_sale = models.BooleanField(default=True)
    size = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    num_of_bedrooms = models.PositiveIntegerField(default=0)
    num_of_bathrooms = models.PositiveIntegerField(default=0)
    type_of_property = models.CharField(max_length=50, default="House")

class PropertyAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Property model.

    Attributes:
        list_display (tuple): The fields to display in the admin list view.

    Methods:
        save_model(self, request, obj, form, change): Custom save method for the Property model.
    """
    list_display = ('property_id',
                    'price',
                    'size',
                    'num_of_bedrooms',
                    'num_of_bathrooms',
                    'city',
                    'type_of_property')

    def save_model(self, request, obj, form, change):
        """
        Custom save method to set the assigned user if not already set.
        """
        if not obj.assigned_user:
            obj.assigned_user = request.user
        obj.save()
        print(f"Saved property with id '{obj.property_id}' by user '{request.user}'")

class Offer(models.Model):
    """
    Model representing an offer for a real estate property.

    Attributes:
        buyer_broker (ForeignKey): The broker associated with the buyer.
        buyer_name (CharField): The name of the buyer.
        buyer_address (TextField): The address of the buyer.
        buyer_email (EmailField): The email of the buyer.
        property (ForeignKey): The property associated with the offer.
        price_offered (DecimalField): The price offered for the property.
        deed_of_sale_date (DateField): The date of the deed of sale.
        occupancy_date (DateField): The date of occupancy.

    Methods:
        None
    """
    offer_id = models.AutoField(primary_key=True, default= 0)
    buyer_broker = models.ForeignKey(Broker, on_delete=models.CASCADE)
    buyer_name = models.CharField(max_length=100)
    buyer_address = models.TextField()
    buyer_email = models.EmailField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    price_offered = models.DecimalField(max_digits=10, decimal_places=2)
    deed_of_sale_date = models.DateField()
    occupancy_date = models.DateField()

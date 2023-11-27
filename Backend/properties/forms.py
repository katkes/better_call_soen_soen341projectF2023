"""
Module Docstring: Define forms for the properties app.

This module contains the forms used for handling Property and Offer models.
"""

from django import forms
from .models import Property, Offer


class PropertyForm(forms.ModelForm):
    """
    Form for the Property model.

    This form includes fields for price, size, number of bathrooms, and number of bedrooms.
    """

    class Meta:
        """
        Meta class for PropertyForm
        Specifies the Model and fields to be included in the form
        """
        model = Property
        fields = ['price', 'size', 'num_of_bathrooms', 'num_of_bedrooms']


class OfferForm(forms.ModelForm):
    """
    Form for the Offer model.

    This form includes fields for buyer name, buyer address, buyer email,
    price offered, deed of sale date, and occupancy date.
    """

    class Meta:
        """
        Meta class for OfferForm
        Specifies the Model and fields to be included in the form
        """
        model = Offer
        fields = ['buyer_name', 'buyer_email','buyer_broker_id',
                  'price_offered','property_id', 'deed_of_sale_date', 'occupancy_date']

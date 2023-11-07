from django import forms
from .models import Property, Offer


class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = ['name', 'price', 'country', 'rating', 'image']


class OfferForm(forms.ModelForm):
    class Meta:
        model = Offer
        fields = ['buyer_name', 'buyer_address', 'buyer_email',
                  'price_offered', 'deed_of_sale_date', 'occupancy_date']

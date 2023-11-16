from django import forms
from .models import Property, Offer

# offers are stored in properties


# class PropertyForm(forms.ModelForm):
#     class Meta:
#         model = Property
#         fields = ['name', 'price', 'country', 'rating', 'image',
#                   'for_sale', 'square_footage', 'num_of_bedrooms',
#                   'num_of_bathrooms', 'type_of_property']

class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = ['price', 'size','num_of_bathrooms','num_of_bedrooms']

class OfferForm(forms.ModelForm):
    class Meta:
        model = Offer
        fields = ['buyer_name', 'buyer_address', 'buyer_email',
                  'price_offered', 'deed_of_sale_date', 'occupancy_date']

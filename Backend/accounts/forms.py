from django import forms
from .models import CustomUser

class SignUpForm(forms.ModelForm):
    password_confirmation = forms.CharField(widget=forms.PasswordInput(), label="Confirm Password")

    class Meta:
        model = CustomUser
        fields = ['name', 'phone_number', 'email', 'password', 'password_confirmation', 'role']

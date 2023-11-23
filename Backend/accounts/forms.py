"""
Module Docstring: Define forms for the accounts app.

This module contains forms for user authentication and profile update.
"""

from django.core.exceptions import ValidationError
from django import forms
from .models import CustomUser

class SignUpForm(forms.ModelForm):
    """
    Form for user registration.
    """
    password = forms.CharField(widget=forms.PasswordInput())
    password_confirmation = forms.CharField(
        widget=forms.PasswordInput(), label="Confirm Password")

    class Meta:
        """
        Meta Class for SignUpForm
        Specifies the Model and fields to be included in the form
        """
        model = CustomUser
        fields = ['name', 'phone_number', 'email',
                  'password', 'password_confirmation', 'role']


class LoginForm(forms.Form):
    """
    Form for user login.
    """
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())


class UserUpdateForm(forms.ModelForm):
    """
    Form for updating user profile.
    """
    # Assuming your phone numbers are 15 characters or less
    phone_number = forms.CharField(max_length=15)
    class Meta:
        """
        Meta class for UserUpdateForm
        Specifies the Model and fields to be included in the form
        """
        model = CustomUser
        fields = ['email', 'name', 'phone_number', 'role']

    def __init__(self, *args, **kwargs):
        super(UserUpdateForm, self).__init__(*args, **kwargs)
        self.fields['email'].disabled = True  # Prevent updating email

    def clean_phone_number(self):
        """
        Custom validation for phone number.
        """
        phone_number = self.cleaned_data['phone_number']

        # Add your custom phone number validation logic here
        # For example, you might check if the phone number contains only digits
        if not phone_number.isdigit():
            raise ValidationError("Enter a valid phone number.")

        return phone_number

    def clean(self):
        """
        Custom validation for the entire form.
        """
        cleaned_data = super().clean()
        new_email = cleaned_data.get('email')
        current_email = self.instance.email

        # Check if the email is changed
        if new_email != current_email:
            raise ValidationError({"email": "Email cannot be changed."})

        return cleaned_data  # Ensure email remains the same

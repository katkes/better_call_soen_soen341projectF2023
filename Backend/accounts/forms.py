from django import forms
from .models import CustomUser


class SignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    password_confirmation = forms.CharField(
        widget=forms.PasswordInput(), label="Confirm Password")

    class Meta:
        model = CustomUser
        fields = ['name', 'phone_number', 'email',
                  'password', 'password_confirmation', 'role']


class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        # List the fields you want to allow the user to update
        fields = ['email', 'name', 'phone_number', 'role']

    def __init__(self, *args, **kwargs):
        super(UserUpdateForm, self).__init__(*args, **kwargs)
        self.fields['email'].disabled = True  # Prevent updating email

    def clean_email(self):
        return self.instance.email  # Ensure email remains the same

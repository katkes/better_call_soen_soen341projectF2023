"""
Module Docstring: Define models for the accounts app.

This module contains the CustomUser model and related models for the accounts app.
"""

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    """
    Custom manager for the CustomUser model.
    """
    def create_user(self, email, name, phone_number, role, password=None):
        """
        Create a new user.

        Creates and returns a new user with the given email, name, phone_number,
        role, and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            phone_number=phone_number,
            role=role
        )
        user.set_password(password)
        user.save(using=self._db)
        print(f"Hashed password for user {user.email}: {user.password}")
        return user

    def create_superuser(self, email, password):
        """
        Create a new superuser.

        Creates and returns a new superuser with the given email and password.
        """
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            name='Admin',
            phone_number='1234567890',
            role='admin'
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model for the application.
    """
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    role = models.CharField(max_length=20)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class Broker(models.Model):
    """
    Broker model related to CustomUser.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    license_number = models.CharField(max_length=20)
    agency = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.name} - {self.agency}"

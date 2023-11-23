"""
App configuration for the accounts app.

This module defines the app configuration for the 'accounts' app.
"""

from django.apps import AppConfig

class AccountsConfig(AppConfig):
    """
    AppConfig for the 'accounts' app.

    This class provides the configuration for the 'accounts' app,pyt
    including the default auto field and the app name.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

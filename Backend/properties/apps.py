"""
App configuration for the properties app.
"""

from django.apps import AppConfig

class PropertiesConfig(AppConfig):
    """
    Configuration class for the properties app.
    
    Attributes:
        default_auto_field (str): The default auto field for model creation.
        name (str): The name of the app.
    """
    default_auto_field = "django.db.models.BigAutoField"
    name = "properties"

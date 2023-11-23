"""
Module Docstring: for shared function amongst migration files
"""
from django.db import models

def big_auto_field():
    """
    Returns a BigAutoField with specific attributes.

    This function is a utility for creating a BigAutoField with common
    attributes such as auto_created, primary_key, serialize, and verbose_name.

    Returns:
        models.BigAutoField: An instance of BigAutoField.
    """
    return models.BigAutoField(
        auto_created=True,
        primary_key=True,
        serialize=False,
        verbose_name='ID'
    )

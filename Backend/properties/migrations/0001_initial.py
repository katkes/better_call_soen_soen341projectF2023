"""
0001_initial.py - Initial migration for the 'properties' app.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Represents the initial migration for the 'properties' app.
    """

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Property",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("country", models.CharField(max_length=50)),
                ("rating", models.DecimalField(decimal_places=1, max_digits=3)),
                ("image", models.ImageField(upload_to="property_images/")),
            ],
        ),
    ]

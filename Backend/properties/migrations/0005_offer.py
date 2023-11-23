"""
0005_offer.py - Create 'Offer' model migration.
"""

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    """
    Represents the migration to create the 'Offer' model.
    """

    dependencies = [
        ("accounts", "0002_broker"),
        ("properties", "0004_property_assigned_user"),
    ]

    operations = [
        migrations.CreateModel(
            name="Offer",
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
                ("buyer_name", models.CharField(max_length=100)),
                ("buyer_address", models.TextField()),
                ("buyer_email", models.EmailField(max_length=254)),
                ("price_offered", models.DecimalField(decimal_places=2, max_digits=10)),
                ("deed_of_sale_date", models.DateField()),
                ("occupancy_date", models.DateField()),
                (
                    "buyer_broker",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="accounts.Broker",
                    ),
                ),
                (
                    "property",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="properties.Property",
                    ),
                ),
            ],
        ),
    ]

"""
0006_property_for_sale_property_num_of_bathrooms_and_more.py 
- Add fields to the 'Property' model migration.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Represents the migration to add fields to the 'Property' model.
    """

    dependencies = [
        ("properties", "0005_offer"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="for_sale",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="property",
            name="num_of_bathrooms",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="property",
            name="num_of_bedrooms",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="property",
            name="square_footage",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name="property",
            name="type_of_property",
            field=models.CharField(default="House", max_length=50),
        ),
    ]

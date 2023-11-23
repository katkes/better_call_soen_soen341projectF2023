"""
0007_property_size.py - Add 'size' field to the 'Property' model migration.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Represents the migration to add the 'size' field to the 'Property' model.
    """

    dependencies = [
        ('properties', '0006_property_for_sale_property_num_of_bathrooms_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='size',
            field=models.PositiveIntegerField(default=500),
            preserve_default=False,
        ),
    ]

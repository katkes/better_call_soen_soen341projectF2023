"""
0008_remove_property_country_remove_property_name_and_more.py 
- Remove fields and modify fields in the 'Property' model migration.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Represents the migration to remove fields and modify fields in the 'Property' model.
    """

    dependencies = [
        ('properties', '0007_property_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='country',
        ),
        migrations.RemoveField(
            model_name='property',
            name='name',
        ),
        migrations.RemoveField(
            model_name='property',
            name='square_footage',
        ),
        migrations.AddField(
            model_name='property',
            name='city',
            field=models.CharField(default='Dorval', max_length=50),
        ),
        migrations.AlterField(
            model_name='property',
            name='size',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]

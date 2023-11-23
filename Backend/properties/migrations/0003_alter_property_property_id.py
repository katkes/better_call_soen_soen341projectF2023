"""
0003_alter_property_property_id.py - Alter 'property_id' field migration.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Represents the migration to alter the 'property_id' field.
    """

    dependencies = [
        ("properties", "0002_remove_property_id_property_property_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="property_id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]

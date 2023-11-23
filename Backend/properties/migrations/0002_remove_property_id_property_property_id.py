"""
0002_remove_property_id_property_property_id.py 
- Remove 'id' field and add 'property_id' field migration.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Represents the migration to remove the 'id' field and add the 'property_id' field.
    """

    dependencies = [
        ("properties", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="property",
            name="id",
        ),
        migrations.AddField(
            model_name="property",
            name="property_id",
            field=models.AutoField(default=0, primary_key=True, serialize=False),
        ),
    ]

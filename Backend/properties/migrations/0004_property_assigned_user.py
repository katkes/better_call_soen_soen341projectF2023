"""
0004_property_assigned_user.py - Add 'assigned_user' field migration.
"""

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    """
    Represents the migration to add the 'assigned_user' field.
    """

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('properties', '0003_alter_property_property_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='assigned_user',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]

# accounts/migrations/0003_alter_customuser_is_superuser.py
"""
Migration to alter the is_superuser field of CustomUser.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Represents the migration for altering the is_superuser field of CustomUser.
    """

    dependencies = [
        ('accounts', '0002_broker'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='is_superuser',
            field=models.BooleanField(
                default=False,
                help_text=('Designates that this user has all' 
                           'permissions without explicitly assigning them.'),
                verbose_name='superuser status'
            ),
        ),
    ]

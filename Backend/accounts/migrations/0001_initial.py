"""
Migration Module Docstring: Define the initial migration for the accounts app.

This module contains the initial migration for creating the CustomUser model.
"""

from django.db import migrations, models
from utils.__init__ import big_auto_field
class Migration(migrations.Migration):
    """
    Represents the initial migration for the accounts app.
    """

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', big_auto_field()),
                ('password', models.CharField(
                    max_length=128,
                    verbose_name='password'
                )),
                ('last_login', models.DateTimeField(
                    blank=True,
                    null=True,
                    verbose_name='last login'
                )),
                ('is_superuser', models.BooleanField(
                    default=False,
                    help_text=
                    ('Designates that this user has all permissions'
                     'without explicitly assigning them.'),
                    verbose_name='superuser status'
                )),
                ('email', models.EmailField(
                    max_length=254,
                    unique=True
                )),
                ('name', models.CharField(
                    max_length=50
                )),
                ('phone_number', models.CharField(
                    max_length=15
                )),
                ('role', models.CharField(
                    max_length=20
                )),
                ('is_active', models.BooleanField(
                    default=True
                )),
                ('is_staff', models.BooleanField(
                    default=False
                )),
                ('groups', models.ManyToManyField(
                    blank=True,
                    help_text=
                    ('The groups this user belongs to. A user will get all permissions granted '
                    'to each of their groups.'),
                    related_name='user_set',
                    related_query_name='user',
                    to='auth.group',
                    verbose_name='groups'
                )),
                ('user_permissions', models.ManyToManyField(
                    blank=True,
                    help_text=('Specific permissions for this user.'),
                    related_name='user_set',
                    related_query_name='user',
                    to='auth.permission',
                    verbose_name='user permissions'
                )),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

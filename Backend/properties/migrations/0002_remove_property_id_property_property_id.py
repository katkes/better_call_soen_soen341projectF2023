# Generated by Django 4.2.6 on 2023-10-26 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("properties", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="property", name="id",),
        migrations.AddField(
            model_name="property",
            name="property_id",
            field=models.AutoField(default=0, primary_key=True, serialize=False),
        ),
    ]
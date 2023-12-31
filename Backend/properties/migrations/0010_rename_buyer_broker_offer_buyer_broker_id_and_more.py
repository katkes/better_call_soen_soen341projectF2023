# Generated by Django 4.2.7 on 2023-11-27 03:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0009_remove_offer_id_offer_offer_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offer',
            old_name='buyer_broker',
            new_name='buyer_broker_id',
        ),
        migrations.RenameField(
            model_name='offer',
            old_name='property',
            new_name='property_id',
        ),
        migrations.AlterField(
            model_name='property',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=3),
        ),
    ]

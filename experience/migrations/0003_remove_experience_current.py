# Generated by Django 2.2.2 on 2020-08-16 19:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('experience', '0002_experience_country'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='experience',
            name='current',
        ),
    ]

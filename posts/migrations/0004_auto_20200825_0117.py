# Generated by Django 2.2.2 on 2020-08-24 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_auto_20200824_1243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date_published',
            field=models.DateTimeField(auto_now_add=True, verbose_name='date published'),
        ),
        migrations.AlterField(
            model_name='post',
            name='date_updated',
            field=models.DateTimeField(auto_now=True, verbose_name='date updated'),
        ),
    ]
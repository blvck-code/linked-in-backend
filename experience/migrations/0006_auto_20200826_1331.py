# Generated by Django 2.2.2 on 2020-08-26 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experience', '0005_auto_20200821_0934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='end',
            field=models.CharField(max_length=60),
        ),
        migrations.AlterField(
            model_name='experience',
            name='start',
            field=models.CharField(max_length=60),
        ),
    ]

# Generated by Django 2.2.2 on 2020-08-16 19:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job', models.CharField(max_length=60)),
                ('company', models.CharField(max_length=60)),
                ('start', models.DateField()),
                ('end', models.DateField(blank=True, null=True)),
                ('city', models.CharField(blank=True, max_length=60, null=True)),
                ('current', models.BooleanField(blank=True, default=False, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school', models.CharField(max_length=60)),
                ('degree', models.CharField(max_length=60)),
                ('study_field', models.CharField(blank=True, max_length=60, null=True)),
                ('start', models.CharField(max_length=60)),
                ('end', models.CharField(blank=True, max_length=60, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

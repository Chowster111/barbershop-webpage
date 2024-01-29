# Generated by Django 4.1.13 on 2024-01-29 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('btapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Professional',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('availableDate', models.CharField(blank=True, max_length=100)),
                ('price', models.CharField(max_length=10)),
                ('serviceName', models.CharField(max_length=100)),
            ],
        ),
        migrations.DeleteModel(
            name='MyModel',
        ),
    ]

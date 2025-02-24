# Generated by Django 5.1.6 on 2025-02-21 05:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(db_index=True, max_length=254, unique=True),
        ),
        migrations.AddIndex(
            model_name='customuser',
            index=models.Index(fields=['email', 'is_active'], name='accounts_cu_email_d617b5_idx'),
        ),
    ]

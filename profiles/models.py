from django.db import models
from django.conf import settings
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
import random

def upload_profile(instance, filename, *args, **kwargs):
    first_name = str(instance.account.first_name)
    last_name = str(instance.account.last_name)
    filename = filename
    file_path = f'profile_pics/{first_name}{last_name}-{filename}'
    return file_path

def upload_bg(instance, filename, *args, **kwargs):
    first_name = str(instance.account.first_name)
    last_name = str(instance.account.last_name)
    filename = filename
    file_path = f'bg_pics/{first_name}{last_name}-{filename}'
    return file_path


class Profile(models.Model):
    account = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profession = models.CharField(max_length=60, blank=True, null=True)
    slug = models.CharField(unique=True, max_length=30, null=True, blank=True)
    profile_pic = models.TextField(null=True, blank=True)
    bg_pic = models.TextField(null=True, blank=True)
    country = models.CharField(max_length=60, blank=True, null=True)
    location = models.CharField(max_length=60, blank=True, null=True)
    headline = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.account.first_name} {self.account.last_name}'s Profile"


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile(sender, instance=None, created=False, **kwargs):
    if created:
        Profile.objects.create(account=instance)

def get_slug(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = str(instance.account.first_name.replace(" ", "-").lower() + "-" +instance.account.last_name.replace(" ", "-").lower() +str(random.getrandbits(7)))
pre_save.connect(get_slug, sender=Profile)


# @receiver(post_delete, sender=Profile)
# def submission_delete(sender, instance, *args, **kwargs):
#     instance.profile_pic.delete(False)

class Contact(models.Model):
    account = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    devsworld = models.CharField(max_length=250, unique=True, blank=True, null=True)
    website_url = models.URLField(null=True, blank=True)
    website_url_type = models.CharField(max_length=30, null=True, blank=True)
    phone = models.CharField(max_length=60, null=True, blank=True)
    phone_type = models.CharField(max_length=30, null=True, blank=True)
    github_username = models.CharField(max_length=60, blank=True, null=True)
    twitter_username = models.CharField(max_length=60, blank=True, null=True)
    address = models.TextField(null=True, blank=True)
    birthday = models.CharField(max_length=40, null=True, blank=True)

    def __str__(self):
        return f"{self.account.first_name} {self.account.last_name}'s Contacts"

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_contact(sender, instance=None, created=False, **kwargs):
    if created:
        Contact.objects.create(account=instance)

def get_devsworld(sender, instance, *args, **kwargs):
	if not instance.devsworld:
		instance.devsworld = str(f'developers/{instance.account.profile.slug}')
pre_save.connect(get_devsworld, sender=Contact)

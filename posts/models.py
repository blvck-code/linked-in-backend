from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
import random

def upload_location(instance, filename, *args, **kwargs):
    first_name = str(instance.account.first_name)
    last_name = str(instance.account.last_name)
    filename = filename
    file_path = f'post/{first_name}{last_name}/{filename}'
    return file_path

class Post(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.CharField(max_length=200)
    image = models.TextField(null=True, blank=True)
    date_published = models.DateTimeField(auto_now_add=True, verbose_name="date published")
    date_updated = models.DateTimeField(auto_now=True, verbose_name="date updated")
    slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return f"{self.account.first_name} {self.account.last_name}'s Post"

# @receiver(post_delete, sender=Post)
# def submission_delete(sender, instance, **kwargs):
# 	instance.image.delete(False)

def pre_save_blog_post_receiever(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = slugify(instance.account.first_name + "-" +instance.account.last_name +str(random.getrandbits(200)))
pre_save.connect(pre_save_blog_post_receiever, sender=Post)




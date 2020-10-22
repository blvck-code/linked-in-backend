from django.db import models
from django.conf import settings

class Experience(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job = models.CharField(max_length=60, blank=False, null=False)
    employment_type = models.CharField(max_length=60, blank=True, null=True)
    company = models.CharField(max_length=60, blank=True, null=True)
    location = models.CharField(max_length=60, blank=True, null=True)
    date_posted = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    date_updated = models.DateTimeField(auto_now=True, blank=True, null=True)
    # start = models.DateField(blank=False, null=False)
    start = models.CharField(max_length=60, blank=False, null=False)
    end = models.CharField(max_length=60, blank=True, null=True)
    # end = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.account.first_name} {self.account.last_name}'s Experience"

class Education(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    school = models.CharField(max_length=60, blank=False, null=False)
    degree = models.CharField(max_length=60, blank=False, null=False)
    study_field = models.CharField(max_length=60, blank=True, null=True)
    start = models.CharField(max_length=60, blank=False, null=False)
    end = models.CharField(max_length=60, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.account.first_name} {self.account.last_name}'s Education"

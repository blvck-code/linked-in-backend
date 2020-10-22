from django.db import models
from django.conf import settings

class Projects(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.TextField(null=True, blank=True)
    source_code = models.URLField(null=True, blank=True)
    link = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.account.first_name} {self.account.last_name}'s Projects"

class Skills(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    skill = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return f"{self.account.first_name} {self.account.last_name}'s Skills"

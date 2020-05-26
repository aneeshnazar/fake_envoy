from django.db import models

# Create your models here.
from django.utils import timezone

class Patient(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=30)
    description = models.TextField()
    check_in_time = models.DateTimeField(default=timezone.now)
    hash = models.CharField(max_length=512)

    def __repr__(self):
        return f"{self.first_name} {self.last_name} | {self.email} | {self.description} | {self.check_in_time}"
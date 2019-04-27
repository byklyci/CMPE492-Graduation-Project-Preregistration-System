from django.db import models
from django.contrib.auth.models import User


class RegisteredUser(User):
    department = models.CharField(max_length=50)

    def __str__(self):
        return self.first_name.__str__() + " " + self.last_name.__str__()

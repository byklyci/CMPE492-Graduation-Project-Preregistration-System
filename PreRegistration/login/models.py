from django.contrib.auth.models import User
from Courses.models import *
from django.db import models


class RegisteredUser(User):
    department = models.CharField(max_length=50)
    selectedCourses = models.ManyToManyField(Course, blank=True)

    def __str__(self):
        return self.first_name.__str__() + " " + self.last_name.__str__()

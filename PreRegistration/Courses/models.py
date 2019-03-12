from django.db import models

days = (
    (1, 'M'),
    (2, 'T'),
    (3, 'W'),
    (4, 'Th'),
    (5, 'F'),
    (6, 'St'),
    (7, 'Sn'),
)

slots = (
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '5'),
    (6, '6'),
    (7, '7'),
    (8, '8'),
    (9, '9'),
    (10, '10'),
    (11, '11'),
    (12, '12'),
    (13, '13'),
    (14, '14'),
)


class Department(models.Model):
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=120)

    def __str__(self):
        return self.name


class Hours(models.Model):
    hour = models.CharField(max_length=4)

    def __str__(self):
        return self.hour


class Course(models.Model):
    dep = models.ForeignKey(Department, on_delete=models.SET_NULL, blank=True, null=True)
    code_sec = models.CharField(max_length=50)
    hours = models.ManyToManyField(Hours, blank=True)
    course_name = models.CharField(max_length=100)
    instr = models.CharField(max_length=100)
    quota = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.code_sec} | {self.course_name}"

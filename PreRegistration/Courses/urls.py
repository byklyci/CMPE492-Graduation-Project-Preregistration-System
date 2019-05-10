from django.conf.urls import url
from Courses.views import *

urlpatterns = [
    url(r'^getDepartment$', GetDepartment.as_view()),
    url(r'^getCourses$', GetCourses.as_view()),
    url(r'^listCourses/(?P<pk>\w+)$', ListCourses.as_view()),
    url(r'^listCourses$', ListCourses.as_view()),
    url(r'^addCourses$', AddSelectedCourses.as_view()),
    url(r'^selectedCourses$', SelectedCourses.as_view()),
]

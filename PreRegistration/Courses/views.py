from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from bs4 import BeautifulSoup
from rest_framework.response import Response
import requests
from rest_framework.status import *
from .models import *
import re
import textwrap
import time

from Courses import serializers as cs
from Courses import models as cm
from login import models as lm
from login import serializers as ls


class GetDepartment(APIView):

    def get(self, *args, **kwargs):
        file = open("courses.txt", "r")
        file = file.read()
        soup = BeautifulSoup(file, 'html.parser')
        a_tags = soup.find_all('a')
        for a in a_tags:
            dep = Department.objects.filter(name=a.text.strip())
            if not dep.exists():
                dp = Department(
                    name=a.text.strip(),
                    url=a.get('href').strip()
                ).save()

        return Response({"status": "ok"}, status=HTTP_200_OK)
        # page = requests.get('https://registration.boun.edu.tr' + a_tags[0].get('href').strip())
        # print(page.text)
        # soup1 = BeautifulSoup(page.text, 'html.parser')
        # a_tags = soup.find_all('a')


class GetCourses(APIView):

    def get(self, *args, **kwargs):
        start_time = time.time()
        departments = Department.objects.all()
        headurl = 'http://registration.boun.edu.tr/'
        # req = requests.get(headurl+"/scripts/sch.asp?donem=2018/2019-2&kisaadi=ASIA&bolum=ASIAN+STUDIES")
        for dep in departments:
            req = requests.get(headurl + dep.url)
            soup1 = BeautifulSoup(req.text, 'html.parser')
            for tr in soup1.find_all('table')[3].find_all('tr'):
                if tr.get('class')[0] != 'schtitle':
                    course = Course()
                    course.dep = dep
                    code_sec = tr.find_all('td')[0].text.strip()
                    # print(code_sec)  # code sec
                    course.code_sec = code_sec
                    print("-----------")
                    name = tr.find_all('td')[2].text.strip().replace('Ý', 'İ').replace('Ð', 'Ğ').replace('Þ', 'Ş')
                    print(name)  # name
                    course.course_name = name
                    instr = tr.find_all('td')[6].text.strip().replace('Ý', 'İ').replace('Ð', 'Ğ').replace('Þ', 'Ş')
                    print(instr)  # instr
                    course.instr = instr

                    a = re.findall('[A-Z][^A-Z]*', tr.find_all('td')[7].text.strip())  # days
                    # print(f"a: {a}")
                    # print(a.__len__())
                    b = textwrap.wrap(tr.find_all('td')[8].text.strip())  # slots
                    # print(f"b: {b}")
                    course.save()

                    if b.__len__() > 0 and a.__len__() > 0:
                        # print(len(b[0]))
                        # print(f"b[0]: {b[0]}")
                        hours = []
                        cc = len(b[0]) / len(a)
                        if 1 < cc < 2:
                            f = open('test.txt', 'a')
                            f.write(f'{dep.name} - {course.code_sec}\n')

                        elif cc == 1 or cc == 2:
                            for i in range(len(a)):
                                c = textwrap.wrap(b[0], int(cc))  # slots in format
                                # print(f"c: {c}")
                                hours.append(a[i] + c[i])
                                # print(hours[i])
                                hour = Hours.objects.get(hour=hours[i])
                                course.hours.add(hour)

                            course.save()
                    # print(hours)

        print("--- %s seconds ---" % (time.time() - start_time))
        return Response({"status": "ok"}, status=HTTP_200_OK)


class ListCourses(ListAPIView):
    serializer_class = cs.CourseListSerializer

    def get_queryset(self, *args, **kwargs):
        try:
            courses = cm.Course.objects.filter(code_sec__icontains=self.kwargs["pk"]).exclude(code_sec="").exclude(hours__isnull=True)
        except:
            courses = cm.Course.objects.filter().exclude(code_sec="").exclude(hours__isnull=True)
        return courses


class AddSelectedCourses(CreateAPIView):
    serializer_class = cs.CourseListSerializer

    def post(self, request, *args, **kwargs):
        user = lm.RegisteredUser.objects.filter(id=self.request.user.id)
        if user.exists():
            user = user.first()
        else:
            return Response({"Status": "User does not exist."}, status=HTTP_400_BAD_REQUEST)

        if user.selectedCourses.exists():
            user.selectedCourses.clear()

        for c_id in request.data["courses"]:
            course = cm.Course.objects.filter(id=int(c_id)).first()
            user.selectedCourses.add(course)

        user.save()
        serializer = ls.UserSerializer(user)
        return Response(serializer.data, status=HTTP_200_OK)


class SelectedCourses(ListAPIView):
    serializer_class = ls.UserSerializer
    queryset = lm.RegisteredUser.objects.all()

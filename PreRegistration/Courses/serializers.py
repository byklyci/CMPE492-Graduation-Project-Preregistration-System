from rest_framework import serializers

from Courses import models as cm


class CourseListSerializer(serializers.ModelSerializer):
    # hours = serializers.SerializerMethodField()

    class Meta:
        model = cm.Course
        fields = [
            "id",
            "code_sec",
            "course_name",
            "hours"
        ]

import requests

url = "http://127.0.0.1:8000/course/solver"
r = requests.get(url)

response = r.json()

file_ = open("allCourses.txt", "w")
file_.writelines(str(response))
print(type(response))

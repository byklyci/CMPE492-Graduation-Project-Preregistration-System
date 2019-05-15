import sys
import json
import re
from gurobipy import *

f = open("allCourses.txt", "r")
ff = f.readlines()[0]
data = eval(ff)
CourseSelections = dict()
for d in data:
    CourseSelections[str(d["id"])] = []
    for c in d["courses"]:
        CourseSelections[str(d["id"])].append(c["code_sec"])
print(CourseSelections)

NumStudentCourses = dict()
for d in data:
    NumStudentCourses[str(d["id"])] = 7
print(NumStudentCourses)

CourseQuota = dict()
for d in data:
    for c in d["courses"]:
        CourseQuota[str(c["code_sec"])] = 2
print(CourseQuota)

# CourseQuota          = { "cmpe478": 2, "cmpe230": 2, "cmpe160": 4 }
# CourseQuota          = { "CMPE150.04": 2, "CMPE160.01": 2, "CMPE230.01": 3, "CMPE260.01": 2, "BM  554.01": 2, "BM  583.01": 2}
# NumStudentCourses    = { "ali":2, "aliye":2, "veli": 3}

# CourseSelections     = {"ali": ["cmpe478","cmpe230"], "veli": ["cmpe478","cmpe230"],
#                        "aliye": ["cmpe160","cmpe230","cmpe478"] }

try:

    # Create a new model
    model = Model("mip1")

    # Create variables
    x = []
    c2s = {}
    i = 0
    for s in CourseSelections:
        cl = CourseSelections[s]
        for c in cl:
            varname = s + c;
            x.append(model.addVar(vtype=GRB.BINARY, name=varname))
            if c not in c2s:
                c2s[c] = [i]
            else:
                c2s[c].append(i)
            i = i + 1

            # Set objective
    obj = LinExpr();
    for v in x:
        obj += v
    model.setObjective(obj, GRB.MAXIMIZE);

    # Add constraints for NumStudentCourses
    k = 0
    for s in CourseSelections:
        cl = CourseSelections[s]
        cvarlist = [x[i] for i in range(k, k + len(cl))]
        oneconst = [1 for i in range(0, len(cl))]
        constraintexpr = LinExpr(oneconst, cvarlist)
        model.addConstr(constraintexpr <= NumStudentCourses[s])
        k = k + len(cl)

        # Add constraints for CourseQuota
    for c in CourseQuota:
        cl = c2s[c]
        cvarlist = [x[cl[i]] for i in range(0, len(cl))]
        oneconst = [1 for i in range(0, len(cl))]
        constraintexpr = LinExpr(oneconst, cvarlist)
        model.addConstr(constraintexpr <= CourseQuota[c])

        # Optimize model
    model.optimize()

    result = list()
    for v in model.getVars():
        print('%s %g' % (v.varName, v.x))
        if v.x == 1:
            dc = dict()
            id_ = re.search("(\d+)\w+", v.varName).group(1)
            dc["id"] = id_
            # print(id_)
            code_name = v.varName[len(id_):]
            dc["course"] = code_name
            # print(code_name)
            result.append(dc)
    print(result)
    resultr = open("result.txt", "w")
    resultr.writelines(str(result))
    resultr.close()

    print('Obj: %g' % model.objVal)

except GurobiError as e:
    print('Error code ' + str(e.errno) + ": " + str(e))

except AttributeError:
    print('Encountered an attribute error')

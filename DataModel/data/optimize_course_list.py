import json
import re

with open("./opt_course_data.json", encoding='utf-8') as read_file:
    data = json.load(read_file)
for i in data:
    i['full_name'] = str(i['code']) + ' '+i['name']

fo = open("opt_course_data2.json", "w")
fo.write(json.dumps(data))
fo.close()

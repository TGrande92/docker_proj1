import mysql.connector
from pymongo import MongoClient

# MySQL configuration
mydb = mysql.connector.connect(
    host="db",
    user="user1",
    password="password1",
    database="student_grades"
)

# MongoDB configuration
client = MongoClient("mongodb://mongo:27017/")
mongo_db = client["analytics_db"]
mongo_collection = mongo_db["class_averages"]

# Fetch data from MySQL
mycursor = mydb.cursor()
mycursor.execute("SELECT course, AVG(grade) FROM student_grades GROUP BY course")
records = mycursor.fetchall()

# Insert the processed data into MongoDB
for record in records:
    course, average = record
    document = {
        "course": course,
        "average_grade": float(average) 
    }
    mongo_collection.insert_one(document)

print("Data transfer and analytics complete!")

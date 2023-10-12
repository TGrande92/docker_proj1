USE student_grades;

CREATE TABLE student_grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255),
    student_id VARCHAR(100),
    course VARCHAR(255),
    grade DECIMAL(5, 2)
);

INSERT INTO
    student_grades (student_name, student_id, course, grade)
VALUES
    ('John Doe', 'JD001', 'Mathematics', 85.00),
    ('Jane Smith', 'JS002', 'Mathematics', 90.00),
    ('Alice Johnson', 'AJ003', 'Biology', 92.00),
    ('Bob Brown', 'BB004', 'Biology', 78.00),
    ('Charlie White', 'CW005', 'Chemistry', 88.00),
    ('Diana Black', 'DB006', 'Physics', 95.00),
    ('Eve Green', 'EG007', 'Physics', 82.00),
    ('Frank Gray', 'FG008', 'English', 89.00),
    ('Grace Blue', 'GB009', 'English', 93.00),
    ('Harry Red', 'HR010', 'History', 81.00);

GRANT
SELECT
    ON student_grades.* TO 'user1' @'%';

FLUSH PRIVILEGES;

GRANT ALL PRIVILEGES ON *.* TO 'user1' @'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
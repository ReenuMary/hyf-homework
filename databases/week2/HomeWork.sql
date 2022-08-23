USE db_hyf;
INSERT INTO task (title, description, created, updated, due_date, status_id, user_id) VALUES
('Homework', 'Database homework for week2','2021-04-01','2022-08-25','2022-08-25',1,1);
UPDATE task SET title ='MySQL homework' WHERE id =36;
UPDATE task SET due_date ='2022-08-26' WHERE id =36;
UPDATE task 
SET status_id=(SELECT id FROM status WHERE name='In progress' )
WHERE id=36;
UPDATE task SET status_id = (SELECT id FROM status WHERE name='Done') WHERE id=37;
DELETE FROM task WHERE id=38;

#PART3
#Get all the tasks assigned to users whose email ends in @spotify.com
SELECT user_task.user_id ,user.name , user_task.task_id,task.title ,user.email
FROM user_task 
JOIN user ON user_task.user_id = user.id
JOIN task ON user_task.task_id =task.id
WHERE user.email LIKE '%@spotify.com';

#Get all the tasks for 'Donald Duck' with status 'Not started'
SELECT user_task.task_id ,task.title FROM user_task 
JOIN user ON user.id=user_task.user_id
JOIN task ON task.id= user_task.task_id
JOIN status on status.id= task.status_id
WHERE user.name ="Donald Duck"
AND status.name ="Not started";

#Get all the tasks for 'Maryrose Meadows' that were created in september (hint: month(created)=month_number)
SELECT user_task.task_id, task.title FROM user_task 
JOIN task ON user_task.task_id= task.id
JOIN user ON user.id= user_task.user_id
WHERE user.name="Maryrose Meadows"
AND month(created)=9 ;

#Find how many tasks where created in each month
SELECT  MONTHNAME(created) as Month, count(*) AS 'Task count' FROM task GROUP BY Month;
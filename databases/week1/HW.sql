#1.Find out how many tasks are in the task table
USE db_hyf;
SELECT COUNT(*) FROM task;

#2.Find out how many tasks in the task table do not have a valid due date
USE db_hyf;
SELECT * FROM  task WHERE due_date IS NULL;
SELECT COUNT(*) as `Invalid due date task count` FROM  task WHERE due_date IS NULL;

#3Find all the tasks that are marked as done
USE db_hyf;
#SELECT * FROM status;
#SELECT COUNT(*) FROM task GROUP BY status_id;
SELECT task.id as `Task Id`,
		task.title as `Task Title` , 
        task.status_id  as `Status Id` , 
        status.name as `Staus`
FROM  task join status on task.status_id = status.id
WHERE status.name = 'Done'
ORDER BY task.id ;

#4Find all the tasks that are not marked as done
USE db_hyf;
SELECT task.id as `Task Id`,
		task.title as `Task Title` , 
        task.status_id  as `Status Id` , 
        status.name as `Staus`
FROM  task join status on task.status_id = status.id
WHERE status.name != 'Done'
ORDER BY task.id ;

#5Get all the tasks, sorted with the most recently created first
SELECT * FROM task ORDER BY created ASC;

#6Get the single most recently created task
USE db_hyf;
SELECT * FROM task WHERE created IN( SELECT MAX(created) FROM task);

#7Get the title and due date of all tasks where the title or description contains database
USE db_hyf;
SELECT * FROM task;
SELECT `title`,`due_date`,`description` 
FROM task WHERE `description` LIKE '%database%' OR `title` LIKE '%database%';

#8Get the title and status (as text) of all tasks
USE db_hyf;
SELECT CONCAT(task.title, " - ",status.name) AS "text" FROM task
JOIN status ON  task.status_id = status.id;

#9Get the name of each status, along with a count of how many tasks have that status
USE db_hyf;
SELECT status.name as "Status", COUNT(task.status_id) AS "No of tasks" 
FROM status JOIN task ON task.status_id = status.id
GROUP BY task.status_id;

#10Get the names of all statuses, sorted by the status with most tasks first
USE db_hyf;
SELECT status.name as "Status", COUNT(task.status_id) AS "task_count" 
FROM status JOIN task ON task.status_id = status.id
GROUP BY task.status_id ORDER BY task_count  DESC;

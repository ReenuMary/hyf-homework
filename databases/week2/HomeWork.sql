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
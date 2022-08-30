use meal_sharing;

#Get all meals
SELECT * FROM meal;
#Get a meal with any id, fx 1
SELECT * FROM meal WHERE id=2;
#Update a meal with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE meal SET title ='Vegetable Korma', 
description ='This delectable Indian Vegetable Korma recipe is loaded with potatoes, tomatoes, carrots, peas, and green beans. Have plenty of naan to dip!'
WHERE id=9;
#Delete a meal with any id, fx 1
DELETE FROM meal WHERE ID=10;

#Get all reservations
SELECT * FROM reservation;
#Add a new reservation
INSERT INTO `reservation`
 (`number_of_guests`,
 `meal_id`,
 `created_date`,
 `contact_phone_number`,
 `contact_name`,
 `contact_email`)
 VALUES
 (
 3,
 4,
 '2022-08-30',
'(314) 244-6306',
'Nyssa Vazquezr',
'Nyssa.Vazquez@bbmc.com');
#Get a reservation with any id, fx 1
SELECT * FROM reservation WHERE id=1;
#Update a reservation with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE reservation SET number_of_guests= 4 WHERE id=1;
#Delete a reservation with any id, fx 1
DELETE FROM reservation WHERE id=7;

#Get all reviews
SELECT * FROM review;
#Add a new review
INSERT INTO review 
(
title,
description,
meal_id,
stars,
created_date)
values
(
'excellent',
'great food,i liked it',
3,
5,
'2022-09-29');
#Get a review with any id, fx 1
SELECT * FROM review WHERE id=2;
#Update a review with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE review SET title='Bad'  WHERE id=2;
#Delete a review with any id, fx 1
DELETE FROM review WHERE id=8;

#Get meals that has a price smaller than a specific price fx 90
SELECT * FROM meal WHERE price<=200;
#Get meals that still has available reservations
SELECT reservation.meal_id,meal.title, meal.max_reservations ,sum( reservation.number_of_guests) 
FROM reservation
JOIN meal ON 
reservation.meal_id = meal.id
GROUP BY reservation.meal_id;

#Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
SELECT * FROM meal WHERE title LIKE '%chicken%';
#Get meals that has been created between two dates
SELECT * FROM meal WHERE created_date BETWEEN '2022-08-01' AND '2022-08-30';
#Get only specific number of meals fx return only 5 meals
SELECT * FROM meal LIMIT 3;
#Get the meals that have good reviews
SELECT review.meal_id,meal.title,review.stars,COUNT(review.stars) AS 'No of reviews with this rating' FROM review 
JOIN meal ON review.meal_id= meal.id
WHERE review.stars>2
GROUP BY review.stars, review.meal_id;
#Get reservations for a specific meal sorted by created_date
SELECT * FROM reservation 
WHERE meal_id=1
ORDER BY created_date ASC;
#Sort all meals by average number of stars in the reviews
SELECT review.meal_id,meal.title,avg(review.stars) AS 'Average stars', COUNT(review.meal_id) AS 'No of reviews'
 FROM review
 JOIN meal ON review.meal_id =meal.id
GROUP BY review.meal_id
ORDER BY 'Average stars' DESC;
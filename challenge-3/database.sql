-- given the following table definitions, write a query to find the percentage of users who returned to log in within 7 days of their first login
create table logins (
   user_id INT NOT NULL,
   login_date DATE NOT NULL,
   PRIMARY KEY (user_id, login_date)
);


SELECT
 ROUND(100.0 * COUNT(DISTINCT returning.user_id) / COUNT(DISTINCT all_users.user_id), 2) AS percentage_returned
FROM
 (SELECT user_id, MIN(login_date) AS first_login
  FROM logins
  GROUP BY user_id) AS all_users


LEFT JOIN logins AS returning
 ON returning.user_id = all_users.user_id
 AND returning.login_date > all_users.first_login
 AND returning.login_date <= DATE_ADD(all_users.first_login, INTERVAL 7 DAY)


WHERE returning.user_id IS NOT NULL;



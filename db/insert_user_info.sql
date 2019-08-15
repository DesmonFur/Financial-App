INSERT INTO user_info(email,hash)
VALUES(${email}, ${hash})
RETURNING *;

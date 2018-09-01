DROP DATABASE IF EXISTS Games;

CREATE DATABASE Games;

USE Games;

CREATE TABLE users (
  id bigint NOT NULL ,
  PRIMARY KEY (ID)
);

CREATE TABLE games (
  id int NOT NULL ,
  occurances integer NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- INSERT into Games (id, occurances, name) VALUES (1,1,'I am a game!');
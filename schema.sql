-- DROP DATABASE IF EXISTS Games;

-- CREATE DATABASE Games;

USE 'd5nsnjv734jus1';

DROP TABLE if EXISTS users;
CREATE TABLE users (
  id bigint NOT NULL ,
  PRIMARY KEY (ID)
);

DROP TABLE if EXISTS games;
CREATE TABLE games (
  id int NOT NULL ,
  occurances integer NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.*/
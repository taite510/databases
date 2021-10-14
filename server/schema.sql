CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(15),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  id_user INT,
  id_room INT,
  message VARCHAR(200),
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_room) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


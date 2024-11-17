Contact Management System :

# Project Requirements : 

Frontend : Reactjs, css
Backend  : Nodejs , Express
Database : Mysql
IDE      : vs code

# Prequisites :

Install Nodejs, npm before starting project

Download the code from github and open it in vs code,

first set up Backend :
cd backend
npm init -y
npm install express mysql cors nodemon

Next creat database(Mysql)
In Mysql use this code for creating table:

create table contactlist {
id INT NOT NULL AUTO_INCREMENT,
firstname VARCHAR(45) NULL,
lastname VARCHAR(45) NULL,
email VARCHAR(45) NULL,
phone VARCHAR(45) NULL,
company VARCHAR(45) NULL,
jobtitle VARCHAR(45) NULL,
PRIMARY KEY (id));

next start the server.js
npm start
 
now navigate to frontend
npm install
npm run dev

# This project is a contact management system where a user can add the contacts which is necessary. This contacts can be viewd in table structure, it does not allow to add the dublicate contacts by throwing a alert message. The user can update the data in the table and he can delete the contacts as well. It stores the data in the alphabetic order which allows the user to easily find the contacts. I had used MYSQL database where it is easy to implement in these type of projects where the storage of data is not much. Mysql can store the data in table formet which suits the best for this project the user can delete the stored data easily from mysql data base.



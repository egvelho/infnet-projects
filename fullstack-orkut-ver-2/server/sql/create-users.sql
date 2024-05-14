drop table if exists users;
create table users (
  id integer primary key autoincrement,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  avatar varchar(2048) not null,
  passwd varchar(255) not null,
  created_at timestamp default current_timestamp
);
drop table if exists comments;
create table comments (
  id integer primary key autoincrement,
  message text not null,
  created_at timestamp default current_timestamp,
  post_id integer not null references posts(id) on delete cascade,
  user_id integer not null references users(id) on delete cascade
);
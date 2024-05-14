drop table if exists friends;
create table friends (
  id integer primary key autoincrement,
  user_a integer not null references users(id) on delete cascade,
  user_b integer not null references users(id) on delete cascade
);
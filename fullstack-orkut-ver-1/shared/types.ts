export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  passwd: string;
  created_at: string;
  reliable?: number;
  sexy?: number;
  cool?: number;
};

export type Post = {
  id: number;
  message: string;
  created_at: string;
  user_id: number;
  user_first_name: string;
  user_last_name: string;
};

export type Comment = {
  id: number;
  post_id: number;
  created_at: string;
  message: string;
  user_id: number;
  user_first_name: string;
  user_last_name: string;
};

export type Friend = {
  id: number;
  first_name: string;
  last_name: string;
  friends_count: number;
};

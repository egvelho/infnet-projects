export type Notepad = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
};

export type Comment = {
  id: number;
  notepad_id: number;
  created_at: string;
  message: string;
};

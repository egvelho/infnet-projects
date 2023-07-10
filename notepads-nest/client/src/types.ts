export type Notepad = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
  user: number;
};

export type Message = {
  id: number;
  content: string;
  sender: number;
  receiver: number;
  created_at: string;
};

export type NotepadItem = Notepad & { user?: User };

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  userPicture: string | null;
};

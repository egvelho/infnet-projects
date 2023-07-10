import { api } from "./api";
import { Comment } from "../../../shared/types";

type GetCommentsInput = {
  notepad_id: number;
};

type GetCommentsOutput = Comment[];

export async function getNotepadComments({
  notepad_id,
}: GetCommentsInput): Promise<GetCommentsOutput> {
  const res = await api.get(`/notepads/${notepad_id}/comments`);
  const notepads = res.data;
  return notepads;
}

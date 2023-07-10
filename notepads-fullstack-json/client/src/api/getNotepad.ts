import { api } from "./api";
import { Notepad } from "../../../shared/types";

export async function getNotepad(id: number): Promise<Notepad> {
  const res = await api.get(`/notepads/${id}`);
  const notepad = res.data;
  return notepad;
}

import { api } from "./api";
import type { Notepad } from "../types";

export async function getNotepad(id: number): Promise<Notepad> {
  const res = await api.get(`/notepads/${id}`);
  const notepad = res.data;
  return notepad;
}

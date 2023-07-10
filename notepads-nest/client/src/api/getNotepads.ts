import { api } from "./api";
import type { NotepadItem } from "../types";

type GetNotepadsInput = {
  offset?: number;
  limit?: number;
  search?: string | null;
  direction?: string;
  order_by?: string;
};

type GetNotepadsOutput = {
  count: number;
  notepads: NotepadItem[];
};

export async function getNotepads(
  params: GetNotepadsInput = {}
): Promise<GetNotepadsOutput> {
  const res = await api.get("/notepads", {
    params,
  });
  const notepads = res.data;
  return notepads;
}

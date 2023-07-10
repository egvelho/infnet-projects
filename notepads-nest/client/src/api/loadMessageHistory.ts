import { api } from "./api";
import type { Message } from "../types";

export async function loadMessageHistory(
  receiverId: number
): Promise<Message[]> {
  const response = await api.get(`/messages/${receiverId}`);
  return response.data;
}

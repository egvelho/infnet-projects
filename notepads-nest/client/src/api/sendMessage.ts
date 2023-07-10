import { api } from "./api";
import type { Message } from "../types";

export async function sendMessage(
  content: string,
  receiverId: number
): Promise<Message> {
  const response = await api.post(`/messages/${receiverId}`, { content });
  return response.data;
}

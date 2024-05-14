import { api } from "./api";
import { Post } from "../../../shared/types";

export async function getPost(id: number): Promise<Post> {
  const res = await api.get(`/posts/${id}`);
  const post = res.data;
  return post;
}

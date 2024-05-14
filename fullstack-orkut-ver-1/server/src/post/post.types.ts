export type { posts as Post } from "@prisma/client";

export type FindPostsParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

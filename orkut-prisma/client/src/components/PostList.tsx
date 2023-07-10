import { Link } from "react-router-dom";
import type { Post, User } from "../../../shared/types";

export type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div className={`py-4 ${index > 0 && "border-t"}`} key={post.id}>
            <Link
              to={`/usuarios/${post.user_id}`}
              className="flex flex-row items-center cursor-pointer gap-2"
            >
              <img
                src={`https://picsum.photos/200/200?${post.user_id}`}
                className="rounded-full w-10"
              />
              <span className="hover:underline font-bold text-blue-500">
                {post.user_first_name} {post.user_last_name}
              </span>
            </Link>
            <Link to={`/publicacoes/${post.id}`}>
              <time
                dateTime={post.created_at}
                className="text-gray-500 text-sm"
              >
                {new Date(post.created_at).toLocaleDateString()}
              </time>
              <p>{post.message}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

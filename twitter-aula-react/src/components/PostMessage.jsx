import { Link } from "react-router-dom";
import dayjs from "dayjs";

export function PostMessage({ user, post }) {
  return (
    <article className="border border-slate-300 rounded-lg p-4 text-xl">
      <header className="flex gap-2 items-center">
        <Link to={`/u/${user.username}`}>
          <img
            src={user.avatar ?? "/anon.png"}
            alt=""
            className="w-[48px] h-[48px] rounded-full"
          />
        </Link>
        <Link className="text-slate-600" to={`/u/${user.username}`}>
          @{user.username}
        </Link>
      </header>
      <p className="w-full">{post.message}</p>
      <time dateTime={post.createdAt} className="text-slate-600 text-sm">
        {dayjs(post.createdAt).fromNow()}
      </time>
    </article>
  );
}

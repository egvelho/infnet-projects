import { Link } from "react-router-dom";

export function BaseUsersPage({ users }) {
  return (
    <div className="p-4 m-auto md:max-w-screen-lg">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              to={`/u/${user.username}`}
              className="flex items-center gap-2 p-3 border rounded-lg"
            >
              <img
                src={user.avatar ?? "/anon.png"}
                className="w-[72px] rounded-full bg-slate-100"
              />
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">@{user.username}</span>
                <span className="font-bold">
                  {user.name} {user.surname}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

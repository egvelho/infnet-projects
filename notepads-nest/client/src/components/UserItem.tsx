import type { User } from "../types";
import { loadUserPicture } from "../loadUserPicture";

export type UserItemProps = {
  user: User;
};

export function UserItem({ user }: UserItemProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <img
        src={loadUserPicture(user.userPicture)}
        className="rounded-full w-8"
      />
      <span className="font-bold text-lg text-blue-500 hover:underline hover:text-blue-600">
        {user.name} {user.surname}
      </span>
    </div>
  );
}

import useAxios from "axios-hooks";
import { BaseUsersPage } from "../components/BaseUsersPage";

const initialUsers = [];

export function ViewUsersPage() {
  const [{ data: users = initialUsers }] = useAxios("/users");

  return <BaseUsersPage users={users} />;
}

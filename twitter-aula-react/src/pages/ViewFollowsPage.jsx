import useAxios from "axios-hooks";
import { useEffect } from "react";
import { BaseUsersPage } from "../components/BaseUsersPage";
import { useParams } from "react-router-dom";

const initialUsers = [];

export function ViewFollowsPage() {
  const userId = useParams().userId;
  const [{ data: users = initialUsers }, loadFollows] = useAxios(
    `/follows/${userId}`,
    { manual: true }
  );

  useEffect(() => {
    loadFollows();
  }, []);

  return <BaseUsersPage users={users} />;
}

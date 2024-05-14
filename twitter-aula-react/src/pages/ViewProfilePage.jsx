import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { BaseProfilePage } from "../components/BaseProfilePage";
import { initialUser } from "../useGlobalStore";

export function ViewProfilePage() {
  const username = useParams().username;
  const [{ data: user = initialUser }, loadUser] = useAxios(
    `/users/${username}`
  );
  return <BaseProfilePage viewMode={true} user={user} loadUser={loadUser} />;
}

import { BaseProfilePage } from "../components/BaseProfilePage";
import { useGlobalStore } from "../useGlobalStore";

export function ProfilePage() {
  const user = useGlobalStore((state) => state.user);
  return <BaseProfilePage user={user} viewMode={false} loadUser={() => {}} />;
}

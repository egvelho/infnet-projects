import { CoolInfo } from "../user-info/CoolInfo";
import { ReliableInfo } from "../user-info/ReliableInfo";
import { SexyInfo } from "../user-info/SexyInfo";
import { Card } from "../Card";
import type { User } from "../../../../shared/types";

export type PersonalityCardProps = {
  user: User;
};

export function PersonalityCard({ user }: PersonalityCardProps) {
  const fullName = `${user.first_name} ${user.last_name}`;
  return (
    <Card>
      <h2 className="font-bold text-2xl pb-1">{fullName}</h2>
      <div className="flex flex-row gap-8 border-t pt-1">
        {user.reliable !== undefined && (
          <ReliableInfo reliable={user.reliable} />
        )}
        {user.cool !== undefined && <CoolInfo cool={user.cool} />}
        {user.sexy !== undefined && <SexyInfo sexy={user.sexy} />}
      </div>
    </Card>
  );
}

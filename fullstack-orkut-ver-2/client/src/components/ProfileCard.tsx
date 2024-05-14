import { Card } from "./Card";

export function ProfileCard({ first_name, last_name }) {
  return (
    <Card>
      <h2 className="text-2xl font-bold">
        {first_name} {last_name}
      </h2>
    </Card>
  );
}

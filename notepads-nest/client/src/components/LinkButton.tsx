import { Link } from "react-router-dom";

export type LinkButtonProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export function LinkButton({ to, children, className }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`bg-green-400 hover:bg-green-500 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
}

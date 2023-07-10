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
      className={`bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-md uppercase font-bold font-[VT323] text-xl shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
}

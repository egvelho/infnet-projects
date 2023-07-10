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
      className={`bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
}

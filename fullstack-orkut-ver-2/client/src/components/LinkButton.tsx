import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
};

export function LinkButton({ children, to, className = "" }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`bg-blue-400 hover:bg-blue-600 text-slate-50 font-bold uppercase py-1 px-3 rounded-md ${className}`}
    >
      {children}
    </Link>
  );
}

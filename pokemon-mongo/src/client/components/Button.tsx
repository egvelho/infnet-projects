export type ButtonProps = {
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export function Button({ onClick, children, type, className }: ButtonProps) {
  return (
    <button
      className={`bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-md uppercase font-bold font-[VT323] text-xl shadow-lg ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

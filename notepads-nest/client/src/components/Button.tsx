export type ButtonProps = {
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export function Button({ onClick, children, type, className }: ButtonProps) {
  return (
    <button
      className={`bg-green-400 hover:bg-green-500 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

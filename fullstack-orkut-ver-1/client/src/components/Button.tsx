export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
};

export function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      className={`bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-blue-500 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg disabled:bg-gray-400 disabled:hover:bg-gray-500 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

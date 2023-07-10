export type ErrorMessageProps = {
  children: React.ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
  return <span className="text-sm leading-tight text-red-500">{children}</span>;
}

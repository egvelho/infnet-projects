export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg p-2 ${className}`}>{children}</div>
  );
}

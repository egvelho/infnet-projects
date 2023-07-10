export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white p-4 w-full rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
}

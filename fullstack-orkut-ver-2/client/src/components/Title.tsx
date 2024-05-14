type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Title({ children, className = "" }: TitleProps) {
  return <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>;
}

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Title({ children, className = "" }: TitleProps) {
  return (
    <h1 className={`text-4xl font-bold font-[VT323] ${className}`}>
      {children}
    </h1>
  );
}

export type TitleProps = {
  children?: React.ReactNode;
};

export function Title({ children }: TitleProps) {
  return (
    <h1 className="dark:text-white text-center text-2xl font-bold my-4">
      {children}
    </h1>
  );
}

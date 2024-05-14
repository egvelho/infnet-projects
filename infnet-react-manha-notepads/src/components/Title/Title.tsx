import style from "./Title.module.css";

export type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps) {
  return <h1 className={style.title}>{children}</h1>;
}

import style from "./Card.module.css";

export type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return <div className={style.card}>{children}</div>;
}

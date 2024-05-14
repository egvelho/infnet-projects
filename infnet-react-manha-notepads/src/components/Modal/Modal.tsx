import style from "./Modal.module.css";

export type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onRequestClose: () => void;
};

export function Modal({ children, open, onRequestClose }: ModalProps) {
  function callOnRequestClose() {
    onRequestClose();
  }

  if (!open) {
    return null;
  }

  return (
    <div className={style.modal}>
      <div className={style.backdrop} onClick={callOnRequestClose} />
      <div className={style.content}>{children}</div>
    </div>
  );
}

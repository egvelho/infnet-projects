export type ErrorToastProps = {
  message?: React.ReactNode;
};

export function ErrorToast({ message }: ErrorToastProps) {
  return (
    <span className="text-sm m-1 py-1 px-4 rounded-xl bg-red-300 text-red-600 leading-tight">
      {message}
    </span>
  );
}

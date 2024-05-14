type TextFieldProps = {
  textoPadrao: string;
  valor: string;
  tipo?: string;
  quandoMudar?: (valor: string) => void;
};

export function TextField({
  textoPadrao,
  valor,
  tipo = "text",
  quandoMudar,
}: TextFieldProps) {
  return (
    <input
      placeholder={textoPadrao}
      value={valor}
      type={tipo}
      className="border rounded-lg outline-none focus:border-green-500 py-1 px-2"
      onChange={(event) => quandoMudar(event.target.value)}
    />
  );
}

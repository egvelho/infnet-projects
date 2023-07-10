import { useState } from "react";

export function ContadorRoute() {
  const [contador, setContador] = useState(1);

  return (
    <div className="m-1">
      <button
        className="bg-red-500 font-bold rounded-lg p-1 text-white w-10"
        onClick={() => {
          const contadorDecrementado = contador - 1;
          setContador(contadorDecrementado);
        }}
      >
        -
      </button>
      <input type="text" value={contador} className="p-1 rounded-lg mx-1" />
      <button
        className="bg-green-500 font-bold rounded-lg p-1 text-white w-10"
        onClick={() => {
          const contadorIncrementado = contador + 1;
          setContador(contadorIncrementado);
        }}
      >
        +
      </button>
    </div>
  );
}

export function ConsoleForm({ onSubmit, titleText, form, setForm }) {
  return (
    <form className="create-console-form" onSubmit={onSubmit}>
      <h1 className="title">{titleText}</h1>
      <fieldset>
        <input
          type="text"
          className="text-field"
          placeholder="Nome do console"
          value={form.nomeDoConsole}
          onChange={(event) =>
            setForm({ ...form, nomeDoConsole: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <input
          type="text"
          className="text-field"
          placeholder="Nome da desenvolvedora"
          value={form.desenvolvedora}
          onChange={(event) =>
            setForm({ ...form, desenvolvedora: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <input
          type="text"
          className="text-field"
          placeholder="Ano de lançamento"
          value={form.anoDeLancamento}
          onChange={(event) =>
            setForm({ ...form, anoDeLancamento: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <input
          type="text"
          className="text-field"
          placeholder="Título mais famoso do console"
          value={form.tituloMaisFamoso}
          onChange={(event) =>
            setForm({ ...form, tituloMaisFamoso: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <button type="submit" className="button">
          Enviar
        </button>
      </fieldset>
    </form>
  );
}

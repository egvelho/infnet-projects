export function Header() {
  return (
    <header className="header">
      <div className="header-avatar">
        <img src="https://picsum.photos/200?a" alt="" />
      </div>
      <div className="header-name">egvelho</div>
      <div className="header-metrics">
        <span>15 publicações</span>
        <span>81 seguidores</span>
        <span>86 seguindo</span>
      </div>
      <div className="header-bio">
        <span className="name">Eduardo Velho</span>
        <p>
          Professor universitário e pesquisador. Bolsista de doutorado do CNPq
          no PPG em Processos e Manifestações Culturais da Universidade Feevale.
        </p>
        <a href="https://eduardovelho.com">eduardovelho.com</a>
      </div>
    </header>
  );
}

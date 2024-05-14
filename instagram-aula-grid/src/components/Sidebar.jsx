import { IoHomeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt="Logo do Instagram"
        />
      </div>
      <ul className="sidebar-links">
        <li>
          <IoHomeOutline size="24px" /> <span>Página inicial</span>
        </li>
        <li>
          <FaSearch size="24px" /> <span>Pesquisa</span>
        </li>
        <li>
          <FaRegCompass size="24px" />
          <span>Explorar</span>
        </li>
      </ul>
    </aside>
  );
}

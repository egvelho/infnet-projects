import { MdSearch } from "react-icons/md";
import styles from "./AppBar.module.css";
import { FaCircleUser } from "react-icons/fa6";
import { IconButton } from "../../components/IconButton/IconButton";
import { YouTubeLogo } from "../../components/YouTubeLogo";
import { SearchBar } from "../../components/SearchBar";
import { IconButton as MuiIconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrawerState } from "../useDrawerState";

function onClickButton() {
  alert("Clicou no botão!");
}

export function AppBar() {
  return (
    <header className={styles["app-bar"]}>
      <LogoDiv />
      <SearchBarDiv />
      <ActionsDiv />
    </header>
  );
}

function LogoDiv() {
  const toggleDrawer = useDrawerState((state) => state.toggle);

  function onClickToggleDrawer() {
    toggleDrawer();
  }

  return (
    <div className="flex gap-2">
      <MuiIconButton
        onClick={onClickToggleDrawer}
        sx={{
          "@media (prefers-color-scheme: dark)": {
            color: "var(--text-color-dark-theme)",
          },
        }}
      >
        <MenuIcon />
      </MuiIconButton>
      <YouTubeLogo />
    </div>
  );
}

function SearchBarDiv() {
  return (
    <div className="hidden md:block flex-1 max-w-lg">
      <SearchBar />
    </div>
  );
}

function ActionsDiv() {
  return (
    <div className="flex gap-1">
      <IconButton onClick={onClickButton} className="md:hidden">
        <MdSearch />
      </IconButton>

      <IconButton onClick={onClickButton}>
        <FaCircleUser />
      </IconButton>
    </div>
  );
}

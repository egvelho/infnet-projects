import "@fontsource/roboto";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { AppBar } from "./layout/AppBar/AppBar";
import { Drawer } from "./layout/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { useDrawerState } from "./layout/useDrawerState";

function App() {
  const drawerOpen = useDrawerState((state) => state.open);

  return (
    <div>
      <CssBaseline />
      <AppBar />
      <Drawer />
      <main style={{ marginLeft: drawerOpen ? 240 : undefined }}>
        <HomePage />
      </main>
    </div>
  );
}

export default App;

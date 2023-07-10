import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { LoadAuthTrainer } from "./components/LoadAuthTrainer";
import { PokeStoreRoute } from "./routes/PokeStoreRoute";
import { TrainerRoute } from "./routes/TrainerRoute";
import { BattleRoute } from "./routes/BattleRoute";
import { SignInRoute } from "./routes/SignInRoute";
import { SignUpRoute } from "./routes/SignUpRoute";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <AppBar />
        <LoadAuthTrainer />
        <Routes>
          <Route path="/" element={<SignInRoute />} />
          <Route path="/criar-conta" element={<SignUpRoute />} />
          <Route path="/treinador" element={<TrainerRoute />} />
          <Route path="/loja" element={<PokeStoreRoute />} />
          <Route path="/batalhar/:pokemonName" element={<BattleRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

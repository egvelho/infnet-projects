import { AppBar } from "./AppBar";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="flex flex-col w-full h-full">
      <AppBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

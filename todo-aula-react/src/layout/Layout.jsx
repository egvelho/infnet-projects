import { AppBar } from "./AppBar";

export function Layout({ children }) {
  return (
    <>
      <AppBar />
      <main>{children}</main>
    </>
  );
}

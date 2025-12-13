import { Outlet } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <header>header</header>
      <div>
        <Outlet />
      </div>
      <footer>footer</footer>
    </div>
  );
}

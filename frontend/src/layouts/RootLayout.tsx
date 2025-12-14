import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <Footer />
    </div>
  );
}

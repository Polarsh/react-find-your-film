import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className=" min-h-screen flex flex-col bg-gray-950 text-white">
      <header>Header</header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Find Your Film — Proyecto de portafolio
      </footer>
    </div>
  );
}

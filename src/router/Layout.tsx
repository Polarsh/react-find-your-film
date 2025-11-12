import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-1 w-full container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

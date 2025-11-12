import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold">
          Find Your Film
        </Link>
      </nav>
    </header>
  );
}

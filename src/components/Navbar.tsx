import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const base =
  "relative px-1 py-1 transition-colors text-body font-content hover:text-gray-300";
const active =
  "text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-cinder-soft";
const inactive = "text-gray-300/80";

export default function Navbar() {
  const { t } = useTranslation();

  const links = [
    { label: t("NAV.HOME"), to: "/" },
    { label: t("NAV.EXPLORE"), to: "/explore" },
    { label: t("NAV.MOVIES"), to: "/movies" },
    { label: t("NAV.SERIES"), to: "/series" },
    { label: t("NAV.FAVORITES"), to: "/favorites" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + enlaces */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className="font-heading text-h2 font-bold text-white">
            Find Your Film
          </NavLink>

          <div className="flex items-center gap-4">
            {links.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }>
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Search + Language */}
        <div className="flex gap-4 items-center">
          <SearchBar />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}

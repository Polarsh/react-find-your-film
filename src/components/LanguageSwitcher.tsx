import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language.startsWith("es") ? "es" : "en";

  const toggleLang = () => {
    const next = currentLang === "en" ? "es" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 rounded px-2 py-2 text-sm text-cinder-light hover:bg-cinder-mid cursor-pointer transition-colors"
      aria-label="Cambiar idioma">
      <BiWorld />
      <span className="font-medium uppercase">{currentLang}</span>
    </button>
  );
}

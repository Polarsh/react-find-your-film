import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

export default function SearchBar() {
  const { t } = useTranslation();

  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    console.log("Buscando:", value);
  };

  const clear = () => setQuery("");

  return (
    <div className="flex gap-2 items-center rounded p-2 text-body font-content text-white focus-within:ring-2 bg-cinder-dark focus-within:ring-cinder-mid transition">
      <FaMagnifyingGlass className="h-5 w-5 text-cinder-soft" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={t("SEARCH.PLACEHOLDER")}
        className="w-40 md:w-64 bg-transparent outline-none text-cinder-light"
      />
      {query && (
        <button type="button" onClick={clear}>
          <FaXmark className="h-5 w-5 text-cinder-soft cursor-pointer" />
        </button>
      )}
    </div>
  );
}

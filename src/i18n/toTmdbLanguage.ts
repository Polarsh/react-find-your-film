const FALLBACK = "en-US";

const EXPLICIT_MAP: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
};

export function toTmdbLanguage(lngRaw?: string): string {
  const lng = (lngRaw ?? "").toLowerCase();
  if (lng && EXPLICIT_MAP[lng]) return EXPLICIT_MAP[lng];

  // intentamos normalizar "ll-cc" -> "ll-CC"
  if (lng.includes("-")) {
    const [ll, cc] = lng.split("-");
    return `${ll}-${cc.toUpperCase()}`;
  }

  // sin región: usamos el mapa por idioma base o fallback
  return EXPLICIT_MAP[lng] ?? FALLBACK;
}

export function toTmdbRegion(lngRaw?: string): string | undefined {
  const lng = (lngRaw ?? "").toLowerCase();
  const parts = lng.split("-");
  return parts[1] ? parts[1].toUpperCase() : undefined; // "en-US" -> "US"
}

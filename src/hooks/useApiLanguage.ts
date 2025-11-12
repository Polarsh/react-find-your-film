import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toTmdbLanguage, toTmdbRegion } from "../i18n/toTmdbLanguage";

export function useApiLanguage() {
  const { i18n } = useTranslation();
  const language = useMemo(
    () => toTmdbLanguage(i18n.language),
    [i18n.language]
  );
  const region = useMemo(() => toTmdbRegion(i18n.language), [i18n.language]);
  return { language, region };
}

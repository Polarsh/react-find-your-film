import { useEffect, useState } from "react";

/** Devuelve el número de columnas según los breakpoints definidos en Tailwind */
export function useResponsiveCols() {
  // columnas por breakpoint: base=2, md=3, lg=4, xl=5
  const [cols, setCols] = useState(2);

  useEffect(() => {
    // Tus breakpoints: md=45rem (720px), lg=67.5rem (1080px), xl=90rem (1440px)
    const mqMd = window.matchMedia("(min-width: 45rem)");
    const mqLg = window.matchMedia("(min-width: 67.5rem)");
    const mqXl = window.matchMedia("(min-width: 90rem)");

    const compute = () => {
      if (mqXl.matches) setCols(5);
      else if (mqLg.matches) setCols(4);
      else if (mqMd.matches) setCols(3);
      else setCols(2);
    };

    compute();

    // suscribirse a cambios
    mqMd.addEventListener?.("change", compute);
    mqLg.addEventListener?.("change", compute);
    mqXl.addEventListener?.("change", compute);

    return () => {
      mqMd.removeEventListener?.("change", compute);
      mqLg.removeEventListener?.("change", compute);
      mqXl.removeEventListener?.("change", compute);
    };
  }, []);

  return cols;
}

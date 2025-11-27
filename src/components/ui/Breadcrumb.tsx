import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface BreadcrumbDataItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  breadcrumbData: BreadcrumbDataItem[];
}

export default function Breadcrumb({ breadcrumbData }: BreadcrumbProps) {
  const { t } = useTranslation();

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full py-3 text-sm text-neutral-300 font-content">
      <ol className="flex items-center gap-2 flex-wrap">
        {/* Home */}
        <li>
          <Link
            to="/"
            className="text-neutral-200 hover:text-secondary-main transition-colors">
            {t("NAV.HOME")}
          </Link>
        </li>

        {breadcrumbData.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {/* Separator */}
            <span className="text-neutral-500">/</span>

            {/* Link or static text */}
            {item.url ? (
              <Link
                to={item.url}
                className="text-neutral-200 hover:text-secondary-main transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-neutral-400">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

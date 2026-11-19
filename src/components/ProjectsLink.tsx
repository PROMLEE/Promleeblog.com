import Link from "next/link";
import { projectMessages } from "@/lib/i18n/projects";
import { localizePath, type Locale } from "@/lib/i18n/routing";

export default function ProjectsLink({ locale }: { locale: Locale }) {
  const t = projectMessages[locale];

  return (
    <Link
      href={localizePath("/projects", locale)}
      className="hover:bg-button/90 hover:text-background focus-visible:bg-button/90 focus-visible:text-background inline-flex items-center rounded-md px-3 py-1.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {t.menu}
    </Link>
  );
}

import { localizePath, englishLabel, type Locale } from "@/lib/i18n/routing";
import { categoryLabel } from "@/lib/i18n/messages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import dayjs from "dayjs";
import Link from "next/link";

export const BreadCrumb = ({
  params,
  locale = "ko",
}: {
  params: PostResponse.GetPost["data"];
  locale?: Locale;
}) => {
  // const dateString = dayjs(params.init_date)
  //   .locale("ko")
  //   .format("YYYY년 MM월 DD일");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-text hover:font-bold" asChild>
            <Link
              href={localizePath(
                `/blog/${params.Series.Subject.Category.url}`,
                locale,
              )}
            >
              {locale === "ko"
                ? params.Series.Subject.Category.nameko
                : categoryLabel(params.Series.Subject.Category.url, locale) ||
                  englishLabel(params.Series.Subject.Category.url)}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={localizePath(
              `/blog/${params.Series.Subject.Category.url}/${params.Series.Subject.url}`,
              locale,
            )}
            className="hover:text-text hover:font-bold"
          >
            {locale === "ko"
              ? params.Series.Subject.nameko
              : englishLabel(params.Series.Subject.url)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={localizePath(
              `/blog/${params.Series.Subject.Category.url}/${params.Series.Subject.url}#${locale === "ko" ? params.Series.nameko : englishLabel(params.Series.url)}`,
              locale,
            )}
            className="hover:text-text hover:font-bold"
          >
            {locale === "ko"
              ? params.Series.nameko
              : englishLabel(params.Series.url)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-text font-bold">
            {params.nameko}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

import { localizePath, type Locale } from "@/lib/i18n/routing";
import { taxonomyName } from "@/lib/i18n/taxonomy";
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
                : taxonomyName(params.Series.Subject.Category, locale)}
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
              : taxonomyName(params.Series.Subject, locale)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={localizePath(
              `/blog/${params.Series.Subject.Category.url}/${params.Series.Subject.url}#series-${params.Series.id}`,
              locale,
            )}
            className="hover:text-text hover:font-bold"
          >
            {locale === "ko"
              ? params.Series.nameko
              : taxonomyName(params.Series, locale)}
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

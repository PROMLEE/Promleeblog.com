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
}: {
  params: PostResponse.GetPost["data"];
}) => {
  // const dateString = dayjs(params.init_date)
  //   .locale("ko")
  //   .format("YYYY년 MM월 DD일");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:font-bold hover:text-text" asChild>
            <Link href={`/blog/${params.Series.Subject.Category.url}`}>
              {params.Series.Subject.Category.nameko}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/blog/${params.Series.Subject.Category.url}/${params.Series.Subject.url}`}
            className="hover:font-bold hover:text-text"
          >
            {params.Series.Subject.nameko}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/blog/${params.Series.Subject.Category.url}/${params.Series.Subject.url}#${params.Series.nameko}`}
            className="hover:font-bold hover:text-text"
          >
            {params.Series.nameko}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-text">
            {params.nameko}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

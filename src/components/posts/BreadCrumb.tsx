import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { urlParams } from "@/config/types/types";
import dayjs from "dayjs";
import Link from "next/link";

export const BreadCrumb = ({
  params,
  date,
}: {
  params: urlParams;
  date: Date;
}) => {
  const dateString = dayjs(date).locale("ko").format("YYYY년 MM월 DD일");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/blog/${params.category}`}
            className="hover:font-bold hover:text-text"
            asChild
          >
            <Link href={`/blog/${params.category}`}>{params.category}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/blog/${params.category}/${params.subject}`}
            className="hover:font-bold hover:text-text"
          >
            {params.subject}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-text">
            {params.post}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <div className={"ml-auto text-right"}>{"📅 " + dateString}</div>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

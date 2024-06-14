import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { urlParams } from "@/config/types";
import { CategoryKo } from "@/config/koname";
import dayjs from "dayjs";

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
          >
            {CategoryKo[params.category].name.split("(")[0]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/blog/${params.category}/${params.subject}`}
            className="hover:font-bold hover:text-text"
          >
            {CategoryKo[params.category].sub[params.subject].name.split("(")[0]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />{" "}
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/blog/${params.category}/${params.subject}/${params.title}`}
            className="hover:font-bold hover:text-text"
          >
            {
              CategoryKo[params.category].sub[params.subject].title[
                params.title
              ].name.split("(")[0]
            }
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-text">
            {
              CategoryKo[params.category].sub[params.subject].title[
                params.title
              ].content[params.content].name.split("(")[0]
            }
          </BreadcrumbPage>
        </BreadcrumbItem>
        <div className={"ml-auto text-right"}>
          {"📅 " +
            CategoryKo[params.category].sub[params.subject].title[params.title]
              .content[params.content].date}
        </div>
        {/* <div className={"ml-auto text-right"}>📅 {dateString}</div> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";

const LeftSidebarComp = ({ menuclose }: { menuclose: any }) => {
  // const toc = parseToc(content.content);
  const [value, setValue] = useState("");
  const [list, setList]: any[] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/links`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setList(data.data);
      });
  }, []);
  return (
    <div className="related leftsidebar xl:leftsidebar-md md:hidden xl:block">
      <Accordion collapsible type="single" data-state value={value}>
        {list.map((category: any, index: number) => {
          return (
            <AccordionItem
              value={category.nameko}
              key={index}
              className="border-foreground p-2 hover:bg-primary"
            >
              <AccordionTrigger
                onClick={() => {
                  value === category.nameko
                    ? setValue("")
                    : setValue(category.nameko);
                }}
              >
                {category.nameko}
              </AccordionTrigger>
              <AccordionContent className="p-0">
                {category.Subject.map((subject: any, index: any) => {
                  return (
                    <Link
                      href={`/blog/${category.url}/${subject.url}`}
                      key={index}
                    >
                      <AccordionItem
                        value={subject.nameko}
                        key={index}
                        className="m-0 p-2 pb-0 hover:bg-secondary"
                      >
                        {subject.nameko}
                      </AccordionItem>
                    </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
        {/* <AccordionItem value="item-1">
          <AccordionTrigger>컴퓨터 공학</AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>컴퓨터 공학</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default LeftSidebarComp;

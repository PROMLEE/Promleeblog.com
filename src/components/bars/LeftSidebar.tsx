"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { ViewCheck } from "./viewCheck";

const LeftSidebarComp = ({ menuclose }: { menuclose?: any }) => {
  const [value, setValue] = useState("");
  // const [list, setList]: any[] = useState([
  //   { nameko: "개발", Subject: [] },
  //   { nameko: "개인학습", Subject: [] },
  //   { nameko: "기타", Subject: [] },
  // ]);
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/links`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setList(data.data);
  //     });
  // }, []);
  return (
    <div className="related leftsidebar block md:hidden xl:block">
      {/* <Accordion collapsible type="single" data-state value={value}>
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
                      onClick={() => {
                        setValue("");
                        menuclose();
                      }}
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
      </Accordion> */}
    </div>
  );
};

export default LeftSidebarComp;

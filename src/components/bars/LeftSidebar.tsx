"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { PostService } from "@/config/apis";
// import { ViewCheck } from "./viewCheck";

const LeftSidebarComp = ({ menuclose }: { menuclose?: () => void }) => {
  const [value, setValue] = useState("");
  const [list, setList] = useState<PostResponse.GetLinks["data"]>([]);
  useEffect(() => {
    PostService()
      .getLinks()
      .then((data) => {
        setList(data);
      });
  }, []);
  return (
    <div className="related leftsidebar block md:hidden xl:block">
      <Accordion collapsible type="single" data-state value={value}>
        {list.map((category, index) => {
          return (
            <AccordionItem
              value={category.nameko}
              key={index}
              className="border-foreground hover:bg-primary p-2"
            >
              <AccordionTrigger
                onClick={() => {
                  if (value === category.nameko) {
                    setValue("");
                  } else {
                    setValue(category.nameko);
                  }
                }}
                className="hover:bg-primary cursor-pointer text-lg font-bold"
              >
                {category.nameko}
              </AccordionTrigger>
              <AccordionContent className="cursor-pointer p-0">
                {category.Subject.map((subject, index) => {
                  return (
                    <Link
                      href={`/blog/${category.url}/${subject.url}`}
                      key={index}
                      onClick={() => {
                        setValue("");
                        if (menuclose) {
                          menuclose();
                        }
                      }}
                    >
                      <AccordionItem
                        value={subject.nameko}
                        key={index}
                        className="hover:bg-secondary m-0 cursor-pointer p-2 pb-0"
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
      </Accordion>
    </div>
  );
};

export default LeftSidebarComp;

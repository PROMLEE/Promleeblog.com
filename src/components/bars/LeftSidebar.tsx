"use client";

import Link from "next/link";
import {} from // Accordion,
// AccordionContent,
// AccordionItem,
// AccordionTrigger,
"@/components/ui/accordion";
import { useState, useEffect } from "react";
import { MainService } from "@/config/apis";
// import { usePathname } from "next/navigation";

const LeftSidebarComp = () => {
  // const [value, setValue] = useState("");
  // const [list, setList] = useState<PostResponse.GetLinks["data"]>([]);
  const [recommend, setRecommend] = useState<MainResponse.GetRecommend["data"]>(
    [],
  );
  // const pathname = usePathname();
  // useEffect(() => {
  //   PostService()
  //     .getLinks()
  //     .then((data) => {
  //       setList(data);
  //     });
  // }, []);

  useEffect(() => {
    MainService()
      .getRecommend({ take: 10 })
      .then((data) => {
        setRecommend(data);
      });
  }, []);

  return (
    <div className="related leftsidebar block md:hidden xl:block">
      {/* <Accordion collapsible type="single" data-state value={value}>
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
      </Accordion> */}
      <div className="mt-4 px-2">
        <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
          추천 포스트
        </h2>
        <div className="flex flex-col">
          {recommend.map((post, index) => (
            <Link
              href={`/blog/post/${post.id}-${post.url}`}
              key={index}
              className="group relative rounded-lg p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-start gap-2">
                <span className="flex h-6 w-6 items-center justify-center text-sm font-semibold text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
                  {index + 1}
                </span>
                <p className="line-clamp-2 text-xs text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
                  {post.nameko}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarComp;

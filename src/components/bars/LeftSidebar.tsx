import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryKo } from "@/config/koname";

const LeftSidebarComp = () => {
  // const toc = parseToc(content.content);
  return (
    <div className="related leftsidebar xl:leftsidebar-md md:hidden xl:block">
      <Accordion type="multiple">
        {Object.keys(CategoryKo).map((key, index) => {
          const name = CategoryKo[key].name.split("(")[0];
          return (
            <AccordionItem
              value={name}
              key={index}
              className="border-white p-2 hover:bg-slate-800"
            >
              <AccordionTrigger>{name}</AccordionTrigger>
              {Object.keys(CategoryKo[key].sub).map((subKey, index) => {
                const subName = CategoryKo[key].sub[subKey].name.split("(")[0];
                return (
                  <AccordionContent key={index} className="p-0">
                    <Accordion type="multiple">
                      <AccordionItem
                        value={subName}
                        className="m-0 border-slate-400 p-2 pb-0 hover:bg-slate-600"
                      >
                        <AccordionTrigger key={index} className="text-md py-3">
                          {subName}
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                          <Accordion type="multiple">
                            <AccordionItem
                              value={subName}
                              className="border-slate-600 p-2"
                            >
                              {Object.keys(
                                CategoryKo[key].sub[subKey].title,
                              ).map((titleKey, index) => {
                                const titleName =
                                  CategoryKo[key].sub[subKey].title[titleKey]
                                    .name;
                                return (
                                  <Link
                                    href={`/blog/${key}/${subKey}/${titleKey}`}
                                    key={index}
                                    className="text-xs"
                                  >
                                    <AccordionItem
                                      value={titleName}
                                      key={index}
                                      className=" border-none p-2  pb-0 hover:bg-slate-400 hover:font-bold hover:text-black"
                                    >
                                      {titleName}
                                    </AccordionItem>
                                  </Link>
                                );
                              })}
                            </AccordionItem>
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </AccordionContent>
                );
              })}
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

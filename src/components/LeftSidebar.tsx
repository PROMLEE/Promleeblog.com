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
            <AccordionItem value={name} key={index}>
              <AccordionTrigger>{name}</AccordionTrigger>
              {Object.keys(CategoryKo[key].sub).map((subKey, index) => {
                const subName = CategoryKo[key].sub[subKey].name.split("(")[0];
                return (
                  <AccordionContent key={index}>
                    <Accordion type="multiple">
                      <AccordionItem value={subName}>
                        <AccordionTrigger key={index}>
                          {subName}
                        </AccordionTrigger>
                        <AccordionContent>
                          <Accordion type="multiple">
                            <AccordionItem value={subName}>
                              {Object.keys(
                                CategoryKo[key].sub[subKey].title,
                              ).map((titleKey, index) => {
                                const titleName =
                                  CategoryKo[key].sub[subKey].title[titleKey]
                                    .name;
                                return (
                                  <AccordionItem value={titleName} key={index}>
                                    <Link
                                      href={`/blog/${key}/${subKey}/${titleKey}`}
                                      key={index}
                                    >
                                      {titleName}
                                    </Link>
                                  </AccordionItem>
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

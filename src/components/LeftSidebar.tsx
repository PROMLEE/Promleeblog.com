import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LeftSidebarComp = () => {
  // const toc = parseToc(content.content);
  return (
    <div className="related md:leftsidebar-md xl:right-5 ">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
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
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LeftSidebarComp;

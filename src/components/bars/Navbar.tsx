"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { DarkmodeButton } from "@/components/buttons/Darkmodebutton";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Indicator from "@/components/bars/Scrollindicator";
import { PostService } from "@/config/apis";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Navbar = () => {
  const [value, setValue] = useState("");
  const [menu, setMenu] = useState(false);
  const [list, setList] = useState<PostResponse.GetLinks["data"]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    PostService()
      .getLinks()
      .then((data) => {
        setList(data);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 메뉴가 열려있고, 클릭된 요소가 메뉴 영역이나 메뉴 버튼이 아닐 때만 메뉴를 닫음
      if (
        menu &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenu(false);
        setValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  const menuclose = () => {
    setMenu(false);
    setValue("");
  };

  return (
    <>
      <div className={"topbar"}>
        <Link
          href={"/"}
          className={
            "hover:bg-button hover:text-background ml-2 rounded-lg p-1 text-2xl font-bold hover:cursor-pointer"
          }
        >
          PromleeBlog
        </Link>
        <div className="flex items-center gap-2">
          {list.map((category, index) => {
            return (
              <Menubar
                key={index}
                className={"hidden border-none bg-transparent md:block"}
              >
                <MenubarMenu>
                  <MenubarTrigger
                    className={
                      "hover:bg-button hover:text-background focus:bg-button focus:text-background data-[state=open]:bg-button data-[state=open]:text-background rounded-md font-bold hover:cursor-pointer"
                    }
                  >
                    {category.nameko}
                  </MenubarTrigger>
                  <MenubarContent>
                    {category.Subject.map((subject, index) => {
                      return (
                        <Link
                          href={`/blog/${category.url}/${subject.url}`}
                          key={index}
                        >
                          <MenubarItem className="text-text cursor-pointer">
                            {subject.nameko}
                          </MenubarItem>
                        </Link>
                      );
                    })}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            );
          })}
        </div>
        <div className="flex content-center items-center">
          {process.env.NODE_ENV === "development" && (
            <>
              <Link
                href={"/blog/edit"}
                className="hover:bg-button hover:text-background cursor-pointer rounded-lg p-2"
              >
                edit
              </Link>
              <Link
                href={"/test"}
                className="hover:bg-button hover:text-background cursor-pointer rounded-lg p-2"
              >
                test
              </Link>
            </>
          )}
          <Link
            href={"/sitemap-tree"}
            className="hover:bg-button hover:text-background cursor-pointer rounded-lg p-2"
          >
            sitemap
          </Link>
          <Link
            href={"/aboutme"}
            className="hover:bg-button hover:text-background ml-2 cursor-pointer rounded-lg p-2"
          >
            aboutMe
          </Link>
          <Button
            ref={buttonRef}
            onClick={() => {
              setMenu(!menu);
            }}
            className={
              "bg-button text-button-foreground hover:bg-button-foreground hover:text-button ml-2 cursor-pointer md:hidden"
            }
          >
            Menu
          </Button>
          <DarkmodeButton />
        </div>
      </div>
      <Indicator />
      {menu && (
        <div
          ref={menuRef}
          className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed inset-x-0 top-[33px] z-50 max-h-[calc(100vh-64px)] overflow-y-auto border-t backdrop-blur md:hidden"
        >
          <Accordion type="single" collapsible value={value}>
            {list.map((category, index) => (
              <AccordionItem key={index} value={category.nameko}>
                <AccordionTrigger
                  onClick={() => {
                    setValue(value === category.nameko ? "" : category.nameko);
                  }}
                  className="px-4 hover:no-underline"
                >
                  {category.nameko}
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {category.Subject.map((subject, index) => (
                    <Link
                      key={index}
                      href={`/blog/${category.url}/${subject.url}`}
                      onClick={() => {
                        setValue("");
                        menuclose();
                      }}
                      className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-6 py-2 text-sm transition-colors"
                    >
                      {subject.nameko}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </>
  );
};

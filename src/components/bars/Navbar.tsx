"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { DarkmodeButton } from "@/components/buttons/Darkmodebutton";
import { CategoryKo } from "@/config/koname";
import LeftSidebarComp from "@/components/bars/LeftSidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const menuclose = () => {
    setMenu(false);
  };
  return (
    <>
      <div className={"topbar"}>
        <Link
          href={"/"}
          className={
            "ml-2 rounded-lg p-1 text-2xl font-bold hover:cursor-pointer hover:bg-button hover:text-background"
          }
        >
          PromleeBlog
        </Link>
        <div className="flex items-center gap-2">
          {Object.keys(CategoryKo).map((key, index) => {
            const name = CategoryKo[key].name.split("(")[0];
            return (
              <Menubar
                key={index}
                className={
                  "hidden rounded-none border-none bg-transparent hover:bg-button hover:text-background md:block"
                }
              >
                <MenubarMenu>
                  <MenubarTrigger
                    className={
                      "rounded-none font-bold hover:cursor-pointer  hover:bg-button hover:text-background "
                    }
                  >
                    {name}
                  </MenubarTrigger>
                  <MenubarContent>
                    {Object.keys(CategoryKo[key].sub).map((subKey, index) => {
                      const subName =
                        CategoryKo[key].sub[subKey].name.split("(")[0];
                      return (
                        <MenubarSub key={index}>
                          <MenubarSubTrigger
                            key={index}
                            className={" text-white hover:cursor-pointer "}
                          >
                            {subName}
                          </MenubarSubTrigger>
                          <MenubarSubContent>
                            {Object.keys(CategoryKo[key].sub[subKey].title).map(
                              (titleKey, index) => {
                                const titleName =
                                  CategoryKo[key].sub[subKey].title[titleKey]
                                    .name;
                                return (
                                  <Link
                                    href={`/blog/${key}/${subKey}/${titleKey}`}
                                    key={index}
                                  >
                                    <MenubarItem>{titleName}</MenubarItem>
                                  </Link>
                                );
                              },
                            )}
                          </MenubarSubContent>
                        </MenubarSub>
                      );
                    })}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            );
          })}
        </div>
        <div className="flex content-center items-center">
          <Link
            href={"/sitemap"}
            className="rounded-lg p-2 hover:bg-button hover:text-background"
          >
            sitemap
          </Link>
          <Link
            href={"/aboutme"}
            className="ml-2 rounded-lg p-2 hover:bg-button hover:text-background"
          >
            aboutMe
          </Link>
          <Button
            onClick={() => {
              setMenu(!menu);
            }}
            className={
              "ml-2 bg-button text-button-foreground hover:bg-button-foreground hover:text-button md:hidden"
            }
          >
            Menu
          </Button>
          <DarkmodeButton />
        </div>
      </div>
      <div className={`${menu ? "visible" : "hidden"} xl:block`}>
        <LeftSidebarComp menuclose={menuclose} />
      </div>
    </>
  );
};
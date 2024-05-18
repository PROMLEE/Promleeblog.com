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
import { DarkmodeButton } from "@/components/Darkmodebutton";
import { CategoryKo } from "@/config/koname";

export const Navbar = () => {
  return (
    <div className={"topbar"}>
      <Link
        href={"/"}
        className={
          "m-5 rounded-lg bg-white p-1 text-black hover:bg-black hover:text-white"
        }
      >
        PromleeBlog
      </Link>
      <Link
        href={"/blog"}
        className={"text-2xl text-black hover:text-amber-700 dark:text-white"}
      >
        Categories
      </Link>
      <DarkmodeButton />
      {Object.keys(CategoryKo).map((key, index) => {
        const name = CategoryKo[key].name.split("(")[0];
        return (
          <Menubar key={index}>
            <MenubarMenu>
              <MenubarTrigger>{name}</MenubarTrigger>
              <MenubarContent>
                {Object.keys(CategoryKo[key].sub).map((subKey, index) => {
                  const subName =
                    CategoryKo[key].sub[subKey].name.split("(")[0];
                  return (
                    <MenubarSub key={index}>
                      <MenubarSubTrigger key={index}>
                        {subName}
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        {Object.keys(CategoryKo[key].sub[subKey].title).map(
                          (titleKey, index) => {
                            const titleName =
                              CategoryKo[key].sub[subKey].title[titleKey].name;
                            return (
                              <MenubarItem key={index}>
                                <Link
                                  href={`/blog/${key}/${subKey}/${titleKey}`}
                                >
                                  {titleName}
                                </Link>
                              </MenubarItem>
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

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Find and Replace</MenubarItem>
                <MenubarItem>Find and Replace</MenubarItem>
                <MenubarItem>Find and Replace</MenubarItem>
                <MenubarItem>Find and Replace</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

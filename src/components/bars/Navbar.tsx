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
import LeftSidebarComp from "@/components/bars/LeftSidebar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Indicator from "@/components/bars/Scrollindicator";
import { PostService } from "@/config/apis";
// import Image from "next/image";
// import { supabase } from "@/lib/Supabase/supabase_client";

// const getData = async () => {
//   const { data }: { data: any } = await supabase
//     .from("Category")
//     .select(`*, Subject!inner(nameko, url)`)
//     .order("id", { ascending: true });
//   console.log(data);
//   return data;
// };

export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [list, setList] = useState<PostResponse.GetLinks["data"]>([]);
  useEffect(() => {
    PostService()
      .getLinks()
      .then((data) => {
        setList(data);
      });
  }, []);

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
          {list.map((category, index) => {
            return (
              <Menubar
                key={index}
                className={"hidden border-none bg-transparent md:block"}
              >
                <MenubarMenu>
                  <MenubarTrigger
                    className={
                      "rounded-md font-bold hover:cursor-pointer hover:bg-button hover:text-background focus:bg-button focus:text-background data-[state=open]:bg-button data-[state=open]:text-background"
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
                          <MenubarItem className="cursor-pointer text-text">
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
                className="rounded-lg p-2 hover:bg-button hover:text-background"
              >
                edit
              </Link>
              <Link
                href={"/test"}
                className="rounded-lg p-2 hover:bg-button hover:text-background"
              >
                test
              </Link>
              <Link
                href={"/api-doc"}
                className="rounded-lg p-2 hover:bg-button hover:text-background"
              >
                api-doc
              </Link>
            </>
          )}
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
      <Indicator />
      <div className={`${menu ? "visible" : "hidden"} xl:hidden`}>
        <LeftSidebarComp menuclose={menuclose} />
      </div>
    </>
  );
};

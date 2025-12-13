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
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

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
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  // 호버 애니메이션 조절을 위한 스프링 설정
  const hoverSpring = { type: "spring", stiffness: 400, damping: 17 } as const;

  return (
    <>
      <motion.div
        className="topbar top-0 z-20 px-2 py-1 shadow-md backdrop-blur-md"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={hoverSpring}
        >
          <Link
            href={"/"}
            className="group relative ml-2 flex items-center overflow-hidden rounded-lg px-3 py-1.5 text-2xl font-bold hover:cursor-pointer"
          >
            <span className="from-button relative z-10 bg-gradient-to-r to-blue-200 bg-clip-text text-transparent">
              PromleeBlog
            </span>
            <span className="bg-button/10 absolute inset-0 z-0 scale-0 transform rounded-lg transition-transform duration-200 ease-in-out group-hover:scale-100"></span>
          </Link>
        </motion.div>
        <div className="flex items-center gap-4">
          {list.map((category, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={hoverSpring}
              >
                <Menubar
                  className={"hidden border-none bg-transparent md:block"}
                >
                  <MenubarMenu>
                    <MenubarTrigger className="group relative rounded-md px-3 py-2 font-bold hover:cursor-pointer">
                      <span className="relative z-10">{category.nameko}</span>
                      <span className="bg-button absolute bottom-0 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"></span>
                    </MenubarTrigger>
                    <MenubarContent className="border-border/20 bg-background/80 animate-in fade-in-50 zoom-in-95 rounded-lg border p-1 shadow-lg backdrop-blur-md">
                      {category.Subject.map((subject, index) => {
                        return (
                          <Link
                            href={`/blog/${category.url}/${subject.url}`}
                            key={index}
                          >
                            <MenubarItem className="hover:bg-button/90 hover:text-background/90 cursor-pointer rounded-md px-4 py-2 text-sm transition-colors duration-200">
                              {subject.nameko}
                            </MenubarItem>
                          </Link>
                        );
                      })}
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </motion.div>
            );
          })}
        </div>
        <div className="flex content-center items-center gap-2">
          {process.env.NODE_ENV === "development" && (
            <>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={hoverSpring}
              >
                <Link
                  href={"/blog/edit"}
                  className="group relative inline-flex items-center overflow-hidden rounded-lg px-3 py-1.5"
                >
                  <span className="group-hover:text-background relative z-10 transition-colors duration-200">
                    edit
                  </span>
                  <span className="bg-button/0 group-hover:bg-button/90 absolute inset-0 z-0 rounded-md transition-colors duration-300"></span>
                </Link>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={hoverSpring}
              >
                <Link
                  href={"/test"}
                  className="group relative inline-flex items-center overflow-hidden rounded-lg px-3 py-1.5"
                >
                  <span className="group-hover:text-background relative z-10 transition-colors duration-200">
                    test
                  </span>
                  <span className="bg-button/0 group-hover:bg-button/90 absolute inset-0 z-0 rounded-md transition-colors duration-300"></span>
                </Link>
              </motion.div>
            </>
          )}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={hoverSpring}
          >
            <Link
              href={"/sitemap-tree"}
              className="group relative inline-flex items-center overflow-hidden rounded-lg px-3 py-1.5"
            >
              <span className="group-hover:text-background relative z-10 transition-colors duration-200">
                sitemap
              </span>
              <span className="bg-button/0 group-hover:bg-button/90 absolute inset-0 z-0 rounded-md transition-colors duration-300"></span>
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={hoverSpring}
          >
            <Link
              href={"/aboutme"}
              className="group relative inline-flex items-center overflow-hidden rounded-lg px-3 py-1.5"
            >
              <span className="group-hover:text-background relative z-10 transition-colors duration-200">
                aboutMe
              </span>
              <span className="bg-button/0 group-hover:bg-button/90 absolute inset-0 z-0 rounded-md transition-colors duration-300"></span>
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={hoverSpring}
          >
            <Button
              ref={buttonRef}
              onClick={() => {
                setMenu(!menu);
              }}
              className="bg-button text-button-foreground hover:bg-button-foreground hover:text-button ml-2 flex cursor-pointer items-center gap-1 rounded-lg px-3 shadow-sm md:hidden"
            >
              <Menu size={16} />
              <span>Menu</span>
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={hoverSpring}
            className="flex items-center"
          >
            <DarkmodeButton />
          </motion.div>
        </div>
      </motion.div>
      <Indicator />
      {menu && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-background/20 fixed inset-x-0 top-[32px] z-50 max-h-[calc(100vh-64px)] overflow-y-auto backdrop-blur md:hidden"
        >
          <Accordion
            type="single"
            collapsible
            value={value}
            className="divide-border/30 divide-y"
          >
            {list.map((category, index) => (
              <AccordionItem
                key={index}
                value={category.nameko}
                className="border-none"
              >
                <AccordionTrigger
                  onClick={() => {
                    setValue(value === category.nameko ? "" : category.nameko);
                  }}
                  className="hover:bg-button/15 data-[state=open]:bg-button/10 px-5 py-4 text-base font-medium transition-colors hover:no-underline data-[state=open]:font-semibold"
                >
                  {category.nameko}
                </AccordionTrigger>
                <AccordionContent className="px-2 py-3">
                  {category.Subject.map((subject, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="mb-1 last:mb-0"
                    >
                      <Link
                        href={`/blog/${category.url}/${subject.url}`}
                        onClick={() => {
                          setValue("");
                          menuclose();
                        }}
                        className="bg-background/50 hover:bg-button hover:text-background mx-4 my-2 block rounded-md px-5 py-3 text-base font-medium shadow-sm transition-all duration-200"
                      >
                        {subject.nameko}
                      </Link>
                    </motion.div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}
    </>
  );
};

"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const items = [
  { label: "☀️", value: "light" },
  { label: "🌙", value: "dark" },
  { label: "🖥️", value: "system" },
];

export const DarkmodeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  /**
   * 책의 정보를 나타내는 함수입니다.
   * @constructor
   * @param {string} title - 책의 제목
   * @param {string} author - 책의 저자
   */
  const Item = ({ label, value }: { label: string; value: string }) => (
    <DropdownMenuItem
      onClick={() => {
        setTheme(value);
      }}
      className="flex items-center gap-2"
    >
      {label} {value}
    </DropdownMenuItem>
  );
  return (
    <div className="ml-3 mr-10 flex h-full content-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-hidden h-full text-lg">
          {theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "🖥️"}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-3">
          {items.map((items) => {
            return (
              <Item key={items.value} label={items.label} value={items.value} />
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};


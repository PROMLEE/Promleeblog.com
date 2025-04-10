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
  const Item = ({ label, value }: { label: string; value: string }) => (
    <DropdownMenuItem
      onClick={() => {
        setTheme(value);
      }}
      className="flex cursor-pointer items-center gap-2"
    >
      {label} {value}
    </DropdownMenuItem>
  );
  return (
    <div className="mr-10 ml-3 flex h-full content-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full cursor-pointer text-lg outline-hidden">
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

"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

export const DarkmodeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const Item = ({ label }: any) => (
    <DropdownMenuItem onClick={() => setTheme(label)}>
      <div className="flex items-center gap-2">{label}</div>
      {theme === label}
    </DropdownMenuItem>
  );
  return (
    <div className="ml-auto flex h-full content-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full pr-3 text-2xl">
          ☀️
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Item label="light" />
          <Item label="dark" />
          <Item label="system" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

const DarkmodeButton = () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger>☀️</DropdownMenuTrigger>
      <DropdownMenuContent>
        <Item label="light" />
        <Item label="dark" />
        <Item label="system" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DarkmodeButton;

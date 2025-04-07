"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export const ViewStats = () => {
  const [views, setViews] = useState<{ total: number; today: number } | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/main/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setViews(data))
      .catch((err) => console.error("Failed to load views", err));
  }, []);

  return (
    <div className="border-secondary flex w-full flex-col items-center border-t border-b py-5 font-bold">
      View📈
      <div className="flex w-full justify-center gap-4">
        <Link href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko">
          <Badge className="flex h-10 flex-1 cursor-help items-center justify-center rounded-sm bg-transparent">
            Total: {views?.total}
          </Badge>
        </Link>
        <Link href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko">
          <Badge className="flex h-10 flex-1 cursor-help items-center justify-center rounded-sm bg-transparent">
            Today: {views?.today}
          </Badge>
        </Link>
      </div>
    </div>
  );
};

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export const ViewStats = () => {
  const [views, setViews] = useState<{ total: number; today: number } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/main/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setViews(data);
        // Add a small delay before hiding the welcome message for smoother transition
        setTimeout(() => setIsLoading(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to load views", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="border-secondary relative border-b py-4 text-center">
      {/* Welcome message that fades out */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1500 ${
          isLoading ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="text-center font-semibold whitespace-pre-wrap text-gray-800 dark:text-gray-100">
          Welcome to{"\n"}
          <span className="text-blue-600 dark:text-blue-300">
            ✨ Promlee Blog ✨
          </span>
        </div>
      </div>

      {/* Stats that fade in */}
      <div
        className={`transition-opacity duration-1500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-100">
          View 📈
        </p>
        <div className="flex justify-center gap-3 text-sm">
          <Link
            href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge className="bg-blue-50 text-blue-700 transition-colors duration-150 hover:bg-blue-100 dark:bg-blue-900/10 dark:text-blue-200 dark:hover:bg-blue-800/20">
              Total: {views?.total ?? "-"}
            </Badge>
          </Link>
          <Link
            href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge className="bg-blue-50 text-blue-700 transition-colors duration-150 hover:bg-blue-100 dark:bg-blue-900/10 dark:text-blue-200 dark:hover:bg-blue-800/20">
              Today: {views?.today ?? "-"}
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

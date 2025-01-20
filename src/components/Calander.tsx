"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  return (
    <Calendar
      mode="default"
      selected={new Date()}
      className="flex w-full items-center justify-center"
    />
  );
}

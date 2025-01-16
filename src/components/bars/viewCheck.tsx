import { totalViews, todayViews } from "@/lib/gaData";
import { Badge } from "../ui/badge";
import Link from "next/link";

export const ViewCheck = () => {
  const totalView = totalViews();
  const todayView = todayViews();
  return (
    <div className="my-4 flex gap-4">
      <Link href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko">
        <Badge className="flex h-10 flex-1 cursor-help items-center justify-center rounded-sm bg-button-foreground">
          Total: {totalView}
        </Badge>
      </Link>
      <Link href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko">
        <Badge className="flex h-10 flex-1 cursor-help items-center justify-center rounded-sm bg-button-foreground">
          Today: {todayView}
        </Badge>
      </Link>
    </div>
  );
};

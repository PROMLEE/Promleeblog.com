import { totalViews, todayViews } from "@/lib/gaData";
import { Badge } from "../ui/badge";
import Link from "next/link";

export const ViewCheck = () => {
  const totalView = totalViews();
  const todayView = todayViews();
  return (
    <div className="flex w-full flex-col items-center border-b border-t border-secondary py-5 font-bold">
      View📈
      <div className="flex w-full justify-center gap-4">
        <Link href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko">
          <Badge className="flex h-10 flex-1 cursor-help items-center justify-center rounded-sm bg-transparent">
            Total: {totalView}
          </Badge>
        </Link>
        <Link href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=ko">
          <Badge className="flex h-10 flex-1 cursor-help items-center justify-center rounded-sm bg-transparent">
            Today: {todayView}
          </Badge>
        </Link>
      </div>
    </div>
  );
};

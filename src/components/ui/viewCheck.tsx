import { totalViews, todayViews } from "@/lib/gaData";

export const ViewCheck = () => {
  const totalView = totalViews();
  const todayView = todayViews();
  return (
    <div>
      <br /> total: {totalView}
      <br /> today: {todayView}
    </div>
  );
};

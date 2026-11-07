import Home from "@/components/pages/Home";
import { pageMetadata } from "@/lib/i18n/metadata";
export function generateMetadata() {
  return pageMetadata("ko", "/");
}
export default function Page() {
  return <Home locale="ko" />;
}

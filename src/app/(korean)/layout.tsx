import SiteLayout from "@/components/SiteLayout";
export { metadata } from "@/components/SiteLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="ko">{children}</SiteLayout>;
}

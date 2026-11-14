import type { Metadata } from "next";
import { ProjectsDirectory } from "@/components/ProjectsShowcase";

export const metadata: Metadata = {
  title: "내가 만든 서비스 | PromleeBlog",
  description:
    "포트리듬, Promecapt, PromeFTP. 직접 만든 자산관리, macOS 화면 캡처, SSH·SFTP 도구를 소개합니다.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsDirectory />;
}

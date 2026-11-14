import { ProjectsDirectory } from "@/components/ProjectsShowcase";
import { pageMetadata } from "@/lib/i18n/metadata";
import { projectMessages } from "@/lib/i18n/projects";

export const metadata = pageMetadata("ko", "/projects", {
  title: projectMessages.ko.title,
  description: projectMessages.ko.intro,
});

export default function ProjectsPage() {
  return <ProjectsDirectory locale="ko" />;
}

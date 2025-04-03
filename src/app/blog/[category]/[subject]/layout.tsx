import { PostService } from "@/config/apis";
import { GenerateMeta } from "@/lib/PostUtils/GenerateMeta_category";

type Params = Promise<{ category: string; subject: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category, subject } = await params;
  const source = await PostService().getSeriesList({ subjecturl: subject });
  if (!source) {
    return { title: "404 Not Found", description: "Page not found." };
  } else {
    return GenerateMeta({ meta: source, params: { category, subject } });
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mb-20">{children}</section>;
}

import { Metadata } from "next";
import { GenerateMeta } from "@/utils/PostUtils/GenerateMeta_category";

type Props = {
  params: params;
};

interface params {
  category: string;
  subject: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const source = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/serieslist?subjecturl=${params.subject}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return GenerateMeta({ meta: source, params });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="mb-20">{children}</section>;
}

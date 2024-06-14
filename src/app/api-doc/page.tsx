import { getApiDocs } from "@/utils/swagger";
import ReactSwagger from "../../components/react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return <ReactSwagger spec={spec} url="/swagger.json" />;
}

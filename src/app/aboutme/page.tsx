import Image from "next/image";
import { Contact } from "../../components/aboutme/Contact";
import { AboutMe } from "../../components/aboutme/AboutMe";
import { Skills } from "../../components/aboutme/Skills";
import { Projects } from "../../components/aboutme/Projects";
import { Exprience } from "../../components/aboutme/Exprience";

export default function App() {
  return (
    <div
      className={
        "prose my-10 flex flex-col items-center dark:prose-invert md:px-20"
      }
    >
      <div className="w-full">
        <h1>👨‍💻이동훈 | 도전을 두려워 않는 개발자</h1>
        <div className="flex flex-wrap gap-4">
          <div className="relative mb-10 w-2/5">
            <Image
              src="https://avatars.githubusercontent.com/u/80230701?v=4?s=400"
              alt="profile_image"
              width={1000}
              height={1000}
              className="rounded-full border"
            />
          </div>
          <Contact />
        </div>
      </div>
      <br />
      <AboutMe />
      <br />
      <Skills />
      <br />
      <Projects />
      <br />
      <Exprience />
    </div>
  );
}

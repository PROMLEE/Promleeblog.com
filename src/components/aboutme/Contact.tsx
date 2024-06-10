import Image from "next/image";

export const Contact = () => {
  return (
    <div className="w-2/5">
      <h2>Contact &amp; Channels</h2>
      <hr />
      <ul>
        <li>
          <strong>Email | </strong>donghoon099@naver.com
        </li>
        <li>
          <div className="flex flex-wrap gap-2">
            <strong>Github | </strong>
            <a
              href={"https://github.com/PROMLEE"}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="https://github.com/fluidicon.png"
                alt="git"
                width={30}
                height={10}
                priority
                className="m-0 mr-2 inline-block"
              />
              PROMLEE
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

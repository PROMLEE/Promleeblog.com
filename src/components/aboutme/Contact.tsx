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
              className="flex items-center gap-1"
            >
              <div className="relative h-5 w-5">
                <Image
                  src="https://github.com/fluidicon.png"
                  alt="git"
                  fill
                  className="m-0"
                />
              </div>
              PROMLEE
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

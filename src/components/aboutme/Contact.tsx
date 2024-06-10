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
            <a href="https://github.com/PROMLEE" className="flex gap-2">
              <Image
                src="https://github.com/fluidicon.png"
                alt="git"
                width={30}
                height={30}
                priority
                className="m-0"
              />
              <div>https://github.com/PROMLEE</div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

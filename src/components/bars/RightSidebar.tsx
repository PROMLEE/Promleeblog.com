import Link from "next/link";

const parseToc = (content: string) => {
  const regex = /^(#|##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replaceAll("# ", "").replaceAll("#", ""),
      link:
        "#" +
        heading
          .replace("# ", "")
          .replace("#", "")
          .replace(/[\[\]:!@#$/%^&*()+=,.'"]/g, "")
          .replace(/ /g, "-")
          .toLowerCase()
          .replace("?", ""),
      indent: heading.match(/#/g)?.length || 2,
    })) || []
  );
};

const RightSidebarComp = ({ content }: { content: string }) => {
  const toc = parseToc(content);
  return (
    <div className="related md:sidebar-md mb-10 border-y-2 py-3 md:mb-0 md:border-none xl:right-5">
      {toc.map((item, idx) => {
        if (item.indent === 1) {
          return (
            <div key={idx} className="sidebar">
              <Link
                key={idx}
                href={item.link}
                className="sidebar mt-3 indent-[-5px] text-sm font-bold text-text"
              >
                💡 {item.text.split("(")[0]}
              </Link>
            </div>
          );
        } else if (item.indent === 2) {
          return (
            <div key={idx} className="sidebar">
              <Link
                key={idx}
                href={item.link}
                className="sidebar ml-8 indent-[-20px] text-xs text-text"
              >
                🚀 {item.text.split("(")[0]}
              </Link>
            </div>
          );
        } else if (item.indent === 3) {
          return (
            <div key={idx} className="sidebar">
              <Link
                key={idx}
                href={item.link}
                className="sidebar ml-10 indent-[-20px] text-xs text-text"
              >
                ✅ {item.text.split("(")[0]}
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RightSidebarComp;

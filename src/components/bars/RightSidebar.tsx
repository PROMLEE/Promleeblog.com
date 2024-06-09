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

const RightSidebarComp = (content: any) => {
  const toc = parseToc(content.content);
  return (
    <div className="related md:sidebar-md xl:right-5 ">
      {toc.map((item, idx) => {
        if (item.indent === 1) {
          return (
            <Link
              key={idx}
              href={item.link}
              className="sidebar mt-3 border-t-2 border-dotted border-slate-500 py-1 text-sm font-bold dark:text-white"
            >
              💡 {item.text.split("(")[0]}
            </Link>
          );
        } else if (item.indent === 2) {
          return (
            <Link
              key={idx}
              href={item.link}
              className="sidebar ml-8 indent-[-20px] text-xs dark:text-white"
            >
              🚀 {item.text.split("(")[0]}
            </Link>
          );
        } else if (item.indent === 3) {
          return (
            <Link
              key={idx}
              href={item.link}
              className="sidebar ml-10 indent-[-20px] text-xs dark:text-slate-300"
            >
              ✅ {item.text.split("(")[0]}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default RightSidebarComp;

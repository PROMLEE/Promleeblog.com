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

const SidebarComp = (content: any) => {
  const toc = parseToc(content.content);
  return (
    <div className="related md:sidebar-md xl:right-5 ">
      {toc.map((item, idx) => {
        if (item.indent === 1) {
          return (
            <Link
              key={idx}
              href={item.link}
              className="sidebar text-sm font-bold mt-3 py-1 border-t-2 border-slate-500 border-dotted dark:text-white"
            >
              💡 {item.text.split("(")[0]}
            </Link>
          );
        } else if (item.indent === 2) {
          return (
            <Link
              key={idx}
              href={item.link}
              className="sidebar text-xs ml-8 dark:text-white indent-[-20px]"
            >
              🚀 {item.text.split("(")[0]}
            </Link>
          );
        } else if (item.indent === 3) {
          return (
            <Link
              key={idx}
              href={item.link}
              className="sidebar text-xs ml-10 dark:text-slate-300 indent-[-20px]"
            >
              ✅ {item.text.split("(")[0]}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default SidebarComp;

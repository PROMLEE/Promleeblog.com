export const oltag = ({ children }: any) => {
  return <ol className={"marker:text-white text-white l"}>{children}</ol>;
};

export const litag = ({ children }: any) => {
  return <li className={" text-blue-400 font-bold"}>{children}</li>;
};

export function Answer({ children }: any) {
  return (
    <ol type="a" className="marker:text-white text-white font-normal">
      <li className="text-white">{children}</li>
    </ol>
  );
}

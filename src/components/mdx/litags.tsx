export const oltag = ({ children }: any) => {
  return <ol className={"marker:text-white text-white"}>{children}</ol>;
};

export const litag = ({ children }: any) => {
  return <li className={"text-white"}>{children}</li>;
};

export function Answer({ children }: any) {
  return (
    <ol type="a" className="marker:text-white text-white font-normal">
      <li className="text-white">{children}</li>
    </ol>
  );
}

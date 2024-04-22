export const oltag = ({ children }: any) => {
  return <ol className={"marker:text-white text-white"}>{children}</ol>;
};
export const litag = ({ children }: any) => {
  return <li className={" text-blue-400"}>{children}</li>;
};
export function Answer({ children }: any) {
  return (
    <ol type="a" className="marker:text-white text-white">
      <li className="text-white">{children}</li>
    </ol>
  );
}

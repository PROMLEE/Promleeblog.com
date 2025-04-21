import AdComponent from "../ads/adsense";

export function Answer({ children }: { children: React.ReactNode }) {
  return (
    <ol type="a" className="font-normal">
      <li>{children}</li>
    </ol>
  );
}

export function Math({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-third bg-foreground w-full overflow-scroll rounded-2xl border-2 px-10">
      {children}
    </div>
  );
}

export function Bbox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-blue-100 p-3 dark:bg-blue-700">
      <div className="mx-3">👨‍💻</div>
      {children}
    </div>
  );
}
export function Rbox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-red-100 p-3 dark:bg-red-700">
      <div className="mx-3">🖐️</div>
      {children}
    </div>
  );
}
export function Gbox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-green-100 p-3 dark:bg-green-700">
      <div className="mx-3">👍</div>
      {children}
    </div>
  );
}
export function Ybox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-yellow-100 p-3 dark:bg-yellow-800">
      <div className="mx-3">👍</div>
      {children}
    </div>
  );
}
export function MathBox({ children }: { children: React.ReactNode }) {
  return (
    <div id="box" className="bg-foreground inline rounded-md px-1 py-2">
      {children}
    </div>
  );
}

export function Toggle({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <details className="my-3 py-2">
      <summary className="cursor-pointer text-lg font-bold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300">
        {" "}
        {title}
      </summary>
      {children}
    </details>
  );
}

export const Ads = () => {
  <AdComponent
    adSlot="2890712597"
    adFormat="fluid"
    adLayout="in-article"
    style={{ textAlign: "center" }}
  />;
};

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

export const Ads1 = () => {
  return (
    <div className="mt-10 mb-4">
      <AdComponent
        adSlot="2713309110"
        adFormat="fluid"
        adLayout="in-article"
        style={{ textAlign: "center" }}
      />
    </div>
  );
};
export const Ads2 = () => {
  return (
    <div className="mt-10 mb-4">
      <AdComponent
        adSlot="2890712597"
        adFormat="fluid"
        adLayout="in-article"
        style={{ textAlign: "center" }}
      />
    </div>
  );
};
export const Ads3 = () => {
  return (
    <div className="mt-10 mb-4">
      <AdComponent
        adSlot="6309773342" // Ads3
        adFormat="fluid"
        adLayout="in-article"
        style={{ textAlign: "center" }}
      />
    </div>
  );
};
export const Ads4 = () => {
  return (
    <div className="mt-10 mb-4">
      <AdComponent
        adSlot="4201041797" // Ads4
        adFormat="fluid"
        adLayout="in-article"
        style={{ textAlign: "center" }}
      />
    </div>
  );
};
export const Ads5 = () => {
  return (
    <div className="mt-10 mb-4">
      <AdComponent
        adSlot="7290848373" // Ads5
        adFormat="fluid"
        adLayout="in-article"
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export const Ads6 = () => {
  return (
    <div className="mt-10 mb-4">
      <AdComponent
        adSlot="8345743897" // Ads6
        adFormat="fluid"
        adLayout="in-article"
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export const AdsDev = () => {
  return (
    <div className="mt-10 mb-4">
      <div className="h-32 w-full animate-pulse rounded-md bg-gray-300">
        광고 자리
      </div>
    </div>
  );
};

export function Answer({ children }: any) {
  return (
    <ol type="a" className="font-normal">
      <li>{children}</li>
    </ol>
  );
}

export function Math({ children }: any) {
  return (
    <div className="w-full overflow-scroll rounded-2xl border-2 border-third bg-foreground px-10">
      {children}
    </div>
  );
}

export function Bbox({ children }: any) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-blue-100 p-3 dark:bg-blue-700">
      <div className="mx-3">👨‍💻</div>
      {children}
    </div>
  );
}
export function Rbox({ children }: any) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-red-100 p-3 dark:bg-red-700">
      <div className="mx-3">🖐️</div>
      {children}
    </div>
  );
}
export function Gbox({ children }: any) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-green-100 p-3 dark:bg-green-700">
      <div className="mx-3">👍</div>
      {children}
    </div>
  );
}
export function Ybox({ children }: any) {
  return (
    <div className="my-3 flex w-full items-center rounded-md bg-yellow-100 p-3 dark:bg-yellow-800">
      <div className="mx-3">👍</div>
      {children}
    </div>
  );
}
export function MathBox({ children }: any) {
  return (
    <div id="box" className="inline rounded-md bg-foreground px-1 py-2">
      {children}
    </div>
  );
}

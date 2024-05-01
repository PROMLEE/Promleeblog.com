export function Answer({ children }: any) {
  return (
    <ol type="a" className="marker:text-white text-white font-normal">
      <li className="text-white">{children}</li>
    </ol>
  );
}

export function Math({ children }: any) {
  return (
    <div className="bg-gray-600 w-full rounded-2xl overflow-scroll px-10 border-slate-950 border-2">
      {children}
    </div>
  );
}

export function Bbox({ children }: any) {
  return (
    <div className="bg-blue-700 w-full rounded-md my-3 p-3 flex text-white items-center">
      <div className="mx-3">👨‍💻</div>
      {children}
    </div>
  );
}
export function Rbox({ children }: any) {
  return (
    <div className="bg-red-700 w-full rounded-md my-3 p-3 flex text-white items-center">
      <div className="mx-3">🖐️</div>
      {children}
    </div>
  );
}
export function Gbox({ children }: any) {
  return (
    <div className="bg-green-700 w-full rounded-md my-3 p-3 flex text-white items-center">
      <div className="mx-3">👍</div>
      {children}
    </div>
  );
}
export function Ybox({ children }: any) {
  return (
    <div className="bg-yellow-800 w-full rounded-md my-3 p-3 flex text-white items-center">
      <div className="mx-3">👍</div>
      {children}
    </div>
  );
}

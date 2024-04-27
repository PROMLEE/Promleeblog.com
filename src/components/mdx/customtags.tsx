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

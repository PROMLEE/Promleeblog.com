"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  // reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="my-20 text-3xl font-bold">⚠️Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => (window.location.href = window.location.origin)
        }
      >
        To Home
      </button>
    </div>
  );
}

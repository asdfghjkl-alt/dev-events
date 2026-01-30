"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);

    let message = error.message;

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    }

    setErrorMessage(message);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <p className="text-center text-gray-600 max-w-md">
        {errorMessage || "An unexpected error occurred."}
      </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

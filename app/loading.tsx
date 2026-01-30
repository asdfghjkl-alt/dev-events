import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      <p className="font-bold text-gray-600">Loading...</p>
    </div>
  );
}

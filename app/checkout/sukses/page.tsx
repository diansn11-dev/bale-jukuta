import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-sky-50">
          <p className="text-gray-500">Memuat...</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

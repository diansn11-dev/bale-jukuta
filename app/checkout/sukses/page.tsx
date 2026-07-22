import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p>Memuat...</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

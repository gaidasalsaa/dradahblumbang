import { Suspense } from "react";
import SuksesContent from "@/components/administrasi/sukses/page";

export default function SuksesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Memuat...
      </div>
    }>
      <SuksesContent />
    </Suspense>
  );
}
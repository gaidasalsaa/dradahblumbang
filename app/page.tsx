import Beranda from "@/app/beranda/page";
import MaintenancePage from "@/components/maintenance";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <Beranda /> */}
      <MaintenancePage />
    </main>
  );
}

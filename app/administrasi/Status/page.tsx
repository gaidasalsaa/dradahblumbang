import Navbarform from "@/components/administrasi/navbar";
import StatusPage from "@/components/administrasi/status/page";
import Footerform from "@/components/administrasi/footer";

export default function StatusRoute() {
  return (
    <main className="min-h-screen bg-white">
      <Navbarform />
      <StatusPage />
      <Footerform />
    </main>
  );
}

import Navbarform from "@/components/administrasi/navbar";
import FormDomisili from "@/components/administrasi/domisili/page";
import Footerform from "@/components/administrasi/footer";

export default function DomisiliPage() {
  return (
    <main className="min-h-screen bg-white">
        <Navbarform />
        <FormDomisili />
        <Footerform />
    </main>
  );
}
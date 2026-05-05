import Navbarform from "@/components/administrasi/navbar";
import FormSKTM from "@/components/administrasi/sktm/page";
import Footerform from "@/components/administrasi/footer";

export default function SKTMPage() {
  return (
    <main className="min-h-screen bg-white">
        <Navbarform />
        <FormSKTM />
        <Footerform />
    </main>
  );
}
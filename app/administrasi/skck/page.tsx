import Navbarform from "@/components/administrasi/navbar";
import FormSKCK from "@/components/administrasi/skck/page";
import Footerform from "@/components/administrasi/footer";

export default function SKCKPage() {
  return (
    <main className="min-h-screen bg-white">
        <Navbarform />
        <FormSKCK />
        <Footerform />
    </main>
  );
}
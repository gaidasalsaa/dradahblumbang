import Navbarform from "@/components/administrasi/navbar";
import FormSKU from "@/components/administrasi/sku/page";
import Footerform from "@/components/administrasi/footer";

export default function SKUPage() {
  return (
    <main className="min-h-screen bg-white">
        <Navbarform />
        <FormSKU />
        <Footerform />
    </main>
  );
}
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProfileSection from "@/components/profile-section";
import GeografisSection from "@/components/geografis";
import StrukturDesa from "@/components/struktur-desa";
// import StrukturOrganisasi from "@/components/struktur-organisasi";
import DataWilayah from "@/components/data-wilayah";
import Administrasi from "@/components/administrasi";
import GaleriKegiatan from "@/components/galeri-kegiatan";
import KontakDesa from "@/components/kontak-desa";
import Footer from "@/components/footer";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProfileSection />
      <GeografisSection />
      <StrukturDesa />
      {/* <StrukturOrganisasi /> */}
      <DataWilayah />
      <Administrasi />
      <GaleriKegiatan />
      <KontakDesa />
      <Footer />
    </main>
  );
}

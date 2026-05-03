import Navbar from "@/components/navbar";
import Hero from "@/components/section/hero"; 
import ProfileSection from "@/components/section/profile-section";
import GeografisSection from "@/components/section/geografis";
import StrukturDesa from "@/components/section/struktur-desa";
import DataWilayah from "@/components/section/data-wilayah";
import GaleriKegiatan from "@/components/section/galeri-kegiatan";
import Administrasi from "@/components/section/administrasi";
import KontakDesa from "@/components/section/kontak-desa";
import Footer from "@/components/footer";
// import MaintenancePage from "@/components/maintenance";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProfileSection />
      <GeografisSection />
      <StrukturDesa />
      <DataWilayah />
      <GaleriKegiatan />
      <Administrasi />
      <KontakDesa />
      <Footer />
      {/* <MaintenancePage /> */}
    </main>
  );
}

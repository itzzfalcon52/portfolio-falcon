import Image from "next/image";
import ProfileCard from "@/modules/home/components/ProfileCard";
import ProductsCard from "@/modules/home/components/ProductsCard";
import ProjectsCard from "@/modules/home/components/ProjectsCard";
import Navbar from "@/modules/home/components/Navbar";
import BackgroundCodeParticles from "@/components/helpers/BackgroundParticles";

export default function Home() {
  return (
    <main className="flex min-h-screen  justify-center py-12 font-sans bg-zinc-900">
      <BackgroundCodeParticles />
     <div className="w-full max-w-xl rounded-xl space-y-6 bg-zinc-800">
        <Navbar/>
        <ProfileCard />
        <ProjectsCard />
        <ProductsCard />
      </div>
    </main>
  );
}
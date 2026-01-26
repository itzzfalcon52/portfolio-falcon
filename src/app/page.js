import Image from "next/image";
import ProfileCard from "@/modules/home/components/ProfileCard";
import StackCard from "@/modules/home/components/StackCard";
import ProjectsCard from "@/modules/home/components/ProjectsCard";
import Navbar from "@/modules/home/components/Navbar";
import BackgroundCodeParticles from "@/components/helpers/BackgroundParticles";
import CaseStudies from "@/modules/home/components/CaseStudies";
import Experience from "@/modules/home/components/Experience";
import Contact from "@/modules/home/components/Contact";
import Footer from "@/modules/home/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen  justify-center py-12 font-sans dark:bg-zinc-900 bg-zinc-100 text-zinc-800 dark:text-zinc-50 ">
      <BackgroundCodeParticles />
     <div className="w-full max-w-xl rounded-xl space-y-6 dark:bg-zinc-800 bg-zinc-200 text-zinc-800 ">
        <Navbar/>
        <ProfileCard />
        <CaseStudies/>
        <ProjectsCard />
        <StackCard />
        <Experience/>
        <Contact/>
        <Footer/>
      </div>
    </main>
  );
}
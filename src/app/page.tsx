import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ToolboxSection } from "@/components/ToolboxSection";
import { SignalRunDiscovery } from "@/components/SignalRunDiscovery";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <WorkSection />
        <ExperienceSection />
        <ToolboxSection />
        <SignalRunDiscovery />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

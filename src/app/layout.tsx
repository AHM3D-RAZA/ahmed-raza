import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { Atmosphere } from "@/components/Atmosphere";
import { IntroLoader } from "@/components/IntroLoader";

export const metadata: Metadata = {
  title: "Ahmed Raza Asad — Software Engineer",
  description:
    "Ahmed Raza Asad builds across web, games, data, and automation — a workshop of full-stack apps, Unity games, ML models, and n8n workflows.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-workshop-black text-ivory font-body">
        <IntroLoader />
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}

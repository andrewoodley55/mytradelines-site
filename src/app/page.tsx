"use client";

import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Tradelines } from "@/components/Tradelines";
import { WhyUs } from "@/components/WhyUs";
import { SellCTA } from "@/components/SellCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Tradelines />
        <WhyUs />
        <SellCTA />
        <FAQ />
      </main>
      <Footer />
    </AuthProvider>
  );
}

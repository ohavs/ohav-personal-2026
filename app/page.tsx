import Preloader from "@/components/Preloader";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Works from "@/components/sections/Works";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <Works />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

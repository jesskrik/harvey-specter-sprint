import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import ImageBreak from "@/components/sections/ImageBreak";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import News from "@/components/sections/News";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-hidden">
        <Hero />
        <Intro />
        <About />
        <ImageBreak />
        <Services />
        <Work />
        <Testimonials />
        <News />
      </main>
      <Footer />
    </>
  );
}

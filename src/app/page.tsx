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
      <main>
        <Hero />
        <Intro />
        <About />
        <ImageBreak />
        <Services />
        <Work />
        <Testimonials />
        <News />
        <Footer />
      </main>
    </>
  );
}

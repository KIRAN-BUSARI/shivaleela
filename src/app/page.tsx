import Hero from "@/components/pages/Hero";
import Navbar from "@/components/Navbar";
import Aboutus from "@/components/pages/About-us";
import StatsSection from "@/components/pages/StatsSection";
import Production from "@/components/pages/Production";
import Media from "@/components/pages/Media";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";
import Classes from "@/components/pages/Classes";
import Gallery from "@/components/pages/Gallery";
import FAQ from "@/components/pages/FAQ";
import Contact from "@/components/pages/Contact";

function page() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <SectionSeparator title="Shivaleela Natyalaya: Our Story" subtitle="Preserving Culture Through Dance & Music Since 2013" id="about-us" />
      <Aboutus />
      <SectionSeparator title="Numbers That Shows What we Are!" className="-mt-18 md:-mt-0" subtitle="Transformative Journeys Through Dance" id="case-studies" />
      <StatsSection />
      <SectionSeparator title="Abhyaasa: Dance & Music Classes" subtitle="Learn Bharatanatyam, Kathak, Hindustani & Carnatic Music" id="classes" />
      <Classes />
      <SectionSeparator title="Productions" subtitle="Timeless Tales in Motion" id="productions" />
      <Production />
      <SectionSeparator title="Gallery of Expression" subtitle="Masters of Movement and Expression" id="gallery" />
      <Gallery />
      <SectionSeparator title="Media" subtitle="Echoes of Applause: Our Dance in the Spotlight" id="media" />
      <Media />
      <SectionSeparator title="FAQs" subtitle="Your Questions, Our Answers: Everything You Want to Know" id="faq" />
      <FAQ />
      <SectionSeparator title="Connect With Us" subtitle="Join the Dance of Connection: Follow Us on Social Media" id="contact" className="text-center" />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;

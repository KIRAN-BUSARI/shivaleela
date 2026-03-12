import Hero from "@/pages/Hero";
import Navbar from "@/components/Navbar";
import Aboutus from "@/pages/About-us";
import Statssection from "@/pages/Statssection";
import PerformingTeam from "@/pages/PerformingTeam";
import Production from "@/pages/Production";
import Media from "@/pages/Media";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";

function page() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <SectionSeparator title="Rhythms of Heritage" subtitle="Where Dance Awakens Souls" id="about-us" />
      <Aboutus />
      <SectionSeparator title="Abhyaasa: The Sacred Practice" subtitle="Mastery for Every Soul" id="" />
      <Statssection />
      <PerformingTeam />
      <Production />
      <Media />
      <Footer />
    </div>
  );
}

export default page;

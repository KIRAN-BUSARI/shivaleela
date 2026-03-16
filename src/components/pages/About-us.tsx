"use client";

import Image from "next/image";
import Shantala from "@/assets/Shantala.png";
import Parimila from "@/assets/Parimila.png";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const About = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSection1Visible, setIsSection1Visible] = useState(false);
  const [isSection2Visible, setIsSection2Visible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      });
    }, observerOptions);

    const section1Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSection1Visible(true);
        }
      });
    }, observerOptions);

    const section2Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSection2Visible(true);
        }
      });
    }, observerOptions);

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (section1Ref.current) section1Observer.observe(section1Ref.current);
    if (section2Ref.current) section2Observer.observe(section2Ref.current);

    return () => {
      headerObserver.disconnect();
      section1Observer.disconnect();
      section2Observer.disconnect();
    };
  }, []);

  return (
    <div
      id="about-us"
      className="mx-auto flex flex-col max-w-7xl px-4 sm:px-6 py-10 lg:px-8 sm:py-20 md:py-24 lg:py-10"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className={`w-full mb-16 sm:mb-18 md:mb-20 lg:mb-8 transition-all duration-700 ease-out ${isHeaderVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`}
      >
        <p className="text-base sm:text-lg md:text-base text-justify text-gray-700 leading-relaxed max-w-full">
          Founded in 2013 by Kum. M.S. Shantala—our visionary President and guru—Shivaleela Natyalaya began as a sanctuary for Bharatanatyam and Indian classical arts. Evolving into Shivaleela Cultural Trust in 2014, we educate children in dance, music, and culture, prioritizing those who can&apos;t afford it.
          Non-commercial at heart, we nurture talent, stage enchanting performances, and collaborate with event organizers, artists, and communities in Bengaluru. Join our timeless journey—affordable classes, inclusive productions, pure passion.
          Discover Bharatanatyam classes Bengaluru | Indian classical dance trust.
        </p>
      </div>

      {/* Guru Shantala Section */}
      <div
        ref={section1Ref}
        className={`flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center mb-20 sm:mb-24 md:mb-28 lg:mb-12 transition-all duration-700 ease-out ${isSection1Visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-8"
          }`}
      >
        <div className="w-full sm:w-auto lg:w-auto justify-center lg:justify-start flex">
          <div className="relative group">
            <Image
              src={Shantala}
              alt="Guru Shantala"
              priority
              width={320}
              height={320}
              className="w-77 h-77 mx-auto sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[250px] lg:h-[250px] rounded-lg object-cover shadow-lg transition-transform duration-500 ease-out group-hover:scale-105 group-hover:shadow-2xl"
            />
          </div>
        </div>

        <div className="w-full lg:flex-1 space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center">
          <div className="mb-2 sm:mb-3 md:mb-4 text-center md:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold  text-gray-900 mb-2">
              Kum. MS Shantala
            </h2>
            <p className="text-sm md:text-base font-semibold text-gray-600 italic">
              Founder, President & Master Guru.
            </p>
          </div>

          <div className="text-gray-700 text-sm md:text-base text-balance">
            <p>
              Iconic Kannada actress turned dance visionary Kum. M.S. Shantala starred in 18+ films, debuting with Paduvarahalli Pandavaru alongside Ambareesh under Puttanna Kanagal. Trained by gurus like Vidushi Narmada and Udupi Lakshminarayanacharya, she promotes Bharatanatyam globally in Singapore, USA, and Dubai. Blending cinema, art, and Indian culture, she now inspires the next generation through Shivaleela.
            </p>
            {/* <Button className="mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
              Discover Her Journey
            </Button> */}
          </div>
        </div>
      </div>

      {/* Guru Parimila Section */}
      <div
        ref={section2Ref}
        className={`flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center mb-20 sm:mb-24 md:mb-28 lg:mb-12 transition-all duration-700 ease-out ${isSection1Visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-8"
          }`}
      >
        <div className="w-full sm:w-auto lg:w-auto flex justify-center md:justify-start">
          <div className="relative group">
            <Image
              src={Parimila}
              alt="Guru Parimila"
              priority
              width={320}
              height={320}
              className="w-77 h-77 mx-auto sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[250px] lg:h-[250px] rounded-lg object-cover shadow-lg transition-transform duration-500 ease-out group-hover:scale-105 group-hover:shadow-2xl"
            />
          </div>
        </div>

        <div className="w-full lg:flex-1 space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center">
          <div className="mb-2 sm:mb-3 md:mb-4 text-center md:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Smt. Parimala Subodh
            </h2>
            <p className="text-sm md:text-base font-semibold text-gray-600 italic">
              Artistic Director & Co-Founder.
            </p>
          </div>

          <div className="text-gray-700 text-sm md:text-base text-balance">
            <p>
              A Bharatanatyam expert and freestyle folk dancer currently pursuing Kathak, actively involved in managing both on-stage and off-stage operations including lighting, costumes, choreography, and full productions. Oversees workshops, classes, and Shivaleela events while promoting young artists with Shantala, driven by a deep passion for music, dance, and creative artistic concepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

"use client";

import Image from "next/image";
import Shantala from "@/assets/Shantala.png";
import Parimila from "@/assets/Parimila.png";
import { useEffect, useRef, useState } from "react";

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
      className="mx-auto flex flex-col max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 sm:py-20 md:py-24 lg:py-32"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className={`w-full mb-16 sm:mb-18 md:mb-20 lg:mb-24 transition-all duration-700 ease-out ${isHeaderVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl md:text-left font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900 leading-tight">
          Shivaleela Cultural <br />Trust That Speaks!
        </h1>
        <p className="text-base sm:text-lg md:text-lg text-gray-700 leading-relaxed max-w-full">
          Shivaleela Cultural Trust, Bengaluru&apos;s premier dance troupe, delivers 12+ years of performance excellence on national and international stages. Unique concepts, original music, and innovative choreography in classical (Bharatanatyam, Kathak) and folk forms convey profound messages. Meet our founder, board, and professional artists.
        </p>
      </div>

      {/* Guru Shantala Section */}
      <div
        ref={section1Ref}
        className={`flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center mb-20 sm:mb-24 md:mb-28 lg:mb-32 transition-all duration-700 ease-out ${isSection1Visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-8"
          }`}
      >
        <div className="w-full sm:w-auto lg:w-auto justify-start lg:justify-start flex">
          <div className="relative group ">
            <Image
              src={Shantala}
              alt="Guru Shantala"
              priority
              width={320}
              height={320}
              className="w-77 h-77 mx-auto sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg object-cover shadow-lg transition-transform duration-500 ease-out group-hover:scale-105 group-hover:shadow-2xl"
            />
          </div>
        </div>

        <div className="w-full lg:flex-1 space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center">
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Guru. Shantala Mam
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 italic">
              Founder Shantala Cultural Trust, Actress, Director.
            </p>
          </div>

          <div className="text-gray-700 text-left space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            <p>
              Shivaleela Cultural Trust&apos;s 12+ years of excellence in innovative
              classical and folk productions like{" "}
              <span className="text-[#a93328] font-semibold">Punyakoti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Prakruti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Jai Jaganmathe</span> and our
              recent <span className="text-[#a93328] font-semibold">Sirigannadam Gelge</span>{" "}
              make it a Bengaluru cultural powerhouse, deserving a website that
              showcases artistry while driving enrollments and event attendance.
            </p>
            <p>
              Excellence in innovative classical and folk productions like{" "}
              <span className="text-[#a93328] font-semibold">Punyakoti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Prakruti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Jai Jaganmathe</span> and our
              recent <span className="text-[#a93328] font-semibold">Sirigannadam Gelge</span>{" "}
              make it a Bengaluru cultural powerhouse, deserving a website that
              showcases artistry while driving enrollments and event attendance.
            </p>
          </div>
        </div>
      </div>

      {/* Guru Parimila Section */}
      <div
        ref={section2Ref}
        className={`flex flex-col lg:flex-row-reverse gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center transition-all duration-700 ease-out ${isSection2Visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8"
          }`}
      >
        <div className="w-full sm:w-auto lg:w-auto flex justify-start">
          <div className="relative group">
            <Image
              src={Parimila}
              alt="Guru Parimila"
              priority
              width={320}
              height={320}
              className="w-77 h-77 mx-auto sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg object-cover shadow-lg transition-transform duration-500 ease-out group-hover:scale-105 group-hover:shadow-2xl"
            />
          </div>
        </div>

        <div className="w-full lg:flex-1 space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center">
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Guru. Parimila Mam
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 italic">
              Co-Founder, Board Member Shivaleela Cultural Trust
            </p>
          </div>

          <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            <p>
              Shivaleela Cultural Trust&apos;s 12+ years of excellence in innovative
              classical and folk productions like{" "}
              <span className="text-[#a93328] font-semibold">Punyakoti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Prakruti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Jai Jaganmathe</span> and our
              recent <span className="text-[#a93328] font-semibold">Sirigannadam Gelge</span>{" "}
              make it a Bengaluru cultural powerhouse, deserving a website that
              showcases artistry while driving enrollments and event attendance.
            </p>
            <p>
              Excellence in innovative classical and folk productions like{" "}
              <span className="text-[#a93328] font-semibold">Punyakoti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Prakruti</span>,{" "}
              <span className="text-[#a93328] font-semibold">Jai Jaganmathe</span> and our
              recent <span className="text-[#a93328] font-semibold">Sirigannadam Gelge</span>{" "}
              make it a Bengaluru cultural powerhouse, deserving a website that
              showcases artistry while driving enrollments and event attendance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

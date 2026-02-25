"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import YtThumbnail from "@/assets/YtThumbnail.png";
import Kathak from "@/assets/Kathak.png";

function Statssection() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isClassesVisible, setIsClassesVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const classesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observers = [
      { ref: headerRef, setter: setIsHeaderVisible },
      { ref: statsRef, setter: setIsStatsVisible },
      { ref: descRef, setter: setIsDescVisible },
      { ref: videoRef, setter: setIsVideoVisible },
      { ref: classesRef, setter: setIsClassesVisible },
    ];

    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        });
      }, observerOptions);

      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => {
      observerInstances.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-20 md:py-24 lg:py-32 flex flex-col space-y-12">
      {/* Header */}
      <div
        ref={headerRef}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 transition-all duration-700 ease-out ${isHeaderVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`}
      >
        Numbers That Shows What we Are!
      </div>

      {/* Stats Grid */}
      <div
        ref={statsRef}
        className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 transition-all duration-700 ease-out ${isStatsVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`}
      >
        {[
          { label: "Students Trained", value: "1500+", color: "#1D6D8D" },
          { label: "Core Team", value: "45+", color: "#FF6F61" },
          { label: "Productions", value: "5+", color: "#1D6D8D" },
          { label: "Countries", value: "13+", color: "#FF6F61" },
        ].map((stat, index) => (
          <div
            key={index}
            className="text-left border border-gray-200 rounded-xl h-fit space-y-4 sm:space-y-5 py-6 sm:py-7 md:py-8 px-6 sm:px-6 flex flex-col bg-[#F4F5FF] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{
              transitionDelay: isStatsVisible ? `${index * 100}ms` : "0ms",
            }}
          >
            <p className="font-semibold text-base sm:text-lg md:text-xl text-gray-700">
              {stat.label}
            </p>
            <h3
              className="text-3xl sm:text-4xl md:text-5xl font-bold"
              style={{ color: `#${stat.color}` }}
            >
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Description */}
      <div
        ref={descRef}
        className={`text-gray-700 leading-relaxed sm:leading-loose font-medium text-base sm:text-lg transition-all duration-700 ease-out ${isDescVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`}
      >
        Shivaleela Cultural Trust&apos;s 12+ years of excellence in innovative
        classical and folk productions like{" "}
        <span className="text-[#a93328] font-semibold">Punyakoti</span>,{" "}
        <span className="text-[#a93328] font-semibold">Prakruti</span>,{" "}
        <span className="text-[#a93328] font-semibold">Jai Jaganmathe</span> and our recent{" "}
        <span className="text-[#a93328] font-semibold">Sirigannadam Gelge</span> make it a
        Bengaluru cultural powerhouse, deserving a website that showcases
        artistry while driving enrollments and event attendance.
      </div>

      {/* Video Section */}
      <div
        ref={videoRef}
        className={`transition-all h-auto duration-700 ease-out ${isVideoVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
          }`}
      >
        <div className="relative overflow-hidden rounded-lg sm:rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
          <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/4WVz3zGJ7c8?si=U17GDvlBEafS8jNq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </div>

      {/* Classes Section */}
      <div
        ref={classesRef}
        className={`flex flex-col space-y-6 sm:space-y-7 md:space-y-8 transition-all duration-700 ease-out ${isClassesVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Abhyasa - Kathak & Bharathantyam Classes
        </span>
        <p className="leading-relaxed sm:leading-loose text-base sm:text-lg text-gray-700">
          Abhyasa offers professional Kathak and Bharatanatyam classes led by
          Shivaleela Cultural Trust&apos;s expert artists in Bengaluru. Train in authentic
          techniques with over 12 years of troupe excellence behind every step.
          Beginners aged 8+ welcome—master mudras, tatkar, and abhinaya in
          small, supportive batches. Weekly sessions blend classical precision
          with innovative choreography from acclaimed productions like
          Punyakoti. First class free to experience our immersive environment.
          Build confidence, grace, and cultural depth while preparing for stage
          performances. Flexible timings suit students and professionals. Enroll
          today—spaces limited.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 w-full">
          <div className="space-y-3 sm:space-y-4 group">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src={Kathak}
                alt="Kathak"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <span className="block font-medium text-sm sm:text-base text-gray-800">
              Kathak Advanced - Intermediate Beginners level
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4 group">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src={Kathak}
                alt="Bharathanatyam"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <span className="block font-medium text-sm sm:text-base text-gray-800">
              Bharathanatyam Advanced - Intermediate Beginners level
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statssection;
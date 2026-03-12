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
          { label: "Students Trained", value: "1500+", colorClass: "text-secondary" },
          { label: "Core Team", value: "45+", colorClass: "text-primary" },
          { label: "Productions", value: "5+", colorClass: "text-secondary" },
          { label: "Countries", value: "13+", colorClass: "text-primary" },
        ].map((stat, index) => (
          <div
            key={index}
            className="text-left border border-gray-200 rounded-xl h-fit space-y-4 sm:space-y-5 py-6 sm:py-7 md:py-8 px-6 sm:px-6 flex flex-col bg-secondary/5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{
              transitionDelay: isStatsVisible ? `${index * 100}ms` : "0ms",
            }}
          >
            <p className="font-semibold text-base sm:text-lg md:text-xl text-gray-700">
              {stat.label}
            </p>
            <h3
              className={`text-3xl sm:text-4xl md:text-5xl font-bold ${stat.colorClass}`}
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
        <span className="text-primary font-semibold">Punyakoti</span>,{" "}
        <span className="text-primary font-semibold">Prakruti</span>,{" "}
        <span className="text-primary font-semibold">Jai Jaganmathe</span> and our recent{" "}
        <span className="text-primary font-semibold">Sirigannadam Gelge</span> make it a
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
        </div>
      </div>

    </div>
  );
}

export default Statssection;
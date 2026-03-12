"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Shanthala from "@/assets/Shantala.png";

function PerformingTeam() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observers = [
      { ref: headerRef, setter: setIsHeaderVisible },
      { ref: descRef, setter: setIsDescVisible },
      { ref: gridRef, setter: setIsGridVisible },
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
    <div id="events" className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <h2
          ref={headerRef}
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 transition-all duration-700 ease-out ${isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
            }`}
        >
          Talented Performing Team
        </h2>
        <p
          ref={descRef}
          className={`leading-relaxed sm:leading-loose pt-6 sm:pt-7 md:pt-8 text-base sm:text-lg text-gray-700 transition-all duration-700 ease-out ${isDescVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
            }`}
        >
          Shivaleela Cultural Trust boasts a dedicated team of professional
          artists with over 12 years of national and international stage
          excellence. Led by our visionary founder and supported by esteemed
          board members, each performer brings specialized mastery in
          Bharatanatyam, Kathak, Yakshagana, and folk forms. Our choreographers
          craft innovative productions like Punyakoti and Jai Jaganmathe,
          blending tradition with fresh storytelling. Highly trained dancers
          ensure every mudra and expression resonates deeply with audiences.
          This talented collective not only performs but mentors the next
          generation through Abhyasa classes. Their credentials—prestigious
          festival appearances and critical acclaim—build unbreakable trust.
          Meet the faces behind the footwork that captivates rasikas worldwide.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 pt-8 sm:pt-10 md:pt-12 transition-all duration-700 ease-out ${isGridVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
            style={{
              transitionDelay: isGridVisible ? `${index * 80}ms` : "0ms",
            }}
          >
            <Image
              src={Shanthala}
              alt={`Team member ${index + 1}`}
              className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
              priority={index < 4}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformingTeam;
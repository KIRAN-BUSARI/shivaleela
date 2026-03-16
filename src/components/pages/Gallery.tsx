"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import img0 from "@/assets/gallery/img0.png";
import img1 from "@/assets/gallery/img1.png";
import img2 from "@/assets/gallery/img2.png";
import img3 from "@/assets/gallery/img3.png";
import img4 from "@/assets/gallery/img4.png";
import img5 from "@/assets/gallery/img5.png";
import img6 from "@/assets/gallery/img6.png";
import img7 from "@/assets/gallery/img7.png";
import img8 from "@/assets/gallery/img8.png";

function Gallery() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const images = [img0, img1, img2, img3, img4, img5, img6, img7,img8];
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
    <div id="events" className="">
      {/* <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <p
          ref={descRef}
          className={`pt-6 sm:pt-7 md:pt-8 text-sm text-justify md:text-base text-gray-700 transition-all duration-700 ease-out ${isDescVisible
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
      </div> */}

      <div
        ref={gridRef}
        className={`w-full max-w-7xl px-4 sm:px-6 md:px-8 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 pt-8 sm:pt-10 md:pt-12 transition-all duration-700 ease-out ${isGridVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {images.map((url, i) => (
          <div key={i} className="relative w-full aspect-square rounded-sm overflow-hidden">
            <Image
              src={url}
              alt={`Performing Team ${i + 1}`}
              className="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
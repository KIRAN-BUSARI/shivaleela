"use client";

import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import Kathak from "@/assets/Kathak.png";

const Classes = () => {
  const [isClassesVisible, setIsClassesVisible] = useState(false);

  const classesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observers = [
      { ref: classesRef, setter: setIsClassesVisible }
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

  const classList = [
    { title: "Bharatanatyam", image: Kathak },
    { title: "Kathak", image: Kathak },
    { title: "Hindustani Music", image: Kathak },
    { title: "Carnatic Music", image: Kathak },
    { title: "Yoga", image: Kathak },
    { title: "Workshops", image: Kathak }
  ];
  return (
    <div className="h-auto mx-auto w-full max-w-7xl px-4  sm:px-6 lg:px-8 py-8">
      < div
        ref={classesRef}
        className={`flex flex-col space-y-6 sm:space-y-7 md:space-y-8 transition-all duration-700 ease-out ${isClassesVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`
        }>
        <p className="font-medium ">Shivaleela Natyalaya offers Bharatanatyam, Kathak, Hindustani & Carnatic music, and Yoga classes for all ages. Build grace, rhythm, and harmony under expert gurus.
          Join our vibrant workshops with renowned guest artists for fusion, choreography, and cultural immersion.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 w-full">
          {classList.map((cls, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <div className="w-full h-full overflow-hidden">
                <Image
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full rounded-sm object-cover"
                />
              </div>
              <span className="text-base font-medium text-gray-800">{cls.title}</span>
            </div>
          ))}
        </div>
      </div >
    </div >
  )
}

export default Classes
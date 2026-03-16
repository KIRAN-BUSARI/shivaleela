"use client";

import React from "react";

const productions = [
  {
    id: 1,
    title: "Jai Jagannathe",
    year: "2014",
    description: "Triumph of the protector—punishing evil, safeguarding the good.",
    credits: "Music by Praveen D. Rao.",
  },
  {
    id: 2,
    title: "Punyakoti",
    year: "2014",
    description: "Ode to truth's divine reward.",
    credits: "Composed by Vidwan Tirumalesh Srinivasan.",
  },
  {
    id: 3,
    title: "Nruthya Bharat",
    year: "2016",
    description: "Unity in diversity—festive authentic dance forms across India.",
    credits: "Music by Vidwan Tirumalesh Srinivasan.",
  },
  {
    id: 4,
    title: "Ramachacranam & Harikatha",
    year: "2018",
    description: "Honors Rama's epic journey and sacred storytelling.",
    credits: "Featuring Vidwan Arur Anant Krishnan Sharma.",
  },
  {
    id: 5,
    title: "Prakruthi",
    year: "2018",
    description: "Harmony of the five elements.",
    credits: "Music by Vidwan Tirumalesh Srinivasan.",
  },
  {
    id: 6,
    title: "Siri Gannadam Gelge",
    year: "2025",
    description: "Karnataka's cultural saga—victory through valor and tradition.",
    credits: "Music by: Arun Kumar; Singers: Hemanth and Lakshmi Nagaraj",
  }
];

const Productions = () => {
  return (
    <section className="w-full px-4 bg-white max-w-7xl mx-auto sm:px-6 lg:px-8">
      <p className="text-sm py-4 md:text-base text-gray-600 mx-auto leading-relaxed">
        Shivaleela Natyalaya crafts enchanting productions blending myth, morality, and nature.
        Each celebrates Indian heritage through authentic dance, music, and storytelling.
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {productions.map((prod) => (
          <div
            key={prod.id}
            className="group bg-gray-50 rounded-2xl p-8 hover:bg-orange-50 transition-colors duration-300 border border-gray-100 hover:border-orange-200 flex flex-col h-full shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                {prod.title}
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-orange-800 bg-orange-100 whitespace-nowrap ml-4">
                {prod.year}
              </span>
            </div>

            <p className="text-gray-600 mb-8 grow leading-relaxed">
              {prod.description}
            </p>

            <div className="mt-auto pt-6 border-t border-gray-200 group-hover:border-orange-200 transition-colors">
              <p className="text-sm text-gray-500 font-medium italic">
                {prod.credits}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block relative">
          <p className="relative text-sm md:text-lg font-medium text-amber-900 backdrop-blur-sm py-4 px-8 rounded-full border shadow-sm">
            ✨ More magical productions in progress — stay tuned! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Productions;

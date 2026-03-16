'use client';

import { useState } from 'react';

type FAQItem = {
  q: string;
  a: string;
};

const faqs: FAQItem[] = [
  {
    q: 'What does PixelCrew actually do?',
    a: 'We build brands and digital experiences—brand identity systems, UI/UX, and modern websites. From strategy and visual design to production-ready front‑end, we handle end‑to‑end.',
  },
  {
    q: 'What industries do you work with?',
    a: 'We’re industry‑agnostic. We’ve worked with education, arts, D2C, and services. What matters most is the problem and the impact—not the sector label.',
  },
  {
    q: 'How do projects usually start?',
    a: 'We kick off with a short discovery—goals, audience, constraints, and success metrics. Then we propose a clear scope, timeline, and deliverables. No fluff, just clarity.',
  },
  {
    q: 'What’s your typical timeline?',
    a: 'Brand identity: 2–4 weeks depending on depth. UI/UX and website design: 3–6 weeks based on scope. Design + development builds usually run 4–10 weeks.',
  },
  {
    q: 'Do you provide development too?',
    a: 'Yes. We design and develop. Our stack is modern (Next.js, React, Tailwind). We focus on clean UI, performance, accessibility, and smooth micro‑interactions.',
  },
  {
    q: 'Can you work with my existing brand or website?',
    a: 'Absolutely. We can refine and extend what you have, or overhaul where it helps most. We’ll suggest a pragmatic plan that respects your timelines and budget.',
  },
  {
    q: 'How do you price projects?',
    a: 'Fixed‑scope projects are quoted upfront. Longer engagements can be retainer‑based. We keep estimates transparent and tie them to outcomes and deliverables.',
  },
  {
    q: 'What do I get at the end of a branding project?',
    a: 'A complete identity system: logo files (all formats), color and type specs, usage rules, and practical brand assets. Optionally: templates and a mini brand guide.',
  },
  {
    q: 'Will my website be mobile‑friendly and fast?',
    a: 'Yes. We design mobile‑first and optimize for performance. We care about CLS, LCP, and a11y—not just how it looks, but how it loads and works.',
  },
  {
    q: 'How do we get started?',
    a: 'Drop us a message via the contact form. Share goals, references, and timelines if you have them. We’ll get back with a plan and next steps.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
      <div className="divide-y divide-black/10 overflow-hidden rounded-2xl border border-white/10 bg-black/3 shadow-[0_0_60px_-20px_rgba(193,255,114,0.25)] backdrop-blur-md">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`group transition-colors ${isOpen ? 'bg-black/4' : ''}`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 sm:px-6 sm:py-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-5 w-1 rounded-full transition-all ${isOpen ? 'bg-yellow-500' : 'bg-black/10 group-hover:bg-black/20'}`}
                  />
                  <span className="text-black sm:text-lg">{item.q}</span>
                </div>
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full border border-black/15 transition-all duration-200 ${isOpen
                    ? 'rotate-45 bg-yellow-500/10 text-yellow-500'
                    : 'text-black'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pt-0 pb-4 sm:px-6 sm:pb-5">
                  <p className="text-sm text-black sm:text-base">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;

import React from 'react';
import { Playfair } from 'next/font/google';

const playfair = Playfair({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  subsets: ['latin'],
});

interface SectionSeparatorProps {
  title: string;
  subtitle: string;
  id?: string;
  className?: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  title,
  subtitle,
  id,
  className = '',
}) => {
  return (
    <section
      id={id}
      style={{ fontFamily: playfair.style.fontFamily }}
      className="relative w-full pt-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={className}>
          <h2 className="text-4xl font-bold text-balance text-[#1e1e1e] capitalize sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto text-sm tracking-wide text-balance text-[#1e1e1e] opacity-80 sm:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section >
  );
};

export default SectionSeparator;

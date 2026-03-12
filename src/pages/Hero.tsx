"use client";

import HeroSectionBgCarousel from "@/components/heroSectionBgCarousal";
import type { StaticImageData } from 'next/image';

import imgUrl0 from '@/assets/hero/img0.png';
import imgUrl1 from '@/assets/hero/img1.png';
import imgUrl2 from '@/assets/hero/img2.png';
import imgUrl3 from '@/assets/hero/img3.png';
import imgUrl4 from '@/assets/hero/img4.png';
import imgUrl5 from '@/assets/hero/img5.png';
import imgUrl6 from '@/assets/hero/img6.png';
import imgUrl7 from '@/assets/hero/img7.png';


const images: StaticImageData[] = [imgUrl0, imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5, imgUrl6, imgUrl7];
const mobileImages: StaticImageData[] = [imgUrl0, imgUrl1, imgUrl2, imgUrl3];


export default function Hero() {
  return (
    <section aria-label="Hero Section" className="flex flex-col w-full min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)]">
      {/* Top Carousel Section */}
      <div className="relative w-full overflow-hidden hidden md:block md:h-[350px] shrink-0">
        <HeroSectionBgCarousel
          images={images}
          interval={4000}
          className="h-full w-full"
        />
      </div>

      <div className="relative w-full overflow-hidden flex md:hidden h-[250px] sm:h-[300px] shrink-0">
        <HeroSectionBgCarousel
          images={mobileImages}
          interval={2000}
          className="h-full w-full"
        />
      </div>
      {/* Bottom Content Section */}
      <div className="mx-auto flex w-full grow flex-col items-center justify-center bg-white px-4 py-8 md:py-10 lg:py-12 text-center">
        <h1 className="mb-3 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-gray-900">
          Shivaleela Cultural Trust Igniting Souls Through Dance
        </h1>
        <p className="mb-6 max-w-3xl text-sm md:text-base text-gray-700">
          Discover the rhythm of tradition and innovation.{' '}
          <span className="text-primary italic font-medium">
            We teach, perform, and produce
          </span>{' '}
          captivating stories in Bharatanatyam and beyond. Join the dance & Musical celebrations!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="rounded-md bg-secondary px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 shadow-md uppercase">
            Enroll Classes
          </button>
          <button className="rounded-md border-2 border-secondary bg-transparent px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground shadow-sm uppercase">
            Book a Performance
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Playfair } from "next/font/google";

const playfair = Playfair({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  subsets: ["latin"],
});

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

import mImg0 from "@/assets/hero/mobile/img0.png"
import mImg1 from "@/assets/hero/mobile/img1.png"
import mImg2 from "@/assets/hero/mobile/img2.png"
import mImg3 from "@/assets/hero/mobile/img3.png"
import mImg4 from "@/assets/hero/mobile/img4.png"
import mImg5 from "@/assets/hero/mobile/img5.png"
import mImg6 from "@/assets/hero/mobile/img6.png"
import mImg7 from "@/assets/hero/mobile/img7.png"
import mImg8 from "@/assets/hero/mobile/img8.png"

import { Button } from "@/components/ui/button";
import Link from "next/link";

const images: StaticImageData[] = [imgUrl0, imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5, imgUrl6, imgUrl7];
const mobileImages: StaticImageData[] = [mImg0, mImg1, mImg2, mImg3, mImg4, mImg5, mImg6, mImg7, mImg8];

export default function Hero() {
  return (
    <section aria-label="Hero Section" className="flex mt-24 flex-col w-full min-h-[calc(20vh-100px)] md:min-h-[calc(100vh-100px)]">
      {/* Top Carousel Section */}
      <div className="relative w-full overflow-hidden hidden md:block md:h-[400px] shrink-0">
        <HeroSectionBgCarousel
          images={images}
          interval={4000}
          className="h-full w-full"
        />
      </div>

      {/* <div className="relative w-full overflow-hidden flex md:hidden h-[250px] sm:h-[300px] shrink-0">
        <HeroSectionBgCarousel
          images={mobileImages}
          interval={2000}
          className="h-full w-full"
        />
      </div> */}

      <div className="mt-4 flex md:hidden px-4">
        <HeroSectionBgCarousel
          images={mobileImages}
          interval={2000}
          className="relative h-[400px] rounded-2xl shadow-xl"
        />
      </div>
      {/* Bottom Content Section */}
      <div className="mx-auto mt-8 md:mt-0 flex w-full grow flex-col items-center justify-center bg-white px-4 md:py-10 lg:py-12 text-center">
        <h1 style={{ fontFamily: playfair.style.fontFamily }} className="text-3xl md:text-4xl lg:text-4xl xl:text-6xl font-bold tracking-tight text-gray-900">
          Shivaleela Cultural Trust <br /> <span className="text-primary">Igniting Souls Through Dance</span>
        </h1>
        <p className="my-6 max-w-3xl text-sm md:text-base text-gray-700">
          Discover the rhythm of tradition and innovation.{' '}
          <span className="text-primary italic font-medium">
            We teach, perform, and produce
          </span>{' '}
          captivating stories in Bharatanatyam and beyond. Join the dance & Musical celebrations!
        </p>
        <div className="flex flex-col w-full md:max-w-md sm:flex-row items-center justify-center gap-4">
          <Link href="/#classes" className="w-full">
            <Button className="w-full py-6 font-bold text-base" variant={'default'}>
              Enroll Classes
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-black text-white h-10 mt-4 py-10 hidden md:flex items-center justify-center text-sm md:text-base">
        <p className="">
          <span className="font-bold text-yellow-300">Admissions Open Now!</span> Bharatanatyam - Kathak - Hindustani Music - Carnatic Music for the year 2026-27! Contact <span className="font-bold text-yellow-300">+91 97439 00990</span>
        </p>
      </div>
    </section>
  );
}

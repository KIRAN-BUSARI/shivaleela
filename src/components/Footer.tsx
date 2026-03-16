"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { Icon: FaInstagram, label: "Instagram", link: "https://www.instagram.com/shivaleelanatyalaya/" },
    { Icon: FaFacebook, label: "Facebook", link: "https://www.facebook.com/shivaleelanatyalaya" },
  ];

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-secondary py-12 sm:py-14 md:py-16 text-white"
    >
      <div
        className={`w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 px-4 sm:px-6 md:px-8 lg:px-12 gap-8 sm:gap-10 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="lg:col-span-1 justify-center items-start hidden md:flex">
          <Image src={"/logo.png"} alt="logo" width={100} height={100} className="object-cover" />
        </div>

        <div className="lg:col-span-2 flex justify-between">
          Ashirwad <br />
          # 814, 100 feet Outer ring road, <br /> Kalidasa nagar, Hosakerehalli,<br /> Bsk 3rd stage, Bangalore : 560085.
          <div className="lg:col-span-1 justify-center items-start md:hidden flex">
            <Image src={"/logo.png"} alt="logo" width={100} height={100} className="object-cover" />
          </div>
        </div>


        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <span className="text-primary font-semibold text-lg sm:text-xl block mb-3 sm:mb-4">
              Classes
            </span>
            <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
              {["Bhartanatyam", "Carnatic Music", "Workshops", "Registrations"].map(
                (item, index) => (
                  <li
                    key={index}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <span className="text-primary font-semibold text-lg sm:text-xl block mb-3 sm:mb-4">
              Media
            </span>
            <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
              {["Gallery", "Videos", "Press", "Registrations"].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-primary font-semibold text-lg sm:text-xl block mb-3 sm:mb-4">
              Events
            </span>
            <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
              {["Upcoming Events", "Productions", "Past Events", "Festivals"].map(
                (item, index) => (
                  <li
                    key={index}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <span className="text-primary font-semibold text-lg sm:text-xl block mb-3 sm:mb-4">
              Home
            </span>
            <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
              {["Founder", "Achievements", "Contact Form", "Faq"].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`w-full max-w-7xl mx-auto mt-10 sm:mt-12 pt-6 sm:pt-8 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 transition-all duration-700 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Shivaleela Cultural Trust. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Design and developed by <Link href={"https://pixelcrew.in/"} target="_blank"> <span className="text-primary font-semibold">pixelcrew</span></Link>
          </p>
        </div>
        <div className="flex gap-4 sm:gap-6 text-white/50">
          {socialLinks.map(({ Icon, label, link }, index) => (
            <Link key={index} href={link} target="_blank" rel="noopener noreferrer">
              <Icon
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-white hover:scale-110 transition-all duration-300"
                aria-label={label}
                style={{
                  transitionDelay: isVisible ? `${(index + 4) * 100}ms` : "0ms",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer >
  );
}

export default Footer;
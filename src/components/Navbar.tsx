'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname() || '';
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastYRef = useRef(0);
  const rAFRef = useRef<number | null>(null);
  const hiddenRef = useRef(hidden);
  // Suppress observer updates during programmatic scrolls (e.g., clicking Home/logo)
  const suppressObserverRef = useRef(false);

  useEffect(() => {
    hiddenRef.current = hidden;
  }, [hidden]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduceMotion = mql.matches;
    const onScroll = () => {
      if (reduceMotion) return;
      if (rAFRef.current != null) return;
      rAFRef.current = window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const lastY = lastYRef.current;
        const shouldHide = y > lastY && y > 100;
        if (shouldHide !== hiddenRef.current) {
          setHidden(shouldHide);
        }
        lastYRef.current = y;
        rAFRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const onChange = () => {
      setHidden(false);
    };
    mql.addEventListener?.('change', onChange);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      window.removeEventListener('scroll', onScroll);
      mql.removeEventListener?.('change', onChange);
    };
  }, []);

  useEffect(() => {
    const sections = ['projects', 'services', 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return; // ignore while suppressed
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries[0].target as HTMLElement;
          const sectionId = mostVisible.id;
          const newHash = `#${sectionId}`;

          if (window.location.hash !== newHash) {
            setActiveSection(newHash);
            window.history.replaceState(null, '', newHash);
          }
        } else {
          const scrollY = window.scrollY || window.pageYOffset;
          if (scrollY < 100 && window.location.hash) {
            setActiveSection(null);
            window.history.replaceState(null, '', '/');
          }
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: '-20% 0px -30% 0px',
      }
    );

    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const initializeActiveSection = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (['#projects', '#services', '#contact'].includes(hash)) {
          setActiveSection(hash);
        } else if (pathname === '/') {
          setActiveSection(null);
        }
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (['#projects', '#services', '#contact'].includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection(null);
      }
    };

    initializeActiveSection();

    // Handle scroll on initial load or route change if hash is present
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash;
      if (['#projects', '#services', '#contact'].includes(hash)) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);
  const navLinks = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About Us',
      link: '/#about-us',
    },
    {
      name: 'Classes',
      link: '/#classes',
    },
    {
      name: 'Productions',
      link: '/#productions',
    },
    {
      name: 'Gallery',
      link: '/#gallery',
    },
    {
      name: 'Contact',
      link: '/#contact',
    },
  ];
  return (
    <nav aria-label="Primary navigation">
      <div
        className={`sticky top-0 z-50 h-28 w-full border-b border-gray-50/20 bg-white shadow-xl backdrop-blur-md transition-all duration-300 will-change-transform ${hidden ? 'pointer-events-none -translate-y-28 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="flex h-full items-center justify-between px-4 md:px-8">
          <div className="flex items-center text-xl md:ml-14 font-bold text-secondary md:text-2xl">
            <Link
              href={'/'}
              className="flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                suppressObserverRef.current = true;
                setActiveSection(null);
                window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
                setTimeout(() => {
                  suppressObserverRef.current = false;
                }, 500);
              }}
            >
              <Image
                src={'/logo.png'}
                quality={100}
                alt="logo"
                width={80}
                height={100}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden space-x-4 text-sm md:flex md:space-x-8 md:text-base">
            {navLinks.map((link) => {
              const isActive = (() => {
                if (link.link === '/') {
                  const currentHash =
                    typeof window !== 'undefined' ? window.location.hash : '';
                  return pathname === '/' && !currentHash && !activeSection;
                }
                if (link.link.startsWith('/#')) {
                  const hash = link.link.substring(1);
                  const currentHash =
                    typeof window !== 'undefined' ? window.location.hash : '';
                  return (
                    pathname === '/' &&
                    (activeSection === hash || currentHash === hash)
                  );
                }
                return pathname === link.link;
              })();

              const handleClick = (e: React.MouseEvent) => {
                if (link.link.startsWith('/#')) {
                  if (pathname === '/') {
                    e.preventDefault();
                    const hash = link.link.substring(1);
                    const targetElement = document.querySelector(hash);
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth',
                      });
                      // Delay updating activeSection until scroll finishes
                      setTimeout(() => {
                        setActiveSection(hash);
                        window.history.pushState(null, '', hash);
                      }, 400); // 400ms for smooth scroll
                    }
                  }
                } else if (link.link === '/') {
                  e.preventDefault();
                  suppressObserverRef.current = true;
                  setActiveSection(null);
                  window.history.pushState(null, '', '/');
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                  setTimeout(() => {
                    suppressObserverRef.current = false;
                  }, 500);
                }
              };

              return (
                <Link
                  key={link.name}
                  href={link.link}
                  onClick={handleClick}
                  className={`relative cursor-pointer font-bold transition-all duration-300 ease-out hover:text-primary focus:text-primary focus:outline-none ${isActive
                    ? 'scale-105 text-primary'
                    : 'text-secondary hover:scale-105'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center text-secondary transition-colors hover:text-primary md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="size-8" />
            ) : (
              <Menu className="size-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-300 md:hidden ${mobileMenuOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`flex h-full flex-col items-center justify-center space-y-8 transition-all duration-500 ${mobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-10 opacity-0'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((link, index) => {
            const isActive = (() => {
              if (link.link === '/') {
                const currentHash =
                  typeof window !== 'undefined' ? window.location.hash : '';
                return pathname === '/' && !currentHash && !activeSection;
              }
              if (link.link.startsWith('/#')) {
                const hash = link.link.substring(1);
                const currentHash =
                  typeof window !== 'undefined' ? window.location.hash : '';
                return (
                  pathname === '/' &&
                  (activeSection === hash || currentHash === hash)
                );
              }
              return pathname === link.link;
            })();

            const handleMobileClick = (e: React.MouseEvent) => {
              if (link.link.startsWith('/#')) {
                if (pathname === '/') {
                  e.preventDefault();
                  const hash = link.link.substring(1);
                  const targetElement = document.querySelector(hash);
                  if (targetElement) {
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }, 300);
                    setTimeout(() => {
                      setActiveSection(hash);
                      window.history.pushState(null, '', hash);
                    }, 700);
                  }
                } else {
                  setMobileMenuOpen(false);
                }
              } else if (link.link === '/') {
                e.preventDefault();
                suppressObserverRef.current = true;
                setActiveSection(null);
                setMobileMenuOpen(false);
                window.history.pushState(null, '', '/');
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
                setTimeout(() => {
                  suppressObserverRef.current = false;
                }, 800);
              }
            };

            return (
              <Link
                key={link.name}
                href={link.link}
                onClick={handleMobileClick}
                className={`group relative text-4xl font-bold transition-all duration-300 ease-out ${isActive ? 'text-primary' : 'text-[#f8f8f8]'
                  }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-primary">
                  {link.name}
                </span>
                {/* {isActive && (
                  <span className="absolute inset-x-0 -bottom-2 h-1 animate-pulse rounded-full bg-primary" />
                )} */}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

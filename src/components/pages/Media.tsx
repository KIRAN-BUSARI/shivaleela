"use client";

import Image from "next/image";
import { Trash2, Loader2, ImagePlus, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function MediaCard({
  url,
  index,
  isAdmin,
  onDelete,
  isVisible,
  small = false,
}: {
  url: string;
  index: number;
  isAdmin: boolean;
  onDelete: (url: string) => void;
  isVisible: boolean;
  small?: boolean;
}) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Remove this image?")) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (res.ok) onDelete(url);
      else alert("Failed to delete image");
    } catch {
      alert("Network error");
    } finally {
      setDeleting(false);
    }
  }

  const baseHeight = small ? "h-20 w-28" : "h-64 sm:h-72 md:h-80 lg:h-96";

  return (
    <div
      className={`relative ${baseHeight} overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
      }}
    >
      <Image
        src={url}
        alt={`Media image ${index + 1}`}
        fill
        className={`${small ? "object-cover" : "object-contain group-hover:scale-110"} transition-transform duration-500`}
        unoptimized
        loading={small ? "lazy" : "eager"}
      />
      {isAdmin && (
        <div className={`absolute inset-0 ${small ? "bg-transparent" : "bg-black/0 group-hover:bg-black/40"} transition-all duration-300 flex items-center justify-center`}>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`opacity-0 group-hover:opacity-100 ${small ? "opacity-100 bg-white/80 text-stone-700" : "bg-primary/90 hover:bg-primary text-white"} rounded-full p-1.5 shadow-lg transition-all duration-300`}
            title="Remove image"
          >
            {deleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function AddImageCard({ onUploaded }: { onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) onUploaded(data.url);
      else alert(data.error || "Upload failed");
    } catch {
      alert("Network error during upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl border-2 border-dashed border-stone-300 hover:border-primary/60 transition-all duration-300 bg-stone-50 group cursor-pointer shadow-lg hover:shadow-2xl">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        id="add-new-image"
      />
      <label
        htmlFor="add-new-image"
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer gap-3"
      >
        {uploading ? (
          <Loader2
            size={36}
            className="text-stone-400 animate-spin"
            strokeWidth={1.5}
          />
        ) : (
          <>
            <div className="border-2 border-stone-300 group-hover:border-primary/60 group-hover:scale-110 rounded-full p-3 transition-all duration-300">
              <ImagePlus
                size={28}
                className="text-stone-400 group-hover:text-primary/70 transition-colors duration-300"
                strokeWidth={1.5}
              />
            </div>
            <span className="text-[11px] text-stone-400 group-hover:text-primary tracking-widest uppercase font-light transition-colors duration-300">
              Add Image
            </span>
          </>
        )}
      </label>
    </div>
  );
}

function Media() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      });
    }, observerOptions);

    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsGridVisible(true);
        }
      });
    }, observerOptions);

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    async function init() {
      const res = await fetch("/api/admin/media/upload");
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      }

      const adminRes = await fetch("/api/admin/verify");
      if (adminRes.ok) {
        const { valid } = await adminRes.json();
        if (valid) setIsAdmin(true);
      }

      setLoading(false);
    }
    init();
  }, []);

  function handleDelete(url: string) {
    setImages((prev) => prev.filter((img) => img !== url));
    setCurrentIndex((idx) => Math.max(0, Math.min(idx, images.length - 2)));
  }

  function handleUploaded(url: string) {
    setImages((prev) => [...prev, url]);
    setCurrentIndex(images.length); // move to newly added
  }

  const showPlaceholders = images.length === 0;

  return (
    <div
      id="media"
      className="w-full max-w-7xl px-4 sm:px-6 md:px-8 mx-auto py-8 sm:py-10"
    >
      {/* <div
        ref={headerRef}
        className={`transition-all duration-700 ease-out ${isHeaderVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
          }`}
      >
        <p className="text-sm md:text-base text-gray-700">
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

      <div ref={gridRef} className="w-full">
        {loading ? (
          <div className="flex justify-center py-16 sm:py-20">
            <Loader2
              size={32}
              className="text-stone-400 animate-spin"
              strokeWidth={1.5}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {/* Large image area */}
            <div className="relative rounded-xl overflow-hidden shadow-sm bg-stone-50">
              {showPlaceholders ? (
                <div className="p-10 flex items-center justify-center">
                  <p className="text-stone-400">No images yet</p>
                </div>
              ) : (
                <div className="relative h-96 sm:h-[520px] md:h-[640px]">
                  <Image
                    src={images[currentIndex]}
                    alt={`Media image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                    loading="eager"
                  />

                  {/* Left / Right controls */}
                  <button
                    onClick={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    title="Previous"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    title="Next"
                  >
                    <ArrowRight size={18} />
                  </button>

                  {/* Delete button for admin on large */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => {
                          if (!confirm("Remove this image?")) return;
                          (async () => {
                            try {
                              const res = await fetch("/api/admin/media/upload", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ url: images[currentIndex] }),
                              });
                              if (res.ok) handleDelete(images[currentIndex]);
                              else alert("Failed to delete image");
                            } catch {
                              alert("Network error");
                            }
                          })();
                        }}
                        className="bg-primary/90 text-white rounded-full p-2 shadow-lg"
                        title="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-4">
              <div className="flex-1 overflow-x-auto">
                <div className="flex gap-3 pb-2">
                  {!showPlaceholders &&
                    images.map((url, i) => (
                      <div
                        key={url}
                        onClick={() => setCurrentIndex(i)}
                        className={`cursor-pointer rounded-md ring-2 ${i === currentIndex ? "ring-primary" : "ring-transparent"} overflow-hidden`}
                        style={{ minWidth: 112 }}
                      >
                        <MediaCard
                          url={url}
                          index={i}
                          isAdmin={isAdmin}
                          onDelete={handleDelete}
                          isVisible={true}
                          small
                        />
                      </div>
                    ))}

                  {isAdmin && (
                    <div className="min-w-28">
                      <AddImageCard onUploaded={handleUploaded} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Media;
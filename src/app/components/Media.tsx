"use client";

import Image from "next/image";
import ProductionImage from "@/assets/Productionimage.png";
import { Plus, Trash2, Loader2, ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function MediaCard({
  url,
  index,
  isAdmin,
  onDelete,
}: {
  url: string;
  index: number;
  isAdmin: boolean;
  onDelete: (url: string) => void;
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

  return (
    <div className="relative h-75 md:h-125 group rounded-lg overflow-hidden">
      <Image
        src={url}
        alt={`Media image ${index + 1}`}
        fill
        className="object-cover"
        unoptimized
        loading="eager"
      />
      {isAdmin && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600/90 hover:bg-red-700 text-white rounded-full p-2.5"
            title="Remove image"
          >
            {deleting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
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
    <div className="relative h-75 md:h-125 rounded-lg border-2 border-dashed border-stone-300 hover:border-amber-700/60 transition-colors duration-200 bg-stone-50 group cursor-pointer">
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
          <Loader2 size={36} className="text-stone-400 animate-spin" strokeWidth={1.5} />
        ) : (
          <>
            <div className="border-2 border-stone-300 group-hover:border-amber-700/60 rounded-full p-3 transition-colors duration-200">
              <ImagePlus size={28} className="text-stone-400 group-hover:text-amber-700/70 transition-colors duration-200" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] text-stone-400 group-hover:text-amber-800 tracking-widest uppercase font-light transition-colors duration-200">
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
  const [loading, setLoading] = useState(true);

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
  }

  function handleUploaded(url: string) {
    setImages((prev) => [...prev, url]);
  }

  const showPlaceholders = images.length === 0;

  return (
    <div
      id="media"
      className="w-full px-6 md:px-12 text-pretty text-justify min-h-screen mx-auto pt-24 pb-12"
    >
      <span className="text-3xl md:text-5xl font-serif">Media Outreach</span>
      <p className="leading-loose pt-5 text-gray-700">
        Shivaleela Cultural Trust boasts a dedicated team of professional
        artists with over 12 years of national and international stage
        excellence. Led by our visionary founder and supported by esteemed board
        members, each performer brings specialized mastery in Bharatanatyam,
        Kathak, Yakshagana, and folk forms. Our choreographers craft innovative
        productions like Punyakoti and Jai Jaganmathe, blending tradition with
        fresh storytelling. Highly trained dancers ensure every mudra and
        expression resonates deeply with audiences. This talented collective not
        only performs but mentors the next generation through Abhyasa classes.
        Their credentials—prestigious festival appearances and critical
        acclaim—build unbreakable trust. Meet the faces behind the footwork that
        captivates rasikas worldwide.
      </p>

      <div className="pt-8 w-full">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={32} className="text-stone-400 animate-spin" strokeWidth={1.5} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            {!showPlaceholders &&
              images.map((url, i) => (
                <MediaCard
                  key={url}
                  url={url}
                  index={i}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                />
              ))}

            {isAdmin && <AddImageCard onUploaded={handleUploaded} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Media;
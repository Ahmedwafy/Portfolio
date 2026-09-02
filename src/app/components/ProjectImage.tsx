"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProjectImage({
  src,
  alt,
  isActive,
}: {
  src: any;
  alt: string;
  isActive: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-(--bg-secondary)" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-all duration-500 ${
          isActive ? "grayscale-0 scale-100" : "grayscale scale-105"
        } ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </>
  );
}

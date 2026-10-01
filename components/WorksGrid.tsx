"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface Work {
  src: string;
  title: string;
  category: string;
  year: string;
}

export default function WorksGrid({ works }: { works: Work[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".reveal");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-16 px-6 md:px-12 lg:px-20" style={{ background: "var(--abyss)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {works.map((w, i) => (
          <div
            key={i}
            className="work-card reveal aspect-[4/5] bg-stone"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <Image
              src={w.src}
              alt={w.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="work-card-overlay" />
            <div className="work-card-info">
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: "var(--lantern)", fontFamily: "'Playfair Display SC', serif" }}
              >
                {w.category} · {w.year}
              </p>
              <h3
                className="text-2xl"
                style={{ color: "var(--candlelight)", fontFamily: "'Playfair Display SC', serif" }}
              >
                {w.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

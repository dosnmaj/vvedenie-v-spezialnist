"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 90;
const IMG_HEIGHT = 126;

function FlipCard({ src, index, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{ position: "absolute", width: IMG_WIDTH, height: IMG_HEIGHT, transformStyle: "preserve-3d", perspective: "1000px" }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-md" style={{ backfaceVisibility: "hidden" }}>
          <img src={src} alt={`work-${index}`} className="h-full w-full object-cover transition-all duration-500" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        </div>
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-md flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "rgba(43,18,13,0.95)", border: "1px solid rgba(156,76,57,0.3)" }}
        >
          <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: "var(--stone)" }}>View</p>
          <p className="text-xs font-medium mt-1" style={{ color: "var(--terra)", fontFamily: "var(--font-ui)" }}>Work</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const WORKS_IMAGES = [
  "/works/dolvo-opt.jpg",
  "/works/ardo-opt.jpg",
  "/works/parfume-opt.jpg",
  "/works/sysup-opt.jpg",
  "/works/artdir-opt.jpg",
  "/works/rabota-opt.jpg",
  "/works/sysup1-opt.jpg",
  "/works/parfume1-opt.jpg",
  "/works/artdir1-opt.jpg",
];

const TOTAL_IMAGES = WORKS_IMAGES.length;
const MAX_SCROLL = 3000;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function GalleryMorph() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      const atStart = scrollRef.current <= 0 && e.deltaY < 0;
      const atEnd = scrollRef.current >= MAX_SCROLL && e.deltaY > 0;
      if (atStart || atEnd) return; // let page scroll take over at boundaries
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const atEnd = scrollRef.current >= MAX_SCROLL && deltaY > 0;
      if (atEnd) return;
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set((((e.clientX - rect.left) / rect.width) * 2 - 1) * 80);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 500);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scatterPositions = useMemo(() =>
    WORKS_IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 800,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.6,
      opacity: 0,
    })), []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "var(--concrete)" }}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-full h-full">
          {WORKS_IMAGES.map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 100;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              target = { x: i * lineSpacing - lineTotalWidth / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDimension * 0.35, 300);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = { x: Math.cos(circleRad) * circleRadius, y: Math.sin(circleRad) * circleRadius, rotation: circleAngle + 90 };

              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);
              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const boundedRotation = -scrollProgress * spreadAngle * 0.8;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard key={i} src={src} index={i} total={TOTAL_IMAGES} phase={introPhase} target={target} />
            );
          })}
        </div>

        {/* Scroll to explore hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introPhase === "circle" && morphValue < 0.3 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}>
            Scroll to explore
          </p>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, transparent, var(--terra))" }} />
        </motion.div>

        {/* Virtual scroll progress bar */}
        <motion.div
          animate={{ opacity: introPhase === "circle" ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 120 }}
        >
          <div className="w-full h-px" style={{ background: "rgba(196,133,42,0.15)" }}>
            <motion.div
              className="h-full origin-left"
              style={{
                background: "var(--terra)",
                scaleX: morphValue,
              }}
            />
          </div>
        </motion.div>

        {/* Work count label */}
        <motion.p
          animate={{ opacity: introPhase === "circle" && morphValue > 0.5 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 right-8 pointer-events-none text-xs tracking-[0.3em] tabular-nums"
          style={{ color: "rgba(196,133,42,0.4)", fontFamily: "'Playfair Display SC', serif" }}
        >
          {TOTAL_IMAGES} works
        </motion.p>
      </div>
    </div>
  );
}

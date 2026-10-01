"use client";

import React, { useMemo, useEffect } from "react";
import { motion, useSpring, useTransform, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BarData {
  value: number;
}

export interface RevenueCardProps {
  title: string;
  subtitle: string;
  totalValue: number;
  unit?: string;
  icon: React.ReactNode;
  data: BarData[];
  className?: string;
}

export const RevenueCard = ({
  title,
  subtitle,
  totalValue,
  unit = "%",
  icon,
  data = [],
  className,
}: RevenueCardProps) => {
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value), 1), [data]);

  const animatedValue = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const displayValue = useTransform(animatedValue, (v) =>
    new Intl.NumberFormat("en-US").format(Math.round(v))
  );

  useEffect(() => {
    animatedValue.set(totalValue);
  }, [animatedValue, totalValue]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };

  const barVariants: Variants = {
    hidden: { height: "0%" },
    visible: (h: string) => ({
      height: h,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    }),
  };

  return (
    <div
      className={cn("flex w-full max-w-md flex-col rounded-2xl p-6", className)}
      style={{ background: "rgba(255,255,255,0.45)", border: "1px solid rgba(156,76,57,0.18)" }}
      role="figure"
      aria-label={`${title}: ${totalValue}${unit}`}
    >
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "var(--bark)", fontFamily: "var(--font-display)" }}>
            {title}
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--ash)" }}>
            {subtitle}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(156,76,57,0.12)" }}>
          {icon}
        </div>
      </header>

      <div className="my-8" aria-live="polite">
        <motion.span className="text-5xl font-bold tracking-tight" style={{ color: "var(--terra)", fontFamily: "var(--font-display)" }}>
          {displayValue}
        </motion.span>
        <span className="ml-2 text-xl" style={{ color: "var(--mud)" }}>
          {unit}
        </span>
      </div>

      <motion.div
        className="mt-auto flex h-32 w-full items-end gap-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Revenue growth chart"
      >
        {data.map((item, index) => {
          const barHeight = `${(item.value / maxValue) * 100}%`;
          return (
            <div key={index} className="relative h-full w-full rounded-t-sm">
              <div className="absolute bottom-0 h-full w-full rounded-t-sm" style={{ background: "rgba(156,76,57,0.1)" }} />
              <motion.div
                className="absolute bottom-0 w-full rounded-t-sm"
                style={{ background: "var(--terra)" }}
                variants={barVariants}
                custom={barHeight}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

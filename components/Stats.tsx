"use client";
import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
import { RevenueCard } from "@/components/ui/card-6";

const stats = [
  { value: 40,  suffix: "+",   label: "Projects completed" },
  { value: 5,   suffix: " yr", label: "In the profession" },
  { value: 30,  suffix: "+",   label: "Happy clients" },
  { value: 3,   suffix: "×",   label: "Avg revenue growth" },
];

const reviews = [
  {
    text: "Ксения создала для нас не просто логотип — она поняла суть бренда и воплотила её визуально. Результат превзошёл все ожидания.",
    author: "Анастасия Б.",
    role: "Founder, design studio",
  },
  {
    text: "Профессионализм на каждом этапе. Сайт, который она разработала, увеличил конверсию в 2,5 раза за первый месяц.",
    author: "Михаил О.",
    role: "CEO, digital agency",
  },
  {
    text: "Редкое сочетание — видит стратегически, чувствует эстетически. Наш бренд наконец обрёл своё лицо.",
    author: "Диана К.",
    role: "Art Director",
  },
];

const revenueData = Array.from({ length: 36 }, (_, i) => ({
  value: Math.round(40 + i * 2.5 + Math.sin(i * 0.5) * 8 + ((i * 7919) % 13)),
}));

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const reviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = reviewRef.current?.querySelectorAll(".reveal");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add("visible")),
      { threshold: 0.1 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="gray-block">
      {/* Figma-style large heading */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-4">
        <h2
          className="text-[clamp(3.5rem,12vw,11rem)] leading-none font-bold tracking-tight"
          style={{ color: "var(--black)", fontFamily: "var(--font-display)" }}
        >
          Статистика
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 pt-10">
        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="border-t pt-6" style={{ borderColor: "rgba(156,76,57,0.2)" }}>
              <div
                className="text-5xl md:text-6xl mb-3"
                style={{ color: "var(--terra)", fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p
                className="text-xs tracking-wider uppercase"
                style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue card */}
        <div className="mb-20 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
            >
              Client revenue after working with me
            </p>
            <h3
              className="text-3xl md:text-4xl leading-tight mb-6"
              style={{ color: "var(--bark)", fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Revenue grows<br />after every project
            </h3>
            <p
              className="text-sm leading-loose max-w-sm"
              style={{ color: "var(--mud)", fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              On average, clients see 3× revenue growth within 6 months of launching a new brand identity or website — measurable results from design that truly works.
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <RevenueCard
              title="Client Revenue Growth"
              subtitle="Average across 30+ projects"
              totalValue={287}
              unit="%"
              icon={<TrendingUp className="h-5 w-5" style={{ color: "var(--terra)" }} />}
              data={revenueData}
              className="w-full max-w-sm"
            />
          </div>
        </div>

        {/* Reviews */}
        <p
          className="text-xs tracking-widest uppercase mb-10"
          style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
        >
          What clients say
        </p>
        <div ref={reviewRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="reveal p-8 border"
              style={{ borderColor: "rgba(156,76,57,0.15)", background: "rgba(255,255,255,0.35)", transitionDelay: `${i * 150}ms` }}
            >
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--mud)", fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                &ldquo;{r.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--bark)", fontFamily: "var(--font-ui)" }}>{r.author}</p>
                <p className="text-xs mt-1 tracking-wider uppercase" style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}>{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-5 border-t" style={{ borderColor: "rgba(156,76,57,0.12)" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, k) => (
            <span key={k} className="flex items-center gap-12 px-6 whitespace-nowrap">
              {["Web Design", "Brand Marketing", "Identity", "UI/UX", "Visual Systems", "Typography"].map((t, j) => (
                <span key={j} className="flex items-center gap-12">
                  <span className="text-xs tracking-widest uppercase" style={{ color: "var(--terra)", fontFamily: "var(--font-ui)" }}>{t}</span>
                  <span style={{ color: "rgba(156,76,57,0.4)", fontSize: "5px" }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

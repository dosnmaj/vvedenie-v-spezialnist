"use client";
import { useEffect, useRef } from "react";

const contacts = [
  { label: "Telegram",  value: "@dosnmaj",           href: "https://t.me/dosnmaj" },
  { label: "Instagram", value: "@ksenia.voidstudio",  href: "https://www.instagram.com/ksenia.voidstudio?igsh=dXdjanZ4MXoyZHE0&utm_source=qr" },
  { label: "WhatsApp",  value: "Write on WhatsApp",   href: "https://api.whatsapp.com/send?phone=79197608005" },
  { label: "Email",     value: "dosnmaj@gmail.com",   href: "mailto:dosnmaj@gmail.com" },
];

export default function Contacts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".reveal");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add("visible")),
      { threshold: 0.1 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contacts" ref={sectionRef} className="relative gray-block overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-4">
        {/* Figma-style large heading */}
        <h2
          className="text-[clamp(3.5rem,12vw,11rem)] leading-none font-bold tracking-tight"
          style={{ color: "var(--black)", fontFamily: "var(--font-display)" }}
        >
          Контакты
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-10 pb-28">
        <p
          className="reveal text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
        >
          Connect
        </p>

        {/* "Get in touch" subtitle */}
        <h3
          className="reveal text-4xl md:text-6xl mb-6 leading-tight"
          style={{ color: "var(--bark)", fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          Get in{" "}
          <span style={{ color: "var(--terra)" }}>Touch</span>
        </h3>

        <p
          className="reveal text-sm leading-loose mb-16 max-w-md"
          style={{ color: "var(--mud)", fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          Tell me about your project — we will discuss the goals,
          <br />find the image and create something real.
        </p>

        {/* Primary CTA */}
        <div className="reveal mb-20">
          <a href="https://t.me/dosnmaj" target="_blank" rel="noopener noreferrer">
            <button
              className="text-sm tracking-widest uppercase px-10 h-12 cursor-pointer transition-opacity hover:opacity-75"
              style={{ background: "var(--bark)", color: "var(--stone)", fontFamily: "var(--font-ui)" }}
            >
              Start a project →
            </button>
          </a>
        </div>

        {/* Contact links */}
        <div className="flex flex-col gap-0">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="reveal group flex items-center justify-between py-7 border-t cursor-pointer"
              style={{ borderColor: "rgba(156,76,57,0.15)", textDecoration: "none", transitionDelay: `${i * 80}ms` }}
            >
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
              >
                {c.label}
              </span>
              <span
                className="text-lg md:text-2xl transition-all duration-300 group-hover:translate-x-2"
                style={{ color: "var(--bark)", fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {c.value}
                <span
                  className="ml-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "var(--terra)" }}
                >
                  →
                </span>
              </span>
            </a>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(156,76,57,0.15)" }} />
        </div>

        <div className="mt-20 flex items-end justify-between">
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}>
            © {new Date().getFullYear()} Ksenia Romanova
          </p>
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}>
            Web Designer · Brand Marketing
          </p>
        </div>
      </div>
    </section>
  );
}

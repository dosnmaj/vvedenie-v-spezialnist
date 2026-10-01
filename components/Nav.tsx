"use client";
import { useEffect, useState } from "react";

const links = [
  { href: "#main",     label: "Main" },
  { href: "#gallery",  label: "Gallery" },
  { href: "#about",    label: "About" },
  { href: "#process",  label: "Process" },
  { href: "#contacts", label: "Contacts" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(168,179,180,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(156,76,57,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#main"
          className="text-xs tracking-[0.35em] uppercase"
          style={{ color: "var(--bark)", fontFamily: "var(--font-ui)" }}
        >
          K · R
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 items-center">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-xs tracking-[0.25em] uppercase"
                style={{ color: "var(--mud)", fontFamily: "var(--font-ui)" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — dark button from Figma: #2B120D bg, stone text */}
        <a href="https://t.me/dosnmaj" target="_blank" rel="noopener noreferrer" className="hidden md:block">
          <button
            className="text-xs tracking-[0.25em] uppercase px-7 h-10 transition-all duration-300 hover:opacity-80 cursor-pointer"
            style={{
              background: "var(--bark)",
              color: "var(--stone)",
              fontFamily: "var(--font-ui)",
              border: "none",
            }}
          >
            Text me
          </button>
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="block w-6 h-px transition-all duration-300" style={{ background: "var(--bark)", transform: open ? "translateY(5px) rotate(45deg)" : "none" }} />
          <span className="block w-6 h-px transition-all duration-300" style={{ background: "var(--bark)", opacity: open ? 0 : 1 }} />
          <span className="block w-6 h-px transition-all duration-300" style={{ background: "var(--bark)", transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "400px" : "0", background: "rgba(168,179,180,0.97)", backdropFilter: "blur(14px)" }}
      >
        <ul className="flex flex-col gap-1 px-8 py-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block py-3 text-xs tracking-widest uppercase border-b"
                style={{ color: "var(--mud)", borderColor: "rgba(156,76,57,0.15)", fontFamily: "var(--font-ui)" }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a href="https://t.me/dosnmaj" target="_blank" rel="noopener noreferrer">
              <button
                className="w-full text-xs tracking-widest uppercase h-11 cursor-pointer transition-opacity hover:opacity-80"
                style={{ background: "var(--bark)", color: "var(--stone)", fontFamily: "var(--font-ui)" }}
              >
                Text me
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

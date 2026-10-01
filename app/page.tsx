"use client";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Stats from "@/components/Stats";
import Contacts from "@/components/Contacts";
import { MagicText } from "@/components/ui/magic-text";
import GalleryMorph from "@/components/ui/scroll-morph-hero";
import { motion, useInView } from "framer-motion";

function useReveal(selector = ".reveal") {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(selector);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// 7 process steps from Figma
const processSteps = [
  {
    num: "01",
    title: "Погружение в бренд",
    desc: "Начинаю с клиента: его истории, продукта, причины, по которой это появилось. Мне нужно понять, что делает бренд живым — какие чувства он вызывает и зачем людям становиться его частью.",
    progress: 14,
  },
  {
    num: "02",
    title: "Поиск характера",
    desc: "У каждого бренда есть свой характер. Я ищу его через ассоциации: культуру, искусство, архитектуру, кино, музыку, фотографию, моду, историю. Из этого собирается визуальная система — бренд можно узнать ещё до того, как появится первый экран.",
    progress: 28,
  },
  {
    num: "03",
    title: "Поиск смысла",
    desc: "Главный вопрос здесь: почему человек должен что-то почувствовать именно в этот момент? Продумываю путь пользователя, эмоции на каждом экране, темп и то, что запомнится.",
    progress: 43,
  },
  {
    num: "04",
    title: "Визуальная концепция",
    desc: "У каждого элемента есть причина быть на своём месте — типографика, композиция, сетка, пространство, цвет, фотография, движение. Всё это складывается в одну систему вокруг одной идеи.",
    progress: 57,
  },
  {
    num: "05",
    title: "Детализация",
    desc: "Смотрю на: ритм между блоками, как свет работает с пространством, скорость считывания информации, визуальные акценты, то, что человек почувствует за первые три секунды.",
    progress: 71,
  },
  {
    num: "06",
    title: "Проверка на эмоции",
    desc: "Перед сдачей задаю себе один вопрос: если убрать логотип — останется характер? Если нет, работа не закончена. Хороший дизайн узнают не по логотипу. Его узнают по ощущению.",
    progress: 85,
  },
  {
    num: "07",
    title: "Передача проекта",
    desc: "Вы получаете цельную визуальную систему, которую можно развивать дальше — чтобы бренд оставался собой и через несколько лет, а не только в момент запуска.",
    progress: 100,
  },
];

function ProcessStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col border-t pt-7"
      style={{ borderColor: "rgba(156,76,57,0.2)" }}
    >
      <p
        className="text-xs tracking-[0.3em] mb-5"
        style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
      >
        {step.num}
      </p>

      {/* Animated progress bar */}
      <div className="w-full h-px mb-6 relative overflow-hidden" style={{ background: "rgba(156,76,57,0.12)" }}>
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ background: "var(--terra)" }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${step.progress}%` } : { width: "0%" }}
          transition={{ duration: 1.6, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex justify-between items-baseline mb-6">
        <h3
          className="text-xl md:text-2xl leading-snug"
          style={{ color: "var(--terra)", fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {step.title}
        </h3>
        <motion.span
          className="text-xs tabular-nums ml-4 shrink-0"
          style={{ color: "rgba(156,76,57,0.4)", fontFamily: "var(--font-ui)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 1.2 }}
        >
          {step.progress}%
        </motion.span>
      </div>

      <p
        className="text-sm leading-loose"
        style={{ color: "var(--mud)", fontFamily: "var(--font-body)", fontWeight: 300 }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

// Perspective text from Figma
const PERSPECTIVE_TEXT = "Мне нравится работать с брендами, у которых есть характер и амбиции — которые хотят быть больше, чем просто товаром на полке. В работе я соединяю эстетику, стратегию и внимание к деталям, чтобы получались визуальные системы, по которым бренд узнают сразу. Мне интересно найти то, что действительно про этот конкретный бренд — и через что человек почувствует с ним связь. Хороший дизайн — не украшение. Это инструмент, который помогает бренду звучать увереннее и остаться в памяти надолго.";

export default function Home() {
  useReveal();
  const [galleryKey] = useState(() => Math.random());

  return (
    <main>
      <Nav />

      {/* ─── 1. HERO ─── */}
      <section
        id="main"
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ background: "var(--stone)" }}
      >
        {/* Hero video / image background */}
        <video
          autoPlay muted loop playsInline
          className="video-bg"
          style={{ opacity: 0.55 }}
          src="/videos/bg-hero.mov"
        />

        {/* Light overlay for Figma tone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(168,179,180,0.15) 0%, rgba(168,179,180,0) 40%, rgba(43,18,13,0.55) 85%, rgba(43,18,13,0.82) 100%)",
          }}
        />

        {/* Japanese vertical text decoration — from Figma */}
        <div
          className="absolute top-28 left-10 text-[5.5rem] leading-tight pointer-events-none select-none hidden lg:block"
          style={{
            color: "var(--terra)",
            fontFamily: "var(--font-display)",
            writingMode: "vertical-rl",
            letterSpacing: "0.15em",
            opacity: 0.65,
          }}
          aria-hidden
        >
          ク&nbsp;セ&nbsp;ニ&nbsp;ア&nbsp;・&nbsp;ロ&nbsp;マ&nbsp;ノ&nbsp;ワ
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-24 w-full">
          {/* Role row — Figma layout: "web-designer" · [Text me] · "brand marketing" */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex items-center gap-6 mb-8 flex-wrap"
          >
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--white)", fontFamily: "var(--font-ui)" }}
            >
              Web-Designer
            </span>
            <a href="https://t.me/dosnmaj" target="_blank" rel="noopener noreferrer">
              <button
                className="text-xs tracking-[0.25em] uppercase px-6 h-9 transition-opacity hover:opacity-75 cursor-pointer"
                style={{ background: "var(--bark)", color: "var(--stone)", fontFamily: "var(--font-ui)" }}
              >
                Text me
              </button>
            </a>
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--white)", fontFamily: "var(--font-ui)" }}
            >
              Brand Marketing
            </span>
          </motion.div>

          {/* Name — large terracotta, from Figma */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.9] tracking-tight"
            style={{ color: "var(--white)", fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Romanova
            <br />
            <span style={{ color: "var(--terra)" }}>Ksenia</span>
          </motion.h1>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div
            className="w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--terra))", height: 60 }}
            animate={{ scaleY: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* ─── 2. GALLERY — gray block from Figma → scroll-morph ─── */}
      <section id="gallery" className="relative gray-block" style={{ height: "100vh" }}>
        {/* Figma-style heading behind the gallery */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <p
            className="text-[clamp(4rem,12vw,10rem)] font-bold tracking-tight leading-none select-none opacity-[0.06]"
            style={{ color: "var(--black)", fontFamily: "var(--font-display)" }}
          >
            Галерея С Работами
          </p>
        </div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}>
            Gallery
          </p>
        </div>
        <GalleryMorph key={galleryKey} />
      </section>

      {/* ─── 3. ABOUT — light stone section ─── */}
      <section id="about" className="relative overflow-hidden paper-texture" style={{ background: "var(--stone)", minHeight: "100vh" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
          <p
            className="reveal text-xs tracking-[0.3em] uppercase mb-20"
            style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
          >
            About
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-start">
            <div>
              <h2
                className="reveal text-[clamp(2rem,5vw,4rem)] leading-[1.1] mb-12"
                style={{ color: "var(--bark)", fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                Design is a
                <br />
                dialogue with
                <br />
                <span style={{ color: "var(--terra)" }}>the audience</span>
              </h2>

              <div className="reveal ink-divider mb-12" />

              <p
                className="reveal text-base leading-[2] mb-8"
                style={{ color: "var(--mud)", fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                I am a web designer and brand marketing specialist. I work at the intersection of visual aesthetics and business thinking — I create images that are not just beautiful, they work.
              </p>
              <p
                className="reveal text-base leading-[2]"
                style={{ color: "var(--mud)", fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                Each project begins with deep immersion into the essence of the brand: its values, audience, context. The result is an identity that speaks without words.
              </p>
            </div>

            <div className="space-y-10 pt-4">
              {[
                { title: "Web Design", desc: "Sites that feel like a space — thoughtful, alive, converting." },
                { title: "Brand Identity", desc: "The visual voice of the brand: from concept to the final pixel." },
                { title: "Brand Marketing", desc: "A systemic view: positioning, archetypes, communication language." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="reveal border-l pl-8"
                  style={{ borderColor: "rgba(156,76,57,0.3)", transitionDelay: `${i * 120}ms` }}
                >
                  <h3
                    className="text-xl mb-3"
                    style={{ color: "var(--terra)", fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-loose"
                    style={{ color: "var(--mud)", fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── My Perspective on Design ─── */}
          <div className="mt-36">
            <p
              className="reveal text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
            >
              My perspective on design
            </p>
            <h3
              className="reveal text-[clamp(1.6rem,3.5vw,3.5rem)] mb-14 leading-tight"
              style={{ color: "var(--bark)", fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              My Perspective
              <br />
              <span style={{ color: "var(--terra)" }}>On Design</span>
            </h3>
            <div style={{ color: "var(--bark)" }}>
              <MagicText
                text={PERSPECTIVE_TEXT}
                className="text-lg md:text-xl leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "var(--mud)" }}
              />
            </div>
            {/* Quote from Figma */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mt-16 pl-8 border-l-2"
              style={{ borderColor: "var(--terra)" }}
            >
              <p
                className="text-lg italic leading-relaxed"
                style={{ color: "var(--terra)", fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                "Дизайн — это то, как я превращаю идею во впечатление, которое не забывается."
              </p>
            </motion.blockquote>

            {/* Text me CTA */}
            <div className="mt-14">
              <a href="https://t.me/dosnmaj" target="_blank" rel="noopener noreferrer">
                <button
                  className="text-sm tracking-[0.25em] uppercase px-10 h-12 transition-opacity hover:opacity-75 cursor-pointer"
                  style={{ background: "var(--bark)", color: "var(--stone)", fontFamily: "var(--font-ui)" }}
                >
                  Text me
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. PROCESS ─── */}
      <section id="process" className="relative paper-texture" style={{ background: "var(--fog)", minHeight: "100vh" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-16"
            style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
          >
            Process
          </p>

          <h2
            className="text-[clamp(2rem,5vw,4rem)] leading-tight mb-6"
            style={{ color: "var(--bark)", fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            How the image
            <br />
            <span style={{ color: "var(--terra)" }}>is born</span>
          </h2>

          <div className="flex items-center gap-6 mb-24">
            <div className="flex-1 h-px" style={{ background: "rgba(156,76,57,0.12)" }} />
            <span
              className="text-xs tracking-[0.2em] whitespace-nowrap"
              style={{ color: "var(--ash)", fontFamily: "var(--font-ui)" }}
            >
              From brief to brand
            </span>
          </div>

          {/* 7 steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-14">
            {processSteps.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. STATS — gray block from Figma ─── */}
      <Stats />

      {/* ─── 6. CONTACTS — gray block from Figma ─── */}
      <Contacts />
    </main>
  );
}

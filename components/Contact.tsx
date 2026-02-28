"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Twitter, Linkedin, ArrowUpRight, Mail, MapPin } from "lucide-react";

const NAV_LINKS = ["About", "Services", "Projects", "Contact"];
const SOCIAL = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="group relative flex items-center justify-center w-14 h-14 rounded-full border border-gray-200 hover:border-black transition-colors duration-300 overflow-hidden"
    >
      <span className="absolute inset-0 bg-black scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 origin-center" />
      <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
    </motion.a>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-white overflow-hidden"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(#f5a623 2px, transparent 1px), linear-gradient(90deg, #f5a623 2px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Mouse-tracking radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)",
          left: mousePos.x - 350,
          top: mousePos.y - (sectionRef.current?.getBoundingClientRect().top ?? 0) - 350,
          transition: "left 0.1s, top 0.1s",
        }}
      />

      {/* ── TOP DIVIDER ─────────────────────────────── */}
      <div className="w-full h-px bg-gray-100" />

      {/* ── HERO CTA AREA ──────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-20 pt-32 pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-gray-200 bg-gray-50"
        >
          <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
          <span className="text-[10px] font-black tracking-[4px] text-gray-500 uppercase">Available for work</span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          style={{ y: titleY, opacity: titleOpacity, fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 14vw, 13rem)", lineHeight: 0.82 }}
          className="font-black text-black leading-[0.82] mb-12 tracking-tight select-none font-light"
        >
          LET'S BUILD
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.5px #111" }}
          >
            SOMETHING
          </span>
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.5px #f5a623" }}
          >
            GREAT.
          </span>
        </motion.h2>

        {/* CTA Button */}
        <motion.a
          href="mailto:sobanafzalwork@gmail.com"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-4 mt-4 px-10 py-5 rounded-full bg-black text-white font-black text-sm tracking-[3px] uppercase overflow-hidden"
        >
          <span className="absolute inset-0 bg-[#f5a623] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <Mail size={16} className="relative z-10 group-hover:text-black transition-colors duration-300" />
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">SOBANAFZALWORK@GMAIL.COM</span>
          <ArrowUpRight size={16} className="relative z-10 group-hover:text-black transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.a>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mt-8 text-xs tracking-[3px] uppercase font-black text-gray-400"
        >
          <MapPin size={12} className="text-[#f5a623]" />
          <span>Based in Pakistan — Working Worldwide</span>
        </motion.div>
      </div>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer className="relative z-10 bg-[#0f0f0f] px-6 md:px-20 pt-16 pb-10">
        {/* Inner grid bg for footer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-14 border-b border-white/[0.07]">

            {/* Brand col */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#f5a623] flex items-center justify-center">
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-[#f5a623] text-lg font-black">S</span>
                </div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-white text-2xl font-black tracking-widest">SOBAN AFZAL</span>
              </div>
              <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                Designer & developer crafting bold digital experiences. Strategy, design, and code — all under one roof.
              </p>
              <div className="flex gap-3 mt-2">
                {SOCIAL.map(({ icon: Icon, label, href }) => (
                  <MagneticButton key={label} href={href}>
                    <Icon size={16} />
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Navigation col */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black tracking-[5px] text-white/25 uppercase mb-2">Navigation</p>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="group flex items-center gap-2 text-white/35 hover:text-white text-sm font-black tracking-widest uppercase transition-colors duration-300"
                >
                  <span className="w-0 h-px bg-[#f5a623] group-hover:w-5 transition-all duration-300" />
                  {link}
                </a>
              ))}
            </div>

            {/* Contact col */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black tracking-[5px] text-white/25 uppercase mb-2">Get in Touch</p>
              <a
                href="mailto:sobanafzalwork@gmail.com"
                className="group flex items-start gap-3 text-white/35 hover:text-white transition-colors duration-300"
              >
                <Mail size={14} className="mt-0.5 shrink-0 text-[#f5a623]" />
                <span className="text-sm font-black tracking-wider break-all">SOBANAFZALWORK@GMAIL.COM</span>
              </a>
              <div className="flex items-start gap-3 text-white/35">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#f5a623]" />
                <span className="text-sm font-black tracking-wider">PAKISTAN — WORLDWIDE</span>
              </div>
              <div className="mt-4 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" />
                  <span className="text-[10px] font-black tracking-[3px] text-white/30 uppercase">Status</span>
                </div>
                <p className="text-white/55 text-xs font-black tracking-wider uppercase">Open to Freelance & Full-time</p>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-white/20 text-[10px] font-black tracking-[4px] uppercase">
              © 2024 SOBAN AFZAL — ALL RIGHTS RESERVED
            </p>
            <p className="text-white/15 text-[10px] font-black tracking-[4px] uppercase">
              DESIGNED & BUILT BY SOBAN AFZAL
            </p>
          </div>
        </div>
      </footer>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}

export default Contact;
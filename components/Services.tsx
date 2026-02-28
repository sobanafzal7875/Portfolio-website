"use client";
import React, { useRef, useState, useEffect } from "react";

/* ── Illustrations ─────────────────────────────────────────── */
const IllustrationStrategy = () => (
    <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="72" width="120" height="8" rx="3" fill="#e5e7eb" />
        <rect x="30" y="80" width="6" height="20" rx="2" fill="#d1d5db" />
        <rect x="124" y="80" width="6" height="20" rx="2" fill="#d1d5db" />
        <rect x="45" y="52" width="70" height="22" rx="3" fill="#374151" />
        <rect x="47" y="54" width="66" height="18" rx="2" fill="#1f2937" />
        <rect x="50" y="18" width="60" height="38" rx="4" fill="#374151" />
        <rect x="52" y="20" width="56" height="34" rx="2" fill="#111827" />
        <polyline points="58,46 66,38 74,42 82,32 90,36 98,26 106,30" stroke="#f5a623" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="66" cy="38" r="2" fill="#f5a623" />
        <circle cx="82" cy="32" r="2" fill="#f5a623" />
        <circle cx="98" cy="26" r="2" fill="#f5a623" />
        <circle cx="80" cy="12" r="7" fill="#d1d5db" />
        <rect x="72" y="20" width="16" height="14" rx="4" fill="#6b7280" />
        <line x1="72" y1="26" x2="60" y2="34" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />
        <line x1="88" y1="26" x2="100" y2="34" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />
        <circle cx="59" cy="35" r="3" fill="#d1d5db" />
        <circle cx="101" cy="35" r="3" fill="#d1d5db" />
    </svg>
);

const IllustrationDesign = () => (
    <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="18" y="15" width="80" height="58" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
        <rect x="24" y="22" width="68" height="12" rx="2" fill="#e5e7eb" />
        <rect x="24" y="38" width="30" height="28" rx="2" fill="#e5e7eb" />
        <rect x="58" y="38" width="30" height="12" rx="2" fill="#f5a623" opacity="0.4" />
        <rect x="58" y="54" width="30" height="10" rx="2" fill="#e5e7eb" />
        <polygon points="90,58 90,72 93,68 96,75 98,74 95,67 99,67" fill="#374151" stroke="#374151" strokeWidth="0.5" />
        <circle cx="118" cy="30" r="10" fill="#f5a623" />
        <circle cx="132" cy="30" r="10" fill="#374151" />
        <circle cx="118" cy="48" r="10" fill="#e5e7eb" />
        <circle cx="132" cy="48" r="10" fill="#1f2937" />
        <line x1="120" y1="65" x2="140" y2="85" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <polygon points="120,65 116,70 118,72 124,68" fill="#f5a623" />
        <circle cx="140" cy="85" r="3" fill="#374151" />
    </svg>
);

const IllustrationDevelopment = () => (
    <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="15" y="12" width="95" height="72" rx="5" fill="#111827" />
        <rect x="15" y="12" width="95" height="16" rx="5" fill="#1f2937" />
        <circle cx="27" cy="20" r="3" fill="#ef4444" opacity="0.7" />
        <circle cx="37" cy="20" r="3" fill="#f59e0b" opacity="0.7" />
        <circle cx="47" cy="20" r="3" fill="#10b981" opacity="0.7" />
        <circle cx="133" cy="35" r="14" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
        <circle cx="133" cy="35" r="7" fill="none" stroke="#374151" strokeWidth="2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return <line key={i} x1={133 + 8 * Math.cos(rad)} y1={35 + 8 * Math.sin(rad)} x2={133 + 12 * Math.cos(rad)} y2={35 + 12 * Math.sin(rad)} stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />;
        })}
        <circle cx="133" cy="35" r="4" fill="#f5a623" />
        <circle cx="128" cy="72" r="10" fill="#fef3c7" />
        <circle cx="128" cy="72" r="5" fill="#f5a623" opacity="0.7" />
        <line x1="110" y1="55" x2="120" y2="55" stroke="#f5a623" strokeWidth="1" strokeDasharray="3,2" />
    </svg>
);

const IllustrationLaunch = () => (
    <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <ellipse cx="80" cy="45" rx="14" ry="30" fill="#374151" />
        <ellipse cx="80" cy="45" rx="10" ry="25" fill="#4b5563" />
        <circle cx="80" cy="38" r="6" fill="#f5a623" opacity="0.8" />
        <polygon points="66,65 72,55 72,72" fill="#374151" />
        <polygon points="94,65 88,55 88,72" fill="#374151" />
        <ellipse cx="80" cy="77" rx="8" ry="12" fill="#f5a623" opacity="0.9" />
        <ellipse cx="80" cy="50" rx="50" ry="15" stroke="#f5a623" strokeWidth="0.8" fill="none" strokeDasharray="4,3" opacity="0.3" />
        <circle cx="128" cy="78" r="10" fill="#f3f4f6" />
        <circle cx="128" cy="87" r="2" fill="#f5a623" />
    </svg>
);

const services = [
    {
        id: "01",
        title: "Strategy &\nDiscover",
        subtitle: "Research-first, insight-driven",
        description: "I deep-dive into your market, users, and competition to map out a bulletproof roadmap. Every decision is grounded in data.",
        tags: ["Research", "Analysis", "Roadmap"],
        Illustration: IllustrationStrategy,
        bg: "#ffffff",
    },
    {
        id: "02",
        title: "Design &\nPrototyping",
        subtitle: "Pixel-perfect, interaction-first",
        description: "From low-fi wireframes to high-fidelity interactive prototypes, I craft experiences users love.",
        tags: ["UX / UI", "Web Design", "Prototyping"],
        Illustration: IllustrationDesign,
        bg: "#fafafa",
    },
    {
        id: "03",
        title: "Development\n& Testing",
        subtitle: "Clean code, rock-solid QA",
        description: "Production-grade engineering with automated testing pipelines and performance budgets baked in.",
        tags: ["Next.js", "Fullstack", "Performance"],
        Illustration: IllustrationDevelopment,
        bg: "#f5f5f5",
    },
    {
        id: "04",
        title: "Launch &\nSupport",
        subtitle: "Ship fast, grow further",
        description: "Seamless deployment and post-launch support. I iterate on feedback and scale what's working.",
        tags: ["DevOps", "Scaling", "Growth"],
        Illustration: IllustrationLaunch,
        bg: "#f0f0f0",
    },
];

const STACK_OFFSET = 14; // px — each buried card peeks above the active one

export function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const scrolled = -rect.top;
            if (scrolled < 0) { setActiveIndex(0); return; }
            const totalScrollable = section.offsetHeight - window.innerHeight;
            if (totalScrollable <= 0) return;
            const progress = Math.min(scrolled / totalScrollable, 1);
            const index = Math.min(Math.floor(progress * services.length), services.length - 1);
            setActiveIndex(index);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="relative bg-white"
            style={{ height: `${services.length * 100}vh` }}
        >


            {/* Everything inside here is sticky */}
            <div className="sticky top-0 h-screen w-full flex flex-col px-6 md:px-10 overflow-hidden" style={{ paddingTop: "48px" }}>

                {/* Grid bg */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.1]"
                    style={{
                        backgroundImage: `linear-gradient(#f5a623 2px, transparent 1px), linear-gradient(90deg, #f5a623 2px, transparent 1px)`,
                        backgroundSize: "30px 30px",
                    }}
                />
                {/* Header */}
                <div className="mb-8 shrink-0 font-light">
                    <span className="text-[#f5a623] text-sm font-black uppercase tracking-[8px]">Expertise</span>
                    <h2 className="text-5xl md:text-[6vw] font-black text-black leading-none mt-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        MY SERVICES
                    </h2>
                </div>

                {/* Body */}
                <div className="flex flex-1 gap-16 min-h-0">

                    {/* Left nav */}
                    <div className="hidden lg:flex flex-col justify-start gap-10 w-[280px] shrink-0 pt-4">
                        {services.map((s, i) => (
                            <div key={s.id} className="flex items-center gap-5 cursor-default">
                                <span
                                    className="text-xs font-black tracking-widest transition-colors duration-300"
                                    style={{ color: activeIndex === i ? "#f5a623" : "#d1d5db" }}
                                >
                                    {s.id}
                                </span>
                                <span
                                    className="text-2xl font-black uppercase leading-none transition-all duration-300"
                                    style={{
                                        fontFamily: "'Bebas Neue', sans-serif",
                                        color: activeIndex === i ? "#f5a623" : "rgba(0,0,0,0.1)",
                                        display: "inline-block",
                                        transform: activeIndex === i ? "scale(1.08)" : "scale(1)",
                                        transformOrigin: "left center",
                                    }}
                                >
                                    {s.title.replace("\n", " ")}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:block w-px bg-gray-100 shrink-0" />

                    {/* Card stack */}
                    <div className="flex-1 relative" style={{ perspective: "1200px" }}>
                        {services.map((service, index) => {
                            // depth: 0 = top (active), 1 = one below, etc.
                            // Cards with index > activeIndex are not yet revealed — keep off screen below
                            const isRevealed = index <= activeIndex;
                            const depth = activeIndex - index; // 0 for active, 1 for previous, etc.

                            const translateY = isRevealed
                                ? -depth * STACK_OFFSET   // stack peek: each buried card shifts up slightly
                                : 600;                     // off-screen below
                            const scale = isRevealed ? 1 - depth * 0.04 : 1;
                            const overlayOpacity = isRevealed ? depth * 0.07 : 0;

                            return (
                                <div
                                    key={service.id}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        zIndex: index + 1,               // later cards on top
                                        transform: `translateY(${translateY}px) scale(${scale})`,
                                        transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                                        transformOrigin: "top center",
                                    }}
                                >
                                    <div
                                        className="relative w-full rounded-3xl overflow-hidden border border-gray-100 shadow-2xl"
                                        style={{ background: service.bg, minHeight: "380px" }}
                                    >
                                        {/* Dim overlay for buried cards */}
                                        <div
                                            className="absolute inset-0 bg-black rounded-3xl pointer-events-none"
                                            style={{ opacity: overlayOpacity, transition: "opacity 0.4s ease", zIndex: 20 }}
                                        />

                                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">
                                            {/* LEFT: text */}
                                            <div className="p-10 md:p-12 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <span className="text-xs font-black tracking-[5px] uppercase text-[#f5a623]">{service.id}</span>
                                                        <div className="h-px flex-1 bg-gray-200" />
                                                    </div>
                                                    <h3
                                                        className="font-black text-black leading-[0.9] mb-4 whitespace-pre-line"
                                                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 3.5vw, 4rem)" }}
                                                    >
                                                        {service.title}
                                                    </h3>
                                                    <p className="text-[#f5a623] text-xs font-black uppercase tracking-[4px] mb-5">{service.subtitle}</p>
                                                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{service.description}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-8">
                                                    {service.tags.map((tag) => (
                                                        <span key={tag} className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-gray-200 text-gray-400">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* RIGHT: illustration */}
                                            <div className="flex items-center justify-center p-10 bg-gray-50/60">
                                                <div className="w-[220px] h-[160px]">
                                                    <service.Illustration />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Services;
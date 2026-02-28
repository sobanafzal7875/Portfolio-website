"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ─── 3D CUBE ICON ─── */
export const CubeIcon = ({ size = 36, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,4 36,13 36,27 20,36 4,27 4,13" stroke="#f5a623" strokeWidth="1.5" fill="rgba(245,166,35,0.08)" />
        <polygon points="20,4 36,13 20,22 4,13" stroke="#f5a623" strokeWidth="1" fill="rgba(245,166,35,0.12)" />
        <line x1="20" y1="22" x2="20" y2="36" stroke="#f5a623" strokeWidth="1" />
        <line x1="20" y1="22" x2="36" y2="13" stroke="#f5a623" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="20" y1="22" x2="4" y2="13" stroke="#f5a623" strokeWidth="0.8" strokeOpacity="0.5" />
    </svg>
);

export function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-20 py-5 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
        >
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Soban<span className="text-[#f5a623] text-3xl">.</span>
                {/* <CubeIcon size={28} className="ml-1 opacity-80" /> */}
            </div>

            <ul className="hidden md:flex items-center gap-10 list-none">
                {["Home", "About", "Services", "Projects"].map((item) => (
                    <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-[3px] text-black hover:text-[#f5a623] transition-all relative group">
                            {item}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-6">
                <a href="mailto:sobanafzalwork@gmail.com" className="px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#f5a623] transition-all">
                    Contact
                </a>
            </div>
        </motion.nav>
    );
}

export default NavBar;

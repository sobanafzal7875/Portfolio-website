"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/NavBar";
import HeroAbout from "@/components/HeroAbout";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial loading simulation
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* GLOBAL FONTS & STYLES */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@200..800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #ffffff;
          overflow-x: hidden;
        }

        html {
          scroll-behavior: smooth;
        }

        /* CUSTOM SCROLLBAR */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #f5a623;
          border-radius: 10px;
        }
      `}</style>

      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            <div className="text-8xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              SOBAN<span className="text-[#f5a623]">.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {!loading && (
        <>
          <NavBar />
          <main>
            <section id="home">
              <HeroAbout />
            </section>
            <section id="services">
              <Services />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </main>
        </>
      )}
    </div>
  );
}

"use client";
import React, { useRef, useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accent: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "CASE STUDY:\nNEXUS",
    subtitle: "BRAND IDENTITY SYSTEM",
    description:
      "Crafted a full brand identity for a fintech startup — from logo system to motion guidelines. Built for trust, designed for scale.",
    tags: ["Branding", "Motion", "Strategy"],
    accent: "#f5a623",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: "02",
    title: "E-COMMERCE:\nAURA",
    subtitle: "LUXURY COSMETICS PLATFORM",
    description:
      "Designed and developed a premium e-commerce experience for a high-end cosmetics brand. Editorial layouts, silky interactions.",
    tags: ["UX/UI", "Next.js", "Shopify"],
    accent: "#e879a0",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  },
  {
    id: "03",
    title: "WEB APP:\nPORTFOLIO",
    subtitle: "PERSONAL PORTFOLIO DESIGN",
    description:
      "A brutalist-meets-editorial portfolio that pushes layout boundaries. Scroll-driven animations, bold type, precise motion.",
    tags: ["React", "GSAP", "Design"],
    accent: "#38bdf8",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
  {
    id: "04",
    title: "PRODUCT DESIGN:\nECHO",
    subtitle: "BIOMETRIC DATA WEARABLE",
    description:
      "Designed the full UX/UI and industrial aesthetics for a next-gen wellness tracker. Focused on ergonomic data visualization and sustainable material selection.",
    tags: ["UX/UI", "3D Modeling", "HCI"],
    accent: "#f5a623",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
];

interface CardTransform {
  x: number;
  z: number;
  scale: number;
  opacity: number;
  zIndex: number;
  blur: number;
  angle: number;
}

// Circular positions around a center point (in 3D-ish space)
function getCardTransform(index: number, activeIndex: number, total: number): CardTransform {
  const diff = ((index - activeIndex) % total + total) % total;
  // diff 0 = front/active, 1 = right, 2 = back, 3 = left (for 4 cards)
  const angle = (diff / total) * 360;
  const rad = (angle * Math.PI) / 180;

  // Carousel: cards orbit in a flat ellipse
  const rx = 320; // horizontal radius
  const rz = 120; // depth radius

  const x = Math.sin(rad) * rx;
  const z = Math.cos(rad) * rz - rz; // shift so front card is at z=0

  // Scale based on depth
  const scale = 0.55 + 0.45 * ((z + rz) / rz);
  const opacity = diff === 0 ? 1 : diff === 1 || diff === total - 1 ? 0.55 : 0.25;
  const zIndex = diff === 0 ? 10 : diff === 1 || diff === total - 1 ? 5 : 2;
  const blur = diff === 0 ? 0 : diff === 1 || diff === total - 1 ? 1 : 3;

  return { x, z, scale, opacity, zIndex, blur, angle };
}

function ProjectCard({ project, transform, isActive, onHover }: { project: Project; transform: CardTransform; isActive: boolean; onHover: (hovering: boolean) => void }) {
  const { x, scale, opacity, zIndex, blur } = transform;

  return (
    <div
      onMouseEnter={() => isActive && onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        position: "absolute",
        left: "50%",
        top: "35%",
        width: "480px",
        transform: `translate(calc(-50% + ${x}px), -50%) scale(${scale})`,
        opacity,
        zIndex,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transformOrigin: "center center",
        pointerEvents: isActive ? "all" : "none",
      }}
    >
      <CardInner project={project} isActive={isActive} />
    </div>
  );
}

function CardInner({ project, isActive }: { project: Project; isActive: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        background: "#0f0f0f",
        border: `1px solid ${hovered && isActive ? project.accent : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered && isActive
          ? `0 0 60px ${project.accent}55, 0 0 120px ${project.accent}22, 0 30px 80px rgba(0,0,0,0.8)`
          : "0 20px 60px rgba(0,0,0,0.6)",
        transform: hovered && isActive ? "scale(1.03) translateY(-6px)" : "scale(1) translateY(0)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer",
        minHeight: "360px",
      }}
    >
      {/* Glow border pulse */}
      {hovered && isActive && (
        <div style={{
          position: "absolute", inset: -1, borderRadius: "24px",
          background: `linear-gradient(135deg, ${project.accent}44, transparent 60%)`,
          zIndex: 0, pointerEvents: "none",
        }} />
      )}

      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered && isActive ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "brightness(0.75) saturate(1.2)",
          }}
        />
        {/* Gradient overlay on image */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, #0f0f0f 100%)`,
        }} />
        {/* Accent top-left corner glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          opacity: hovered && isActive ? 1 : 0.4,
          transition: "opacity 0.3s",
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "20px 28px 28px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <span style={{ color: project.accent, fontSize: "11px", fontWeight: 900, letterSpacing: "4px", fontFamily: "'Bebas Neue', sans-serif" }}>
            {project.id}
          </span>
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 0.9,
          whiteSpace: "pre-line",
          marginBottom: "10px",
          letterSpacing: "1px",
        }}>
          {project.title}
        </h3>

        <p style={{
          color: project.accent,
          fontSize: "10px",
          fontWeight: 900,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "14px",
          fontFamily: "'Bebas Neue', sans-serif",
        }}>
          {project.subtitle}
        </p>

        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", lineHeight: 1.65, marginBottom: "20px" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "2px",
              padding: "5px 12px", borderRadius: "999px",
              border: `1px solid rgba(255,255,255,0.15)`,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              background: hovered && isActive ? "rgba(255,255,255,0.05)" : "transparent",
              transition: "background 0.3s",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

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
      const index = Math.min(Math.floor(progress * projects.length), projects.length - 1);
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        position: "relative",
        background: "#0a0a0a",
        height: `${projects.length * 100}vh`,
      }}
    >


      {/* Radial glow center */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 50% at 65% 55%, rgba(245,166,35,0.06) 0%, transparent 70%)`,
      }} />

      {/* Sticky container */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        padding: "130px 48px 0",
        overflow: "hidden",
      }}>

        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05,
          backgroundImage: `linear-gradient(#f5a623 1.5px, transparent 1px), linear-gradient(90deg, #f5a623 1.5px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }} />

        {/* Header */}
        <div style={{ marginBottom: "32px", flexShrink: 0 }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 5rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "2px",
          }}>
            MY PROJECTS
          </h2>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, gap: "48px", minHeight: 0 }}>

          {/* Left nav */}
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "flex-start",
            gap: "28px", width: "320px", flexShrink: 0, paddingTop: "16px",
          }}>
            {projects.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "default" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 900, letterSpacing: "4px",
                  color: activeIndex === i ? p.accent : "rgba(255,255,255,0.2)",
                  transition: "color 0.4s", fontFamily: "'Bebas Neue', sans-serif",
                }}>
                  {p.id}
                </span>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.6rem", fontWeight: 900, letterSpacing: "1px",
                  color: activeIndex === i ? p.accent : "rgba(255,255,255,0.12)",
                  transform: activeIndex === i ? "scale(1.06)" : "scale(1)",
                  display: "inline-block",
                  transformOrigin: "left center",
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                  textTransform: "uppercase",
                }}>
                  {p.title.replace("\n", " ")}
                </span>
              </div>
            ))}

            {/* Scroll indicator */}
            <div style={{ marginTop: "auto", paddingBottom: "48px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {projects.map((_, i) => (
                  <div key={i} style={{
                    height: "3px",
                    width: activeIndex === i ? "28px" : "8px",
                    borderRadius: "2px",
                    background: activeIndex === i ? projects[activeIndex].accent : "rgba(255,255,255,0.15)",
                    transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }} />
                ))}
              </div>
              <p style={{
                color: "rgba(255,255,255,0.25)", fontSize: "10px", letterSpacing: "3px",
                textTransform: "uppercase", marginTop: "10px", fontWeight: 700,
              }}>
                Scroll to explore
              </p>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="ml-1"
          style={{ width: "2px", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

          {/* Circular carousel */}
          <div style={{
            flex: 1, position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Orbit ring hint */}
            <div style={{
              position: "absolute",
              width: "640px", height: "200px",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "50%",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }} />

            {projects.map((project, index) => {
              const transform = getCardTransform(index, activeIndex, projects.length);
              const isActive = index === activeIndex;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  transform={transform}
                  isActive={isActive}
                  onHover={setHovering}
                />
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

export default Projects;
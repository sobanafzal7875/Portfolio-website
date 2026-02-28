"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─── CIRCUIT BOARD BACKGROUND SVG ─────────────────────── */
const CircuitBackground = () => (
    <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.4 }}
    >
        {/* LEFT SIDE CIRCUIT LINES */}
        <line x1="60" y1="0" x2="60" y2="100%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="60" y1="18%" x2="180" y2="18%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="60" y1="35%" x2="220" y2="35%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="60" y1="52%" x2="160" y2="52%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="60" y1="68%" x2="200" y2="68%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="60" y1="82%" x2="140" y2="82%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="120" y1="18%" x2="120" y2="27%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="120" y1="27%" x2="200" y2="27%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="160" y1="35%" x2="160" y2="44%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="100" y1="52%" x2="100" y2="60%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />

        {/* RIGHT SIDE CIRCUIT LINES */}
        <line x1="calc(100% - 60px)" y1="0" x2="calc(100% - 60px)" y2="100%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="calc(100% - 60px)" y1="22%" x2="calc(100% - 220px)" y2="22%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="calc(100% - 60px)" y1="40%" x2="calc(100% - 180px)" y2="40%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="calc(100% - 60px)" y1="58%" x2="calc(100% - 240px)" y2="58%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="calc(100% - 60px)" y1="74%" x2="calc(100% - 160px)" y2="74%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="calc(100% - 160px)" y1="22%" x2="calc(100% - 160px)" y2="32%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="calc(100% - 160px)" y1="32%" x2="calc(100% - 280px)" y2="32%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />

        {/* NODES */}
        <circle cx="60" cy="18%" r="5" fill="#f5a623" fillOpacity="0.7" />
        <circle cx="60" cy="35%" r="4" fill="#f5a623" fillOpacity="0.6" />
        <circle cx="60" cy="52%" r="5" fill="#f5a623" fillOpacity="0.7" />
        <circle cx="60" cy="68%" r="3" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="60" cy="82%" r="4" fill="#f5a623" fillOpacity="0.6" />
        <circle cx="120" cy="18%" r="3" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="180" cy="18%" r="4" fill="#f5a623" fillOpacity="0.6" />
        <circle cx="200" cy="27%" r="3" fill="#f5a623" fillOpacity="0.4" />
        <circle cx="220" cy="35%" r="4" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="160" cy="52%" r="3" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="200" cy="68%" r="4" fill="#f5a623" fillOpacity="0.6" />
        <circle cx="140" cy="82%" r="3" fill="#f5a623" fillOpacity="0.4" />

        <circle cx="calc(100% - 60px)" cy="22%" r="5" fill="#f5a623" fillOpacity="0.7" />
        <circle cx="calc(100% - 60px)" cy="40%" r="4" fill="#f5a623" fillOpacity="0.6" />
        <circle cx="calc(100% - 60px)" cy="58%" r="5" fill="#f5a623" fillOpacity="0.7" />
        <circle cx="calc(100% - 60px)" cy="74%" r="3" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="calc(100% - 220px)" cy="22%" r="4" fill="#f5a623" fillOpacity="0.6" />
        <circle cx="calc(100% - 180px)" cy="40%" r="3" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="calc(100% - 160px)" cy="32%" r="3" fill="#f5a623" fillOpacity="0.4" />
    </svg>
);

/* ─── ABOUT DECORATIVE ELEMENTS ─── */
const AboutDecoBackground = () => (
    <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.5 }}
    >
        <circle cx="calc(100% - 300px)" cy="35%" r="5" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="calc(100% - 260px)" cy="45%" r="3" fill="#f5a623" fillOpacity="0.4" />
        <circle cx="calc(100% - 200px)" cy="38%" r="4" fill="#f5a623" fillOpacity="0.45" />
        <circle cx="calc(100% - 160px)" cy="55%" r="5" fill="#f5a623" fillOpacity="0.5" />
        <circle cx="calc(100% - 120px)" cy="42%" r="3" fill="#f5a623" fillOpacity="0.35" />
        <circle cx="calc(100% - 80px)" cy="62%" r="4" fill="#f5a623" fillOpacity="0.4" />
        <circle cx="calc(100% - 340px)" cy="60%" r="3" fill="#f5a623" fillOpacity="0.35" />
        <circle cx="calc(100% - 220px)" cy="70%" r="4" fill="#f5a623" fillOpacity="0.4" />

        <line x1="calc(100% - 300px)" y1="35%" x2="calc(100% - 200px)" y2="38%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="calc(100% - 200px)" y1="38%" x2="calc(100% - 160px)" y2="55%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="calc(100% - 160px)" y1="55%" x2="calc(100% - 80px)" y2="62%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="calc(100% - 260px)" y1="45%" x2="calc(100% - 160px)" y2="55%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="calc(100% - 340px)" y1="60%" x2="calc(100% - 220px)" y2="70%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="calc(100% - 300px)" y1="35%" x2="calc(100% - 340px)" y2="60%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.3" />

        <circle cx="120" cy="75%" r="4" fill="#f5a623" fillOpacity="0.4" />
        <circle cx="80" cy="85%" r="3" fill="#f5a623" fillOpacity="0.3" />
        <circle cx="160" cy="88%" r="4" fill="#f5a623" fillOpacity="0.35" />
        <line x1="80" y1="85%" x2="120" y2="75%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="120" y1="75%" x2="160" y2="88%" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.35" />
    </svg>
);

/* ─── HEXAGON SHAPES for About ─── */
const HexagonDecor = () => (
    <div className="absolute right-[20px] top-[15%] pointer-events-none z-[2] opacity-60">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-0">
            <polygon points="60,5 100,27 100,73 60,95 20,73 20,27" stroke="#f5a623" strokeWidth="1.5" fill="rgba(245,166,35,0.06)" />
        </svg>
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-[90px] top-[30px]">
            <polygon points="35,3 62,18 62,52 35,67 8,52 8,18" stroke="#c8a84b" strokeWidth="1" fill="none" strokeOpacity="0.6" />
        </svg>
        {/* 3D cube top right */}
        <div className="absolute right-[130px] top-[-10px]">
            <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="27,4 50,17 50,39 27,52 4,39 4,17" stroke="#f5a623" strokeWidth="1.5" fill="rgba(245,166,35,0.07)" />
                <polygon points="27,4 50,17 27,30 4,17" stroke="#f5a623" strokeWidth="1" fill="rgba(245,166,35,0.1)" />
                <line x1="27" y1="30" x2="27" y2="52" stroke="#f5a623" strokeWidth="1" />
            </svg>
        </div>
    </div>
);

/* ─── CODE SNIPPET OVERLAY ─── */
const CodeOverlay = () => (
    <div
        className="absolute left-[20px] top-[12%] z-[2] pointer-events-none"
        style={{
            fontFamily: "monospace",
            fontSize: "10px",
            color: "#c8a84b",
            opacity: 0.42,
            lineHeight: "1.9",
            maxWidth: "220px",
        }}
    >
        <div>&lt;div class="digital-product"&gt;</div>
        <div style={{ paddingLeft: "12px" }}>&lt;component type="build" &gt;is sorted&gt;</div>
        <div style={{ paddingLeft: "24px" }}>&lt; properties(type) &gt;</div>
        <div style={{ paddingLeft: "24px" }}>{"{ dup|selector|txt }"}</div>
        <div style={{ paddingLeft: "12px" }}>{"}"}</div>
        <div>&lt;/div&gt;</div>
    </div>
);

const NodesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 100;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 5;
            }

            update(w: number, h: number) {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }

            draw(ctx: CanvasRenderingContext2D, mouse: { x: number; y: number }) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const spotlightRadius = 180;
                const opacity = Math.max(0, 1 - dist / spotlightRadius);
                if (opacity > 0) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(245, 166, 35, ${opacity * 1.5})`;
                    ctx.fill();
                }
            }
        }

        const init = () => {
            const w = canvas.width = window.innerWidth;
            const h = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(w, h));
            }
        };

        const drawLines = (w: number, h: number, mouse: { x: number; y: number }) => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        const cx = (p1.x + p2.x) / 2;
                        const cy = (p1.y + p2.y) / 2;
                        const mdx = cx - mouse.x;
                        const mdy = cy - mouse.y;
                        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                        const spotlightRadius = 180;
                        const opacity = Math.max(0, (1 - dist / 180) * (1 - mdist / spotlightRadius));
                        if (opacity > 0) {
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(245, 166, 35, ${opacity * 0.8})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const w = canvas.width;
            const h = canvas.height;
            particles.forEach(p => {
                p.update(w, h);
                p.draw(ctx, mouseRef.current);
            });
            drawLines(w, h, mouseRef.current);
            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => { init(); };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);
        init();
        render();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export function HeroAbout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const personX = useTransform(smoothProgress, [0, 0.45], ["0%", "30vw"]);
    const personScale = useTransform(smoothProgress, [0, 0.45], [1, 1.4]);
    const personOpacity = useTransform(smoothProgress, [0.8, 1], [1, 1]);

    const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
    const heroY = useTransform(smoothProgress, [0, 0.25], [0, -100]);

    const aboutOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.9], [0, 1, 1]);
    const aboutX = useTransform(smoothProgress, [0.3, 0.5], ["-10vw", "0vw"]);

    const circuitHeroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
    const circuitAboutOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

    return (
        <div id="home" ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
                <NodesBackground />

                <motion.div style={{ opacity: circuitHeroOpacity }} className="absolute inset-0 z-[1] pointer-events-none">
                    {/* <CircuitBackground /> */}
                    <div className="absolute left-[120px] top-[60px] z-[2]">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 8px rgba(245,166,35,0.6))" }}>
                            <polygon points="25,3 46,14 46,36 25,47 4,36 4,14" stroke="#f5a623" strokeWidth="1.5" fill="rgba(245,166,35,0.12)" />
                            <polygon points="25,3 46,14 25,25 4,14" stroke="#f5a623" strokeWidth="1" fill="rgba(245,166,35,0.15)" />
                            <line x1="25" y1="25" x2="25" y2="47" stroke="#f5a623" strokeWidth="1" />
                        </svg>
                    </div>
                </motion.div>

                <motion.div style={{ opacity: circuitAboutOpacity }} className="absolute inset-0 z-[1] pointer-events-none">
                    {/* <AboutDecoBackground /> */}
                    {/* <CodeOverlay /> */}
                    {/* <HexagonDecor /> */}
                </motion.div>

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none pb-30"
                >
                    <div className="mb-10 text-[#f5a623] text-sm font-black uppercase tracking-[8px]">
                        Hi, I am Soban
                    </div>
                    <h1 className="flex flex-col leading-[0.8]"
                     style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                     >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-[18vw] md:text-[15vw] text-black"
                        >
                            FULLSTACK
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-[18vw] md:text-[15vw] text-transparent"
                            style={{ WebkitTextStroke: "2px #f5a623" }}
                        >
                            DEVELOPER
                        </motion.span>
                    </h1>
                </motion.div>

                <motion.div
                    id="about"
                    style={{ opacity: aboutOpacity, x: aboutX }}
                    className=" absolute inset-0 flex items-center px-6 md:px-20 lg:px-10 z-20 pointer-events-none pt-[100px]"
                >
                    <div className="max-w-4xl pointer-events-auto">
                        <p className="text-[#f5a623] text-sm font-black uppercase tracking-[8px] mb-6">
                            Who I Am
                        </p>
                        <h2 className="text-6xl md:text-[6vw] font-light font-black text-black leading-none mb-10"
                        
                         style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                            Building digital<br />
                            <span
                             className="text-transparent" 
                             
                            style={{ WebkitTextStroke: "1px #f5a623", letterSpacing: "1.5px" }}>
                                products that matter.
                                </span>
                        </h2>

                        <div className="max-w-2xl text-gray-500 font-medium text-lg md:text-xl leading-relaxed space-y-8">
                            <p>
                                I'm a freelance fullstack developer. I craft end-to-end digital experiences — from pixel-perfect UIs to rock-solid APIs — with a relentless focus on performance, clarity, and craft.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    style={{ x: personX, scale: personScale, opacity: personOpacity, translateX: "-50%" }}
                    className="absolute bottom-[-5%] left-1/2 w-[90vw] md:w-[45vw] lg:w-[28vw] z-[15] pointer-events-none origin-bottom"
                >
                    <motion.img src="/port.png" alt="Soban" className="w-full h-auto grayscale" />
                </motion.div>
            </div>
        </div>
    );
}

export default HeroAbout;

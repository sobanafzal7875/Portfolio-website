"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";


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
                    className="absolute bottom-[-5%] left-1/2 w-[90vw] md:w-[45vw] lg:w-[28vw] z-[15] pointer-events-none origin-bottom hidden sm:block md:block"
                >
                    <motion.img src="/port.png" alt="Soban" className="w-full h-auto grayscale" />
                </motion.div>

                {/* Mobile version of the image (Hero only) */}
                <motion.div
                    style={{ scale: personScale, opacity: heroOpacity, translateX: "-50%" }}
                    className="absolute bottom-[-5%] left-1/2 w-[95vw] z-[15] pointer-events-none origin-bottom sm:hidden"
                >
                    <motion.img src="/port.png" alt="Soban" className="w-full h-auto grayscale" />
                </motion.div>
            </div>
        </div>
    );
}

export default HeroAbout;

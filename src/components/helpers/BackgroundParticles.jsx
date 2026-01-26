"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Array of code symbols that will be randomly displayed as particles
const SYMBOLS = ["{", "}", "<", ">", "/", ";", "=", "()", "=>", "[]"];

function BackgroundCodeParticles() {
  // Ref to access the canvas DOM element
  const canvasRef = useRef(null);
  
  // Ref to store particle objects (persists across re-renders)
  const particlesRef = useRef([]);
  
  // Ref to track mouse position (starts off-screen)
  const mouse = useRef({ x: -1000, y: -1000 });

  // Get current theme to adjust particle colors
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  useEffect(() => {
    // Get canvas element and 2D drawing context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Function to resize canvas to match window dimensions
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Initialize canvas size
    resize();
    
    // Update canvas size when window is resized
    window.addEventListener("resize", resize);

    // Calculate number of particles based on screen size
    // Increased density: 1 particle per 7000 pixels (was 10000)
    const PARTICLE_COUNT = Math.floor((window.innerWidth * window.innerHeight) / 7000);

    // Create array of particle objects with random properties
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * canvas.width,          // Random x position
      y: Math.random() * canvas.height,         // Random y position
      vx: (Math.random() - 0.5) * 0.3,         // Random x velocity (-0.15 to 0.15)
      vy: (Math.random() - 0.5) * 0.3,         // Random y velocity (-0.15 to 0.15)
      size: 10 + Math.random() * 8,            // Font size (10-18px)
      char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], // Random symbol
      opacity: 0.1 + Math.random() * 0.15,     // Random opacity (0.1-0.25)
      // 30% blue accent, 70% theme-aware color
      color: Math.random() > 0.7 
        ? 'rgba(59, 130, 246,' // blue accent
        : isDark 
          ? 'rgba(255, 255, 255,' // white for dark mode
          : 'rgba(39, 39, 42,',   // zinc-800 for light mode
    }));

    // Main animation loop
    function animate() {
      // Clear entire canvas for next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      for (let p of particlesRef.current) {
        // Calculate distance from particle to mouse
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem

        // Apply repulsion force if mouse is within 150px of particle
        if (dist < 150) {
          // Force gets stronger as mouse gets closer
          const force = (150 - dist) / 150;
          
          // Push particle away from mouse (normalized direction * force)
          p.vx += (dx / dist) * 0.02 * force;
          p.vy += (dy / dist) * 0.02 * force;
        }

        // Apply friction to gradually slow down particles (98% of previous velocity)
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Update particle position based on velocity
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles around screen edges (with 50px buffer)
        if (p.x < -50) p.x = canvas.width + 50;   // Left edge → Right edge
        if (p.x > canvas.width + 50) p.x = -50;   // Right edge → Left edge
        if (p.y < -50) p.y = canvas.height + 50;  // Top edge → Bottom edge
        if (p.y > canvas.height + 50) p.y = -50;  // Bottom edge → Top edge

        // Set font style for drawing text
        ctx.font = `${p.size}px monospace`;
        
        // Set color with opacity (completes the rgba string)
        ctx.fillStyle = `${p.color}${p.opacity})`;
        
        // Draw the symbol at particle position
        ctx.fillText(p.char, p.x, p.y);
      }

      // Request next animation frame (creates smooth 60fps loop)
      requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();

    // Update mouse position when user moves cursor
    function onMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    // Listen for mouse movement
    window.addEventListener("mousemove", onMouseMove);

    // Cleanup function: remove event listeners when component unmounts
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDark]); // Re-run when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      // fixed: stays in place during scroll
      // inset-0: fills entire viewport (top-0 right-0 bottom-0 left-0)
      // z-0: behind other content
      // pointer-events-none: allows clicks to pass through to elements below
    />
  );
}

export default BackgroundCodeParticles;
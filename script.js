document.addEventListener("DOMContentLoaded", () => {
  
  // Theme Manager
  const themes = {
    cyber: { p: '#bc13fe', s: '#00f0ff', bg: '#060608', hexP: 0xbc13fe, hexB: 0x060608 },
    ocean: { p: '#00ccff', s: '#00ffcc', bg: '#0f2027', hexP: 0x00ccff, hexB: 0x0f2027 },
    matrix: { p: '#00ff88', s: '#005500', bg: '#0d1110', hexP: 0x00ff88, hexB: 0x0d1110 },
    fire: { p: '#ff3366', s: '#ff9900', bg: '#1b0000', hexP: 0xff3366, hexB: 0x1b0000 }
  };

  let currentThemeKey = 'cyber';
  const savedTheme = localStorage.getItem('portfolioTheme');
  
  if (savedTheme && themes[savedTheme]) {
    currentThemeKey = savedTheme;
    const t = themes[savedTheme];
    const r = document.documentElement;
    r.style.setProperty('--accent', t.p);
    r.style.setProperty('--accent-secondary', t.s);
    r.style.setProperty('--bg-color', t.bg);
  }

  // 1. Loading Screen Exit Animation
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if(loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          initAnimations();
        }, 1000);
    } else {
        initAnimations();
    }
  }, 1000); 

  function initAnimations() {
    // 2. Vanta.js 3D Background Initialization inside Hero Section
    if (window.VANTA) {
      const activeTheme = themes[currentThemeKey];
      VANTA.NET({
        el: "#hero",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: activeTheme.hexP,
        backgroundColor: activeTheme.hexB,
        points: 12.00,
        maxDistance: 22.00,
        spacing: 18.00
      });
    }

    // 3. GSAP Animations Registration
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Reveal
        const tl = gsap.timeline();
        tl.from(".pill-badge", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(".hero-title .outline-text", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-title .gradient-text", { x: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .from(".hero-cta", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

        // Projects Grid Scroll Anim
        gsap.from(".project-card", {
          scrollTrigger: {
            trigger: ".projects-section",
            start: "top 70%",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });

        // About Section Scroll Anim
        gsap.from(".about-visual", {
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });

        gsap.from(".gs-reveal", {
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 75%",
          },
          x: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });
        
        // Footer Reveal
        gsap.from(".glass-footer h2", {
          scrollTrigger: {
            trigger: ".glass-footer",
            start: "top 90%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
    }
  }

});

# STADIUM NIGHTS - Complete Website Development Specification

---

## 🤖 MASTER PROMPT FOR CLAUDE AGENT

You are an elite senior web developer with 20+ years of experience specializing in high-end, cinematic digital experiences. You've built award-winning websites for major sports brands, entertainment companies, and premium agencies. Your expertise includes:

- **Frontend Mastery:** Expert-level HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, GSAP animations
- **Design Implementation:** Pixel-perfect translation of design systems into production-ready code
- **Performance Optimization:** Core Web Vitals expert, achieving 90+ PageSpeed scores consistently
- **UX/UI Excellence:** Creating emotionally resonant interfaces that convert visitors into clients
- **SEO Architecture:** Semantic HTML, schema markup, technical SEO best practices
- **Accessibility Champion:** WCAG 2.1 AA compliance as standard, not afterthought
- **Cross-Browser Expertise:** Flawless execution across all modern browsers and devices
- **Animation Craft:** Cinematic, smooth animations that enhance rather than distract

**Your Mission:**
Build a stunning, production-ready website for **Playmaker Group** - a premium sports social media agency specializing in graphics and video content for elite athletic brands and athletes. The website must embody the "Stadium Nights" design philosophy: capturing that magical pre-game moment when the stadium lights ignite and anything feels possible.

**Your Approach:**
- Write clean, semantic, well-commented code that other developers will admire
- Prioritize performance without sacrificing visual impact
- Create smooth, cinematic animations with GSAP and ScrollTrigger
- Ensure every element is responsive, accessible, and SEO-optimized
- Build modular, maintainable components
- Test thoroughly across devices and browsers
- Follow the design system specifications exactly while adding thoughtful micro-interactions
- Think like a creative director AND an engineer

**Quality Standards:**
- No Lorem Ipsum - write compelling, on-brand copy
- No placeholder images - use appropriate semantic descriptions
- No broken animations - test all scroll triggers and interactions
- No accessibility violations - semantic HTML and ARIA labels throughout
- No performance compromises - lazy loading, optimized assets, efficient code

You are building a website that will make Playmaker Group's competitors jealous and their clients excited. Every pixel matters. Every animation tells a story. Every interaction delights. This is championship-level work.

**Now, build something legendary.**

---

## 🎯 Project Overview

**Client Name:** Playmaker Group  
**Industry:** Sports Social Media Agency  
**Services:** Graphics design, video production, social media content for sports brands and athletes  
**Brand Philosophy:** Stadium Nights - Capture the magic hour before game time when stadium lights ignite and anything feels possible. Cinematic, atmospheric, emotional. This system sells dreams, not just services.

**Tech Stack:**
- HTML5 (Semantic markup)
- CSS3 (Custom properties, Grid, Flexbox)
- Bootstrap 5.3+ (Grid system, utilities)
- Vanilla JavaScript (ES6+)
- AOS (Animate On Scroll) or custom scroll animations
- GSAP (for advanced animations)

---

## 🎨 Design System

### Color Palette

```css
:root {
  /* Primary Colors */
  --pregame-darkness: #1A1D29;
  --stadium-gold: #F4D03F;
  --sunset-flame: #FF6B35;
  --twilight-blue: #2E86AB;
  --concrete-neutral: #C8C6C6;
  
  /* Gradients */
  --money-gradient: linear-gradient(135deg, #F4D03F 0%, #FF6B35 100%);
  --dark-gradient: linear-gradient(180deg, #1A1D29 0%, #0F1117 100%);
  
  /* Semantic Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #C8C6C6;
  --text-accent: #F4D03F;
  
  /* Overlay Colors */
  --overlay-dark: rgba(26, 29, 41, 0.85);
  --overlay-gradient: linear-gradient(180deg, 
    rgba(26, 29, 41, 0) 0%, 
    rgba(26, 29, 41, 0.8) 100%);
}
```

**Color Psychology:**
- **Stadium Gold (#F4D03F):** Achievement, championship glow, floodlight warmth
- **Sunset Flame (#FF6B35):** Energy, passion, golden hour magic
- **Twilight Blue (#2E86AB):** Trust, professionalism, pre-game atmosphere
- **Pre-game Darkness (#1A1D29):** Sophistication, anticipation, premium quality

---

### Typography System

**Font Stack:**

```css
/* Headlines - Bold, Commanding */
--font-headline: 'Sohne Breit Halbfett', 'Arial Black', sans-serif;

/* Subheadlines - Editorial */
--font-subhead: 'Sequel Sans', 'Helvetica Neue', sans-serif;
--subhead-weight: 650; /* Medium-Bold hybrid */

/* Body Copy - Clean Readability */
--font-body: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Font Loading Strategy */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
/* Note: Sohne and Sequel Sans require purchased licenses or alternatives */
```

**Font Alternatives (If licenses unavailable):**
- Sohne Breit → Archivo Black, Oswald Bold
- Sequel Sans → Inter Medium (600), DM Sans (500)

**Type Scale:**

```css
:root {
  /* Desktop Scale */
  --text-hero: 64px;      /* H1, Hero sections */
  --text-h2: 40px;        /* Section headers */
  --text-h3: 24px;        /* Subsections */
  --text-body: 16px;      /* Paragraphs */
  --text-small: 14px;     /* Captions, labels */
  
  /* Mobile Scale (breakpoint < 768px) */
  --text-hero-mobile: 36px;
  --text-h2-mobile: 28px;
  --text-h3-mobile: 20px;
  --text-body-mobile: 16px;
  
  /* Line Heights */
  --lh-tight: 1.1;        /* Headlines */
  --lh-normal: 1.5;       /* Body */
  --lh-relaxed: 1.8;      /* Long-form content */
  
  /* Letter Spacing */
  --ls-tight: -0.02em;    /* Large headlines */
  --ls-normal: 0;
  --ls-wide: 0.05em;      /* Uppercase labels */
}
```

---

### Spacing System

**6px Base Unit System:**

```css
:root {
  --space-unit: 6px;
  
  /* Spacing Scale (multiples of 6) */
  --space-xs: 6px;    /* 1 unit */
  --space-sm: 12px;   /* 2 units */
  --space-md: 18px;   /* 3 units */
  --space-lg: 24px;   /* 4 units */
  --space-xl: 36px;   /* 6 units */
  --space-2xl: 48px;  /* 8 units */
  --space-3xl: 72px;  /* 12 units */
  --space-4xl: 96px;  /* 16 units */
  --space-5xl: 144px; /* 24 units */
}
```

**Grid System:**
- **16-column grid** for maximum flexibility
- **Container max-width:** 1400px
- **Gutter:** 24px (4 units)
- **Side margins:** 48px on desktop, 24px on mobile

```css
.container-stadium {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

@media (max-width: 768px) {
  .container-stadium {
    padding: 0 24px;
  }
}
```

---

## ✨ Signature Visual Elements

### 1. Stadium Light Flares

**Implementation:**
- Use CSS pseudo-elements with `radial-gradient`
- Blend mode: `screen` or `lighten`
- Animated with keyframes for subtle pulsing

```css
.light-flare {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, 
    rgba(244, 208, 63, 0.3) 0%, 
    rgba(244, 208, 63, 0) 70%);
  mix-blend-mode: screen;
  pointer-events: none;
  animation: pulse-flare 4s ease-in-out infinite;
}

@keyframes pulse-flare {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
```

**Placement:** Behind hero text, section dividers, CTA areas

### 2. Floating Atmosphere Particles

**Implementation:**
- Small divs or canvas particles
- Slow upward drift with horizontal sway
- Varying opacity and sizes

```javascript
// Pseudo-code for particle system
class AtmosphereParticle {
  constructor() {
    this.x = random(0, windowWidth);
    this.y = windowHeight + 20;
    this.speed = random(0.5, 1.5);
    this.size = random(2, 6);
    this.opacity = random(0.2, 0.6);
  }
  
  update() {
    this.y -= this.speed;
    this.x += Math.sin(Date.now() * 0.001) * 0.5;
  }
}
```

### 3. Lens Flare Overlays

**Assets Needed:**
- PNG images with transparency
- Horizontal light streaks
- Hexagonal lens artifacts

**CSS Application:**

```css
.section-hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url('lens-flare.png') no-repeat top right;
  mix-blend-mode: screen;
  opacity: 0.6;
  pointer-events: none;
}
```

---

## 🎬 Motion & Animation Principles

### Animation Constants

```css
:root {
  /* Duration */
  --duration-instant: 0.15s;
  --duration-fast: 0.3s;
  --duration-normal: 0.5s;
  --duration-cinematic: 0.8s;    /* Baseline */
  --duration-slow: 1.2s;
  --duration-epic: 2s;
  
  /* Easing Functions */
  --ease-default: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.6, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Scroll Animation Patterns

**1. Fade-Up Reveal**
```css
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity var(--duration-cinematic) var(--ease-out),
              transform var(--duration-cinematic) var(--ease-out);
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**2. Word-by-Word Text Reveal**
```javascript
// Split text into words and animate sequentially
function revealWords(element) {
  const words = element.textContent.split(' ');
  element.innerHTML = words.map(word => 
    `<span class="word-reveal">${word}</span>`
  ).join(' ');
  
  const wordElements = element.querySelectorAll('.word-reveal');
  wordElements.forEach((word, index) => {
    setTimeout(() => {
      word.classList.add('visible');
    }, index * 100); // 0.1s stagger
  });
}
```

**3. Parallax Scrolling**
- **Layer 1 (Background):** 0.3x scroll speed
- **Layer 2 (Mid-ground):** 0.6x scroll speed
- **Layer 3 (Foreground):** 1x scroll speed (normal)
- **Layer 4 (UI Elements):** 1.2x scroll speed (subtle)

```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  document.querySelector('.parallax-bg').style.transform = 
    `translateY(${scrolled * 0.3}px)`;
  
  document.querySelector('.parallax-mid').style.transform = 
    `translateY(${scrolled * 0.6}px)`;
});
```

**4. Video Crossfade Transitions**
```css
.video-player {
  position: relative;
}

.video-player video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.video-player video.active {
  opacity: 1;
  z-index: 2;
}
```

---

## 📐 Layout Structures

### Hero Section

**Requirements:**
- Full viewport height (100vh)
- Video background or high-res image
- Center-aligned headline with word-reveal animation
- Gradient overlay from bottom
- Floating CTA button with glow effect
- Scroll indicator at bottom

```html
<section class="hero-section">
  <video class="hero-video" autoplay muted loop playsinline>
    <source src="stadium-night.mp4" type="video/mp4">
  </video>
  <div class="hero-overlay"></div>
  
  <div class="hero-content">
    <h1 class="hero-headline" data-word-reveal>
      Where Greatness Lives Under The Lights
    </h1>
    <p class="hero-subhead">
      Cinematic storytelling for sports brands that refuse to be ordinary
    </p>
    <a href="#work" class="btn-primary btn-glow">
      See Our Work
    </a>
  </div>
  
  <div class="scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
  
  <div class="light-flare" style="top: -200px; right: -200px;"></div>
</section>
```

### Portfolio Grid

**Requirements:**
- Masonry-style or consistent grid
- Hover effects: image zoom, gradient overlay
- Video preview on hover
- Category filters with smooth transitions

```html
<section class="portfolio-section">
  <div class="container-stadium">
    <h2 class="section-title" data-fade-up>Game-Changing Work</h2>
    
    <div class="filter-nav" data-fade-up>
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="video">Video</button>
      <button class="filter-btn" data-filter="branding">Branding</button>
      <button class="filter-btn" data-filter="digital">Digital</button>
    </div>
    
    <div class="portfolio-grid">
      <div class="portfolio-item" data-category="video">
        <div class="portfolio-image">
          <img src="project-1.jpg" alt="Project Name">
          <div class="portfolio-overlay">
            <h3>Championship Campaign</h3>
            <p>Brand Strategy, Video Production</p>
          </div>
        </div>
      </div>
      <!-- Repeat items -->
    </div>
  </div>
</section>
```

### Services Section

**Requirements:**
- Icon + headline + description cards
- Staggered fade-in animations
- Hover state: lift + glow effect

### About/Story Section

**Requirements:**
- Two-column layout (image + text)
- Parallax image on scroll
- Pull quote in stadium gold

### Contact Section

**Requirements:**
- Simple form with stadium aesthetic
- Gold submit button with hover animation
- Social links with icon hover effects

---

## 🔧 Technical Implementation

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>Playmaker Group | Cinematic Sports Content & Social Media Agency</title>
  <meta name="description" content="Elite sports social media agency creating game-changing graphics and video content for athletes and brands. Your championship moment starts here.">
  <meta name="keywords" content="sports social media agency, sports video production, sports graphics design, athlete content creation">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Playmaker Group - Cinematic Sports Content">
  <meta property="og:description" content="Where greatness lives under the lights. Creating championship-level content for athletes and sports brands.">
  <meta property="og:image" content="https://playmakergroup.com/og-image.jpg">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Playmaker Group">
  <meta name="twitter:description" content="Elite sports social media agency">
  <meta name="twitter:image" content="https://playmakergroup.com/twitter-image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="favicon.png">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar-stadium">
    <!-- Navigation content -->
  </nav>
  
  <!-- Hero Section -->
  <section class="hero-section">
    <!-- Hero content -->
  </section>
  
  <!-- Main Content Sections -->
  <main>
    <!-- Portfolio, Services, About, Contact -->
  </main>
  
  <!-- Footer -->
  <footer class="footer-stadium">
    <!-- Footer content -->
  </footer>
  
  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

### CSS Organization

```
css/
├── style.css (main import file)
├── base/
│   ├── reset.css
│   ├── variables.css
│   └── typography.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── navigation.css
├── sections/
│   ├── hero.css
│   ├── portfolio.css
│   ├── services.css
│   └── footer.css
└── animations/
    ├── scroll-effects.css
    └── transitions.css
```

### JavaScript Modules

```
js/
├── main.js (initialization)
├── scroll-animations.js
├── parallax.js
├── portfolio-filter.js
├── video-player.js
└── particles.js
```

---

## 🎯 SEO Optimization Strategy

### On-Page SEO

**1. Semantic HTML5 Structure**
```html
<header>
  <nav> <!-- Main navigation -->
</header>

<main>
  <article> <!-- Blog posts -->
  <section> <!-- Content sections -->
</main>

<footer> <!-- Site footer -->
```

**2. Heading Hierarchy**
- One `<h1>` per page (hero headline)
- Logical `<h2>` for major sections
- `<h3>` for subsections

**3. Image Optimization**
```html
<img 
  src="stadium-night-800w.jpg"
  srcset="stadium-night-400w.jpg 400w,
          stadium-night-800w.jpg 800w,
          stadium-night-1200w.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Stadium lights illuminating field at dusk"
  loading="lazy"
  width="800"
  height="600">
```

**4. Schema Markup**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stadium Nights",
  "url": "https://stadiumnights.com",
  "logo": "https://stadiumnights.com/logo.png",
  "description": "Cinematic sports brand storytelling agency",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "Customer Service"
  }
}
</script>
```

### Performance Optimization

**1. Critical CSS Inlining**
- Inline above-the-fold CSS in `<head>`
- Defer non-critical CSS

**2. JavaScript Loading**
```html
<!-- Defer non-critical scripts -->
<script defer src="js/animations.js"></script>

<!-- Async for analytics -->
<script async src="analytics.js"></script>
```

**3. Image Formats**
- WebP with JPG fallback
- SVG for logos and icons

**4. Video Optimization**
- MP4 with H.264 codec
- Poster image for initial load
- Lazy loading for below-fold videos

### Accessibility

**WCAG 2.1 AA Compliance:**

```css
/* Ensure color contrast ratios */
/* Text on dark background: minimum 4.5:1 */
--text-on-dark: #FFFFFF; /* 15.5:1 on #1A1D29 ✓ */

/* Focus states */
*:focus-visible {
  outline: 2px solid var(--stadium-gold);
  outline-offset: 4px;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**ARIA Labels:**
```html
<button aria-label="Open navigation menu" class="menu-toggle">
  <span class="hamburger-icon"></span>
</button>

<nav aria-label="Main navigation">
  <!-- Nav content -->
</nav>
```

---

## 🎨 Component Library

### Button Styles

```css
/* Primary CTA Button */
.btn-primary {
  display: inline-block;
  padding: 16px 32px;
  background: var(--money-gradient);
  color: var(--pregame-darkness);
  font-family: var(--font-subhead);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(244, 208, 63, 0.4);
}

/* Glow Effect Variant */
.btn-glow {
  position: relative;
  overflow: hidden;
}

.btn-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-glow:hover::before {
  width: 300px;
  height: 300px;
}
```

### Card Components

```css
.service-card {
  background: rgba(26, 29, 41, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(244, 208, 63, 0.2);
  border-radius: 8px;
  padding: 36px;
  transition: transform var(--duration-cinematic) var(--ease-out),
              box-shadow var(--duration-cinematic) var(--ease-out),
              border-color var(--duration-cinematic) var(--ease-out);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 48px rgba(244, 208, 63, 0.2);
  border-color: var(--stadium-gold);
}

.service-card__icon {
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
  fill: var(--stadium-gold);
}
```

### Navigation

```css
.navbar-stadium {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 24px 48px;
  background: transparent;
  transition: background var(--duration-fast) var(--ease-out);
  z-index: 1000;
}

.navbar-stadium.scrolled {
  background: rgba(26, 29, 41, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.navbar-stadium__logo {
  font-family: var(--font-headline);
  font-size: 24px;
  color: var(--text-primary);
  text-decoration: none;
  background: var(--money-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Alternative: Use actual text if custom logo not available */
.navbar-stadium__logo-text {
  font-family: var(--font-headline);
  font-size: 22px;
  letter-spacing: -0.01em;
}

.navbar-stadium__logo-text::before {
  content: 'PLAYMAKER';
  background: var(--money-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.navbar-stadium__logo-text::after {
  content: 'GROUP';
  color: var(--text-secondary);
  font-weight: 400;
  margin-left: 8px;
}

.navbar-stadium__menu {
  display: flex;
  gap: 36px;
  list-style: none;
}

.navbar-stadium__link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color var(--duration-fast) var(--ease-out);
  position: relative;
}

.navbar-stadium__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--money-gradient);
  transition: width var(--duration-fast) var(--ease-out);
}

.navbar-stadium__link:hover {
  color: var(--stadium-gold);
}

.navbar-stadium__link:hover::after {
  width: 100%;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Extra Small Devices (phones, < 576px) */
@media (max-width: 575.98px) {
  :root {
    --text-hero: 32px;
    --text-h2: 24px;
    --space-section: 48px;
  }
}

/* Small Devices (landscape phones, 576px - 767px) */
@media (min-width: 576px) and (max-width: 767.98px) {
  :root {
    --text-hero: 36px;
    --text-h2: 28px;
  }
}

/* Medium Devices (tablets, 768px - 991px) */
@media (min-width: 768px) and (max-width: 991.98px) {
  :root {
    --text-hero: 48px;
    --text-h2: 32px;
  }
}

/* Large Devices (desktops, 992px - 1199px) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  :root {
    --text-hero: 56px;
    --text-h2: 36px;
  }
}

/* Extra Large Devices (large desktops, 1200px+) */
@media (min-width: 1200px) {
  :root {
    --text-hero: 64px;
    --text-h2: 40px;
  }
}
```

---

## 🎬 Animation Code Examples

### GSAP ScrollTrigger Implementation

```javascript
// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero text reveal
gsap.from('.hero-headline .word-reveal', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out'
});

// Section fade-ups
gsap.utils.toArray('[data-fade-up]').forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out'
  });
});

// Parallax backgrounds
gsap.to('.parallax-bg', {
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  },
  y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.3
});
```

### Smooth Scroll Implementation

```javascript
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: target,
          offsetY: 80 // Account for fixed navbar
        },
        ease: 'power3.inOut'
      });
    }
  });
});
```

### Portfolio Filter Animation

```javascript
// Portfolio filtering with smooth transitions
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    
    // Update active state
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Animate items
    portfolioItems.forEach(item => {
      const category = item.dataset.category;
      
      if (filter === 'all' || category === filter) {
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
        item.style.display = 'block';
      } else {
        gsap.to(item, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            item.style.display = 'none';
          }
        });
      }
    });
  });
});
```

---

## 🎯 Content Recommendations

### Copywriting Tone

**Voice:** Confident, aspirational, cinematic  
**Style:** Short, punchy sentences. Active voice. Evocative imagery.  
**Context:** Playmaker Group creates game-changing content for athletes and sports brands.

**Examples:**
- ❌ "We provide video production services for sports brands"
- ✅ "Your championship moment. Captured in 4K glory."

- ❌ "Our team has over 10 years of experience"
- ✅ "A decade of capturing game-winning shots."

- ❌ "We create social media content"
- ✅ "We turn your highlight reel into a legacy."

### Section Headlines (Playmaker Group Specific)

- **Hero:** "Where Greatness Lives Under The Lights" or "Game-Changing Content for Champions"
- **Portfolio:** "Hall of Fame Projects" or "Content That Wins"
- **Services:** "Our Playbook" or "How We Dominate"
- **About:** "Built for the Big Stage" or "We Live for Game Day"
- **Contact:** "Let's Make History" or "Ready for Prime Time?"
- **Testimonials:** "The Starting Lineup" or "What Champions Say"

### Microcopy

- **CTA Buttons:** "See Our Work" | "Start Your Story" | "Get in the Game" | "Book a Play Call"
- **Form Submit:** "Send the Play" | "Let's Go"
- **Newsletter:** "Join the Roster" | "Game Day Updates"
- **Footer:** "© 2025 Playmaker Group. All victories reserved."
- **Navigation:** Home | Portfolio | Services | About | Contact
- **Service Cards:** "Video Production" | "Graphics Design" | "Social Strategy"

---

## 📋 Page Structure & Sections

### Homepage Blueprint

**Section Order:**

1. **Hero Section** (100vh)
   - Full-screen video background
   - Center-aligned headline with word reveal
   - Subheadline
   - Primary CTA button
   - Scroll indicator
   - Light flares (2-3 positioned strategically)

2. **Introduction/Philosophy** (60vh)
   - Two-column layout on desktop
   - Left: Large quote or statement
   - Right: Body copy explaining approach
   - Background: Subtle gradient

3. **Featured Work** (Auto height)
   - 3-4 hero portfolio pieces
   - Full-width alternating layout
   - Video autoplay on scroll into view
   - Project title + category + brief description
   - "View Case Study" link

4. **Services Grid** (80vh)
   - Section headline
   - 3-4 service cards in grid
   - Icon + title + description
   - Staggered fade-in on scroll

5. **Stats/Impact Section** (50vh)
   - Dark background with light flares
   - 3-4 key metrics
   - Large numbers with animated count-up
   - Brief labels

6. **Client Logos** (40vh)
   - "Trusted by Champions" headline
   - Logo carousel or grid
   - Grayscale with color on hover

7. **Testimonials** (60vh)
   - Carousel or grid of 2-3 testimonials
   - Client photo + quote + name/company
   - Gold accent border

8. **Call-to-Action Section** (70vh)
   - Centered content
   - Compelling headline
   - Brief paragraph
   - Large primary CTA button
   - Background: Image with overlay

9. **Footer** (Auto height)
   - Logo
   - Navigation links
   - Social media icons
   - Contact information
   - Copyright

---

## 🎥 Video Implementation Guidelines

### Hero Video Background

```html
<div class="hero-video-container">
  <video 
    class="hero-video" 
    autoplay 
    muted 
    loop 
    playsinline
    poster="hero-poster.jpg">
    <source src="videos/stadium-night-hero.mp4" type="video/mp4">
    <source src="videos/stadium-night-hero.webm" type="video/webm">
  </video>
  <div class="hero-video-overlay"></div>
</div>
```

```css
.hero-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.hero-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(26, 29, 41, 0.3) 0%,
    rgba(26, 29, 41, 0.7) 100%
  );
}

/* Mobile optimization - replace video with static image */
@media (max-width: 768px) {
  .hero-video {
    display: none;
  }
  
  .hero-video-container {
    background: url('hero-poster.jpg') center/cover no-repeat;
  }
}
```

### Portfolio Video Players

```javascript
// Auto-play video on scroll into viewport
const observerOptions = {
  threshold: 0.5
};

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, observerOptions);

document.querySelectorAll('.portfolio-video').forEach(video => {
  videoObserver.observe(video);
});
```

---

## 🎨 Advanced CSS Effects

### Gradient Text

```css
.gradient-text {
  background: var(--money-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* Fallback */
}
```

### Glassmorphism Cards

```css
.glass-card {
  background: rgba(26, 29, 41, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Animated Gradient Border

```css
.gradient-border {
  position: relative;
  background: var(--pregame-darkness);
  border-radius: 8px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 8px;
  padding: 2px;
  background: var(--money-gradient);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity var(--duration-fast);
}

.gradient-border:hover::before {
  opacity: 1;
}
```

### Spotlight Effect on Hover

```css
.spotlight-card {
  position: relative;
  overflow: hidden;
}

.spotlight-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(244, 208, 63, 0.15) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity var(--duration-cinematic);
  pointer-events: none;
}

.spotlight-card:hover::after {
  opacity: 1;
}
```

---

## 🚀 Performance Checklist

### Critical Optimizations

- [ ] **Image Optimization**
  - WebP format with fallbacks
  - Responsive images with srcset
  - Lazy loading for below-fold images
  - Max image size: 200KB
  - Compression: 80-85% quality

- [ ] **CSS Optimization**
  - Inline critical CSS (above-fold)
  - Minify CSS files
  - Remove unused Bootstrap components
  - Use CSS containment where possible

- [ ] **JavaScript Optimization**
  - Defer non-critical scripts
  - Minify and bundle JS
  - Use Intersection Observer for scroll animations
  - Debounce scroll and resize events

- [ ] **Font Loading**
  - Preload critical fonts
  - Use font-display: swap
  - Subset fonts to include only needed characters

- [ ] **Video Optimization**
  - Mobile: Replace with poster images
  - Desktop: Compress to ~5-10MB max
  - Use modern codecs (H.265/VP9)
  - Implement lazy loading

### Performance Targets

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms
- **PageSpeed Score:** 90+ (Desktop), 80+ (Mobile)

---

## 🔍 SEO Implementation Details

### Meta Tags Template

```html
<!-- Primary Meta Tags -->
<title>Playmaker Group | Cinematic Sports Content & Social Media Agency</title>
<meta name="title" content="Playmaker Group | Cinematic Sports Content & Social Media Agency">
<meta name="description" content="Elite sports social media agency creating game-changing graphics and video content for athletes and brands. Your championship moment starts here.">
<meta name="keywords" content="sports social media agency, sports video production, sports graphics design, athlete content creation, sports marketing, social media content, sports branding">

<!-- Canonical URL -->
<link rel="canonical" href="https://playmakergroup.com/">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://playmakergroup.com/">
<meta property="og:title" content="Playmaker Group | Cinematic Sports Content Agency">
<meta property="og:description" content="Where greatness lives under the lights. Creating championship-level content for athletes and sports brands.">
<meta property="og:image" content="https://playmakergroup.com/images/og-image-1200x630.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://playmakergroup.com/">
<meta property="twitter:title" content="Playmaker Group | Cinematic Sports Content">
<meta property="twitter:description" content="Elite sports social media agency creating game-changing content for champions.">
<meta property="twitter:image" content="https://playmakergroup.com/images/twitter-image-1200x675.jpg">

<!-- Additional SEO -->
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<meta name="author" content="Playmaker Group">
```

### Structured Data Examples

```html
<!-- Organization Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Playmaker Group",
  "url": "https://playmakergroup.com",
  "logo": "https://playmakergroup.com/images/logo.png",
  "description": "Elite sports social media agency specializing in cinematic video production and graphics design for athletes and sports brands",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Your City",
    "addressRegion": "Your State",
    "postalCode": "Your ZIP",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "Customer Service",
    "email": "hello@playmakergroup.com"
  },
  "sameAs": [
    "https://www.instagram.com/playmakergroup",
    "https://www.twitter.com/playmakergroup",
    "https://www.linkedin.com/company/playmakergroup"
  ]
}
</script>

<!-- Service Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Sports Social Media and Video Production",
  "provider": {
    "@type": "Organization",
    "name": "Playmaker Group"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sports Content Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cinematic Video Production",
          "description": "Highlight reels, promotional videos, and social media content for athletes and teams"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sports Graphics Design",
          "description": "Custom graphics, social media templates, and brand visuals"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Management",
          "description": "Content strategy and management for sports brands and athletes"
        }
      }
    ]
  }
}
</script>
```

### XML Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://playmakergroup.com/</loc>
    <lastmod>2025-10-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://playmakergroup.com/portfolio/</loc>
    <lastmod>2025-10-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://playmakergroup.com/services/</loc>
    <lastmod>2025-10-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://playmakergroup.com/about/</loc>
    <lastmod>2025-10-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://playmakergroup.com/contact/</loc>
    <lastmod>2025-10-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 📱 Mobile-Specific Considerations

### Touch Interactions

```css
/* Increase touch target sizes */
.btn-mobile {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

/* Disable hover effects on touch devices */
@media (hover: none) {
  .card:hover {
    transform: none;
  }
}

/* Remove tap highlight */
* {
  -webkit-tap-highlight-color: transparent;
}
```

### Mobile Navigation

```javascript
// Hamburger menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

// Close menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});
```

### Responsive Typography

```css
/* Fluid typography using clamp() */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

h2 {
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
}

body {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}
```

---

## 🎯 Call-to-Action Strategy

### Primary CTAs

**Placement:**
1. Hero section (above fold)
2. After featured work section
3. Bottom of services section
4. Dedicated CTA section before footer

**Button Hierarchy:**

```css
/* Primary - High emphasis */
.cta-primary {
  background: var(--money-gradient);
  color: var(--pregame-darkness);
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(244, 208, 63, 0.3);
}

/* Secondary - Medium emphasis */
.cta-secondary {
  background: transparent;
  color: var(--stadium-gold);
  border: 2px solid var(--stadium-gold);
}

/* Tertiary - Low emphasis */
.cta-tertiary {
  background: transparent;
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### Micro-Interactions

```javascript
// Button ripple effect
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});
```

---

## 🎬 Final Implementation Checklist

### Pre-Launch

- [ ] All pages have unique title tags and meta descriptions
- [ ] Schema markup implemented and validated
- [ ] Sitemap.xml created and submitted
- [ ] Robots.txt configured
- [ ] 404 page designed
- [ ] Favicon and app icons created
- [ ] All images optimized and compressed
- [ ] Videos compressed and properly formatted
- [ ] Forms tested and connected to backend/email
- [ ] Analytics (Google Analytics 4) implemented
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility audit completed
- [ ] Performance audit (Lighthouse) passed
- [ ] SSL certificate installed
- [ ] Social media meta tags validated

### Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile
- [ ] Monitor Core Web Vitals
- [ ] Set up uptime monitoring
- [ ] Create backups
- [ ] Monitor form submissions
- [ ] Track user behavior with heatmaps
- [ ] A/B test CTAs
- [ ] Collect user feedback

---

## 🎨 Asset Requirements

### Images Needed

1. **Hero Section:**
   - 1920x1080px video or high-res image
   - Horizontal orientation
   - Stadium/sports venue at dusk/night
   - Dramatic lighting

2. **Portfolio Items:**
   - 1200x800px minimum
   - Consistent aspect ratio (3:2 or 16:9)
   - Professional photography
   - 6-12 featured projects

3. **About Section:**
   - Team photo or behind-the-scenes
   - 1200x900px

4. **Client Logos:**
   - SVG or PNG with transparency
   - Minimum 400px width
   - Monochrome versions

5. **Icons:**
   - Service icons (SVG)
   - Social media icons (SVG)
   - UI icons (Lucide or custom)

### Video Specifications

- **Format:** MP4 (H.264) + WebM fallback
- **Resolution:** 1920x1080 minimum
- **Frame Rate:** 24fps or 30fps
- **Bitrate:** 5-10 Mbps
- **Duration:** 10-30 seconds for backgrounds
- **Audio:** Optional, muted by default

---

## 📞 Support & Resources

### Recommended Tools

- **Design:** Figma, Adobe XD
- **Animation:** GSAP, Lottie
- **Icons:** Lucide Icons, Heroicons
- **Images:** Unsplash, Pexels (for placeholders)
- **Video:** Coverr, Pexels Videos
- **Testing:** BrowserStack, LambdaTest
- **Performance:** GTmetrix, WebPageTest
- **SEO:** Screaming Frog, Ahrefs

### Documentation Links

- Bootstrap 5: https://getbootstrap.com/docs/5.3/
- GSAP: https://greensock.com/docs/
- ScrollTrigger: https://greensock.com/scrolltrigger/
- Web Vitals: https://web.dev/vitals/
- Schema.org: https://schema.org/

---

## 🎯 Success Metrics

### Key Performance Indicators

**Traffic Metrics:**
- 5,000+ monthly visitors (Year 1)
- < 40% bounce rate
- 2+ pages per session
- 2+ minutes average session duration

**Engagement Metrics:**
- 10+ form submissions per month
- 20% video completion rate
- 5% CTA click-through rate

**Technical Metrics:**
- PageSpeed score 90+ (Desktop)
- PageSpeed score 80+ (Mobile)
- 0 critical accessibility errors
- 99.9% uptime

**SEO Metrics:**
- Ranking for 10+ target keywords (Page 1)
- 50+ referring domains
- Domain Authority 30+

---

## 🚀 Conclusion

This comprehensive guide provides everything needed to build the Playmaker Group website with pixel-perfect precision. The design system balances cinematic aesthetics with technical performance, ensuring an unforgettable user experience that captures the magic of stadium nights.

**Client Context:**  
Playmaker Group is an elite sports social media agency that creates championship-level graphics and video content for athletes and sports brands. Every element of this website should communicate excellence, creativity, and the electric energy of game day.

**Remember the core principle:** Every element should evoke that pre-game moment when the lights come on and anything feels possible. Make it bold. Make it cinematic. Make it unforgettable.

**Target Audience:**
- Professional athletes seeking personal brand content
- Sports teams needing social media management
- Athletic brands looking for promotional content
- Agencies seeking video production partners

**Key Differentiators:**
- Cinematic, broadcast-quality production values
- Deep understanding of sports culture and timing
- Fast turnaround for time-sensitive content
- Portfolio of work with recognizable athletes/teams

**Good luck building something legendary! 🏟️✨**

---

## 📝 Quick Reference Checklist

**Before You Start:**
- [ ] Review entire design system specification
- [ ] Set up proper folder structure
- [ ] Install all required dependencies (Bootstrap, GSAP)
- [ ] Prepare placeholder content with Playmaker Group context
- [ ] Bookmark this document for constant reference

**During Development:**
- [ ] Use CSS variables for all colors, spacing, typography
- [ ] Test animations at 60fps
- [ ] Write semantic HTML5 throughout
- [ ] Comment complex JavaScript functions
- [ ] Test on mobile devices frequently
- [ ] Run Lighthouse audits after each major section

**Before Handoff:**
- [ ] Complete pre-launch checklist (page 48)
- [ ] Validate all HTML, CSS, JavaScript
- [ ] Test contact forms
- [ ] Verify all links work
- [ ] Check accessibility with screen reader
- [ ] Run final performance audit
- [ ] Create documentation for client

**Remember:** You're not just building a website. You're creating a digital experience that makes athletes and brands feel like champions. Every pixel matters. Every animation tells a story. This is championship-level work for championship-level clients.

🏆 **Now go build something that belongs in the Hall of Fame.**
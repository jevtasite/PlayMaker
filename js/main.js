// ==========================================================================
// PLAYMAKER GROUP - MAIN JAVASCRIPT
// Stadium Nights Interactive Experience
// ==========================================================================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// NAVIGATION SCROLL EFFECT
// ==========================================================================

const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class when scrolling down
  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
});

// Close menu when clicking a link
document.querySelectorAll(".navbar-stadium__link").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navbar = document.getElementById("navbar");
  if (navMenu.classList.contains("active") && !navbar.contains(e.target)) {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ==========================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ==========================================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ==========================================================================

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-stadium__link");

  let currentSection = "";
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Find which section is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset for navbar height
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  // Special case: if at the top of the page, highlight Home
  if (scrollPosition < 100) {
    currentSection = "home";
  }

  // Update active class on nav links
  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    // Handle home link (both "/" and "#home")
    if (href === "/" && currentSection === "home") {
      link.classList.add("active");
    } else if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Run on scroll
window.addEventListener("scroll", updateActiveNavLink);

// Run on page load
window.addEventListener("load", updateActiveNavLink);

// ==========================================================================
// HERO WORD REVEAL ANIMATION
// ==========================================================================

function revealWords() {
  const headline = document.querySelector("[data-word-reveal]");
  if (!headline) return;

  const text = headline.textContent;
  const words = text.split(" ");

  headline.innerHTML = words
    .map(
      (word) =>
        `<span class="word-reveal" style="display: inline-block; opacity: 1; color: #FFFFFF;">${word}&nbsp;</span>`
    )
    .join("");

  const wordElements = headline.querySelectorAll(".word-reveal");

  gsap.from(wordElements, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.3,
    onComplete: function () {
      // Ensure all words are visible after animation
      wordElements.forEach((word) => {
        word.style.opacity = "1";
        word.style.color = "#FFFFFF";
      });
    },
  });
}

// Initialize on page load
window.addEventListener("load", revealWords);

// ==========================================================================
// HERO CONTENT ANIMATIONS
// ==========================================================================

// Random letter reveal animation
function scrambleText(selector, delay) {
  const element = document.querySelector(selector);
  if (!element) return;

  const originalHTML = element.innerHTML;
  const originalText = element.textContent;
  const textArray = originalText.split("");

  // Create array of indices
  let indices = [];
  for (let i = 0; i < textArray.length; i++) {
    if (textArray[i] !== " ") {
      indices.push(i);
    }
  }

  // Shuffle indices for random order
  indices.sort(() => Math.random() - 0.5);

  // Hide all letters initially
  element.style.opacity = "1";
  let displayArray = textArray.map((char) => (char === " " ? " " : ""));
  element.textContent = displayArray.join("");

  setTimeout(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < indices.length) {
        displayArray[indices[currentIndex]] = textArray[indices[currentIndex]];

        // Preserve HTML structure for .headline-flow
        if (selector === ".headline-main") {
          const tempText = displayArray.join("");
          element.innerHTML = originalHTML.replace(originalText, tempText);
        } else {
          element.textContent = displayArray.join("");
        }

        currentIndex++;
      } else {
        clearInterval(interval);
        element.innerHTML = originalHTML;
      }
    }, 40);
  }, delay * 1000);
}

function animateHeroContent() {
  // Animate hero label
  gsap.from(".hero-label", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  });

  // Animate headline main with fade and scale
  gsap.from(".headline-main", {
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    delay: 0.4,
    ease: "power3.out",
  });

  // Animate headline subtitle with fade and scale
  gsap.from(".headline-subtitle", {
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    delay: 0.6,
    ease: "power3.out",
  });

  // Animate hero subhead
  gsap.from(".hero-subhead", {
    opacity: 0,
    y: 40,
    duration: 1,
    delay: 0.8,
    ease: "power3.out",
  });

  // Animate CTA buttons (same timing as subhead)
  gsap.from(".hero-cta-group", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.8,
    ease: "power3.out",
  });

  // Fade + Blur Reveal for phone stack
  gsap.fromTo(
    ".phone-stack",
    {
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.95,
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 0.8,
      delay: 0.8,
      ease: "power2.out",
    }
  );

  // Animate showcase controls
  gsap.from(".showcase-controls", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 1.8,
    ease: "power3.out",
  });

  // Animate showcase hint
  gsap.from(".showcase-hint", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 2,
    ease: "power3.out",
  });
}

// Initialize hero animations
window.addEventListener("load", animateHeroContent);

// ==========================================================================
// 3D PHONE STACK SHOWCASE
// ==========================================================================

const phoneStack = document.getElementById("phoneStack");
const phoneCards = document.querySelectorAll(".phone-card");
const prevBtn = document.getElementById("prevPhone");
const nextBtn = document.getElementById("nextPhone");
const currentNumber = document.querySelector(".current-number");
const totalNumber = document.querySelector(".total-number");

let currentPhone = 0;
const totalPhones = phoneCards.length;
let isDragging = false;
let startX = 0;
let rotationY = 0;

// Set total number
if (totalNumber) totalNumber.textContent = totalPhones;

// Update phone positions based on current index
function updatePhoneStack() {
  phoneCards.forEach((card, index) => {
    const relativeIndex = (index - currentPhone + totalPhones) % totalPhones;
    card.setAttribute("data-index", relativeIndex);
  });

  // Update counter
  if (currentNumber) currentNumber.textContent = currentPhone + 1;
}

// Next phone
function nextPhone() {
  currentPhone = (currentPhone + 1) % totalPhones;
  updatePhoneStack();
}

// Previous phone
function prevPhone() {
  currentPhone = (currentPhone - 1 + totalPhones) % totalPhones;
  updatePhoneStack();
}

// Button controls
if (nextBtn) nextBtn.addEventListener("click", () => {
  stopAutoRotate();
  nextPhone();
});
if (prevBtn) prevBtn.addEventListener("click", () => {
  stopAutoRotate();
  prevPhone();
});

// Mouse/Touch drag interaction
if (phoneStack) {
  phoneStack.addEventListener("mousedown", startDrag);
  phoneStack.addEventListener("touchstart", startDrag);
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function startDrag(e) {
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  if (phoneStack) phoneStack.style.cursor = "grabbing";
}

function onDrag(e) {
  if (!isDragging) return;

  const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  const deltaX = currentX - startX;

  // Update rotation
  rotationY = deltaX * 0.3;
  if (phoneStack) phoneStack.style.transform = `rotateY(${rotationY}deg)`;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  if (phoneStack) phoneStack.style.cursor = "grab";

  // Determine if we should advance to next/prev
  if (Math.abs(rotationY) > 30) {
    stopAutoRotate();
    if (rotationY > 0) {
      prevPhone();
    } else {
      nextPhone();
    }
  }

  // Reset rotation
  rotationY = 0;
  if (phoneStack) phoneStack.style.transform = "rotateY(0deg)";
}

// Auto-rotate (optional - can be disabled)
let autoRotateInterval = setInterval(() => {
  nextPhone();
}, 4000);
let hasInteracted = false;

// Stop auto-rotate permanently on any interaction
function stopAutoRotate() {
  hasInteracted = true;
  clearInterval(autoRotateInterval);
}

// Pause auto-rotate on hover
if (phoneStack) {
  phoneStack.addEventListener("mouseenter", () => {
    clearInterval(autoRotateInterval);
  });

  phoneStack.addEventListener("mouseleave", () => {
    // Only restart if user hasn't interacted
    if (!hasInteracted) {
      autoRotateInterval = setInterval(() => {
        nextPhone();
      }, 4000);
    }
  });
}

// Keyboard navigation for phone stack
document.addEventListener("keydown", (e) => {
  // Only handle if lightbox and mobile menu are not active
  if (!lightbox || !lightbox.classList.contains("active")) {
    if (!navMenu || !navMenu.classList.contains("active")) {
      if (e.key === "ArrowLeft") {
        stopAutoRotate();
        prevPhone();
      }
      if (e.key === "ArrowRight") {
        stopAutoRotate();
        nextPhone();
      }
    }
  }
});

// Initialize
updatePhoneStack();

// ==========================================================================
// ANIMATED SPORTS CANVAS BACKGROUND
// ==========================================================================

// Function to check if mobile device for performance optimization
function checkIsMobile() {
  return window.innerWidth <= 575;
}

const canvas = document.getElementById("heroCanvas");
if (canvas && !checkIsMobile()) {
  const ctx = canvas.getContext("2d");
  let animationId;

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particle class for animated dots
  class SportsParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around screen
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.fillStyle = `rgba(244, 208, 63, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particles
  const particles = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new SportsParticle());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines between nearby particles
    particles.forEach((particle, i) => {
      particle.update();
      particle.draw();

      // Draw lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x;
        const dy = particles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.strokeStyle = `rgba(244, 208, 63, ${0.1 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(animationId);
  });
}

// ==========================================================================
// ABOUT SECTION CANVAS BACKGROUND
// ==========================================================================

const aboutCanvas = document.getElementById("aboutCanvas");
if (aboutCanvas && !checkIsMobile()) {
  const aboutCtx = aboutCanvas.getContext("2d");
  let aboutAnimationId;

  // Set canvas size
  function resizeAboutCanvas() {
    const aboutSection = document.querySelector(".about-section");
    if (aboutSection) {
      aboutCanvas.width = aboutSection.offsetWidth;
      aboutCanvas.height = aboutSection.offsetHeight;
    }
  }
  resizeAboutCanvas();
  window.addEventListener("resize", resizeAboutCanvas);

  // Particle class for animated dots
  class AboutParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * aboutCanvas.width;
      this.y = Math.random() * aboutCanvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around screen
      if (this.x < 0) this.x = aboutCanvas.width;
      if (this.x > aboutCanvas.width) this.x = 0;
      if (this.y < 0) this.y = aboutCanvas.height;
      if (this.y > aboutCanvas.height) this.y = 0;
    }

    draw() {
      aboutCtx.fillStyle = `rgba(244, 208, 63, ${this.opacity})`;
      aboutCtx.beginPath();
      aboutCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      aboutCtx.fill();
    }
  }

  // Create particles
  const aboutParticles = [];
  const aboutParticleCount = 80;

  for (let i = 0; i < aboutParticleCount; i++) {
    aboutParticles.push(new AboutParticle());
  }

  // Animation loop
  function animateAbout() {
    aboutCtx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);

    // Draw connecting lines between nearby particles
    aboutParticles.forEach((particle, i) => {
      particle.update();
      particle.draw();

      // Draw lines to nearby particles
      for (let j = i + 1; j < aboutParticles.length; j++) {
        const dx = aboutParticles[j].x - particle.x;
        const dy = aboutParticles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          aboutCtx.strokeStyle = `rgba(244, 208, 63, ${
            0.1 * (1 - distance / 150)
          })`;
          aboutCtx.lineWidth = 1;
          aboutCtx.beginPath();
          aboutCtx.moveTo(particle.x, particle.y);
          aboutCtx.lineTo(aboutParticles[j].x, aboutParticles[j].y);
          aboutCtx.stroke();
        }
      }
    });

    aboutAnimationId = requestAnimationFrame(animateAbout);
  }

  animateAbout();

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(aboutAnimationId);
  });
}

// ==========================================================================
// INTRO SECTION ANIMATIONS
// ==========================================================================

function animateIntroSection() {
  const quote = document.querySelector(".section-quote");
  const introTexts = document.querySelectorAll(".intro-text");

  if (quote) {
    // Blur + Slide from Bottom animation
    gsap.from(".section-quote", {
      opacity: 0,
      y: 60,
      filter: "blur(10px)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top 70%",
        once: true,
      },
    });
  }

  if (introTexts.length > 0) {
    gsap.from(".intro-text", {
      opacity: 0,
      y: 50,
      filter: "blur(8px)",
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top 60%",
        once: true,
      },
    });
  }
}

// Initialize intro animations
window.addEventListener("load", animateIntroSection);

// ==========================================================================
// SCROLL ANIMATIONS - FADE UP
// ==========================================================================

function initScrollAnimations() {
  const fadeUpElements = document.querySelectorAll("[data-fade-up]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeUpElements.forEach((element) => {
    observer.observe(element);
  });
}

initScrollAnimations();

// ==========================================================================
// PORTFOLIO FILTERING
// ==========================================================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

// Initialize - show graphics by default, hide "more" items and videos
portfolioItems.forEach((item) => {
  const category = item.dataset.category;
  const isMoreItem = item.classList.contains("portfolio-item-more");

  if (category !== "graphics") {
    item.classList.add("hidden");
    gsap.set(item, { opacity: 0, scale: 0.8, display: "none" });
  } else if (isMoreItem) {
    // Hide the "show more" graphics items initially
    gsap.set(item, { opacity: 0, y: 30, display: "none" });
  } else {
    item.classList.remove("hidden");
    gsap.set(item, { opacity: 1, scale: 1, display: "block" });
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show/hide the show more button based on filter
    const showMoreBtn = document.getElementById("showMoreBtn");
    const showMoreContainer = document.querySelector(".portfolio-show-more");
    if (showMoreContainer) {
      if (filter === "graphics") {
        showMoreContainer.style.display = "flex";
      } else {
        showMoreContainer.style.display = "none";
      }
    }

    // Reset show more state when switching filters
    if (window.isShowingMore) {
      window.isShowingMore = false;
      if (showMoreBtn) {
        const showMoreText = showMoreBtn.querySelector(".show-more-text");
        if (showMoreText) showMoreText.textContent = "Show More";
        showMoreBtn.classList.remove("active");
      }
    }

    // Filter portfolio items
    portfolioItems.forEach((item) => {
      const category = item.dataset.category;
      const isMoreItem = item.classList.contains("portfolio-item-more");

      if (category === filter) {
        // Don't show "more" items initially, only regular items
        if (!isMoreItem) {
          item.classList.remove("hidden");
          item.style.display = "block";
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          // Keep more items hidden until button is clicked
          item.classList.add("hidden");
          item.style.display = "none";
          gsap.set(item, { opacity: 0, y: 30 });
        }
      } else {
        gsap.to(item, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            item.classList.add("hidden");
            item.style.display = "none";
          },
        });
      }
    });
  });
});

// ==========================================================================
// LIGHTBOX FUNCTIONALITY
// ==========================================================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

let currentImageIndex = 0;
let visibleImages = [];

// Open lightbox when clicking on portfolio images
portfolioItems.forEach((item) => {
  const image = item.querySelector("img");
  if (image) {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      // Get all visible (non-hidden) portfolio items
      visibleImages = Array.from(portfolioItems).filter(
        (item) => !item.classList.contains("hidden")
      );
      currentImageIndex = visibleImages.indexOf(item);

      const imgSrc = image.src;
      const imgAlt = image.alt;

      lightboxImage.src = imgSrc;
      lightboxImage.alt = imgAlt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
});

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

// Navigate to previous image
lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex =
    (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
  const img = visibleImages[currentImageIndex].querySelector("img");
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
});

// Navigate to next image
lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
  const img = visibleImages[currentImageIndex].querySelector("img");
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxPrev.click();
  if (e.key === "ArrowRight") lightboxNext.click();
});

// ==========================================================================
// SHOW MORE BUTTON FUNCTIONALITY
// ==========================================================================

const showMoreBtn = document.getElementById("showMoreBtn");
const showMoreText = showMoreBtn
  ? showMoreBtn.querySelector(".show-more-text")
  : null;
const showMoreIcon = showMoreBtn
  ? showMoreBtn.querySelector(".show-more-icon")
  : null;
const portfolioMoreItems = document.querySelectorAll(".portfolio-item-more");
window.isShowingMore = false;

if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    window.isShowingMore = !window.isShowingMore;

    if (window.isShowingMore) {
      // Show more items
      showMoreText.textContent = "Show Less";
      showMoreBtn.classList.add("active");

      portfolioMoreItems.forEach((item, index) => {
        item.style.display = "block";
        item.classList.remove("hidden");
        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.15, // Stagger for straight line effect
          ease: "power3.out",
        });
      });
    } else {
      // Hide items with animation
      showMoreText.textContent = "Show More";
      showMoreBtn.classList.remove("active");

      // Reverse order for smooth closing
      const itemsArray = Array.from(portfolioMoreItems).reverse();

      itemsArray.forEach((item, index) => {
        gsap.to(item, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.5,
          delay: index * 0.08,
          ease: "power3.inOut",
          onComplete: () => {
            item.classList.add("hidden");
            item.style.display = "none";

            if (index === itemsArray.length - 1) {
              // Scroll back to work section after hiding
              const workSection = document.getElementById("work");
              if (workSection) {
                const offsetTop = workSection.offsetTop - 50;
                window.scrollTo({
                  top: offsetTop,
                  behavior: "smooth",
                });
              }
            }
          },
        });
      });
    }
  });
}

// ==========================================================================
// STATS COUNTER ANIMATION
// ==========================================================================

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent =
        target +
        (element.closest(".stat-item").textContent.includes("M+") ? "M+" : "+");
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((num) => animateCounter(num));
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ==========================================================================
// GSAP SCROLL ANIMATIONS
// ==========================================================================

// Parallax effect for about image
gsap.utils.toArray(".about-image").forEach((img) => {
  gsap.to(img, {
    scrollTrigger: {
      trigger: img,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    y: -50,
    ease: "none",
  });
});

// Service cards stagger animation - Removed to use data-fade-up instead

// Portfolio items animation - only animate visible items (graphics by default)
gsap.from(".portfolio-item:not(.hidden)", {
  scrollTrigger: {
    trigger: ".portfolio-grid",
    start: "top 80%",
  },
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out",
});

// ==========================================================================
// LIGHT FLARE MOUSE PARALLAX
// ==========================================================================

document.addEventListener("mousemove", (e) => {
  const flares = document.querySelectorAll(".light-flare");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  flares.forEach((flare, index) => {
    const speed = (index + 1) * 20;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;

    gsap.to(flare, {
      x: x,
      y: y,
      duration: 1,
      ease: "power2.out",
    });
  });
});

// ==========================================================================
// FLOATING PARTICLES SYSTEM
// ==========================================================================

class ParticleSystem {
  constructor(container, count = 30) {
    this.container = container;
    this.particles = [];
    this.count = count;
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      this.createParticle();
    }
    this.animate();
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "atmosphere-particle";
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;

    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(244, 208, 63, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      pointer-events: none;
      left: 0;
      top: 0;
    `;

    this.container.appendChild(particle);
    this.particles.push({
      element: particle,
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      speedY: Math.random() * 0.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }

  animate() {
    this.particles.forEach((particle) => {
      const containerWidth = this.container.offsetWidth;
      const containerHeight = this.container.offsetHeight;

      particle.y -= particle.speedY;
      particle.x += Math.sin(Date.now() * 0.001) * particle.speedX;

      // Keep particles within container bounds
      if (particle.x < 0) particle.x = containerWidth;
      if (particle.x > containerWidth) particle.x = 0;

      // Reset position when particle goes off screen
      if (particle.y < -10) {
        particle.y = containerHeight + 10;
        particle.x = Math.random() * containerWidth;
      }

      particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles on hero section
const heroSection = document.querySelector(".hero-section");
if (heroSection) {
  new ParticleSystem(heroSection, 25);
}

// Initialize particles on contact section (reduced count on mobile for performance)
const contactParticles = document.querySelector(".contact-particles");
if (contactParticles && !checkIsMobile()) {
  new ParticleSystem(contactParticles, 30);
}

// ==========================================================================
// FORM HANDLING
// ==========================================================================

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Show success message (you would replace this with actual form submission)
    const button = contactForm.querySelector(".btn-primary");
    const originalText = button.textContent;

    button.textContent = "Message Sent! 🏆";
    button.style.pointerEvents = "none";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.pointerEvents = "auto";
      contactForm.reset();
    }, 3000);

    console.log("Form submitted:", Object.fromEntries(formData));
  });
}

// ==========================================================================
// PERFORMANCE OPTIMIZATION - LAZY LOADING
// ==========================================================================

// Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// ==========================================================================
// BUTTON RIPPLE EFFECT
// ==========================================================================

document.querySelectorAll(".btn-primary").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-effect 0.6s ease-out;
      pointer-events: none;
    `;

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple-effect {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==========================================================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// ==========================================================================

// Trap focus in mobile menu when open
document.addEventListener("keydown", (e) => {
  if (navMenu.classList.contains("active") && e.key === "Escape") {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
    menuToggle.focus();
  }
});

// ==========================================================================
// BACK TO TOP BUTTON
// ==========================================================================

const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPos > 300) {
      backToTopBtn.classList.add("visible");
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
      backToTopBtn.style.transform = "translateY(0)";
    } else {
      backToTopBtn.classList.remove("visible");
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
      backToTopBtn.style.transform = "translateY(20px)";
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==========================================================================
// TESTIMONIAL SWIPER CAROUSEL
// ==========================================================================

// Initialize Testimonial Swiper
const testimonialSwiper = document.querySelector(".testimonials-swiper");

if (testimonialSwiper) {
  const swiper = new Swiper(".testimonials-swiper", {
    // Carousel settings
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: false,

    // Coverflow effect for 3D look
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: false,
    },

    // Autoplay
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Speed
    speed: 800,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Pagination dots
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Touch/Swipe
    touchRatio: 1,
    touchAngle: 45,

    // Responsive breakpoints
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        coverflowEffect: {
          depth: 50,
          modifier: 1,
        },
      },
      // Tablet
      768: {
        slidesPerView: "auto",
        spaceBetween: 30,
        coverflowEffect: {
          depth: 80,
          modifier: 1.5,
        },
      },
      // Desktop
      1024: {
        slidesPerView: "auto",
        spaceBetween: 40,
        coverflowEffect: {
          depth: 100,
          modifier: 2,
        },
      },
    },
  });

  // Pause autoplay on hover (additional control)
  if (testimonialSwiper) {
    testimonialSwiper.addEventListener("mouseenter", () => {
      swiper.autoplay.stop();
    });

    testimonialSwiper.addEventListener("mouseleave", () => {
      swiper.autoplay.start();
    });
  }
}

// Old testimonial carousel code (disabled)
if (false) {
  let currentIndex = 0;
  const totalSlides = testimonialCards.length;
  let autoplayInterval;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.classList.add("testimonial-dot");
    dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    testimonialDotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".testimonial-dot");

  function updateCarousel() {
    const cardWidth = testimonialCards[0].offsetWidth;
    const gap = 48; // var(--space-2xl)
    const offset = -(currentIndex * (cardWidth + gap));
    testimonialCarousel.style.transform = `translateX(${offset}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoplay();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Event listeners
  testimonialNext.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  testimonialPrev.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  testimonialCarousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  testimonialCarousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      nextSlide();
      resetAutoplay();
    }
    if (touchEndX - touchStartX > 50) {
      prevSlide();
      resetAutoplay();
    }
  }

  // Keyboard navigation (disabled - using grid layout)
  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "ArrowLeft") {
  //     prevSlide();
  //     resetAutoplay();
  //   }
  //   if (e.key === "ArrowRight") {
  //     nextSlide();
  //     resetAutoplay();
  //   }
  // });

  // Pause autoplay on hover
  testimonialCarousel.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval);
  });

  testimonialCarousel.addEventListener("mouseleave", () => {
    startAutoplay();
  });

  // Responsive resize
  window.addEventListener("resize", updateCarousel);

  // Start autoplay
  startAutoplay();
  updateCarousel();
}

// ==========================================================================
// PAGE LOAD ANIMATION
// ==========================================================================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate other elements
  gsap.from(".btn-glow", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 1.3,
    ease: "power3.out",
  });

  gsap.from(".scroll-indicator", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 1.6,
    ease: "power3.out",
  });
});

// ==========================================================================
// CONSOLE EASTER EGG
// ==========================================================================

console.log(
  "%c🏆 PLAYMAKER GROUP",
  "font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #F4D03F 0%, #FF6B35 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
);
console.log(
  "%cWhere Greatness Lives Under The Lights",
  "font-size: 14px; color: #C8C6C6;"
);
console.log(
  "%cInterested in how we built this? Let's talk: hello@playmakergroup.com",
  "font-size: 12px; color: #F4D03F;"
);

// ==========================================================================
// EXPORT FOR TESTING
// ==========================================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    revealWords,
    initScrollAnimations,
    ParticleSystem,
  };
}

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

// Close menu when clicking a link (except dropdown triggers)
document.querySelectorAll(".navbar-stadium__link").forEach((link) => {
  link.addEventListener("click", () => {
    // Don't close menu if it's a dropdown trigger
    if (link.classList.contains("navbar-dropdown__trigger")) {
      return;
    }
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
// DROPDOWN MENU FUNCTIONALITY
// ==========================================================================

const dropdownTriggers = document.querySelectorAll(".navbar-dropdown__trigger");
const dropdowns = document.querySelectorAll(".navbar-dropdown");

// Handle dropdown interactions
dropdownTriggers.forEach((trigger) => {
  // Prevent Portfolio link from navigating on click
  trigger.addEventListener("click", (e) => {
    e.preventDefault();

    // On mobile/tablet, toggle the dropdown
    if (window.innerWidth <= 1024) {
      const dropdown = trigger.closest(".navbar-dropdown");

      // Close other dropdowns
      dropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("active");
        }
      });

      // Toggle current dropdown
      dropdown.classList.toggle("active");
    }
    // On desktop, dropdown shows on hover, so click does nothing
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar-dropdown")) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

// Close dropdown when clicking on a dropdown link
document.querySelectorAll(".navbar-dropdown__link").forEach((link) => {
  link.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
    // Close mobile menu if open
    if (navMenu && navMenu.classList.contains("active")) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
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

  // Check if we're on a subpage (not the main page)
  const isSubpage =
    window.location.pathname !== "/" &&
    window.location.pathname !== "/index.html";

  // If on a subpage, don't modify active states (keep HTML-defined active state)
  if (isSubpage) {
    return;
  }

  let currentSection = "";
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  // Find which section is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset for navbar height
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
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
// 3D PHONE STACK SHOWCASE - PERFORMANCE OPTIMIZED
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
let animationFrameId = null;

// Set total number
if (totalNumber) totalNumber.textContent = totalPhones;

// Update phone positions based on current index - optimized with requestAnimationFrame
function updatePhoneStack() {
  // Cancel any pending animation frame
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  animationFrameId = requestAnimationFrame(() => {
    phoneCards.forEach((card, index) => {
      const relativeIndex = (index - currentPhone + totalPhones) % totalPhones;
      card.setAttribute("data-index", relativeIndex);
    });

    // Update counter
    if (currentNumber) currentNumber.textContent = currentPhone + 1;
  });
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
if (nextBtn)
  nextBtn.addEventListener("click", () => {
    stopAutoRotate();
    nextPhone();
  });
if (prevBtn)
  prevBtn.addEventListener("click", () => {
    stopAutoRotate();
    prevPhone();
  });

// Mouse/Touch drag interaction - optimized with passive listeners and RAF
if (phoneStack) {
  phoneStack.addEventListener("mousedown", startDrag);
  phoneStack.addEventListener("touchstart", startDrag, { passive: true });
  document.addEventListener("mousemove", onDrag, { passive: true });
  document.addEventListener("touchmove", onDrag, { passive: true });
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function startDrag(e) {
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  if (phoneStack) phoneStack.style.cursor = "grabbing";
}

// Throttle drag updates using requestAnimationFrame
let dragFrameId = null;
function onDrag(e) {
  if (!isDragging) return;

  const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  const deltaX = currentX - startX;

  // Cancel previous frame if still pending
  if (dragFrameId) {
    cancelAnimationFrame(dragFrameId);
  }

  // Update rotation using RAF for smooth 60fps
  dragFrameId = requestAnimationFrame(() => {
    rotationY = deltaX * 0.3;
    if (phoneStack) {
      phoneStack.style.transform = `rotateY(${rotationY}deg)`;
    }
  });
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  if (phoneStack) phoneStack.style.cursor = "grab";

  // Cancel any pending drag frame
  if (dragFrameId) {
    cancelAnimationFrame(dragFrameId);
    dragFrameId = null;
  }

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
// ANIMATED SPORTS CANVAS BACKGROUND - DISABLED FOR PERFORMANCE
// ==========================================================================

// Function to check if mobile device for performance optimization
function checkIsMobile() {
  return window.innerWidth <= 575;
}

// Canvas particle effects disabled for performance optimization
// Only floating upward particles remain active (see FLOATING PARTICLES SYSTEM section)

// ==========================================================================
// ABOUT SECTION CANVAS BACKGROUND - DISABLED FOR PERFORMANCE
// ==========================================================================

// About section canvas particle effects disabled for performance optimization
// Only floating upward particles remain active (see FLOATING PARTICLES SYSTEM section)

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

    // Show/hide the show more button (always visible for both filters)
    const showMoreBtn = document.getElementById("showMoreBtn");
    const showMoreContainer = document.querySelector(".portfolio-show-more");
    if (showMoreContainer) {
      showMoreContainer.style.display = "flex";
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

// Open lightbox when clicking on portfolio images (but not videos)
portfolioItems.forEach((item) => {
  const image = item.querySelector("img");
  if (image) {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      // Don't open image lightbox for video items
      if (item.dataset.category === "video") {
        return;
      }

      // Get all visible (non-hidden) portfolio items (excluding videos)
      visibleImages = Array.from(portfolioItems).filter(
        (item) =>
          !item.classList.contains("hidden") &&
          item.dataset.category !== "video"
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

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener("click", closeLightbox);
}

// Navigate to previous image
if (lightboxPrev) {
  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex =
      (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector("img");
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
  });
}

// Navigate to next image
if (lightboxNext) {
  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector("img");
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft" && lightboxPrev) lightboxPrev.click();
  if (e.key === "ArrowRight" && lightboxNext) lightboxNext.click();
});

// ==========================================================================
// VIDEO LIGHTBOX FUNCTIONALITY FOR PORTFOLIO
// ==========================================================================

const videoLightbox = document.getElementById("videoLightbox");
const videoLightboxClose = document.getElementById("videoLightboxClose");
const videoLightboxBackdrop = videoLightbox
  ? videoLightbox.querySelector(".lightbox-backdrop")
  : null;
const portfolioVideoPlayer = document.getElementById("portfolioVideoPlayer");
const portfolioPlayButtons = document.querySelectorAll(".portfolio-play-btn");

// Portfolio video URLs
const portfolioVideoUrls = [
  "vid/showcase1.mp4",
  "vid/showcase2.mp4",
  "vid/showcase3.mp4",
  "vid/showcase4.mp4",
  "vid/showcase5.mp4",
  "vid/showcase6.mp4",
  "vid/showcase7.mp4",
  "vid/showcase8.mp4",
];

// Open video lightbox when clicking play button
portfolioPlayButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent triggering the portfolio item click
    const videoId = parseInt(this.getAttribute("data-video-id"));
    const videoUrl = portfolioVideoUrls[videoId];

    if (portfolioVideoPlayer && videoUrl) {
      portfolioVideoPlayer.src = videoUrl;
      portfolioVideoPlayer.load();
    }

    if (videoLightbox) {
      // Animate lightbox opening
      gsap.set(videoLightbox, { display: "flex" });
      gsap.to(videoLightbox, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        onStart: () => {
          videoLightbox.classList.add("active");
          document.body.style.overflow = "hidden";
        },
      });

      // Scale animation for content
      gsap.fromTo(
        ".video-lightbox-content",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
    }
  });
});

// Close video lightbox
function closeVideoLightbox() {
  if (!videoLightbox) return;

  gsap.to(videoLightbox, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      videoLightbox.classList.remove("active");
      videoLightbox.style.display = "none";
      document.body.style.overflow = "";

      // Stop video playback
      if (portfolioVideoPlayer) {
        portfolioVideoPlayer.pause();
        portfolioVideoPlayer.src = "";
      }
    },
  });
}

if (videoLightboxClose) {
  videoLightboxClose.addEventListener("click", closeVideoLightbox);
}

if (videoLightboxBackdrop) {
  videoLightboxBackdrop.addEventListener("click", closeVideoLightbox);
}

// Keyboard navigation for video lightbox
document.addEventListener("keydown", (e) => {
  if (videoLightbox && videoLightbox.classList.contains("active")) {
    if (e.key === "Escape") closeVideoLightbox();
  }
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

    // Get current active filter
    const activeFilter = document.querySelector(".filter-btn.active");
    const currentCategory = activeFilter
      ? activeFilter.dataset.filter
      : "graphics";

    // Get only the "more" items for the current category
    const currentMoreItems = Array.from(portfolioMoreItems).filter(
      (item) => item.dataset.category === currentCategory
    );

    if (window.isShowingMore) {
      // Show more items
      showMoreText.textContent = "Show Less";
      showMoreBtn.classList.add("active");

      currentMoreItems.forEach((item, index) => {
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
      const itemsArray = currentMoreItems.reverse();

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
    // Carousel settings - using slide effect for better performance
    effect: "slide",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: false,

    // Autoplay - increased delay for fewer transitions
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Speed - optimized for smooth, snappy transitions
    speed: 400,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Pagination dots - static bullets for better performance
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: false,
    },

    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Touch/Swipe
    touchRatio: 1,
    touchAngle: 45,

    // Performance optimizations
    watchSlidesProgress: false,
    preventInteractionOnTransition: true,
    lazy: true,

    // Responsive breakpoints
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Tablet
      768: {
        slidesPerView: "2",
        spaceBetween: 30,
      },
      // Desktop
      1024: {
        slidesPerView: "2",
        spaceBetween: 40,
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
// PORTFOLIO VIDEO THUMBNAILS AND DURATIONS
// ==========================================================================

// Format duration from seconds to MM:SS
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Load video metadata and generate thumbnails for portfolio videos
function loadPortfolioVideoMetadata() {
  const videoItems = document.querySelectorAll(
    '.portfolio-item[data-category="video"]'
  );

  videoItems.forEach((item, index) => {
    const imgElement = item.querySelector("img");
    const durationBadge = item.querySelector(".portfolio-duration");
    const videoUrl = portfolioVideoUrls[index];

    if (!imgElement || !durationBadge || !videoUrl) return;

    // Create hidden video element to extract metadata
    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.muted = true;
    videoElement.style.display = "none";
    document.body.appendChild(videoElement);

    // Extract duration
    videoElement.addEventListener("loadedmetadata", function () {
      durationBadge.textContent = formatDuration(this.duration);

      // Seek to 0.5 seconds to capture thumbnail
      this.currentTime = 0.5;
    });

    // Capture thumbnail frame
    videoElement.addEventListener("seeked", function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob and set as image source
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const thumbnailUrl = URL.createObjectURL(blob);
            imgElement.src = thumbnailUrl;

            // Clean up
            document.body.removeChild(videoElement);
          }
        },
        "image/jpeg",
        0.85
      );
    });

    // Handle errors
    videoElement.addEventListener("error", function () {
      console.warn(`Failed to load video metadata for: ${videoUrl}`);
      document.body.removeChild(videoElement);
    });

    // Start loading
    videoElement.src = videoUrl;
  });
}

// Load portfolio video metadata after page load
window.addEventListener("load", () => {
  // Small delay to ensure all other resources are loaded first
  setTimeout(loadPortfolioVideoMetadata, 300);
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
  "%cInterested in how we built this? Let's talk: jevta.site@gmail.com",
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

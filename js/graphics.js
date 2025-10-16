// ==========================================================================
// GRAPHICS PAGE JAVASCRIPT - HERO SWIPER
// PlayMaker Group - Graphics Portfolio Interactions
// ==========================================================================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// NAVBAR INITIALIZATION - ENSURE TRANSPARENT ON LOAD
// ==========================================================================

// Ensure navbar starts transparent on page load
const graphicsNavbar = document.getElementById("navbar");
if (graphicsNavbar) {
  // Remove scrolled class if it exists on page load
  graphicsNavbar.classList.remove("scrolled");

  // Force transparent background
  graphicsNavbar.style.background = "transparent";
  graphicsNavbar.style.backdropFilter = "none";
  graphicsNavbar.style.boxShadow = "none";
}

// ==========================================================================
// HERO SWIPER - 9:16 CAROUSEL
// ==========================================================================

const graphicsSwiper = new Swiper(".graphicsSwiper", {
  // Effect and centering
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,

  // Show multiple slides
  slidesPerView: "auto",

  // Coverflow effect settings
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: false,
  },

  // Enable looping for desktop
  loop: true,

  // Smooth transitions
  speed: 800,

  // Navigation
  navigation: {
    nextEl: ".hero-swiper .swiper-button-next",
    prevEl: ".hero-swiper .swiper-button-prev",
  },

  // Keyboard control
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  // Pagination (optional)
  autoplay: false,

  // Breakpoints for responsive design - Optimized for mobile/tablet performance
  breakpoints: {
    // Mobile - Maximum Performance
    320: {
      effect: "slide", // Switch to slide effect for better performance
      slidesPerView: 1,
      loop: false, // Disable loop to reduce DOM nodes
      speed: 400, // Faster transitions
      grabCursor: false, // Disable on mobile
    },
    // Tablet - Balanced Performance
    768: {
      effect: "coverflow",
      slidesPerView: "auto",
      loop: false, // Disable loop
      speed: 600,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 80, // Reduced depth
        modifier: 1, // Lighter effect
        slideShadows: false,
      },
    },
    // Desktop - Full Effects (>1024px)
    1025: {
      effect: "coverflow",
      slidesPerView: "auto",
      loop: true, // Enable loop on desktop
      speed: 800,
      grabCursor: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
      },
    },
  },
});

console.log("Graphics Hero Swiper initialized successfully");

// ==========================================================================
// GRAPHICS GALLERY LIGHTBOX
// ==========================================================================

const graphicsGalleryItems = document.querySelectorAll(
  ".graphics-gallery-item"
);
const graphicsLightbox = document.getElementById("lightbox");
const graphicsLightboxImage = document.getElementById("lightboxImage");
const graphicsLightboxClose = document.getElementById("lightboxClose");
const graphicsLightboxPrev = document.getElementById("lightboxPrev");
const graphicsLightboxNext = document.getElementById("lightboxNext");
const graphicsLightboxBackdrop = document.querySelector(".lightbox-backdrop");

let graphicsCurrentImageIndex = 0;

// Open lightbox when clicking on gallery item
graphicsGalleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    graphicsCurrentImageIndex = index;
    openGraphicsLightbox(item);
  });
});

function openGraphicsLightbox(item) {
  const img = item.querySelector("img");

  if (graphicsLightboxImage && img) {
    graphicsLightboxImage.src = img.src;
    graphicsLightboxImage.alt = img.alt;
  }

  if (graphicsLightbox) {
    graphicsLightbox.classList.add("active");
    document.body.style.overflow = "hidden";

    // Animate lightbox in
    const lightboxContent = graphicsLightbox.querySelector(".lightbox-content");
    if (lightboxContent) {
      gsap.fromTo(
        lightboxContent,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }
}

function closeGraphicsLightbox() {
  const lightboxContent = graphicsLightbox.querySelector(".lightbox-content");
  if (lightboxContent) {
    gsap.to(lightboxContent, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        if (graphicsLightbox) {
          graphicsLightbox.classList.remove("active");
          document.body.style.overflow = "";
        }
      },
    });
  } else {
    if (graphicsLightbox) {
      graphicsLightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
}

// Close lightbox
if (graphicsLightboxClose) {
  graphicsLightboxClose.addEventListener("click", closeGraphicsLightbox);
}

if (graphicsLightboxBackdrop) {
  graphicsLightboxBackdrop.addEventListener("click", closeGraphicsLightbox);
}

// Navigate to previous image
if (graphicsLightboxPrev) {
  graphicsLightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    graphicsCurrentImageIndex =
      (graphicsCurrentImageIndex - 1 + graphicsGalleryItems.length) %
      graphicsGalleryItems.length;
    const prevItem = graphicsGalleryItems[graphicsCurrentImageIndex];

    // Update lightbox content with animation
    if (graphicsLightboxImage) {
      gsap.to(graphicsLightboxImage, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          const img = prevItem.querySelector("img");
          graphicsLightboxImage.src = img.src;
          graphicsLightboxImage.alt = img.alt;
          gsap.to(graphicsLightboxImage, { opacity: 1, duration: 0.2 });
        },
      });
    }
  });
}

// Navigate to next image
if (graphicsLightboxNext) {
  graphicsLightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    graphicsCurrentImageIndex =
      (graphicsCurrentImageIndex + 1) % graphicsGalleryItems.length;
    const nextItem = graphicsGalleryItems[graphicsCurrentImageIndex];

    // Update lightbox content with animation
    if (graphicsLightboxImage) {
      gsap.to(graphicsLightboxImage, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          const img = nextItem.querySelector("img");
          graphicsLightboxImage.src = img.src;
          graphicsLightboxImage.alt = img.alt;
          gsap.to(graphicsLightboxImage, { opacity: 1, duration: 0.2 });
        },
      });
    }
  });
}

// ==========================================================================
// SEE MORE / SHOW LESS BUTTON FUNCTIONALITY
// ==========================================================================

const graphicsSeeMoreBtn = document.getElementById("graphicsSeeMoreBtn");
const graphicsShowLessBtn = document.getElementById("graphicsShowLessBtn");
const hiddenGalleryItems = document.querySelectorAll(".gallery-item-hidden");

// See More Button - Reveal hidden items with dynamic animation
if (graphicsSeeMoreBtn && hiddenGalleryItems.length > 0) {
  graphicsSeeMoreBtn.addEventListener("click", () => {
    // Hide "See More" button with upward fade
    gsap.to(graphicsSeeMoreBtn, {
      opacity: 0,
      y: -30,
      scale: 0.9,
      duration: 0.4,
      ease: "back.in(1.7)",
      onComplete: () => {
        graphicsSeeMoreBtn.style.display = "none";
      },
    });

    // Animate each hidden item with impressive 3D wave effect
    hiddenGalleryItems.forEach((item, index) => {
      // Calculate staggered delay with wave pattern
      const delay = 0.3 + index * 0.08;
      const isEvenRow = Math.floor(index / 3) % 2 === 0;

      // Set initial 3D transform
      gsap.set(item, {
        display: "block",
        perspective: 1000,
        transformStyle: "preserve-3d",
      });

      // Animate with 3D flip and bounce effect
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 60,
          scale: 0.7,
          rotateX: -20,
          rotateY: isEvenRow ? -15 : 15,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          delay: delay,
          ease: "elastic.out(1, 0.6)",
          onComplete: () => {
            item.classList.remove("gallery-item-hidden");
            item.classList.add("revealed");
          },
        }
      );

      // Add subtle bounce on image
      gsap.fromTo(
        item.querySelector("img"),
        { scale: 1.2 },
        {
          scale: 1,
          duration: 0.8,
          delay: delay + 0.2,
          ease: "back.out(1.7)",
        }
      );
    });

    // Show "Show Less" button after animation
    setTimeout(() => {
      gsap.set(graphicsShowLessBtn, { display: "inline-flex" });
      gsap.fromTo(
        graphicsShowLessBtn,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }, 1200);

    // Update lightbox for newly revealed items
    setTimeout(() => {
      const allGalleryItems = document.querySelectorAll(
        ".graphics-gallery-item"
      );
      allGalleryItems.forEach((item, index) => {
        if (!item.dataset.lightboxAdded) {
          item.addEventListener("click", () => {
            graphicsCurrentImageIndex = index;
            openGraphicsLightbox(item);
          });
          item.dataset.lightboxAdded = "true";
        }
      });
    }, 1500);
  });
}

// Show Less Button - Hide items and return to initial state
if (graphicsShowLessBtn && hiddenGalleryItems.length > 0) {
  graphicsShowLessBtn.addEventListener("click", () => {
    // Hide "Show Less" button
    gsap.to(graphicsShowLessBtn, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        graphicsShowLessBtn.style.display = "none";
      },
    });

    // Animate items out in reverse order with cascade effect
    const reversedItems = Array.from(hiddenGalleryItems).reverse();
    reversedItems.forEach((item, index) => {
      const delay = index * 0.05;

      gsap.to(item, {
        opacity: 0,
        y: 40,
        scale: 0.8,
        rotateX: -15,
        duration: 0.4,
        delay: delay,
        ease: "power2.in",
        onComplete: () => {
          if (index === reversedItems.length - 1) {
            // After all items are hidden, reset them
            hiddenGalleryItems.forEach((hiddenItem) => {
              gsap.set(hiddenItem, { display: "none" });
              hiddenItem.classList.add("gallery-item-hidden");
              hiddenItem.classList.remove("revealed");
            });
          }
        },
      });
    });

    // Scroll to gallery section smoothly
    setTimeout(() => {
      const gallerySection = document.getElementById("graphicsGrid");
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);

    // Show "See More" button again
    setTimeout(() => {
      gsap.set(graphicsSeeMoreBtn, { display: "inline-flex" });
      gsap.fromTo(
        graphicsSeeMoreBtn,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }, 600);
  });
}

// ==========================================================================
// SCROLL ANIMATIONS - OPTIMIZED FOR PERFORMANCE
// ==========================================================================

// Fade up animations for elements - Only run once for performance
gsap.utils.toArray("[data-fade-up]").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        once: true, // Only trigger once for better performance
      },
    }
  );
});

// Graphics gallery items animation on scroll - Optimized
gsap.utils.toArray(".graphics-gallery-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: (index % 3) * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        once: true, // Only trigger once
      },
    }
  );
});

// Category cards animation - Optimized
gsap.utils.toArray(".category-card").forEach((card, index) => {
  gsap.fromTo(
    card,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        once: true, // Only trigger once
      },
    }
  );
});

// Stats animation - Optimized
gsap.utils.toArray(".stat-badge").forEach((badge, index) => {
  gsap.fromTo(
    badge,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: index * 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: badge,
        start: "top 85%",
        once: true, // Only trigger once
      },
    }
  );
});

// ==========================================================================
// PRESS CONFERENCE FAQ ACCORDION
// ==========================================================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const badge = item.querySelector(".question-badge");
  const icon = item.querySelector(".question-icon");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all other FAQ items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");

        gsap.to(otherAnswer, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    });

    // Toggle current item
    if (isActive) {
      // Close current item
      item.classList.remove("active");

      gsap.to(answer, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate badge and icon back
      gsap.to(badge, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else {
      // Open current item
      item.classList.add("active");

      // Animate answer in
      gsap.to(answer, {
        maxHeight: 500,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      // Animate badge - pulse effect
      gsap.fromTo(
        badge,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
          yoyo: true,
          repeat: 1,
        }
      );

      // Microphone icon animation for press badge
      const pressBadge = document.querySelector(".press-badge i");
      if (pressBadge) {
        gsap.fromTo(
          pressBadge,
          { y: 0 },
          {
            y: -5,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 3,
          }
        );
      }
    }
  });

  // Hover effects
  question.addEventListener("mouseenter", () => {
    if (!item.classList.contains("active")) {
      gsap.to(badge, {
        scale: 1.1,
        rotate: 5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });

  question.addEventListener("mouseleave", () => {
    if (!item.classList.contains("active")) {
      gsap.to(badge, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });
});

// Animate FAQ items on scroll
gsap.utils.toArray(".faq-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
});

console.log("Graphics 3-card carousel initialized successfully");
console.log("Press Conference FAQ initialized successfully");

// ==========================================================================
// CONTACT SECTION TOGGLE
// ==========================================================================

const getStartedBtn = document.querySelector(".cta-buttons .btn-hero-primary");
const contactSection = document.querySelector(".contact-section");

if (getStartedBtn && contactSection) {
  getStartedBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Toggle contact section visibility
    const isVisible = contactSection.classList.contains("visible");

    if (!isVisible) {
      // Show contact section
      contactSection.classList.add("visible");

      // Smooth scroll to contact section after a short delay
      setTimeout(() => {
        const offset = 80;
        const elementPosition =
          contactSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }, 300);
    } else {
      // Hide contact section and scroll to CTA
      window.scrollTo({
        top: document.querySelector(".cta-section").offsetTop - 80,
        behavior: "smooth",
      });

      setTimeout(() => {
        contactSection.classList.remove("visible");
      }, 500);
    }
  });
}

console.log("Contact section toggle initialized successfully");

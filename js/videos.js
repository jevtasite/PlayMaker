/* ==========================================================================
   VIDEOS PAGE JAVASCRIPT - VIDEO CAROUSEL & GALLERY
   PlayMaker Group - Video Portfolio
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================================================
  // GSAP ANIMATIONS
  // ==========================================================================

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================================================
  // HERO VIDEO SWIPER INITIALIZATION
  // ==========================================================================

  const videosSwiper = new Swiper(".videosSwiper", {
    // Effect and centering - EXACTLY like graphics page
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

    // No looping
    loop: false,

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

    // Breakpoints - match graphics page exactly
    breakpoints: {
      // Mobile - Maximum Performance
      320: {
        effect: "slide",
        slidesPerView: "auto",
        loop: false,
        speed: 400,
        grabCursor: false,
      },
      // Tablet - Balanced Performance
      768: {
        effect: "coverflow",
        slidesPerView: "auto",
        loop: false,
        speed: 600,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 1,
          slideShadows: false,
        },
      },
      // Desktop - Full Effects
      1025: {
        effect: "coverflow",
        slidesPerView: "auto",
        loop: false,
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

  // ==========================================================================
  // HERO VIDEO PLAY FUNCTIONALITY - OPTIMIZED WITH LAZY LOADING
  // ==========================================================================

  // Track currently playing video
  let currentlyPlayingVideo = null;

  // Handle play button clicks in hero swiper
  const heroPlayButtons = document.querySelectorAll(
    ".hero-swiper .play-button"
  );

  heroPlayButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      const videoContainer = this.closest(".video-container");
      const thumbnail = videoContainer.querySelector(".video-thumbnail");
      const player = videoContainer.querySelector(".video-player");
      const iframe = player.querySelector("iframe");

      // Lazy load iframe if not already loaded
      const dataSrc = iframe.getAttribute("data-src");
      if (dataSrc && !iframe.getAttribute("src")) {
        iframe.setAttribute("src", dataSrc + "&autoplay=1");
      } else {
        // If already loaded, just add autoplay parameter
        const src = iframe.getAttribute("src");
        if (src && src.indexOf("autoplay=1") === -1) {
          iframe.setAttribute(
            "src",
            src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1"
          );
        }
      }

      // Hide thumbnail and show video player
      thumbnail.style.display = "none";
      player.style.display = "block";

      // Track currently playing video
      currentlyPlayingVideo = { container: videoContainer, iframe };
    });
  });

  // Optimized: Only stop currently playing video when slide changes
  videosSwiper.on("slideChange", function () {
    // Only process if there's a video currently playing
    if (currentlyPlayingVideo) {
      const { container, iframe } = currentlyPlayingVideo;

      // Reset to thumbnail view
      const thumbnail = container.querySelector(".video-thumbnail");
      const player = container.querySelector(".video-player");

      player.style.display = "none";
      thumbnail.style.display = "block";

      // Stop video by removing src (forces unload)
      const src = iframe.getAttribute("src");
      if (src) {
        iframe.setAttribute("src", "");
        iframe.setAttribute("data-src", src.replace(/[?&]autoplay=1/g, ""));
      }

      // Clear the reference
      currentlyPlayingVideo = null;
    }
  });

  // ==========================================================================
  // VIDEO GALLERY SEE MORE / SEE LESS
  // ==========================================================================

  const seeMoreBtn = document.getElementById("videosSeeMoreBtn");
  const showLessBtn = document.getElementById("videosShowLessBtn");
  const hiddenItems = document.querySelectorAll(
    ".video-gallery-item.video-item-hidden"
  );

  if (seeMoreBtn) {
    seeMoreBtn.addEventListener("click", function () {
      // Show all hidden items
      hiddenItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("video-item-hidden");
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            }
          );
        }, index * 100);
      });

      // Toggle buttons
      this.classList.add("hidden");
      showLessBtn.classList.remove("hidden");

      // Smooth scroll to first revealed item
      setTimeout(() => {
        const firstHiddenItem = hiddenItems[0];
        if (firstHiddenItem) {
          const offset = 100;
          const elementPosition =
            firstHiddenItem.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 200);
    });
  }

  if (showLessBtn) {
    showLessBtn.addEventListener("click", function () {
      // Hide all extra items
      hiddenItems.forEach((item) => {
        gsap.to(item, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          onComplete: () => {
            item.classList.add("video-item-hidden");
          },
        });
      });

      // Toggle buttons
      this.classList.add("hidden");
      seeMoreBtn.classList.remove("hidden");

      // Scroll to gallery section
      setTimeout(() => {
        const gallerySection = document.getElementById("videosGrid");
        if (gallerySection) {
          const offset = 100;
          const elementPosition =
            gallerySection.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 200);
    });
  }

  // ==========================================================================
  // VIDEO LIGHTBOX FUNCTIONALITY
  // ==========================================================================

  const videoLightbox = document.getElementById("videoLightbox");
  const lightboxPlayer = document.getElementById("lightboxVideoPlayer");
  const lightboxClose = document.getElementById("videoLightboxClose");
  const videoPlayButtons = document.querySelectorAll(".video-play-btn");

  // Video URLs (Replace with actual video URLs)
  const videoUrls = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
  ];

  // Open lightbox
  videoPlayButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const videoId = this.getAttribute("data-video-id");
      const videoUrl = videoUrls[videoId] || videoUrls[0];

      lightboxPlayer.setAttribute("src", videoUrl);
      videoLightbox.classList.add("active");
      document.body.style.overflow = "hidden";

      // Fade in animation
      gsap.fromTo(videoLightbox, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    });
  });

  // Close lightbox
  function closeLightbox() {
    gsap.to(videoLightbox, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        videoLightbox.classList.remove("active");
        lightboxPlayer.setAttribute("src", "");
        document.body.style.overflow = "";
      },
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  // Close on backdrop click
  if (videoLightbox) {
    videoLightbox.addEventListener("click", function (e) {
      if (
        e.target === this ||
        e.target.classList.contains("video-lightbox-backdrop")
      ) {
        closeLightbox();
      }
    });
  }

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && videoLightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // ==========================================================================
  // FAQ ACCORDION
  // ==========================================================================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");
        const answer = faqItem.querySelector(".faq-answer");
        answer.style.maxHeight = null;
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // ==========================================================================
  // SCROLL ANIMATIONS - FADE UP
  // ==========================================================================

  // Fade up animations for elements - Only run once for performance
  gsap.utils.toArray("[data-fade-up]").forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
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

  // Video gallery items animation
  gsap.utils
    .toArray(".video-gallery-item:not(.video-item-hidden)")
    .forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

  // Philosophy stat cards animation
  gsap.utils.toArray(".philosophy-stat").forEach((stat, index) => {
    gsap.fromTo(
      stat,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          once: true,
        },
      }
    );
  });

  // FAQ items animation
  gsap.utils.toArray(".faq-item").forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          once: true,
        },
      }
    );
  });

  // ==========================================================================
  // STAT NUMBER COUNTER ANIMATION
  // ==========================================================================

  gsap.utils.toArray(".stat-number").forEach((stat) => {
    const target = stat.textContent;
    const hasPlus = target.includes("+");
    const hasH = target.includes("h");
    const numericValue = parseInt(target.replace(/\D/g, ""));

    ScrollTrigger.create({
      trigger: stat,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: "power1.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              const current = Math.round(this.targets()[0].textContent);
              if (hasH) {
                stat.textContent = current + "-" + (current + 24) + "h";
              } else if (hasPlus) {
                stat.textContent =
                  current >= 1000
                    ? Math.round(current / 1000) + "K+"
                    : current + "+";
              } else {
                stat.textContent = current;
              }
            },
          }
        );
      },
    });
  });

  // ==========================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or "javascript:void(0)"
      if (href === "#" || href === "javascript:void(0)") {
        return;
      }

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offset = 80;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    });
  });

  // ==========================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ==========================================================================

  // Lazy load video thumbnails that aren't in viewport
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute("data-src");
            if (src) {
              img.setAttribute("src", src);
              img.removeAttribute("data-src");
            }
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    // Observe all images with data-src attribute
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ==========================================================================
  // CTA BUTTON - CONTACT SECTION TOGGLE
  // ==========================================================================

  const ctaContactBtn = document.querySelector(".btn-contact-toggle");
  const contactSection = document.getElementById("contact");

  if (ctaContactBtn && contactSection) {
    ctaContactBtn.addEventListener("click", function (e) {
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

  // ==========================================================================
  // HERO SECTION INTRO ANIMATIONS
  // ==========================================================================

  // Initialize hero animations - Run immediately after DOM ready
  setTimeout(() => {
    // Animate page badge
    gsap.to(".page-badge", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    });

    // Animate main title
    gsap.fromTo(
      ".hero-main-title",
      { y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      }
    );

    // Animate subtitle
    gsap.fromTo(
      ".hero-subtitle",
      { y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      }
    );

    // Animate swiper with blur reveal effect
    gsap.fromTo(
      ".hero-swiper",
      {
        y: 60,
        filter: "blur(20px)",
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      }
    );

    // Animate swiper navigation buttons
    gsap.to(
      ".hero-swiper .swiper-button-next, .hero-swiper .swiper-button-prev",
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 1.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );

    // Animate explore button
    gsap.fromTo(
      ".btn-explore-work",
      { y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 1.4,
        ease: "back.out(1.7)",
      }
    );
  }, 100);

  // ==========================================================================
  // CONSOLE LOG - PAGE LOADED
  // ==========================================================================

  console.log("🎬 Videos Page Loaded Successfully");
  console.log("📹 Video Swiper Initialized");
  console.log("🎯 Category Filters Active");
  console.log("🎞️ Lightbox Player Ready");
});

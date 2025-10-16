// ==========================================================================
// GRAPHICS PAGE JAVASCRIPT - HERO SWIPER
// PlayMaker Group - Graphics Portfolio Interactions
// ==========================================================================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// HERO SWIPER - 9:16 CAROUSEL
// ==========================================================================

const graphicsSwiper = new Swiper('.graphicsSwiper', {
  // Centered slides
  centeredSlides: true,

  // Show multiple slides (1 active + sides)
  slidesPerView: 'auto',
  spaceBetween: 32,

  // No looping
  loop: false,

  // Smooth transitions
  speed: 800,
  effect: 'slide',

  // Navigation
  navigation: {
    nextEl: '.hero-swiper .swiper-button-next',
    prevEl: '.hero-swiper .swiper-button-prev',
  },

  // Keyboard control
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  // Touch/swipe settings
  touchRatio: 1,
  threshold: 10,

  // Breakpoints for responsive design
  breakpoints: {
    // Mobile
    320: {
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: true,
    },
    // Tablet
    768: {
      slidesPerView: 'auto',
      spaceBetween: 24,
      centeredSlides: true,
    },
    // Desktop
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 32,
      centeredSlides: true,
    },
  },
});

console.log('Graphics Hero Swiper initialized successfully');

// ==========================================================================
// GRAPHICS GALLERY LIGHTBOX
// ==========================================================================

const graphicsGalleryItems = document.querySelectorAll('.graphics-gallery-item');
const graphicsLightbox = document.getElementById('lightbox');
const graphicsLightboxImage = document.getElementById('lightboxImage');
const graphicsLightboxClose = document.getElementById('lightboxClose');
const graphicsLightboxPrev = document.getElementById('lightboxPrev');
const graphicsLightboxNext = document.getElementById('lightboxNext');
const graphicsLightboxBackdrop = document.querySelector('.lightbox-backdrop');

let graphicsCurrentImageIndex = 0;

// Open lightbox when clicking on gallery item
graphicsGalleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    graphicsCurrentImageIndex = index;
    openGraphicsLightbox(item);
  });
});

function openGraphicsLightbox(item) {
  const img = item.querySelector('img');

  if (graphicsLightboxImage && img) {
    graphicsLightboxImage.src = img.src;
    graphicsLightboxImage.alt = img.alt;
  }

  if (graphicsLightbox) {
    graphicsLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate lightbox in
    const lightboxContent = graphicsLightbox.querySelector('.lightbox-content');
    if (lightboxContent) {
      gsap.fromTo(lightboxContent,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }
}

function closeGraphicsLightbox() {
  const lightboxContent = graphicsLightbox.querySelector('.lightbox-content');
  if (lightboxContent) {
    gsap.to(lightboxContent, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        if (graphicsLightbox) {
          graphicsLightbox.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  } else {
    if (graphicsLightbox) {
      graphicsLightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// Close lightbox
if (graphicsLightboxClose) {
  graphicsLightboxClose.addEventListener('click', closeGraphicsLightbox);
}

if (graphicsLightboxBackdrop) {
  graphicsLightboxBackdrop.addEventListener('click', closeGraphicsLightbox);
}

// Navigate to previous image
if (graphicsLightboxPrev) {
  graphicsLightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    graphicsCurrentImageIndex = (graphicsCurrentImageIndex - 1 + graphicsGalleryItems.length) % graphicsGalleryItems.length;
    const prevItem = graphicsGalleryItems[graphicsCurrentImageIndex];

    // Update lightbox content with animation
    if (graphicsLightboxImage) {
      gsap.to(graphicsLightboxImage, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          const img = prevItem.querySelector('img');
          graphicsLightboxImage.src = img.src;
          graphicsLightboxImage.alt = img.alt;
          gsap.to(graphicsLightboxImage, { opacity: 1, duration: 0.2 });
        }
      });
    }
  });
}

// Navigate to next image
if (graphicsLightboxNext) {
  graphicsLightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    graphicsCurrentImageIndex = (graphicsCurrentImageIndex + 1) % graphicsGalleryItems.length;
    const nextItem = graphicsGalleryItems[graphicsCurrentImageIndex];

    // Update lightbox content with animation
    if (graphicsLightboxImage) {
      gsap.to(graphicsLightboxImage, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          const img = nextItem.querySelector('img');
          graphicsLightboxImage.src = img.src;
          graphicsLightboxImage.alt = img.alt;
          gsap.to(graphicsLightboxImage, { opacity: 1, duration: 0.2 });
        }
      });
    }
  });
}

// ==========================================================================
// SEE MORE / SHOW LESS BUTTON FUNCTIONALITY
// ==========================================================================

const graphicsSeeMoreBtn = document.getElementById('graphicsSeeMoreBtn');
const graphicsShowLessBtn = document.getElementById('graphicsShowLessBtn');
const hiddenGalleryItems = document.querySelectorAll('.gallery-item-hidden');

// See More Button - Reveal hidden items with dynamic animation
if (graphicsSeeMoreBtn && hiddenGalleryItems.length > 0) {
  graphicsSeeMoreBtn.addEventListener('click', () => {
    // Hide "See More" button with upward fade
    gsap.to(graphicsSeeMoreBtn, {
      opacity: 0,
      y: -30,
      scale: 0.9,
      duration: 0.4,
      ease: 'back.in(1.7)',
      onComplete: () => {
        graphicsSeeMoreBtn.style.display = 'none';
      }
    });

    // Animate each hidden item with impressive 3D wave effect
    hiddenGalleryItems.forEach((item, index) => {
      // Calculate staggered delay with wave pattern
      const delay = 0.3 + (index * 0.08);
      const isEvenRow = Math.floor(index / 3) % 2 === 0;

      // Set initial 3D transform
      gsap.set(item, {
        display: 'block',
        perspective: 1000,
        transformStyle: 'preserve-3d'
      });

      // Animate with 3D flip and bounce effect
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 60,
          scale: 0.7,
          rotateX: -20,
          rotateY: isEvenRow ? -15 : 15,
          transformOrigin: 'center bottom'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          delay: delay,
          ease: 'elastic.out(1, 0.6)',
          onComplete: () => {
            item.classList.remove('gallery-item-hidden');
            item.classList.add('revealed');
          }
        }
      );

      // Add subtle bounce on image
      gsap.fromTo(item.querySelector('img'),
        { scale: 1.2 },
        {
          scale: 1,
          duration: 0.8,
          delay: delay + 0.2,
          ease: 'back.out(1.7)'
        }
      );
    });

    // Show "Show Less" button after animation
    setTimeout(() => {
      gsap.set(graphicsShowLessBtn, { display: 'inline-flex' });
      gsap.fromTo(graphicsShowLessBtn,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      );
    }, 1200);

    // Update lightbox for newly revealed items
    setTimeout(() => {
      const allGalleryItems = document.querySelectorAll('.graphics-gallery-item');
      allGalleryItems.forEach((item, index) => {
        if (!item.dataset.lightboxAdded) {
          item.addEventListener('click', () => {
            graphicsCurrentImageIndex = index;
            openGraphicsLightbox(item);
          });
          item.dataset.lightboxAdded = 'true';
        }
      });
    }, 1500);
  });
}

// Show Less Button - Hide items and return to initial state
if (graphicsShowLessBtn && hiddenGalleryItems.length > 0) {
  graphicsShowLessBtn.addEventListener('click', () => {
    // Hide "Show Less" button
    gsap.to(graphicsShowLessBtn, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        graphicsShowLessBtn.style.display = 'none';
      }
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
        ease: 'power2.in',
        onComplete: () => {
          if (index === reversedItems.length - 1) {
            // After all items are hidden, reset them
            hiddenGalleryItems.forEach(hiddenItem => {
              gsap.set(hiddenItem, { display: 'none' });
              hiddenItem.classList.add('gallery-item-hidden');
              hiddenItem.classList.remove('revealed');
            });
          }
        }
      });
    });

    // Scroll to gallery section smoothly
    setTimeout(() => {
      const gallerySection = document.getElementById('graphicsGrid');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);

    // Show "See More" button again
    setTimeout(() => {
      gsap.set(graphicsSeeMoreBtn, { display: 'inline-flex' });
      gsap.fromTo(graphicsSeeMoreBtn,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      );
    }, 600);
  });
}

// ==========================================================================
// SCROLL ANIMATIONS
// ==========================================================================

// Fade up animations for elements
gsap.utils.toArray('[data-fade-up]').forEach(element => {
  gsap.fromTo(element,
    {
      opacity: 0,
      y: 40
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// Graphics gallery items animation on scroll
gsap.utils.toArray('.graphics-gallery-item').forEach((item, index) => {
  gsap.fromTo(item,
    {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: (index % 3) * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// Category cards animation
gsap.utils.toArray('.category-card').forEach((card, index) => {
  gsap.fromTo(card,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// Stats animation
gsap.utils.toArray('.stat-badge').forEach((badge, index) => {
  gsap.fromTo(badge,
    {
      opacity: 0,
      scale: 0.8
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: index * 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: badge,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
});

console.log('Graphics 3-card carousel initialized successfully');

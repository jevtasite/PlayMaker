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

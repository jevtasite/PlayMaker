// ==========================================================================
// GRAPHICS PAGE JAVASCRIPT - 3-CARD CAROUSEL
// PlayMaker Group - Graphics Portfolio Interactions
// ==========================================================================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// FEATURED CAROUSEL - CENTERED FOCUS
// ==========================================================================

const graphicsCarouselTrack = document.getElementById('carouselTrack');
const graphicsCarouselCards = document.querySelectorAll('.carousel-card');
const graphicsCarouselPrevBtn = document.getElementById('graphicsCarouselPrev');
const graphicsCarouselNextBtn = document.getElementById('graphicsCarouselNext');
const graphicsCarouselDots = document.querySelectorAll('.carousel-dot');

let graphicsFeaturedIndex = 0;
const graphicsTotalCards = graphicsCarouselCards.length;
let graphicsIsTransitioning = false;
let graphicsAutoplayInterval;

// Update which card is featured (centered)
function updateFeaturedCard() {
  if (!graphicsCarouselTrack || graphicsCarouselCards.length === 0) return;

  // Update all cards based on their position relative to featured index
  graphicsCarouselCards.forEach((card, index) => {
    // Remove all state classes
    card.classList.remove('featured', 'side');

    // Set the order to maintain consistent positioning based on actual index
    card.style.order = index;

    if (index === graphicsFeaturedIndex) {
      // This is the featured (centered) card
      card.classList.add('featured');
      card.style.display = 'block';
    } else if (index === graphicsFeaturedIndex - 1 || index === graphicsFeaturedIndex + 1) {
      // These are the side cards (left and right of featured)
      card.classList.add('side');
      card.style.display = 'block';
    } else {
      // Hide all other cards
      card.style.display = 'none';
    }
  });

  // Update dots
  updateCarouselDots();

  // Update button states
  updateButtonStates();
}

// Update active dot
function updateCarouselDots() {
  graphicsCarouselDots.forEach((dot, index) => {
    if (index === graphicsFeaturedIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Update button states (disable at ends)
function updateButtonStates() {
  if (graphicsCarouselPrevBtn) {
    if (graphicsFeaturedIndex === 0) {
      graphicsCarouselPrevBtn.style.opacity = '0.3';
      graphicsCarouselPrevBtn.style.cursor = 'not-allowed';
    } else {
      graphicsCarouselPrevBtn.style.opacity = '1';
      graphicsCarouselPrevBtn.style.cursor = 'pointer';
    }
  }

  if (graphicsCarouselNextBtn) {
    if (graphicsFeaturedIndex === graphicsTotalCards - 1) {
      graphicsCarouselNextBtn.style.opacity = '0.3';
      graphicsCarouselNextBtn.style.cursor = 'not-allowed';
    } else {
      graphicsCarouselNextBtn.style.opacity = '1';
      graphicsCarouselNextBtn.style.cursor = 'pointer';
    }
  }
}

// Go to next slide
function goToNext() {
  if (graphicsIsTransitioning) return;
  if (graphicsFeaturedIndex >= graphicsTotalCards - 1) return; // No loop

  graphicsIsTransitioning = true;
  graphicsFeaturedIndex++;
  updateFeaturedCard();

  setTimeout(() => {
    graphicsIsTransitioning = false;
  }, 800);
}

// Go to previous slide
function goToPrevious() {
  if (graphicsIsTransitioning) return;
  if (graphicsFeaturedIndex <= 0) return; // No loop

  graphicsIsTransitioning = true;
  graphicsFeaturedIndex--;
  updateFeaturedCard();

  setTimeout(() => {
    graphicsIsTransitioning = false;
  }, 800);
}

// Go to specific index
function goToSlide(index) {
  if (graphicsIsTransitioning) return;
  if (index < 0 || index >= graphicsTotalCards) return;

  graphicsIsTransitioning = true;
  graphicsFeaturedIndex = index;
  updateFeaturedCard();

  setTimeout(() => {
    graphicsIsTransitioning = false;
  }, 800);
}

// Autoplay removed per user request

// Event Listeners - Navigation Buttons
if (graphicsCarouselPrevBtn) {
  graphicsCarouselPrevBtn.addEventListener('click', () => {
    goToPrevious();
  });

  graphicsCarouselPrevBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    goToPrevious();
  }, { passive: false });
}

if (graphicsCarouselNextBtn) {
  graphicsCarouselNextBtn.addEventListener('click', () => {
    goToNext();
  });

  graphicsCarouselNextBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    goToNext();
  }, { passive: false });
}

// Event Listeners - Pagination Dots
graphicsCarouselDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });

  dot.addEventListener('touchend', (e) => {
    e.preventDefault();
    goToSlide(index);
  }, { passive: false });
});

// Touch Swipe Support
let graphicsTouchStartX = 0;
let graphicsTouchEndX = 0;

if (graphicsCarouselTrack) {
  graphicsCarouselTrack.addEventListener('touchstart', (e) => {
    graphicsTouchStartX = e.changedTouches[0].screenX;
  });

  graphicsCarouselTrack.addEventListener('touchend', (e) => {
    graphicsTouchEndX = e.changedTouches[0].screenX;
    handleCarouselSwipe();
  });
}

function handleCarouselSwipe() {
  const swipeThreshold = 50;

  if (graphicsTouchStartX - graphicsTouchEndX > swipeThreshold) {
    // Swiped left - go to next
    goToNext();
  }

  if (graphicsTouchEndX - graphicsTouchStartX > swipeThreshold) {
    // Swiped right - go to previous
    goToPrevious();
  }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Only handle if we're not in a lightbox or other modal
  const graphicsLightboxCheck = document.getElementById('lightbox');
  if (graphicsLightboxCheck && graphicsLightboxCheck.classList.contains('active')) return;

  if (e.key === 'ArrowLeft') {
    goToPrevious();
  } else if (e.key === 'ArrowRight') {
    goToNext();
  }
});

// Initialize carousel on load
function initCarousel() {
  updateFeaturedCard();
}

// Handle window resize
let graphicsResizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(graphicsResizeTimeout);
  graphicsResizeTimeout = setTimeout(() => {
    updateFeaturedCard();
  }, 250);
});

// Initialize on page load
if (graphicsCarouselTrack && graphicsCarouselCards.length > 0) {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
}

// ==========================================================================
// PORTFOLIO FILTERING
// ==========================================================================

const graphicsFilterChips = document.querySelectorAll('.filter-chip');
const graphicsPortfolioItems = document.querySelectorAll('.portfolio-item');

graphicsFilterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    // Remove active class from all chips
    graphicsFilterChips.forEach(c => c.classList.remove('active'));

    // Add active class to clicked chip
    chip.classList.add('active');

    // Get filter value
    const filterValue = chip.getAttribute('data-filter');

    // Filter portfolio items
    graphicsPortfolioItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      if (filterValue === 'all' || itemCategory === filterValue) {
        // Show item with animation
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          onStart: () => {
            item.style.display = 'block';
          }
        });
      } else {
        // Hide item with animation
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

// ==========================================================================
// LIGHTBOX FUNCTIONALITY
// ==========================================================================

const graphicsLightbox = document.getElementById('lightbox');
const graphicsLightboxImage = document.getElementById('lightboxImage');
const graphicsLightboxTitle = document.getElementById('lightboxTitle');
const graphicsLightboxCategory = document.getElementById('lightboxCategory');
const graphicsLightboxClose = document.getElementById('lightboxClose');
const graphicsLightboxPrev = document.getElementById('lightboxPrev');
const graphicsLightboxNext = document.getElementById('lightboxNext');
const graphicsLightboxBackdrop = document.querySelector('.lightbox-backdrop');

let graphicsCurrentImageIndex = 0;

// Open lightbox when clicking on portfolio item
graphicsPortfolioItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    graphicsCurrentImageIndex = index;
    openGraphicsLightbox(item);
  });
});

function openGraphicsLightbox(item) {
  const img = item.querySelector('.portfolio-image img');
  const title = item.querySelector('.portfolio-title').textContent;
  const category = item.querySelector('.portfolio-category').textContent;

  if (graphicsLightboxImage && graphicsLightboxTitle && graphicsLightboxCategory) {
    graphicsLightboxImage.src = img.src;
    graphicsLightboxTitle.textContent = title;
    graphicsLightboxCategory.textContent = category;
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
    const visibleItems = Array.from(graphicsPortfolioItems).filter(item => {
      return window.getComputedStyle(item).display !== 'none';
    });

    graphicsCurrentImageIndex = (graphicsCurrentImageIndex - 1 + visibleItems.length) % visibleItems.length;
    const prevItem = visibleItems[graphicsCurrentImageIndex];

    // Update lightbox content with animation
    if (graphicsLightboxImage) {
      gsap.to(graphicsLightboxImage, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          const img = prevItem.querySelector('.portfolio-image img');
          const title = prevItem.querySelector('.portfolio-title').textContent;
          const category = prevItem.querySelector('.portfolio-category').textContent;

          graphicsLightboxImage.src = img.src;
          if (graphicsLightboxTitle) graphicsLightboxTitle.textContent = title;
          if (graphicsLightboxCategory) graphicsLightboxCategory.textContent = category;

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
    const visibleItems = Array.from(graphicsPortfolioItems).filter(item => {
      return window.getComputedStyle(item).display !== 'none';
    });

    graphicsCurrentImageIndex = (graphicsCurrentImageIndex + 1) % visibleItems.length;
    const nextItem = visibleItems[graphicsCurrentImageIndex];

    // Update lightbox content with animation
    if (graphicsLightboxImage) {
      gsap.to(graphicsLightboxImage, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          const img = nextItem.querySelector('.portfolio-image img');
          const title = nextItem.querySelector('.portfolio-title').textContent;
          const category = nextItem.querySelector('.portfolio-category').textContent;

          graphicsLightboxImage.src = img.src;
          if (graphicsLightboxTitle) graphicsLightboxTitle.textContent = title;
          if (graphicsLightboxCategory) graphicsLightboxCategory.textContent = category;

          gsap.to(graphicsLightboxImage, { opacity: 1, duration: 0.2 });
        }
      });
    }
  });
}

// ==========================================================================
// LOAD MORE FUNCTIONALITY
// ==========================================================================

const loadMoreBtn = document.getElementById('loadMoreBtn');
const portfolioGrid = document.getElementById('graphicsGrid');

// Hide items beyond initial 9 (if there are more)
let initialItemsCount = 9;
let currentVisibleCount = initialItemsCount;

function initializeLoadMore() {
  const allItems = Array.from(graphicsPortfolioItems);

  if (allItems.length <= initialItemsCount) {
    // If 9 or fewer items, hide the load more button
    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
    return;
  }

  // Hide items beyond the initial count
  allItems.forEach((item, index) => {
    if (index >= initialItemsCount) {
      item.style.display = 'none';
      item.classList.add('hidden-item');
    }
  });
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = Array.from(graphicsPortfolioItems).filter(item =>
      item.classList.contains('hidden-item')
    );

    // Show next 6 items
    const itemsToShow = hiddenItems.slice(0, 6);

    itemsToShow.forEach((item, index) => {
      item.classList.remove('hidden-item');

      // Animate items in
      gsap.fromTo(item,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
          onStart: () => {
            item.style.display = 'block';
          }
        }
      );
    });

    currentVisibleCount += itemsToShow.length;

    // Hide button if no more items
    const remainingHidden = Array.from(graphicsPortfolioItems).filter(item =>
      item.classList.contains('hidden-item')
    );

    if (remainingHidden.length === 0) {
      gsap.to(loadMoreBtn, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          loadMoreBtn.style.display = 'none';
        }
      });
    }
  });
}

// Initialize on page load
initializeLoadMore();

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

// Portfolio items animation on scroll
gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
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

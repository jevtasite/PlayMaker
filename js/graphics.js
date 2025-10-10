// ==========================================================================
// GRAPHICS PAGE JAVASCRIPT
// PlayMaker Group - Graphics Portfolio Interactions
// ==========================================================================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// PORTFOLIO FILTERING
// ==========================================================================

const filterChips = document.querySelectorAll('.filter-chip');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    // Remove active class from all chips
    filterChips.forEach(c => c.classList.remove('active'));

    // Add active class to clicked chip
    chip.classList.add('active');

    // Get filter value
    const filterValue = chip.getAttribute('data-filter');

    // Filter portfolio items
    portfolioItems.forEach(item => {
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

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

let currentImageIndex = 0;
const allImages = Array.from(portfolioItems);

// Open lightbox when clicking on portfolio item
portfolioItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = index;
    openLightbox(item);
  });
});

function openLightbox(item) {
  const img = item.querySelector('.portfolio-image img');
  const title = item.querySelector('.portfolio-title').textContent;
  const category = item.querySelector('.portfolio-category').textContent;

  lightboxImage.src = img.src;
  lightboxTitle.textContent = title;
  lightboxCategory.textContent = category;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Animate lightbox in
  gsap.fromTo(lightbox.querySelector('.lightbox-content'),
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
  );
}

function closeLightbox() {
  gsap.to(lightbox.querySelector('.lightbox-content'), {
    opacity: 0,
    scale: 0.9,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

// Navigate to previous image
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  const visibleItems = Array.from(portfolioItems).filter(item => {
    return window.getComputedStyle(item).display !== 'none';
  });

  currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
  const prevItem = visibleItems[currentImageIndex];

  // Update lightbox content with animation
  gsap.to(lightboxImage, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      const img = prevItem.querySelector('.portfolio-image img');
      const title = prevItem.querySelector('.portfolio-title').textContent;
      const category = prevItem.querySelector('.portfolio-category').textContent;

      lightboxImage.src = img.src;
      lightboxTitle.textContent = title;
      lightboxCategory.textContent = category;

      gsap.to(lightboxImage, { opacity: 1, duration: 0.2 });
    }
  });
});

// Navigate to next image
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  const visibleItems = Array.from(portfolioItems).filter(item => {
    return window.getComputedStyle(item).display !== 'none';
  });

  currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
  const nextItem = visibleItems[currentImageIndex];

  // Update lightbox content with animation
  gsap.to(lightboxImage, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      const img = nextItem.querySelector('.portfolio-image img');
      const title = nextItem.querySelector('.portfolio-title').textContent;
      const category = nextItem.querySelector('.portfolio-category').textContent;

      lightboxImage.src = img.src;
      lightboxTitle.textContent = title;
      lightboxCategory.textContent = category;

      gsap.to(lightboxImage, { opacity: 1, duration: 0.2 });
    }
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    lightboxPrev.click();
  } else if (e.key === 'ArrowRight') {
    lightboxNext.click();
  }
});

// ==========================================================================
// LOAD MORE FUNCTIONALITY
// ==========================================================================

const loadMoreBtn = document.getElementById('loadMoreBtn');
const portfolioGrid = document.getElementById('graphicsGrid');

// Hide items beyond initial 9 (if there are more)
let initialItemsCount = 9;
let currentVisibleCount = initialItemsCount;

function initializeLoadMore() {
  const allItems = Array.from(portfolioItems);

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
    const hiddenItems = Array.from(portfolioItems).filter(item =>
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
    const remainingHidden = Array.from(portfolioItems).filter(item =>
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

// Filter chips animation
gsap.fromTo('.filter-chip',
  {
    opacity: 0,
    y: 20
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.5
  }
);

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

console.log('Graphics page initialized');

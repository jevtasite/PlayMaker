// ==========================================================================
// GRAPHICS PAGE JAVASCRIPT
// PlayMaker Group - Graphics Portfolio Interactions
// ==========================================================================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// GALLERY WALL SHOWCASE
// ==========================================================================

const galleryGrid = document.getElementById('galleryGrid');
const galleryCards = document.querySelectorAll('.gallery-card');

// Card data structure
const cardData = [
  { img: '../images/gallery/gallery1.webp', title: 'Match Day Hype', category: 'Game Day' },
  { img: '../images/gallery/gallery2.webp', title: 'Player Spotlight', category: 'Social Content' },
  { img: '../images/gallery/gallery3.webp', title: 'Victory Celebration', category: 'Branding' },
  { img: '../images/gallery/gallery5.webp', title: 'Stadium Nights', category: 'Social Media' },
  { img: '../images/gallery/gallery7.webp', title: 'Game Winner', category: 'Match Day' }
];

let currentCardPositions = [0, 1, 2, 3, 4]; // Track which card is in which position
let autoRotateInterval;

// Mobile gallery controls
const mobileGalleryPrev = document.getElementById('mobileGalleryPrev');
const mobileGalleryNext = document.getElementById('mobileGalleryNext');
const mobileGalleryDots = document.querySelectorAll('.mobile-gallery-dot');

// Position configurations
const positions = {
  center: { class: 'gallery-card-hero', attr: 'center' },
  topLeft: { class: 'gallery-card-small', attr: 'top-left' },
  topRight: { class: 'gallery-card-small', attr: 'top-right' },
  bottomLeft: { class: 'gallery-card-small', attr: 'bottom-left' },
  bottomRight: { class: 'gallery-card-small', attr: 'bottom-right' }
};

// Update active dot indicator
function updateActiveDot() {
  if (mobileGalleryDots.length === 0) return;

  const currentCenterIndex = currentCardPositions.indexOf(0);
  const currentCenterCard = galleryCards[currentCenterIndex];
  const currentDataIndex = parseInt(currentCenterCard.getAttribute('data-index'));

  mobileGalleryDots.forEach(dot => {
    const dotIndex = parseInt(dot.getAttribute('data-dot-index'));
    if (dotIndex === currentDataIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Rotate cards to new positions
function rotateCards() {
  // Shift positions: last item moves to front
  currentCardPositions.unshift(currentCardPositions.pop());

  // Update each card's position and class
  galleryCards.forEach((card, index) => {
    const positionIndex = currentCardPositions[index];
    const positionKeys = Object.keys(positions);
    const newPosition = positions[positionKeys[positionIndex]];

    // Remove all position classes
    card.classList.remove('gallery-card-hero', 'gallery-card-small');

    // Add new class
    card.classList.add(newPosition.class);

    // Update data-position attribute
    card.setAttribute('data-position', newPosition.attr);

    // Update info badge if it's the center card
    if (positionIndex === 0) {
      const badge = card.querySelector('.card-info-badge');
      if (badge) {
        const title = badge.querySelector('.badge-title');
        const category = badge.querySelector('.badge-category');
        const cardIndex = parseInt(card.getAttribute('data-index'));

        if (title) title.textContent = cardData[cardIndex].title;
        if (category) category.textContent = cardData[cardIndex].category;
      }
    }
  });

  // Update mobile dot indicator if it exists
  if (typeof updateActiveDot === 'function') {
    updateActiveDot();
  }
}

// Auto-rotate functionality
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    rotateCards();
  }, 4000);
}

function stopAutoRotate() {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
  }
}

// Click handler for cards
galleryCards.forEach((card) => {
  card.addEventListener('click', () => {
    const clickedIndex = parseInt(card.getAttribute('data-index'));
    const currentCenterIndex = currentCardPositions.indexOf(0);

    // If clicked card is not in center, rotate until it is
    if (clickedIndex !== currentCenterIndex) {
      stopAutoRotate();

      // Calculate how many rotations needed
      const distance = (clickedIndex - currentCenterIndex + galleryCards.length) % galleryCards.length;

      // Rotate the required number of times
      for (let i = 0; i < distance; i++) {
        setTimeout(() => {
          rotateCards();
        }, i * 300);
      }

      // Restart auto-rotate after interaction
      setTimeout(startAutoRotate, 8000);
    }
  });
});

// Pause on hover
if (galleryGrid) {
  galleryGrid.addEventListener('mouseenter', stopAutoRotate);
  galleryGrid.addEventListener('mouseleave', startAutoRotate);
}

// Start auto-rotate on load
if (galleryCards.length > 0) {
  startAutoRotate();
}

// ==========================================================================
// MOBILE GALLERY CONTROLS - BUTTON EVENT LISTENERS
// ==========================================================================

// Previous button
if (mobileGalleryPrev) {
  mobileGalleryPrev.addEventListener('click', () => {
    stopAutoRotate();
    // Rotate backward (shift first to last)
    currentCardPositions.push(currentCardPositions.shift());

    // Update each card's position
    galleryCards.forEach((card, index) => {
      const positionIndex = currentCardPositions[index];
      const positionKeys = Object.keys(positions);
      const newPosition = positions[positionKeys[positionIndex]];

      card.classList.remove('gallery-card-hero', 'gallery-card-small');
      card.classList.add(newPosition.class);
      card.setAttribute('data-position', newPosition.attr);

      if (positionIndex === 0) {
        const badge = card.querySelector('.card-info-badge');
        if (badge) {
          const title = badge.querySelector('.badge-title');
          const category = badge.querySelector('.badge-category');
          const cardIndex = parseInt(card.getAttribute('data-index'));

          if (title) title.textContent = cardData[cardIndex].title;
          if (category) category.textContent = cardData[cardIndex].category;
        }
      }
    });

    updateActiveDot();
    setTimeout(startAutoRotate, 8000);
  });
}

// Next button
if (mobileGalleryNext) {
  mobileGalleryNext.addEventListener('click', () => {
    stopAutoRotate();
    rotateCards();
    updateActiveDot();
    setTimeout(startAutoRotate, 8000);
  });
}

// Dot navigation
mobileGalleryDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const targetIndex = parseInt(dot.getAttribute('data-dot-index'));

    // Find which card has this data-index
    let clickedCardPosition = -1;
    galleryCards.forEach((card, index) => {
      if (parseInt(card.getAttribute('data-index')) === targetIndex) {
        clickedCardPosition = index;
      }
    });

    if (clickedCardPosition !== -1) {
      const currentCenterIndex = currentCardPositions.indexOf(0);

      if (clickedCardPosition !== currentCenterIndex) {
        stopAutoRotate();
        const distance = (clickedCardPosition - currentCenterIndex + galleryCards.length) % galleryCards.length;

        for (let i = 0; i < distance; i++) {
          setTimeout(() => {
            rotateCards();
            if (i === distance - 1) {
              updateActiveDot();
            }
          }, i * 300);
        }

        setTimeout(startAutoRotate, 8000);
      }
    }
  });
});


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

// Gallery wall entrance animation
if (galleryGrid) {
  // Animate floating text card
  gsap.fromTo('.floating-text-card',
    {
      opacity: 0,
      x: -60,
      y: 20
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    }
  );

  // Animate gallery cards with stagger
  gsap.fromTo('.gallery-card',
    {
      opacity: 0,
      scale: 0.8,
      y: 40
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.4)',
      delay: 0.5
    }
  );
}

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

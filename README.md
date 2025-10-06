# Playmaker Group - Stadium Nights Website

🏆 **Elite Sports Social Media Agency Website**

A cinematic, high-performance website built for Playmaker Group - a premium sports social media agency specializing in graphics and video content for elite athletic brands and athletes.

## 🎯 Project Overview

**Design Philosophy:** Stadium Nights - Capturing the magical pre-game moment when stadium lights ignite and anything feels possible.

**Tech Stack:**
- HTML5 (Semantic markup)
- CSS3 (Custom properties, Grid, Flexbox)
- Bootstrap 5.3+
- Vanilla JavaScript (ES6+)
- GSAP (GreenSock Animation Platform)
- ScrollTrigger for scroll animations

## ✨ Features

### Design System
- **Stadium Nights Color Palette:**
  - Stadium Gold (#F4D03F)
  - Sunset Flame (#FF6B35)
  - Twilight Blue (#2E86AB)
  - Pre-game Darkness (#1A1D29)

- **Typography:**
  - Headlines: Oswald (700)
  - Subheads: Inter (600)
  - Body: IBM Plex Sans (400-700)

- **6px Base Spacing System**
- **16-column Responsive Grid**

### Interactive Elements
- ✅ Split-screen hero with animated canvas background
- ✅ 9:16 showcase slider for social media graphics
- ✅ Particle network animation with connecting lines
- ✅ Stadium grid overlay animation
- ✅ Smooth scroll navigation
- ✅ Word-by-word hero text reveal
- ✅ GSAP scroll-triggered animations
- ✅ Portfolio filtering with smooth transitions
- ✅ Animated statistics counter
- ✅ Floating atmosphere particles
- ✅ Light flare mouse parallax
- ✅ Button ripple effects
- ✅ Glassmorphism UI elements
- ✅ Auto-rotating showcase with dot navigation

### Performance Optimizations
- ✅ Lazy loading images
- ✅ Intersection Observer API
- ✅ Optimized animations (60fps)
- ✅ Responsive images
- ✅ Mobile-first approach

### Accessibility
- ✅ WCAG 2.1 AA compliant
- ✅ Semantic HTML5 structure
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Reduced motion support

### SEO
- ✅ Structured data (Schema.org)
- ✅ Open Graph meta tags
- ✅ Twitter Card meta tags
- ✅ Semantic HTML structure
- ✅ Alt text for images

## 📁 Project Structure

```
PlayMaker/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Image assets
├── videos/             # Video assets
└── README.md           # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional for development)

### Installation

1. Clone or download the project
2. Open `index.html` in your browser
3. For local development, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Navigate to `http://localhost:8000`

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:

```css
:root {
  --pregame-darkness: #1A1D29;
  --stadium-gold: #F4D03F;
  --sunset-flame: #FF6B35;
  /* ... */
}
```

### Content
- **Hero Section:** Edit text in `index.html` line 68-76
- **Services:** Update service cards starting at line 189
- **Portfolio:** Add portfolio items starting at line 132
- **Contact Info:** Update social links at line 328

### Images
Replace Unsplash URLs with your own images:
1. Add images to `/images` folder
2. Update `src` attributes in HTML
3. Maintain aspect ratios for best results

## 📱 Responsive Breakpoints

- **Mobile:** < 576px
- **Tablet:** 576px - 991px
- **Desktop:** 992px - 1199px
- **Large Desktop:** 1200px+

## 🎬 Animation Guide

### Adding Fade-Up Animations
Add `data-fade-up` attribute to any element:

```html
<div data-fade-up>This will fade up on scroll</div>
```

### Custom GSAP Animations
Add animations in `js/main.js`:

```javascript
gsap.from('.your-element', {
  scrollTrigger: {
    trigger: '.your-element',
    start: 'top 80%',
  },
  opacity: 0,
  y: 60,
  duration: 0.8
});
```

## 🔧 JavaScript Features

### Portfolio Filtering
The portfolio automatically filters when filter buttons are clicked. Categories are defined in `data-category` attributes.

### Statistics Counter
Stats animate when scrolled into view. Set target numbers in `data-count` attributes.

### Particle System
Customize particle count in `main.js`:

```javascript
new ParticleSystem(heroSection, 25); // Change 25 to desired count
```

## 🌟 Key Components

### Navigation
- Fixed position with scroll effects
- Mobile hamburger menu
- Smooth scroll to sections
- Active state indicators

### Hero Section
- Full viewport height
- Background image/video support
- Word reveal animation
- Light flare effects
- Scroll indicator

### Portfolio Grid
- Responsive masonry layout
- Category filtering
- Hover zoom effects
- Lazy loading images

### Service Cards
- Glassmorphism effect
- Hover animations
- SVG icons
- Responsive grid

### Contact Form
- Styled form inputs
- Submit animation
- Social media links
- Form validation ready

## 🔍 SEO Checklist

- [x] Title tags optimized
- [x] Meta descriptions
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Schema.org markup
- [x] Semantic HTML
- [x] Alt text for images
- [x] Mobile-friendly
- [x] Fast loading times

## 📊 Performance Targets

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms
- **PageSpeed Score:** 90+ (Desktop), 80+ (Mobile)

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 To-Do / Future Enhancements

- [ ] Add video backgrounds (currently using images)
- [ ] Implement case study pages
- [ ] Add blog section
- [ ] Create admin dashboard
- [ ] Add contact form backend
- [ ] Implement analytics
- [ ] Add cookie consent
- [ ] Create sitemap.xml
- [ ] Add robots.txt

## 🤝 Contributing

This is a client project for Playmaker Group. For updates or modifications, please contact the development team.

## 📄 License

© 2025 Playmaker Group. All rights reserved.

## 🙏 Credits

- **Design System:** Stadium Nights Design Philosophy
- **Fonts:** Google Fonts (IBM Plex Sans, Oswald, Inter)
- **Icons:** Custom SVG icons
- **Images:** Unsplash (for demo purposes)
- **Animations:** GSAP (GreenSock)
- **Framework:** Bootstrap 5

## 📞 Support

For technical support or questions:
- Email: hello@playmakergroup.com
- Website: [playmakergroup.com](https://playmakergroup.com)

---

**Built with 🏆 by Playmaker Group**

*Where Greatness Lives Under The Lights*

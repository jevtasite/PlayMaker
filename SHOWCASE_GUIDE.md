# 📱 Hero Showcase Guide - How to Update Your 9:16 Graphics

This guide will help you easily update the rotating graphics showcase in the hero section.

## 🎯 Overview

The hero section features a split-screen layout:
- **Left Side:** Your headline, tagline, and CTA buttons
- **Right Side:** A vertical showcase displaying your 9:16 social media graphics

The showcase automatically rotates through your graphics every 5 seconds, and visitors can manually navigate using dots at the bottom.

---

## 📐 Image Specifications

For best results, use images with these specifications:

- **Aspect Ratio:** 9:16 (vertical/portrait)
- **Recommended Size:** 1080px × 1920px (Instagram/TikTok standard)
- **File Format:** JPG or PNG
- **File Size:** Under 500KB per image (optimized)
- **Content:** Your best sports graphics, player features, game day posts, etc.

---

## 🔧 How to Add/Replace Graphics

### Step 1: Prepare Your Images

1. Export your graphics as 9:16 vertical images (1080×1920px)
2. Name them descriptively (e.g., `game-day-promo.jpg`, `player-feature-lebron.jpg`)
3. Place them in the `/images` folder

### Step 2: Update the HTML

Open `index.html` and find the showcase section (around line 102-120).

**Current Structure:**
```html
<div class="showcase-slider">
  <div class="showcase-item active">
    <img src="path/to/image1.jpg" alt="Description" loading="eager">
    <div class="showcase-overlay">
      <span class="showcase-label">Game Day Graphics</span>
    </div>
  </div>
  <!-- More items... -->
</div>
```

**To Replace an Image:**
1. Change the `src` attribute to your image path
2. Update the `alt` text for accessibility
3. Update the `showcase-label` text

**Example:**
```html
<div class="showcase-item active">
  <img src="images/my-awesome-graphic.jpg" alt="Championship Game Day Post" loading="eager">
  <div class="showcase-overlay">
    <span class="showcase-label">Championship Vibes</span>
  </div>
</div>
```

### Step 3: Add More Slides

To add additional graphics:

1. Copy an entire `showcase-item` block
2. Paste it before the closing `</div>` of `showcase-slider`
3. Remove the `active` class (only the first item should have it)
4. Update the image path, alt text, and label

**Example:**
```html
<div class="showcase-item">
  <img src="images/new-graphic.jpg" alt="New Graphic Description" loading="eager">
  <div class="showcase-overlay">
    <span class="showcase-label">Your Label Here</span>
  </div>
</div>
```

### Step 4: Update Navigation Dots

Find the `showcase-dots` section (around line 124-128).

Add a new dot button for each new slide:
```html
<div class="showcase-dots">
  <button class="dot active" data-slide="0" aria-label="View graphic 1"></button>
  <button class="dot" data-slide="1" aria-label="View graphic 2"></button>
  <button class="dot" data-slide="2" aria-label="View graphic 3"></button>
  <button class="dot" data-slide="3" aria-label="View graphic 4"></button> <!-- NEW -->
</div>
```

**Important:** The `data-slide` attribute must match the index (starting from 0).

---

## 🎨 Customization Options

### Change Auto-Rotate Speed

Open `js/main.js` and find line 128:
```javascript
setInterval(() => {
  currentSlide = (currentSlide + 1) % showcaseItems.length;
  showSlide(currentSlide);
}, 5000); // 5000 = 5 seconds
```

Change `5000` to your desired interval in milliseconds:
- 3 seconds = `3000`
- 7 seconds = `7000`
- 10 seconds = `10000`

### Disable Auto-Rotate

Comment out or delete lines 128-131 in `js/main.js`:
```javascript
// setInterval(() => {
//   currentSlide = (currentSlide + 1) % showcaseItems.length;
//   showSlide(currentSlide);
// }, 5000);
```

### Change Label Style

Edit `css/style.css` around line 433:
```css
.showcase-label {
  color: var(--stadium-gold); /* Change color */
  font-family: var(--font-subhead);
  font-weight: 600;
  font-size: var(--text-small); /* Adjust size */
  text-transform: uppercase; /* Remove for normal case */
  letter-spacing: var(--ls-wide);
}
```

### Adjust Showcase Size

In `css/style.css` around line 372:
```css
.showcase-container {
  position: relative;
  max-width: 450px; /* Change this value */
  width: 100%;
}
```

Larger values = bigger showcase display.

---

## 📱 Mobile Considerations

The showcase automatically adjusts for mobile devices:
- Maximum width: 350px on tablets and phones
- Stacks below content on mobile (single column)
- Touch-friendly dot navigation

No additional setup needed!

---

## ✅ Quick Checklist

Before going live with new graphics:

- [ ] Images are 9:16 aspect ratio
- [ ] File sizes under 500KB each
- [ ] Alt text describes each image
- [ ] Labels are descriptive and branded
- [ ] Number of dots matches number of slides
- [ ] `data-slide` attributes are sequential (0, 1, 2, 3...)
- [ ] First slide has `active` class
- [ ] Tested on desktop and mobile
- [ ] Images load quickly

---

## 🎯 Pro Tips

1. **Use Your Best Work First:** The first slide appears immediately - make it count!

2. **Variety:** Mix different types of content (game day posts, player features, stats, quotes)

3. **Consistent Branding:** Keep your color scheme and style consistent across all graphics

4. **Optimize Images:** Use tools like TinyPNG or Squoosh to compress images without quality loss

5. **Update Regularly:** Refresh the showcase with your latest work to keep it current

6. **Test on Mobile:** Most visitors view on phones - ensure graphics are readable at small sizes

7. **Analytics:** Track which graphics get the most engagement by monitoring the showcase interaction

---

## 🆘 Troubleshooting

**Graphics not showing:**
- Check file paths are correct
- Ensure images are in the `/images` folder
- Verify file names have no spaces (use hyphens instead)

**Dots not working:**
- Ensure `data-slide` numbers match the slide index
- Check that JavaScript is loaded (open browser console for errors)

**Showcase too big/small:**
- Adjust `max-width` in `.showcase-container` CSS
- Check responsive breakpoints in CSS

**Auto-rotate not working:**
- Verify JavaScript code is present in `main.js`
- Check browser console for errors

---

## 📞 Need Help?

If you encounter issues updating the showcase, feel free to reach out for support.

---

**Remember:** Always keep a backup of your `index.html` file before making changes! 🏆

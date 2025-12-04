# Website Starter

A modern website structure inspired by single-page application patterns.

## Structure

This implementation uses the structural patterns analyzed from the reference site:

### Key Features

- **Responsive Container System**: Three-tier container classes (`.c-vw`, `.c-vw-c`, `.c-xs`)
- **CSS Custom Properties**: Variable-based spacing system that adapts to screen size
- **Fixed Navigation**: Hides on scroll down, shows on scroll up
- **Mobile-First Design**: Responsive breakpoints at 768px, 1024px, and 1280px
- **Device Detection**: JavaScript detects mobile/desktop and adds appropriate classes
- **Smooth Animations**: Intersection Observer for fade-in effects

### Files

```
├── index.html          # Main HTML structure
├── styles.css          # Complete stylesheet with CSS variables
├── script.js           # JavaScript for interactions
└── README.md           # This file
```

## CSS Variable System

The spacing system uses CSS custom properties that automatically adjust:

```css
/* Mobile (default) */
--pad: 1.6rem;     /* Horizontal padding */
--sep: 4rem;       /* Section spacing */

/* Tablet (768px+) */
--pad: 3.2rem;
--sep: 6rem;

/* Desktop (1024px+) */
--pad: 6rem;
--sep: 8rem;

/* Large Desktop (1280px+) */
--pad: 9.4rem;
--sep: 10rem;
```

## Container Classes

### `.c-vw` - Full Viewport Width
Use for sections that span the full width with consistent padding.

### `.c-vw-c` - Centered Max-Width
Use for content that should be centered with a maximum width of 1440px.

### `.c-xs` - Extra Spacing
Use for narrow content with extra horizontal padding.

## Customization

### Colors
Edit the CSS variables in `:root`:

```css
--color-primary: #2563eb;
--color-text: #1f2937;
--color-bg: #ffffff;
--color-accent: #f59e0b;
```

### Typography
Update font families:

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Georgia', serif;
```

### Spacing
Adjust the spacing scale at each breakpoint in the `@media` queries.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Custom Properties required
- Intersection Observer API for animations

## Next Steps

1. **Add Your Content**: Replace placeholder text and images
2. **Customize Colors**: Update CSS variables to match your brand
3. **Add Pages**: Create additional HTML files for other pages
4. **Integrate CMS**: Consider WordPress, Contentful, or another headless CMS
5. **Optimize Images**: Use modern formats (WebP, AVIF) with fallbacks
6. **Add Analytics**: Integrate Google Analytics or your preferred tool

## Patterns Used

Based on analysis of modern SPA architectures:

- Variable-based responsive spacing
- Container system for consistent layouts
- Device detection and adaptive loading
- Intersection Observer for performance
- Minimal JavaScript, progressive enhancement
- Mobile-first CSS

## License

Free to use for your projects. Customize as needed!


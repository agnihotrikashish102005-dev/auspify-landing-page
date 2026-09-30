# Auspify — Responsive Landing Page

> **"Bring Future Through Tech"**  
> Developed as part of Task 1 (Easy): Responsive Landing Page using semantic **HTML5**, modern **CSS3**, and vanilla **JavaScript**.

---

## 🚀 Live Overview & Structure

This project implements a high-performance, fully responsive corporate landing page for **Auspify**. It features a modern tech aesthetic, fluid responsive layout for mobile, tablet, and desktop screens, accessibility compliance, and rich interactive components.

```
auspify-landing-page/
├── index.html       # Semantic HTML5 markup, accessible landmarks, meta tags
├── style.css        # Responsive CSS Grid & Flexbox, CSS variables, Dark Mode, animations
├── script.js        # Navigation drawer, sticky header, scroll reveal, live counters, tabs, accordion, modal
└── README.md        # Documentation and walkthrough
```

---

## 📋 Task Workflow Compliance

| Workflow Step | Implementation Details |
| :--- | :--- |
| **Step 1: Design the landing page layout** | Clean, modern visual hierarchy featuring a top announcement ticker, sticky glassmorphism header, high-converting Hero section with live code mockup & floating metric badges, trust bar, 6-card feature grid, 5-step workflow overview, interactive solutions showcase, animated stats, testimonials, interactive FAQ, and CTA banner. |
| **Step 2: Create responsive sections** | Built with CSS Grid (`auto-fit, minmax`) and Flexbox layouts. Sections gracefully adapt from 4 columns on large monitors, to 2-3 columns on tablets, down to a single clean column on mobile smartphones. |
| **Step 3: Add navigation and call-to-action buttons** | Sticky header with brand logo, smooth-scrolling desktop navigation links with active state indicator, persistent CTA buttons (*"Get Started"*, *"Start Free Project"*), and mobile hamburger button with animated toggle. |
| **Step 4: Implement basic animations** | GPU-accelerated CSS keyframe animations (floating badges, glowing pulse effects), smooth hover micro-interactions, scroll-triggered fade-up animations powered by `IntersectionObserver`, and dynamic number counting metrics. |
| **Step 5: Optimize for mobile devices** | Fully responsive media queries for `< 1024px`, `< 768px`, and `< 480px`. Mobile slide-over navigation drawer, touch-friendly button targets (minimum 44x44px), viewport clamping (`clamp()`), and zero horizontal overflow. |

---

## ✨ Key Features & Technical Highlights

1. **Light & Dark Theme Toggle**:
   - Integrated dark mode switcher with local storage persistence and system preference (`prefers-color-scheme`) detection.
2. **Interactive Solutions Showcase**:
   - Category tabs (*Startups, Scale-ups, Enterprise, AI Labs*) allowing users to switch solution views with smooth transitions.
3. **Interactive Metric Counters**:
   - Numeric counters (`99.9%`, `250+`, `10x`, `98%`) that automatically animate upwards when scrolled into view.
4. **Interactive FAQ Accordion**:
   - Single-open accordion with rotation indicators for clean Q&A exploration.
5. **Interactive Project Modal & Toast System**:
   - Accessible modal dialog for project requests with form validation and non-intrusive feedback toast notifications.
6. **Zero Dependencies**:
   - 100% pure vanilla HTML, CSS, and JS — runs instantly without needing Node.js, bundlers, or third-party frameworks.

---

## 💻 How to Run & View

### Option 1: Direct File Opening
Double click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
Run the following in PowerShell / Terminal:
```bash
cd "C:\Users\ACER\.gemini\antigravity\scratch\auspify-landing-page"
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## 🎨 Brand Identity (Auspify)
- **Primary Color**: `#0284c7` (Electric Sky Blue)
- **Secondary Accent**: `#06b6d4` (Cyan)
- **Dark Surface**: `#0f172a` (Deep Slate Navy)
- **Tagline**: *"Bring Future Through Tech"*

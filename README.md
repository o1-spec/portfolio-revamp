# Portfolio Website

A modern, interactive portfolio showcasing projects built with cutting-edge web technologies. Features smooth animations, responsive design, and an engaging user experience.

## Features

- ✨ **Smooth Animations** - Framer Motion animations for a polished user experience
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop screens
- 🎨 **Interactive Components** - Custom cursor, animated backgrounds, and dynamic project cards
- 🖼️ **Image Carousel** - Smooth image transitions with prev/next navigation
- 🌙 **Dark Theme** - Modern dark interface with purple and white accents
- ⚡ **Performance Optimized** - Next.js Image optimization and code splitting
- 🎯 **Project Showcase** - Featured projects with detailed descriptions and links

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) - React framework with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Animations**: [Framer Motion](https://www.framer.com/motion) - Production-ready motion library
- **Icons**: [Lucide React](https://lucide.dev) - Beautiful icon library
- **Language**: JavaScript/JSX
- **Build Tool**: Webpack (via Next.js)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd portfolio-revamp

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Projects Included

### 1. PDF API
Advanced PDF processing tool with document analysis capabilities.
- **Tech**: Node.js, Express, PDF.js
- **Features**: File upload, text extraction, PDF generation

### 2. Three.js Solar System
Interactive 3D visualization of the solar system with realistic orbital mechanics.
- **Tech**: Three.js, WebGL, JavaScript
- **Features**: Planet orbits, real-time rotation, zoom controls

### 3. Real-Time Messaging Platform
Full-stack messaging application with real-time communication using WebSockets.
- **Tech**: MongoDB, Express, React, Node.js, Socket.io
- **Features**: Real-time messages, user authentication, online status, chat history

### 4. Marketplace Mobile App (React Native)
Cross-platform mobile application for product listings with image carousel.
- **Tech**: React Native, Firebase, Redux
- **Features**: Product carousel, accordion details, smooth image transitions

### 5. Logistic Dashboard
Data visualization dashboard for logistics management.
- **Tech**: React, D3.js, Node.js
- **Features**: Real-time tracking, analytics charts, performance metrics

## File Structure

```
portfolio-revamp/
├── app/
│   ├── layout.js           # Root layout with global styles
│   ├── page.js            # Home page entry point
│   └── globals.css        # Global CSS styles
├── components/
│   ├── HeroSection.jsx    # Hero banner with intro
│   ├── AboutSection.jsx   # About me section
│   ├── NoteworthyProjects.jsx  # Featured projects grid
│   ├── ProjectCard.jsx    # Individual project card with carousel
│   ├── ExperiencesSection.jsx  # Experience timeline
│   ├── ContactSection.jsx # Contact information
│   ├── PortfolioLoaderNew.jsx  # Loading animation
│   ├── AnimatedBackground.jsx  # Animated background
│   ├── CustomCursor.jsx   # Custom cursor effect
│   └── Nav.jsx           # Navigation bar
├── section/
│   └── Homepage.jsx      # Homepage container component
├── public/
│   └── images/          # Static images
├── package.json         # Dependencies and scripts
├── tailwind.config.mjs  # Tailwind CSS configuration
├── next.config.mjs      # Next.js configuration
└── README.md           # This file
```

## Key Components

### PortfolioLoaderNew
Custom loading screen with animated wave bars and progress indicator. Displays while portfolio content is loading.

### ProjectCard
Reusable component for displaying individual projects. Supports:
- **Carousel Mode**: Multiple images with prev/next navigation (image transitions with smooth fade)
- **Standard Mode**: Single image with project details
- **Responsive Design**: Different layouts for mobile vs desktop
- **Hover Effects**: Interactive project links and buttons

### NoteworthyProjects
Grid layout component displaying featured projects:
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
- 4th project centered on desktop

### AnimatedBackground
Creates an engaging animated background with subtle motion effects.

### CustomCursor
Replaces default cursor with custom animated element that follows mouse movement.

## Animations & Effects

### Wave Loader
- Uses Framer Motion `scaleY` transforms for smooth wave effect
- 7 animated bars with staggered delay
- Progress bar filling over ~2.5 seconds
- Zero layout shift animations (no `height` changes)

### Image Carousel
- Smooth opacity fade transitions (0.25s duration)
- No transform-based animations to prevent layout shifting
- Responsive image dimensions maintain aspect ratio
- Navigation buttons with hover effects

### Hover Effects
- Project cards scale and show enhanced shadows
- Navigation buttons highlight on interaction
- Smooth color transitions

## Responsive Design

Breakpoints used throughout the project:
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px), `lg:` (≥ 1024px)

All components are optimized for touch on mobile devices with appropriately sized interactive elements.

## Performance Optimizations

- **Next.js Image Component**: Automatic image optimization and lazy loading
- **Code Splitting**: Components loaded on-demand via Next.js
- **CSS**: Tailwind CSS purging unused styles
- **Animations**: GPU-accelerated transforms using Framer Motion
- **Opacity-Only Transitions**: Avoids layout recalculations during animations
- **No backdrop-blur during animations**: Prevents compositing performance issues

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Blog section with markdown support
- [ ] Contact form with email integration
- [ ] Newsletter subscription
- [ ] More interactive projects
- [ ] Case studies for each project
- [ ] Testimonials section
- [ ] SEO optimization

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel
```

The easiest way to deploy is on [Vercel Platform](https://vercel.com) - built by the creators of Next.js.

### Other Platforms

The project can also be deployed to:
- Netlify
- AWS Amplify
- GitHub Pages
- Any Node.js hosting

## Contributing

Feel free to fork this project and submit pull requests for improvements.

## License

This project is open source and available under the MIT License.

## Contact

For inquiries or feedback about this portfolio, please reach out through the contact section on the website or via GitHub.

---

Built with ❤️ using Next.js and Framer Motion

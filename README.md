# My Portfolio

Welcome to my personal portfolio website! This is a custom-built, interactive showcase of my projects and work as a developer. I designed and developed this entire site from scratch to demonstrate my skills in modern web development, with a focus on performance, user experience, and beautiful animations.

## What I've Built

- ✨ **Custom Wave Loader Animation** - A smooth, GPU-optimized loading screen with animated bars and progress indicator
- 📱 **Fully Responsive Design** - Crafted to work seamlessly across mobile, tablet, and desktop devices
- 🎨 **Interactive UI Elements** - Custom cursor, animated backgrounds, and smooth project card transitions
- 🖼️ **Smart Image Carousel** - Smooth fade transitions with intuitive navigation for project images
- 🌙 **Dark Theme Interface** - Clean, modern dark design with purple and white accents for visual appeal
- ⚡ **Performance-First Architecture** - Optimized with Next.js Image component and strategic animations
- 🎯 **Project Showcase** - Curated selection of my best projects with detailed descriptions and live links

## Technologies I Used

I built this portfolio with modern, production-grade technologies:

- **Next.js** - React framework for performance, SEO, and amazing developer experience
- **Tailwind CSS** - For rapid, consistent styling with a utility-first approach
- **Framer Motion** - To create smooth, performant animations without layout shifting
- **Lucide React** - Beautiful, consistent icons throughout the interface
- **JavaScript/JSX** - Clean, modern code architecture
- **Next.js Image Optimization** - Ensuring fast load times for all images

## Running This Portfolio

Want to see this portfolio in action locally? Here's how:

### Requirements
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Steps

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project
cd portfolio-revamp

# Install dependencies
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and explore my work!

To build for production:

```bash
npm run build
npm start
```

## My Featured Projects

### 1. PDF API
A powerful tool I built for advanced PDF processing and document analysis. This project showcases my backend development skills and ability to work with complex file handling.
- **Built with**: Node.js, Express, PDF.js
- **What it does**: File upload, text extraction, and PDF generation

### 2. Three.js Solar System
An interactive 3D visualization I created to demonstrate my WebGL and 3D graphics capabilities. Features realistic orbital mechanics and smooth interactions.
- **Built with**: Three.js, WebGL, JavaScript
- **Highlights**: Accurate planet orbits, real-time rotation, smooth zoom controls

### 3. Real-Time Messaging Platform
A full-stack application I developed showing my ability to build modern, real-time web applications with WebSockets and proper authentication.
- **Built with**: MongoDB, Express, React, Node.js, Socket.io
- **Features**: Real-time instant messaging, secure user authentication, online status tracking, persistent chat history

### 4. Marketplace Mobile App
A React Native cross-platform application demonstrating my mobile development expertise. Features a smooth image carousel showcase.
- **Built with**: React Native, Firebase, Redux
- **Highlights**: Product carousel with smooth transitions, expandable accordion details, responsive mobile UI

### 5. Logistic Dashboard
A data visualization project showcasing my skills with analytics and real-time data display. Built for performance and usability.
- **Built with**: React, D3.js, Node.js
- **Capabilities**: Real-time tracking, interactive charts, comprehensive performance metrics

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

## Components I Created

### PortfolioLoaderNew
My custom loading screen that greets visitors with a smooth wave animation. Built with careful attention to performance - using `scaleY` transforms instead of height changes to avoid any layout shifting.

### ProjectCard
A flexible component I designed to showcase projects in two different ways:
- **Carousel Mode**: For multi-image projects with smooth fade transitions and intuitive prev/next buttons
- **Standard Mode**: Clean single-image display for other projects
- Fully responsive with different layouts for mobile vs desktop
- Interactive hover effects and smooth transitions

### NoteworthyProjects
My custom grid layout that intelligently arranges featured projects:
- Responsive: 1 column on mobile, 2 on tablet, 3 on desktop
- Smart centering: The 4th project is centered below for visual balance
- Touch-optimized for mobile users

### AnimatedBackground
A subtle animated background I added to enhance the visual appeal without being distracting.

### CustomCursor
A custom interactive cursor that replaces the default one - adds a polished, personalized touch to the entire experience.

## Animation Details

### Wave Loader Animation
I created this with careful performance optimization in mind:
- Uses Framer Motion's `scaleY` transforms for a smooth wave effect
- 7 bars that animate in a staggered pattern
- Progress bar fills smoothly over ~2.5 seconds
- **No layout shifts** - uses transforms instead of height changes for maximum performance

### Image Carousel Transitions
Smooth and subtle animations I implemented:
- Fade-in/fade-out transitions (0.25s duration) for a clean look
- Opacity-only animations to prevent any layout recalculations
- Images maintain consistent dimensions to prevent content shifts
- Navigation buttons respond smoothly to user interaction

### Interactive Effects
- Project cards scale up on hover with a subtle shadow enhancement
- Buttons highlight when you interact with them
- Color transitions are smooth and responsive

## Responsive Design

I designed this portfolio to work beautifully on any device:

**Breakpoints I used:**
- **Mobile First** (< 640px) - Touch-optimized, readable text, spaced buttons
- **Tablet** (≥ 640px) - `sm:` prefix in Tailwind for medium screens
- **Desktop** (≥ 768px - 1024px) - `md:` prefix, wider layouts
- **Large Desktop** (≥ 1024px) - `lg:` prefix, full-featured layout

Every interactive element is tested on mobile to ensure proper sizing and touch targets. Images scale responsively without losing quality.

## Performance Optimization Decisions

I made several key technical decisions to ensure this portfolio is fast and smooth:

- **Next.js Image Optimization**: Automatic format selection and lazy loading for all images
- **Code Splitting**: Components load on-demand via Next.js for faster initial page load
- **CSS Efficiency**: Tailwind CSS purges unused styles for minimal CSS bundle size
- **GPU-Accelerated Animations**: All animations use Framer Motion with GPU-optimized transforms
- **Opacity-Only Transitions**: I deliberately avoid transform-based animations that could cause layout recalculations
- **No backdrop-blur during animations**: Learned the hard way that this causes performance issues - removed for smooth 60fps animations

These decisions ensure the site stays smooth and responsive, even on older devices.

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

## Deploying This Portfolio

This portfolio is deployed and live! Here's how I do it:

### Using Vercel (My Choice)

Vercel is made by the creators of Next.js and is perfect for this type of project:

```bash
npm i -g vercel
vercel
```

[View on Vercel Platform](https://vercel.com) - Automatic deployments on git push

### Other Deployment Options

I could also deploy this to:
- Netlify
- AWS Amplify
- GitHub Pages
- Traditional Node.js hosting

## Contributing

Feel free to check out my code, learn from it, and reach out if you want to collaborate!

## License & Usage

This is my personal portfolio. The source code is public for learning purposes, but please don't copy the design or claim the projects as your own.

## Get In Touch

Visit the contact section on my portfolio website to reach me about opportunities, collaborations, or just to chat about development.

---

**Built by me with ❤️** | Next.js • Framer Motion • Tailwind CSS • Modern Web Development

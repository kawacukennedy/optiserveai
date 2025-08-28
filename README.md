# OptiServe AI - Premium Homepage

A modern, premium homepage for OptiServe AI built with Next.js 15, featuring liquid glass design effects, smooth animations, and elegant typography inspired by Apple's design language.

## 🌟 Features

- **Glassmorphism Design**: Beautiful liquid glass effects with frosted blur backgrounds
- **Smooth Animations**: Powered by Framer Motion for buttery smooth transitions
- **Premium Typography**: Inter font family with Apple-style text hierarchy
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Built with semantic HTML and ARIA labels

## 🎨 Design Highlights

- **Apple-inspired Design**: Minimal, clean, and luxurious aesthetic
- **Liquid Glass Effects**: Backdrop blur, transparency, and depth shadows
- **Gradient Animations**: Animated background gradients and color shifts
- **3D Hover Effects**: Cards lift and scale on interaction
- **Floating Elements**: Animated floating glass panels

## 📋 Sections

1. **Hero Section**: Main value proposition with animated background
2. **Who We Are**: Two-column layout with feature cards
3. **How It Works**: 3-step process with interactive cards
4. **Mission & Promise**: Full-width glass banner with company values
5. **Demo Section**: Video showcase with glass panel design
6. **Testimonials**: Interactive carousel with client feedback
7. **Final CTA & Footer**: Call-to-action and company information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd optiserveai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Typography**: Inter font family
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and glass utilities
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main homepage
├── components/
│   ├── navigation.tsx       # Header navigation with theme toggle
│   ├── hero.tsx            # Hero section with floating panels
│   ├── who-we-are.tsx      # Features section
│   ├── how-it-works.tsx    # Process steps section
│   ├── mission-promise.tsx # Company mission section
│   ├── demo.tsx            # Video demo section
│   ├── testimonials.tsx    # Client testimonials carousel
│   ├── footer.tsx          # Final CTA and footer
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Dark/light mode toggle
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Customization

### Glass Effects

The glassmorphism effects are defined in `globals.css`:

```css
.glass {
  @apply backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl;
}
```

### Animations

Custom animations are configured in `tailwind.config.ts` and implemented with Framer Motion.

### Theme Colors

Customize the color scheme in `tailwind.config.ts` and component files.

## 🔧 Configuration

### Environment Variables

No environment variables are required for the basic setup.

### Tailwind Configuration

The project uses custom Tailwind utilities for glassmorphism effects. See `tailwind.config.ts` for the full configuration.

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🌙 Dark Mode

Dark mode is implemented using `next-themes` with custom CSS variables and smooth transitions.

## 🚀 Deployment

The website can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **AWS Amplify**

---

Built with ❤️ for OptiServe AI - Transforming home service businesses with AI automation.

# KAI Portfolio

A modern, performance-focused portfolio website for Abu Bakar (Kai) - Marketing Strategist specializing in Meta & Google Ads with CS + MBA background.

## Features

- **Modern Tech Stack**: React 19 + Vite + Tailwind CSS v4
- **Smooth Animations**: Framer Motion for all page transitions and interactions
- **Fully Responsive**: Mobile-first design with adaptive layouts
- **Performance-First**: Optimized builds and lazy loading
- **Dark Theme**: Custom design system with glass morphism effects

## Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── home/          # Home page sections
│   ├── layout/        # Header, Footer, Layout
│   └── common/        # Reusable components
├── pages/             # Page components
│   ├── Home.jsx
│   ├── Work.jsx
│   ├── Research.jsx
│   ├── Blog.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── data/              # Static data
│   ├── caseStudies.js
│   ├── publications.js
│   └── blogPosts.js
├── App.jsx            # Main app component with routing
├── main.jsx           # Entry point
└── index.css          # Global styles and Tailwind config
```

## Pages

- **Home**: Hero, About, Approach, Featured Work, Publications, Blog, CTA
- **Work**: Case studies portfolio with filtering
- **Research**: Peer-reviewed publications
- **Blog**: Insights and articles (ready for content)
- **About**: Professional journey, skills, timeline
- **Contact**: Contact form and information

## Customization

### Adding Case Studies

Edit `src/data/caseStudies.js`:

```javascript
{
  id: 1,
  title: "Project Title",
  industry: "Industry Name",
  year: "2024",
  tagline: "Brief description",
  context: "Background and challenge",
  strategy: "Strategic approach",
  execution: "Implementation details",
  results: "Outcomes and learnings",
  metrics: [
    { label: "ROAS Increase", value: "+47%" }
  ],
  tools: ["Meta Ads", "Google Ads"],
  tags: ["B2B", "E-commerce"],
  featured: true
}
```

### Adding Publications

Edit `src/data/publications.js`:

```javascript
{
  id: 1,
  title: "Publication Title",
  authors: "Author Names",
  journal: "Journal Name",
  year: "2025",
  doi: "https://doi.org/...",
  abstract: "Research abstract",
  whyItMatters: "Marketing implications",
  featured: true
}
```

### Adding Blog Posts

Edit `src/data/blogPosts.js`:

```javascript
{
  id: 1,
  title: "Post Title",
  slug: "post-slug",
  category: "Marketing", // Marketing, Research, Travel, Productivity
  tags: ["tag1", "tag2"],
  coverImage: "/path/to/image.jpg",
  summary: "Brief summary",
  body: "Full content in markdown",
  readTime: 5,
  publishedDate: "2025-01-15",
  featured: true
}
```

## Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com) - a free email service that requires no backend.

### Setup Steps:

1. Go to [web3forms.com](https://web3forms.com)
2. Sign up for a free account
3. Get your Access Key
4. Open `src/pages/Contact.jsx`
5. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual key

```javascript
const WEB3FORMS_KEY = 'your-actual-key-here';
```

The form includes a mailto: fallback, so it will work even without Web3Forms configured (though less elegantly).

### Alternative Email Services

You can also use:
- **Formspree**: [formspree.io](https://formspree.io) (free tier available)
- **EmailJS**: [emailjs.com](https://emailjs.com) (free tier available)
- **Netlify Forms**: Built-in if deploying to Netlify

## Contact Information

- **Email**: connect@kaistrategist.com
- **LinkedIn**: [linkedin.com/in/abubakar7776](https://www.linkedin.com/in/abubakar7776)
- **Instagram**: [@cs_sheby](https://www.instagram.com/cs_sheby)

## Design System

### Colors
- Background: `#0B132B` (dark navy)
- Primary Orange: `#F59E0B`
- Primary Blue: `#2563EB`
- Text White: `#FFFFFF`
- Text Muted: `rgba(255, 255, 255, 0.6)`

### Typography
- Font: Inter (Google Fonts)
- Weights: 400, 500, 700, 800

### Effects
- Glass: Translucent background with blur
- Gradient Text: White to blue gradient
- Magnetic Buttons: Scale transform on hover

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Build your project: `npm run build`
2. The `dist` folder contains your production build
3. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables

If using environment variables for the contact form:

Create `.env` file:
```
VITE_WEB3FORMS_KEY=your-key-here
```

Update `Contact.jsx`:
```javascript
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
```

## License

© 2025 Abu Bakar (Kai). All rights reserved.

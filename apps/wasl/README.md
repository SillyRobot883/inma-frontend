# وصل (Wasl) - منصة فعاليات الجامعة

A modern Arabic-first event management platform for universities built with React, TypeScript, and Tailwind CSS v4.

## 🎯 Features

- **Arabic-First Design**: Full RTL (Right-to-Left) support with proper Arabic typography
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS v4
- **Authentication**: Secure login system with API integration
- **Responsive**: Mobile-first design that works on all devices
- **Type-Safe**: Full TypeScript support with proper type definitions

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with `tw-animate-css`
- **UI Components**: shadcn/ui (configured for Arabic/RTL)
- **Routing**: React Router v7
- **Build Tool**: Vite 6
- **Package Manager**: pnpm

## 🎨 Design System

### Brand Colors

- **Growth Green**: `#45BDA1` - Primary action color
- **Trust Blue**: `#094770` - Secondary and heading color
- **Excellence Navy**: `#13274B` - Accent and gradients
- **Secondary Blue**: `#55C7E1` - Highlights and icons

### Typography

- **Headings**: 29LT Kaff (Arabic font family)
- **Body Text**: SST Arabic (Arabic font family)
- **Direction**: RTL by default with LTR support

### RTL Support

The application includes comprehensive RTL support:

- HTML `dir="rtl"` and `lang="ar"`
- RTL-aware spacing utilities (`mr-*`, `ms-*`, `me-*`)
- Proper icon positioning for Arabic text
- RTL-specific utility classes for layout

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies (run from workspace root)
pnpm install

# Start development server
cd apps/wasl
pnpm run dev
```

### Available Scripts

```bash
pnpm run dev        # Start development server
pnpm run build      # Build for production
pnpm run preview    # Preview production build
pnpm run lint       # Run ESLint
pnpm run lint:fix   # Fix ESLint issues
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (ProtectedRoute)
│   ├── navigation/     # Navigation components (Navbar, Footer)
│   └── ui/            # shadcn/ui components
├── contexts/           # React contexts (AuthContext)
├── hooks/             # Custom React hooks (useAuth)
├── lib/               # Utilities and configurations
├── pages/             # Page components
│   ├── auth/          # Authentication pages
│   └── dashboard/     # Dashboard pages
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🎯 Key Components

### Authentication

- **AuthContext**: Manages user authentication state
- **ProtectedRoute**: Guards protected routes
- **LoginPage**: Arabic login form with national ID

### Navigation

- **Navbar**: RTL-aware navigation with Arabic text
- **Footer**: Site footer (to be implemented)

### UI Components

All components from shadcn/ui configured for:

- RTL layout support
- Arabic typography
- INMA brand colors
- Proper dark/light mode

## 🌐 RTL Implementation

### CSS Features

- Font face declarations for Arabic fonts in `/public/fonts/`
- RTL-specific utility classes (`.ms-*`, `.me-*`, `.text-start`, `.text-end`)
- Proper icon spacing for Arabic text (`mr-2` instead of `ml-2`)
- Direction-aware gradients and layouts

### Component Adaptations

- Icons positioned on the right side of Arabic text
- Dropdown menus aligned to start instead of end
- Proper spacing and margins for RTL reading flow

## 🎨 Styling Guidelines

### Tailwind v4 Usage

- Use `@import 'tailwindcss'` and `@import 'tw-animate-css'`
- Brand colors available as CSS custom properties
- No need for `tailwindcss-animate` plugin (use `tw-animate-css`)

### Arabic Text

- Always use Arabic text in components
- Ensure proper icon positioning (`mr-*` not `ml-*`)
- Use semantic font families (`font-heading`, `font-body`)

### Color Usage

```css
/* Use brand colors */
.bg-growth-green     /* Primary buttons */
.text-trust-blue     /* Headings */
.bg-excellence-navy  /* Gradients */
.text-secondary-blue /* Highlights */
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- RTL-aware responsive utilities
- Proper Arabic text scaling on different screen sizes

## 🔧 Configuration Files

- `vite.config.ts`: Vite configuration with path aliases
- `tsconfig.json`: TypeScript configuration
- `components.json`: shadcn/ui configuration
- `index.css`: Tailwind v4 with custom theme and RTL utilities

## 🤝 Contributing

1. Follow the Arabic-first design approach
2. Ensure all text is properly translated
3. Test RTL layout on all screen sizes
4. Use proper TypeScript types
5. Follow the established component patterns

## 📄 License

MIT License - see LICENSE file for details.

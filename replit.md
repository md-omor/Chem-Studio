# ChemyVerse - Interactive Chemistry Lab

## Overview

ChemyVerse is an educational web application designed to provide students in grades 9-12 with access to interactive chemistry experiments when physical labs are unavailable. The platform features a complete periodic table interface, element mixing capabilities, and AI-powered insights to make chemistry learning engaging and accessible.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for element category colors
- **UI Components**: Radix UI components with shadcn/ui styling
- **State Management**: React hooks with custom state management (useElementSelection)
- **Routing**: Wouter for client-side routing
- **Data Fetching**: TanStack Query for API state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **Development**: Vite for development server and hot module replacement
- **Build**: esbuild for production server bundling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema**: Structured tables for users, elements, and reactions
- **Migrations**: Drizzle-kit for database schema management

## Key Components

### Element Management
- Complete periodic table with 118 elements
- Element categorization (alkali metals, noble gases, etc.)
- Element properties storage (atomic mass, electron configuration, etc.)
- Color-coded display based on element categories

### Reaction System
- Chemical reaction simulation between selected elements
- Reaction result storage with product information
- Educational content including uses and facts
- Interactive mixing interface

### User Interface
- Responsive design with mobile-first approach
- Interactive periodic table grid with hover effects
- Element selection and deselection system
- Modal dialogs for detailed element information
- Toast notifications for user feedback

### Educational Features
- Knowledge center with chemistry lessons
- Element detail modals with comprehensive information
- Reaction explanations and real-world applications
- Interactive learning experiences

## Data Flow

1. **Element Selection**: Users interact with the periodic table to select elements
2. **State Management**: Selected elements are tracked using React state
3. **API Communication**: Element and reaction data is fetched from the backend
4. **Real-time Updates**: UI updates immediately reflect user selections
5. **Reaction Processing**: Selected elements are sent to the backend for reaction calculation
6. **Result Display**: Reaction results are displayed with educational content

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router alternative)
- UI Libraries (Radix UI, Lucide React icons)
- Utility Libraries (clsx, tailwind-merge for styling)
- Form Handling (React Hook Form, Zod validation)
- Data Fetching (TanStack Query)

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM for database operations
- Neon Database serverless PostgreSQL
- Development tools (tsx, esbuild, Vite)

### Development Tools
- TypeScript for type safety
- Tailwind CSS for styling
- PostCSS for CSS processing
- ESLint and Prettier (implied by project structure)

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Concurrent frontend and backend development
- Environment-specific configurations
- Replit-specific optimizations and plugins

### Production Build
- Vite builds the frontend to static assets
- esbuild bundles the backend server
- Single deployment artifact with both frontend and backend
- Environment variable configuration for database connections

### Database Management
- Database migrations managed through Drizzle-kit
- Environment-specific database URLs
- Schema versioning and rollback capabilities

## Recent Changes
- July 07, 2025: Added AI Chemistry Assistant page with comprehensive features
- July 07, 2025: Enhanced Gemini API integration for better chemistry tutoring and cleaner responses
- July 07, 2025: Improved Knowledge Center with responsive design, detailed content, and proper scrolling
- July 07, 2025: Fixed scroll bar issues in chat components and Knowledge Center modal
- July 07, 2025: Enhanced overall graphics with animations and better styling
- July 07, 2025: Added AI Assistant to navigation and home page
- July 07, 2025: Updated landing page with modern dark hero section and improved visual design
- July 07, 2025: Fixed AI feature text alignment and improved readability
- July 07, 2025: Enhanced AI responses to avoid unnecessary markdown formatting
- July 07, 2025: Changed app name from ChemVerse to ChemyVerse throughout application
- July 07, 2025: Added image and file upload functionality to AI Assistant for chemistry problem analysis
- July 07, 2025: Updated Try AI Assistant button color to emerald gradient

## Changelog
- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Modern UI with proper scrolling, clean AI responses without excessive markdown, good text alignment, comprehensive visual information display.
Feature requests: Comprehensive AI chemistry tutoring, responsive design, improved graphics and animations.
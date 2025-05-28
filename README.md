# Inmaa-Wasl Monorepo

This monorepo contains two frontend applications and shared packages for clubs and events management, built with React, Vite, and pnpm workspaces.

## Project Structure

```
apps/
  inmaa/             - Clubs management application (React + Vite + Tailwind)
  wasl/              - Events management application (React + Vite)
packages/
  api-client/        - Shared API services and HTTP client
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
# Install all dependencies
pnpm install

# Start both applications in development mode
pnpm dev

# Or start applications individually
pnpm dev:inmaa  # Starts Inmaa on http://localhost:3000
pnpm dev:wasl   # Starts Wasl on http://localhost:3001
```

### Building

```bash
# Build all applications
pnpm build

# Build specific application
pnpm build:inmaa
pnpm build:wasl
```

## Applications

### 1. **إنماء الإندية (Inmaa)** - Clubs Management

A comprehensive web application designed to streamline the management of student clubs and their activities. The platform provides tools for club administrators, members, and INMA administrators to efficiently manage club operations, track volunteer hours, and monitor member engagement.

### 2. **وصل (Wasl)** - Events Management

A companion application focused on event management, allowing clubs to create, promote, and track participation in events.

## Features

### User Management

- Role-based access control (INMA Admin, College Admin, Club Admin, Member)
- User registration and profile management
- Member tracking with ID numbers and student IDs
- Club membership management

### Club Management

- Club creation and configuration
- Member management within clubs
- Activity tracking and reporting
- Club performance metrics
- Committee management

### Activity Tracking

- Volunteer hour logging
- Activity categorization
- Progress tracking
- Achievement recognition
- Performance analytics

### Administrative Features

- Comprehensive dashboard for administrators
- User management interface
- Club oversight and management
- Reporting and analytics
- System configuration

## Tech Stack

### Frontend

- **React.js**: Modern UI framework for building interactive user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router**: Client-side routing for single-page application navigation
- **Context API**: State management solution for global application state
- **Lucide Icons**: Modern icon library for UI elements

## Project Structure (TODO)

```
src/
├── components/          # Reusable UI components
│   ├── AdminLayout/    # Layout components for admin interfaces
│   ├── ClubCard/       # Club display components
│   ├── MemberCard/     # Member display components
│   └── common/         # Shared UI components
├── pages/              # Page components
│   ├── Admin/          # Admin interface pages
│   ├── Club/           # Club management pages
│   └── Member/         # Member interface pages
├── context/            # React Context providers
│   ├── AuthContext/    # Authentication state management
│   └── ClubContext/    # Club data management
├── assets/             # Static assets
│   ├── images/         # Image files
│   └── fonts/          # Custom fonts
├── utils/              # Utility functions
│   ├── api.js          # API interaction functions
│   └── helpers.js      # Helper functions
└── App.jsx             # Main application component
```

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v8 or higher)
- Git for version control

### Installation

1. Clone the repository

```bash
git clone https://github.com/SillyRobot883/inma-frontend.git
cd inmaa-wasl-monorepo
```

2. Install dependencies

```bash
pnpm setup
```

3. Create `.env` files in each app's directory with the appropriate variables:

For Inmaa (apps/inmaa/.env):

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Inmaa
```

For Wasl (apps/wasl/.env):

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Wasl
```

4. Start the development servers

For Inmaa (clubs management):

```bash
pnpm dev:inmaa
```

For Wasl (events management):

```bash
pnpm dev:wasl
```

Or to start both apps simultaneously:

```bash
pnpm dev
```

## Building for Production

To build the Inmaa app:

```bash
pnpm build:inmaa
```

To build the Wasl app:

```bash
pnpm build:wasl
```

To build all apps:

```bash
pnpm build
```

## Development Guide

### Adding Dependencies

To add a dependency to a specific app:

```bash
pnpm --filter inmaa add <package>
```

To add a dependency to a specific shared package:

```bash
pnpm --filter @inmaa-wasl/api-client add <package>
```

To add a development dependency to the root:

```bash
pnpm add -Dw <package>
```

### Working with Shared Packages

- **API Client**: Contains all API service calls. Import from `@inmaa-wasl/api-client`.
- **Configurations**: Contains shared configurations for ESLint, Tailwind, and Vite. Import from `@inmaa-wasl/config/*`.

### Cleaning Node Modules

If you need to clean all node_modules directories:

```bash
pnpm clean
```

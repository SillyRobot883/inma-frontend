# إنماء الإندية - Frontend

Frontend application for the Inma Clubs Management System, a comprehensive platform for managing student clubs and their activities.

## Overview

إنماء الإندية (Inma Clubs) is a modern web application designed to streamline the management of student clubs and their activities. The platform provides tools for club administrators, members, and INMA administrators to efficiently manage club operations, track volunteer hours, and monitor member engagement.

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

### Development Tools
- **Vite**: Next-generation frontend build tool
- **ESLint**: JavaScript linting tool
- **Prettier**: Code formatting tool
- **PostCSS**: CSS processing tool
- **Autoprefixer**: CSS vendor prefixing tool

## Project Structure

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

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v7 or higher) or yarn (v1.22 or higher)
- Git for version control

### Installation

1. Clone the repository
```bash
git clone https://github.com/SillyRobot883/inma-frontend.git
cd inma-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Inma Clubs
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

1. Build the application
```bash
npm run build
# or
yarn build
```

2. Preview the production build
```bash
npm run preview
# or
yarn preview
```

## Development Guidelines

### Code Style
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments for complex logic

### Component Structure
- Keep components small and focused
- Use proper prop types
- Implement error boundaries
- Follow accessibility guidelines

### State Management
- Use Context API for global state
- Implement proper loading states
- Handle errors gracefully
- Cache data appropriately

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Pull Request Guidelines
- Provide clear description of changes
- Include relevant screenshots for UI changes
- Update documentation as needed
- Ensure all tests pass

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact the development team or open an issue in the repository.

## Acknowledgments

- University administration for their support
- Development team for their contributions
- Open source community for their tools and libraries 
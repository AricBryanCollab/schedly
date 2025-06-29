# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Schedly is a monorepo scheduling/calendar application with:
- **Client**: React Native/Expo mobile app (TypeScript)
- **Server**: Express.js REST API with Prisma ORM (TypeScript)
- **Database**: PostgreSQL

## Development Commands

### Client (from /client directory)
```bash
pnpm start          # Start Expo development server
pnpm ios            # Start iOS simulator
pnpm android        # Start Android emulator
pnpm web            # Start web version
pnpm lint           # Run ESLint
```

### Server (from /server directory)
```bash
pnpm dev            # Start server in watch mode
pnpm start          # Start server
pnpm build          # Build server
pnpm format         # Format code with Prettier
```

## Architecture

### Client Structure
- **app/**: File-based routing with Expo Router
  - **(tabs)/**: Tab navigation screens
  - **_layout.tsx**: Root layout with PaperProvider and theme
- **components/**: Reusable UI components
- **hooks/**: Custom React hooks
- **constants/**: App constants including Colors
- Uses React Native Paper for Material Design 3 UI

### Server Structure
- **infrastructure/**: Core setup
  - **database/**: Database connection
  - **express/**: Express app configuration
  - **middleware/**: Auth, error handling, uploads
  - **prisma/**: Database schema
- **internal/**: Business logic modules
  - **auth/**: Authentication (JWT + OAuth)
  - **user/**: User management
- **utils/**: Shared utilities
  - **auth/**: JWT, bcrypt, OAuth helpers
  - **email/**: Nodemailer setup
  - **uploads/**: Cloudinary integration

### Database Schema (Prisma)
Key models:
- **User**: Authentication, profile, timezone
- **CalendarItem**: Events with recurrence support
- **Reminder**: Offset-based reminders
- **Notification**: User notifications

## Environment Variables

Server requires `.env` file with:
- Database connection (PostgreSQL)
- JWT secrets
- Cloudinary credentials
- SMTP configuration for Nodemailer
- OAuth credentials

## Key Technologies

- **Package Manager**: pnpm (with symlinked node_modules)
- **UI Framework**: React Native Paper (Material Design 3)
- **Navigation**: Expo Router (file-based)
- **State**: React hooks
- **Authentication**: JWT with refresh tokens
- **File Uploads**: Cloudinary via Multer
- **Email**: Nodemailer with SMTP

## Development Notes

- TypeScript path aliases configured: `@/*` maps to relative paths
- Expo manages native dependencies - no pod-install needed
- React Native Paper already configured with theme switching
- No test infrastructure currently set up
- Git branch: main (for PRs)

## Git Commit Convention

This project uses emoji-prefixed conventional commits:

- 🔧 fix: bug fixes or configuration fixes
- ✨ feature: new features
- 🧹 chore: maintenance tasks, dependency updates
- 🔰 init: initial setup or templates
- 🌐 api: API endpoint changes
- 🔧 utility: utility functions or tools

Format: `<emoji> <type>: <short description>`

Keep commits concise and focused on one change.
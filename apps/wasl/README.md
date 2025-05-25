# Wasl - Events Management App

Wasl is the events management application within the Inmaa-Wasl monorepo. It provides functionality for managing and organizing events.

## Features

- Event creation and management
- Event participation tracking
- Clean, minimal React interface
- Shared API client integration

## Development

From the monorepo root:

```bash
# Start Wasl app only
pnpm dev:wasl

# Start both apps
pnpm dev

# Build Wasl app
pnpm build:wasl
```

## Technology Stack

- React 19.1.0
- Vite 6.3.5
- React Router DOM 7.0.0
- Axios for HTTP requests
- Shared API client (@inmaa-wasl/api-client)

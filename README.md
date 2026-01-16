# KingHacks

A personal memory and reflection application that helps users revisit and reflect on their yearly experiences through AI-powered insights, visual memories, and interactive journaling.

## Features

- **Monthly Memory Sections**: Organize memories by month with associated images and descriptions
- **AI-Powered Reflections**: Chat with an AI assistant for deeper insights and reflections on your experiences
- **Beautiful UI**: Modern, responsive design with smooth animations using Framer Motion
- **Year-in-Review**: Comprehensive view of your year's journey with intentions and resolutions

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI for accessible components
- Framer Motion for animations
- TanStack Query for data fetching

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM with PostgreSQL
- BACKBOARD integration for AI features

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kinghacks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run db:push
   ```

4. Configure environment variables (create `.env` file):
   - Database connection string
   - OpenAI API key
   - Other necessary environment variables

## Usage

### Development

To run the full application in development mode:
```bash
npm run dev
```

This starts the Express server with the client served.

To run the client separately:
```bash
npm run dev:client
```

### Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
kinghacks/
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── components/      # Reusable UI components
├── script/          # Build and utility scripts
└── attached_assets/ # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run type checking: `npm run check`
5. Submit a pull request

## License

MIT License - see LICENSE file for details
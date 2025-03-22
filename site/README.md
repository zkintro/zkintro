# ZKIntro Site

Next.js frontend for the ZKIntro project.

## Available Commands

```bash
# Development
npm run dev      # Start development server
npm run start    # Start with content watch mode

# Production
npm run build    # Build for production
npm run serve    # Serve production build

# Other
npm run analyze  # Analyze bundle size
npm run lint     # Lint and fix code
```

## Environment Variables

Required environment variables in `.env.production.local`:
```
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id
CONVERTKIT_API_URL=https://api.convertkit.com/v3/
```

## Tech Stack

- Next.js 12
- Tailwind CSS
- MDX
- Preact (in production)

# Byunivert Mail - Frontend

Production-ready webmail interface for mail.byunivert.com built with Next.js 16 and React 19.

## Features

- **Dark-first Premium Interface**: Modern, professional email client with dark and light mode support
- **Three-Pane Layout**: Sidebar navigation, message list, and reading pane
- **French Localization**: Complete French interface with professional terminology
- **Responsive Design**: Works seamlessly on desktop and tablet
- **Mock Data Layer**: Ready for real backend integration (IMAP, API, Roundcube)
- **Type-Safe**: Full TypeScript support with strict mode
- **Production Ready**: Environment configuration, error handling, and performance optimized

## Architecture

```
app/
├── mail/              # Mail app routes
│   ├── layout.tsx     # Mail layout wrapper
│   └── page.tsx       # Mail inbox page
├── page.tsx           # Login page
└── globals.css        # Design system & themes

components/
├── mail/              # Mail-specific components
│   ├── sidebar.tsx    # Folder navigation
│   ├── message-list.tsx # Message listing
│   ├── reading-pane.tsx # Message viewer
│   └── composer.tsx    # Email composer
└── ui/                # Reusable UI components (shadcn)

lib/
├── adapters/
│   └── mail-adapter.ts # Data layer abstraction
└── utils.ts           # Utility functions
```

## Design System

The application uses a carefully crafted color palette with purple as the primary brand color:

- **Light Mode**: Clean whites and light grays for professional appearance
- **Dark Mode**: Deep charcoal backgrounds with bright purple accents (default)
- **Typography**: System fonts optimized for readability
- **Spacing**: Consistent 0.5rem base unit
- **Colors**: 3-color system (primary purple, neutral grays, destructive red)

## Installation

```bash
# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm dev

# Open http://localhost:3000
```

## Development

### Default Credentials
For testing the interface:
- Email: `setifmail@byunivert.com`
- Password: (any value)

### Project Structure

**Data Layer** (`lib/adapters/mail-adapter.ts`):
- Current: Mock data implementation
- Future: Replace with real IMAP/API integration
- Interface: Type-safe TypeScript exports

**Components**:
- `Sidebar`: Folder navigation with unread counts
- `MessageList`: Email list with search, sort, and bulk actions
- `ReadingPane`: Full message viewer with attachments
- `Composer`: Rich text email composer

**Pages**:
- `/`: Login page with French interface
- `/mail`: Main inbox interface

## Future Integrations

The adapter pattern allows seamless integration with:

1. **IMAP Protocol**: Connect to any IMAP server
2. **REST API**: Custom backend implementation
3. **Roundcube**: Migrate from existing Roundcube installation
4. **OAuth**: Google, Microsoft, custom providers

To integrate a real backend, update `lib/adapters/mail-adapter.ts`:

```typescript
// Replace mock implementations with real API calls
export async function getMessages(folderId: string) {
  const response = await fetch(`/api/messages?folder=${folderId}`)
  return response.json()
}
```

## Performance

- **Next.js App Router**: Server components for data fetching
- **Code Splitting**: Automatic route-based bundling
- **CSS**: Tailwind CSS with purging
- **Images**: Optimized with next/image
- **Fonts**: System fonts (no external files)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Security Considerations

- No hardcoded credentials in frontend
- Environment variables for all secrets
- HTTP-only cookies for session management (backend)
- CSRF protection (backend)
- Content Security Policy headers (backend)

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy via Vercel Dashboard
# or use Vercel CLI
vercel deploy
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## Environment Variables

See `.env.example` for all available configuration options.

### Required (if using real backend)
- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `API_SECRET_KEY`: Backend authentication (optional)

### Optional
- Email provider credentials (IMAP/SMTP)
- Analytics identifiers
- Feature flags

## Styling

### Design Tokens
Defined in `app/globals.css`:
- Color variables: `--primary`, `--foreground`, `--border`, etc.
- Radius: `--radius` and variants
- Theme-aware: Auto-switches with `prefers-color-scheme`

### Component Customization
All colors use design tokens via CSS variables. To customize:

1. Edit `app/globals.css` color definitions
2. Update both light (`:root`) and dark (`.dark`) sections
3. Components automatically inherit new colors

## Contributing

1. Maintain French as primary language
2. Keep dark mode as default aesthetic
3. Follow existing component patterns
4. Update types in adapter when adding features
5. Test responsive design at 320px, 768px, 1024px

## License

© 2024 Byunivert. All rights reserved.

## Support

For issues or questions:
- Check existing GitHub issues
- Create detailed bug reports with reproduction steps
- Include browser and OS information

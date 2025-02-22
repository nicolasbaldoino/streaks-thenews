# Streaks - The News

Track your daily streak and monitor your newsletter reading progress.

## Description

Streaks - The News is an application that allows you to track your daily reading streak and monitor your newsletter reading progress. The project is developed using modern technologies to ensure a smooth and intuitive experience.

## Technologies

### Languages & Frameworks
- TypeScript - Strongly typed language for JavaScript.
- React - Library for building user interfaces.
- Next.js 15 - React framework with server-side rendering.
- TailwindCSS - Utility-first CSS framework.

### Services & Libraries
- Shadcn - UI components for React.
- Prisma.io - ORM for database management.
- NextAuth - Authentication library for Next.js.

### Database
- PostgreSQL 16 - Relational database used for storing application data.

### Environment & Runtime
- Node.js 20.18 - JavaScript runtime environment.

## Installation

To run the project locally, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/nicolasbaldoino/streaks-thenews.git
   ```
2. Navigate to the project directory:
   ```bash
   cd streaks-thenews
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables.

   Create a `.env` file in the project's root directory and add the following variables for testing purposes during development:

   ```bash
   # Database - PostgreSQL
   DATABASE_URL=postgresql://postgres:supersecret@localhost:5432/default

   # NextAuth - Administrative user authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=supersecret

   # SMTP - Sending transactional emails
   EMAIL_SERVER_HOST=smtp.mailersend.net
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=MS_MNoKsQ@trial-ynrw7gyod6kl2k8e.mlsender.net
   EMAIL_SERVER_PASSWORD=mssp.0DjAY59.k68zxl2evkklj905.8puLmsA
   EMAIL_FROM=streaks - the news <MS_MNoKsQ@trial-ynrw7gyod6kl2k8e.mlsender.net>
   ```

   These variables are configured for a local development environment and can be changed as needed for your production environment.

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/                                   # Source files
│
├── actions/                           # Server-side actions
├── app/                               # Application main structure
│   ├── (app)/                         # Core application pages
│   │   ├── (admin)/                   # Admin panel
│   │   │   ├── _components/           # Admin UI components
│   │   │   ├── analytics/             # Analytics page
│   │   │   │   ├── _components/       # Analytics UI components
│   │   │   │   └── page.tsx           # Analytics page logic
│   │   │   ├── levels/                # User level management
│   │   │   │   ├── _components/       # Level UI components
│   │   │   │   └── page.tsx           # Levels page logic
│   │   │   ├── users/                 # User management
│   │   │   │   ├── _components/       # Users UI components
│   │   │   │   └── page.tsx           # Users page logic
│   │   │   ├── posts/                 # Post pages
│   │   │   │   └── [id]/              # Dynamic post pages
│   │   │   │       └── page.tsx       # Post detail page logic
│   │   │   └── layout.tsx             # Admin layout
│   │   ├── (main)/                    # Main application pages
│   │   │   ├── _components/           # Main UI components
│   │   │   └── page.tsx               # Main page logic
│   │   ├── layout.tsx                 # Application layout
│   │   └── not-found.tsx              # 404 Not Found page
│   ├── api/                           # API routes
│   │   ├── auth/                      # Authentication API
│   │   │   └── [...nextauth]/         # NextAuth API route
│   │   │       └── route.ts           # NextAuth route
│   │   └── webhooks/                  # Webhooks for integrations
│   │       └── waffle/                # Waffle webhook
│   │           └── route.ts           # Webhook route logic
│   └── auth/                          # Authentication pages
│       ├── login/                     # Login page
│       │   ├── _components/           # Login UI components
│       │   └── page.tsx               # Login page logic
│       └── layout.tsx                 # Authentication layout
├── components/                        # Shared UI components
│   └── ui/                            # UI elements library (buttons, modals, etc.)
├── hooks/                             # Custom React hooks
├── lib/                               # Utility functions and configurations
│   ├── auth-config.ts                 # Authentication configuration
│   ├── db.ts                          # Database connection
│   └── utils.ts                       # Helper functions
└── middleware.ts                      # Global middleware (e.g., auth)
```

## Contribution

Contributions are welcome! Feel free to open issues and submit pull requests.

## License

This project does not have a specific license.

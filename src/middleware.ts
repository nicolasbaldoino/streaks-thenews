import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  async function middleware({ nextUrl, nextauth: { token } }) {
    const { pathname } = nextUrl

    // Redirect to dashboard if user is logged in and trying to access the auth route
    if (token?.sub) {
      if (pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', nextUrl))
      }
    }
  },
  {
    callbacks: {
      authorized: ({
        req: {
          nextUrl: { pathname },
        },
        token,
      }) => {
        if (
          pathname.startsWith('/posts') ||
          pathname.startsWith('/api/webhooks') ||
          pathname === '/'
        )
          return true

        // Redirect to /auth if not logged in
        if (!token?.sub && !pathname.startsWith('/auth')) return false
        return true
      },
    },
  },
)

export const config = { matcher: ['/((?!_next/static|_next/image|.png).*)'] }

import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface DefaultUser {
    role?: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role
  }
}

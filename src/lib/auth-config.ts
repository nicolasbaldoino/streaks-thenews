import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { db } from './db'

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
}

export const handler = NextAuth(authConfig)

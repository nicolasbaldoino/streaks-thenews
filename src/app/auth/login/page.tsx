import Link from 'next/link'

import { SignInForm } from './sign-in-form'

export default function Page() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          title="streaks 🔥"
          className="text-2xl font-semibold leading-none tracking-tight"
        >
          streaks 🔥
        </Link>
      </div>

      <SignInForm />
    </div>
  )
}

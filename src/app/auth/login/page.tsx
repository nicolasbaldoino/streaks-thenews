import { SignInForm } from './sign-in-form'

export default function Page() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-semibold leading-none tracking-tight">
          streaks 🔥
        </span>
      </div>

      <SignInForm />
    </div>
  )
}

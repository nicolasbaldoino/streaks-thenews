'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2, MailCheck } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const signInSchema = z.object({
  email: z.string().email({ message: 'Please, enter a valid email' }),
})

export const SignInForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl')

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const res = await signIn('email', {
      email: values.email,
      callbackUrl: callbackUrl || '/',
      redirect: false,
    })

    if (!res?.ok) {
      form.setError('root', { message: 'Invalid email, please try again' })
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-xl font-bold">
              Let&apos;s get started
            </CardTitle>

            <CardDescription className="text-center">
              Enter your email address to receive a magic link. 🪄
            </CardDescription>

            {form.formState.errors.root?.message && (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>
                  <p>{form.formState.errors.root?.message}</p>
                </AlertDescription>
              </Alert>
            )}

            {form.formState.isSubmitSuccessful && (
              <Alert className="border-green-500/50 text-green-500 dark:border-green-500 [&>svg]:text-green-500">
                <MailCheck className="size-4" />
                <AlertTitle>Sent!</AlertTitle>
                <AlertDescription>
                  <p>Check your email for the magic link!</p>
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>

          <CardContent className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tom@acme.inc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              <Loader2
                className={cn(
                  'mr-2 size-4 animate-spin',
                  !form.formState.isSubmitting && 'sr-only',
                )}
              />
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

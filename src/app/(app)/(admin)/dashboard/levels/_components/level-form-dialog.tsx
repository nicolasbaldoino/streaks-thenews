'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Level } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createLevel } from '@/actions/create-level'
import { updateLevel } from '@/actions/update-level'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().trim().nonempty().min(3).max(255),
  minStreakDays: z.coerce.number().nonnegative().default(0),
})

export const LevelFormDialog = ({ initialData }: { initialData?: Level }) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      minStreakDays: initialData?.minStreakDays || 0,
    },
  })

  const onReset = () => {
    form.reset({ name: '' })
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      await updateLevel({ id: initialData.id, ...values })

      toast({
        title: 'Level updated',
        description: 'The level was updated successfully! 🎉',
      })
    } else {
      await createLevel(values)

      toast({
        title: 'Level created',
        description: 'The level was created successfully! 🎉',
      })
    }

    onReset()
    ref.current?.click()
  }

  return (
    <Form {...form}>
      <DialogClose asChild>
        <div className="sr-only" ref={ref} />
      </DialogClose>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {initialData ? 'Edit Level' : 'Create Level'}
            </DialogTitle>

            <DialogDescription>
              {initialData ? 'Edit the level details' : 'Fill in the details'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minStreakDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Streak Days</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} minLength={0} />
                  </FormControl>
                  <FormDescription>
                    The minimum number of days required to achieve this level.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Loader2
                className={cn(
                  'mr-2 size-4 animate-spin',
                  !form.formState.isSubmitting && 'sr-only',
                )}
              />
              {initialData ? 'Save changes' : 'Save'}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  )
}

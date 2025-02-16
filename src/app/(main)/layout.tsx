import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <Separator />

        {children}
      </main>
    </div>
  )
}

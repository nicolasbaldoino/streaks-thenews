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
        <div className="px-0 md:px-4">
          <Separator />
        </div>

        {children}
      </main>
    </div>
  )
}

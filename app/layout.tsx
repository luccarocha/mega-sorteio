import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mega Sorteio',
  description: 'Sistema de sorteio com 1000 cotas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
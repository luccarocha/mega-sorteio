import './globals.css'

export const metadata = {
  title: 'Mega Sorteio',
  description: 'Sistema de sorteio com 1000 cotas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
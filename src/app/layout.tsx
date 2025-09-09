import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NPC Chat - AI Character Advice',
  description: 'Get life advice from your favorite characters and NPCs. Be warned, some of these individuals have not made good life choices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased font-inter">
        {children}
      </body>
    </html>
  )
}

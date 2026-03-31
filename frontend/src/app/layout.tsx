import './globals.css'
import AppLayout from '@/components/AppLayout'
import { CartProvider } from '@/contexts/CartContext'

export const metadata = {
  title: 'BramiShop - Онлайн магазин',
  description: 'Модерен онлайн магазин за всички ваши нужди',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <html lang="bg" suppressHydrationWarning>
      <head>
        <script src="/scripts/device-font-size.js" />
      </head>
      <body className="bg-[#f5f7fa] font-sans antialiased">
        <CartProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </CartProvider>
      </body>
    </html>
  )
}

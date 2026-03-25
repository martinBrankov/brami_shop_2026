import './globals.css'
import AppLayout from '@/components/AppLayout'
import OrientationWrapper from '@/components/OrientationWrapper'
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
      <body className="font-sans antialiased">
        <CartProvider>
          <OrientationWrapper showLandscapePrompt={false}>
            <AppLayout>
              {children}
            </AppLayout>
          </OrientationWrapper>
        </CartProvider>
      </body>
    </html>
  )
}

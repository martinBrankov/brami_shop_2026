import './globals.css'
import TopBar from '@/components/TopBar'
import NavigationMenu from '@/components/NavigationMenu'
import BottomBar from '@/components/BottomBar'
import OrientationWrapper from '@/components/OrientationWrapper'

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
        <OrientationWrapper showLandscapePrompt={true}>
          <div id="root">
            {/* горна лента */}
            <TopBar />

            {/* менюто „виси" над съдържанието */}
            <div className="relative z-20 -mb-8">
              <NavigationMenu />
            </div>

            {/* отстъп, за да не влиза съдържанието под менюто */}
            <main className="pt-8 pb-16">
              {children}
            </main>
            
            {/* долна лента */}
            <BottomBar />
          </div>
        </OrientationWrapper>
      </body>
    </html>
  )
}

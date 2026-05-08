import type { Metadata, Viewport } from 'next'
import { Navbar } from '@/components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: '实用在线小工具',
  description: '免费在线工具集合：随机密码生成器、二维码生成器、文本去空格、字数统计、大小写转换、进制换算',
  generator: 'v0.app',
  keywords: ['在线工具', '密码生成器', '二维码', '字数统计', '进制转换'],
  icons: {
    icon: [
      {
        url: '/network-tools/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/network-tools/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/network-tools/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="font-sans antialiased min-h-screen">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}

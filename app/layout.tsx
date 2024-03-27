import './globals.css'

import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head'

import { Providers } from './providers'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Morpheus',
  description: 'Decentralized open-source AI project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <meta name='Morpheus' content='Morpheus' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Morpheus' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-TileColor' content='#00ff85' />
        <meta name='msapplication-tap-highlight' content='no' />
        <link rel='manifest' href='/public/manifest.json' />
        <link rel='shortcut icon' href='/public/favicon.ico' />
        <link rel='apple-touch-icon' href='/public/apple-touch-icon.png' />
        <meta name='theme-color' content='#000000' />
        <title>{metadata.title?.toString()}</title>
        <meta name='description' content={metadata.description?.toString()} />
      </Head>
      <body className={robotoMono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

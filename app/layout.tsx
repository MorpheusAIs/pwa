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
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <body className={robotoMono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

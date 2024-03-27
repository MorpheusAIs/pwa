import '../globals.css'

import { Box, Center } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Script from 'next/script'

import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Morpheus',
  description: 'Decentralized open-source AI project',
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Script id='embed'>
        {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
      .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
      n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
      (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
      ml('account', '706158');`}
      </Script>
      <Center
        zIndex='-1'
        left='50%'
        top={0}
        transform='translate(-50%, -100%)'
        boxSize='500px'
        position='absolute'
        bgImage='linear-gradient(90deg, #00FF85 0%, #085F90 100%)'
        filter='blur(100px)'
      />
      <Nav />
      <Box className='lines' maxWidth='container.lg'>
        <div className='line' />
        <div className='line' />
        <div className='line' />
      </Box>
      {children}
    </Box>
  )
}

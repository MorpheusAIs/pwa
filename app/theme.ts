import { extendTheme } from '@chakra-ui/react'

import { semanticTokens } from './semanticTokens'

import { ButtonStyle as Button } from '@/components/theme/button'
import { MenuStyle as Menu } from '@/components/theme/menu'
import { ModalStyle as Modal } from '@/components/theme/modal'
import { SwitchStyle as Switch } from '@/components/theme/switch'

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1440px',
  '3xl': '2200px',
}

export const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      html: {
        height: '100%',
      },
      body: {
        background: 'background.surface.base',
        backgroundImage: 'url(/bg-mono.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        backgroundAttachment: 'fixed',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  semanticTokens,
  components: {
    Button,
    Menu,
    Modal,
    Switch,
  },
})

import { Flex } from '@chakra-ui/react'

type ChatLayoutProps = {
  children: React.ReactNode
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <Flex
      height='100%'
      width='full'
      flex={1}
      flexDir='column'
      bg='background.surface.base'
      overflow='hidden'
    >
      {children}
    </Flex>
  )
}

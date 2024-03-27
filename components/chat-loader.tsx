'use client'
import { Center, Flex } from '@chakra-ui/react'
import { type FC } from 'react'
import { FaRobot } from 'react-icons/fa'

export const ChatLoader: FC = () => {
  return (
    <Flex gap={4} py={4} px={4} flexDir={{ base: 'column', md: 'row' }}>
      <Flex width={{ base: 'full', md: '80px' }} fontSize='sm'>
        <Center
          boxSize={8}
          borderRadius='sm'
          fontSize='md'
          bg='background.surface.raised.base'
          color='text.inverse'
        >
          <FaRobot />
        </Center>
      </Flex>
      <Flex flexDir='column' flex={1} gap={4} fontSize='sm' lineHeight='tall'>
        <span className='animate-pulse cursor-default mt-1'>▍</span>
      </Flex>
    </Flex>
  )
}

import {
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  Heading,
  ModalBody,
  ModalHeader,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { FaApple, FaLinux } from 'react-icons/fa6'

import { type SettingRoute, SettingRoutes } from '../types'

import { LogoIcon } from '@/components/Icons/Logo'

export const Download: React.FC<SettingRoute> = ({ setRoute }) => {
  const handleMacClick = useCallback(() => {
    setRoute(SettingRoutes.LocalDetected)
  }, [setRoute])
  return (
    <>
      <ModalHeader fontSize='md'>Download Morpheus</ModalHeader>
      <ModalBody>
        <Stack alignItems='center' spacing={6}>
          <Stack alignItems='center'>
            <LogoIcon boxSize={24} color='text.link' />
            <Heading as='h2' fontSize='lg'>
              Download Morpheus
            </Heading>
            <Text color='text.subtle' textAlign='center' fontSize='sm'>
              Download Morephus for your supported platform. And follow the install instructions.
            </Text>
          </Stack>
          <ButtonGroup>
            <Button leftIcon={<FaApple />} onClick={handleMacClick}>
              Download for Mac
            </Button>
            <Button leftIcon={<FaLinux />}>Download for Linux</Button>
          </ButtonGroup>
          <Flex py={2} alignItems='center' justifyContent='space-between' width='full'>
            <Text fontSize='sm' color='text.link'>
              Waiting to connect to local host
            </Text>
            <CircularProgress
              isIndeterminate
              size='6'
              color='text.link'
              trackColor='blackAlpha.700'
            />
          </Flex>
        </Stack>
      </ModalBody>
    </>
  )
}

import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { Button, Heading, ModalBody, ModalHeader, Stack, Text } from '@chakra-ui/react'
import { useCallback } from 'react'

import { type SettingRoute, SettingRoutes } from '../types'

export const LocalDetected: React.FC<SettingRoute> = ({ setRoute }) => {
  const handleBack = useCallback(() => {
    setRoute(SettingRoutes.Settings)
  }, [setRoute])
  return (
    <>
      <ModalHeader fontSize='md'>Download Morpheus</ModalHeader>
      <ModalBody>
        <Stack alignItems='center' spacing={6} py={4}>
          <CheckCircleIcon boxSize={16} color='text.link' />
          <Heading as='h2' fontSize='lg'>
            Morpheus Detected
          </Heading>
          <Text color='text.subtle' fontSize='sm' textAlign='center'>
            You can now use fast and totally private locally hosted version of Morpheus.
          </Text>
          <Button onClick={handleBack} rightIcon={<ArrowForwardIcon />}>
            Return to settings
          </Button>
        </Stack>
      </ModalBody>
    </>
  )
}

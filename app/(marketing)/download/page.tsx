'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaApple, FaLinux } from 'react-icons/fa'

export default function Home() {
  return (
    <Container maxWidth='container.md'>
      <Stack gap={12} mt={24}>
        <Heading textAlign='center'>Download Morpheus</Heading>
        <Card
          borderWidth={1}
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          backdropFilter='blur(10px)'
        >
          <CardBody>
            <Text>Pick any of the supported platforms to install Morpheus.</Text>
          </CardBody>
          <CardFooter
            gap={4}
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <Button
              leftIcon={<FaApple />}
              as={Link}
              isExternal
              href='https://drive.google.com/file/d/1x-wR4HWjKqT_g6VRjrWPXu3rVm9ukOc9/view?usp=sharing'
            >
              Download for MacOS
            </Button>
            <Button
              leftIcon={<FaLinux />}
              as={Link}
              isExternal
              href='https://drive.google.com/file/d/1PQ3n7LXeJHe_jmkYLDUQ9fWjZQTWbHCB/view?usp=sharing'
            >
              Download for Linux
            </Button>
          </CardFooter>
        </Card>
        <Card
          borderWidth={1}
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          backdropFilter='blur(10px)'
        ></Card>
      </Stack>
    </Container>
  )
}

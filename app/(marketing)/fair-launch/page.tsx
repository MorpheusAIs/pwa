'use client'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'

import DashboardImage from './morpheus-dashboard.png'

export default function Home() {
  return (
    <Container maxWidth='container.md'>
      <Stack gap={12} my={24}>
        <Heading textAlign='center'>Overview of Morpheus Fair Launch</Heading>
        <Text fontSize='lg' textAlign='center' whiteSpace='pre-line'>
          {`Morpheus is a decentralized AI network. Its token is MOR.\n Feb 8 is Genesis Day for MOR.`}
        </Text>
        <Card
          borderWidth={1}
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          backdropFilter='blur(10px)'
        >
          <CardHeader>
            <Image src={DashboardImage} alt='stuff' />
          </CardHeader>
          <CardBody fontSize='sm'>
            <UnorderedList spacing={2}>
              <ListItem>Feb 8th 2024 at 12pm UTC the Fair Launch of MOR begins.</ListItem>
              <ListItem>
                Tokens start accruing from this time, but aren’t transferable for 90 days.{' '}
              </ListItem>
              <ListItem>The network itself is not yet live.</ListItem>
              <ListItem>
                Be careful of scammers
                <UnorderedList ml={5} mt={2}>
                  <ListItem>There is no airdrop</ListItem>
                  <ListItem>There is no token sale</ListItem>
                  <ListItem>There is no NFT</ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </CardBody>
          <CardFooter
            gap={4}
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <Text fontWeight='bold'>To participate in fair launch, stake stETH here:</Text>
            <Button as={Link} isExternal href='https://morpheus.206.189.243.3.sslip.io/capital'>
              Morpheus Dashboard
            </Button>
          </CardFooter>
        </Card>
        <Card
          borderWidth={1}
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          backdropFilter='blur(10px)'
        >
          <Accordion borderWidth={0} defaultIndex={[0]}>
            <AccordionItem borderWidth={0}>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
                    How does the staking work?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Stack spacing={6}>
                  <UnorderedList spacing={2} fontSize='sm'>
                    <ListItem>
                      Minimum staking deposit amount must be greater than 0.011 stETH
                    </ListItem>
                    <ListItem>
                      You stake stETH in the Morpheus contract (use above dashboard link)
                    </ListItem>
                    <ListItem>You can withdraw that stETH any time after 7 days. </ListItem>
                    <ListItem>
                      While it’s in the contract, the normal stETH yield from your stETH is given to
                      the Morpheus network. [this is what you lose]
                    </ListItem>
                    <ListItem>
                      In return, you earn a pro-rata share of the MOR emissions on an ongoing basis.
                      [this is what you gain]
                    </ListItem>
                    <ListItem>
                      MOR is a native Arbitrum token for cheaper txs, and the initial liquidity pool
                      will be Uniswap on Arbitrum.
                    </ListItem>
                  </UnorderedList>
                  <Flex
                    gap={4}
                    fontSize='sm'
                    borderWidth={1}
                    borderColor='whiteAlpha.300'
                    borderStyle='dashed'
                    p={4}
                  >
                    <Text fontWeight='bold'>Example</Text>
                    <Text>
                      If you deposit 1 stETH and 9 other people each deposit 1 stETH each, you will
                      get 10% of the MOR tokens for the duration that your stETH is staked.
                    </Text>
                  </Flex>
                  <Alert status='warning' alignItems='flex-start'>
                    <AlertIcon />
                    <Flex flexDir='column'>
                      <AlertTitle>Note</AlertTitle>
                      <AlertDescription fontSize='sm' lineHeight='normal'>
                        During the first 90 days, MOR is not transferable. This means stakers will
                        accumulate a MOR balance, but cannot withdraw it until 90 days. At the 90
                        day point, a liquidity pool for MOR/stETH will be created (on Arbitrum), a
                        market price will be established, and the token will be transferable like
                        normal. This was done to prevent absurd market price on day 1 when supply is
                        negligible.
                      </AlertDescription>
                    </Flex>
                  </Alert>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderWidth={0} borderBottom={0}>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
                    Why does Morpheus want you to stake stETH?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize='sm'>
                Morpheus gets the stETH yield while you do this. Half of it is traded into MOR, and
                then both halves are held forever as protocol owned liquidity. This will be
                providing a small continual source of demand for MOR, and a growing liquidity pool
                over time.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
      </Stack>
    </Container>
  )
}

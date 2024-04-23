'use client'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'

export const Hero = () => {
  return (
    <>
      <Container maxW={'container.xl'} className="abcde">
        <Stack as={Box} textAlign={'center'} spacing={{ base: 4, md: 8 }} py={{ base: 20, md: 16 }}>
          {/* <Box position='relative' display='flex' gap='-25px' alignItems='center' justifyContent='center' mb={8}>
              <Box overflow='hidden' width={{ base: '100px', md: '178px'}} height={{ base: '100px', md: '178px'}} bg='whiteAlpha.50' borderRadius='xl' boxShadow='lg' transform='rotate(-15deg)'><Image src='/bg.jpeg' alt='image' fill objectFit='cover' /></Box>
              <Box overflow='hidden' mx={-6} mt={-12} width={{ base: '100px', md: '178px'}} height={{ base: '100px', md: '178px'}} bg='whiteAlpha.50' borderRadius='xl' boxShadow='lg' transform='rotate(25deg)'><Image src='/example-2.jpeg' alt='image' fill objectFit='cover' /></Box>
              <Box overflow='hidden' width={{ base: '100px', md: '178px'}} height={{ base: '100px', md: '178px'}} bg='whiteAlpha.50' borderRadius='xl' boxShadow='lg' transform='rotate(15deg)'><Image src='/example-3.jpg' alt='image' fill objectFit='cover' /></Box>
            </Box> */}
          <Flex width='full' alignItems='center' justifyContent='center'>
            <svg
              width='858'
              height='auto'
              viewBox='0 0 858 386'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M564.19 183.79L822.45 74.69L857.02 0L538.3 134.64C524.75 140.36 512.89 149.46 503.85 161.07L428.51 257.82L353.16 161.07C344.12 149.47 332.26 140.37 318.71 134.64L0 0L34.57 74.69L292.83 183.79V211.75L50.65 109.44L85.22 184.13L292.83 271.83V299.79L101.31 218.88L135.89 293.57L353.6 385.55V262.04L428.51 358.21L503.43 262.04V385.56L721.14 293.58L755.72 218.89L564.2 299.8V271.84L771.81 184.14L806.38 109.45L564.19 211.75V183.79ZM800.397 115.234L561.19 216.274V181.801L820.214 72.3777L851.037 5.78413L539.467 137.404C526.39 142.924 514.942 151.707 506.217 162.913L428.51 262.703L350.794 162.914C342.068 151.718 330.621 142.934 317.543 137.404L317.542 137.403L5.98297 5.78424L36.8055 72.3777L295.83 181.801V216.274L56.633 115.224L87.4555 181.818L295.83 269.841V304.314L107.294 224.665L138.125 291.258L350.6 381.026V253.307L428.51 353.328L506.43 253.308V381.036L718.905 291.268L749.736 224.675L561.2 304.324V269.851L769.574 181.828L800.397 115.234Z'
                fill='url(#paint0_radial_26_3)'
              />
              <defs>
                <radialGradient
                  id='paint0_radial_26_3'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(438 -4.93382e-06) rotate(90.8991) scale(573.571 5637.47)'
                >
                  <stop stopColor='#20DC8E' />
                  <stop offset='0.984375' stopColor='#085B64' />
                </radialGradient>
              </defs>
            </svg>
          </Flex>
          <Stack spacing={2}>
            <Heading
              as='h6'
              fontSize='lg'
              textTransform='uppercase'
              fontWeight={700}
              color='#00FF85'
            >
              Morpheus
            </Heading>
            <Heading
              fontWeight={400}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
            >
              <TypeAnimation sequence={['Decentralized Open-Source AI', 1000]} />
            </Heading>
          </Stack>
          <Stack gap={2}>
            <Text maxWidth='container.md' mx='auto'>
              Morpheus is the peer-to-peer network for generative AI. Permissionless and
              open-source.
            </Text>
            <Text mx='auto'>The revolution will not be centralized.</Text>
          </Stack>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme='brand'
              px={6}
              rightIcon={<ArrowForwardIcon />}
              as={Link}
              href='/fair-launch'
            >
              Fair Launch
            </Button>
            <Button variant={'link'} size={'sm'} as={Link} href='/about'>
              Learn more
            </Button>
          </Stack>
          <div className='ml-embedded' data-form='rr7JyL'></div>
        </Stack>
      </Container>
    </>
  )
}

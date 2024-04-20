'use client'

import '../../formik.css'

import {
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import Script from 'next/script'
import { FaDiscord } from 'react-icons/fa'

export default function Home() {
  return (
    <Container maxWidth='container.md'>
      <Script src='https://f.convertkit.com/ckjs/ck.5.js' />
      <Stack gap={12} my={24}>
        <Heading textAlign='center'>
          100,000+ staked ETH later Morpheus has proven a new Fair Launch model.
        </Heading>
        <Text fontSize='lg' textAlign='center' whiteSpace='pre-line'>
          Launch Your Project Using The MOR20 Smart Contract Standard Now
        </Text>
        <Card
          borderWidth={1}
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          backdropFilter='blur(10px)'
        >
          <CardBody display='flex' flexDir='column' fontSize='sm' gap={4}>
            <Text>Perfect Alignment between Capital, Coders, and Projects</Text>
            <Text>
              While some projects struggle to attract attention, capital, coding talent and
              community builders… the Morpheus community built a developer preview, launched, and
              became the 6th largest wallet of stETH with 100,000 ETH ($300M in boomer bucks)
              contributed in less than 60 days with zero pre-mine, VC capital, or influencer
              shilling…
            </Text>
            <Text>Enter your email below and developers can walk you through it.</Text>
            <Button
              as={Link}
              isExternal
              leftIcon={<FaDiscord />}
              href='https://discord.com/channels/1151741790408429580/1228219372317966409'
            >
              Join The Community
            </Button>
            <form
              action='https://app.convertkit.com/forms/6447691/subscriptions'
              style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '6px' }}
              className='seva-form formkit-form'
              method='post'
              data-sv-form='6447691'
              data-uid='d3327b35be'
              data-format='inline'
              data-version='5'
              data-options={`{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}`}
              min-width='400 500 600 700 800'
            >
              <div data-style='full'>
                <div
                  style={{ backgroundColor: 'rgb(92, 168, 113)' }}
                  data-element='column'
                  className='formkit-column'
                >
                  <div
                    style={{
                      backgroundImage:
                        'url("https://embed.filekitcdn.com/e/kosF5JW8XGJRj6mLRTuM1M/nyqW6XnmKqxvNBUhdQCwb1")',
                      opacity: 0.2,
                    }}
                    className='formkit-background'
                  ></div>
                  <div
                    className='formkit-header'
                    style={{ color: 'rgb(0, 0, 0)', fontSize: '19px', fontWeight: 700 }}
                    data-element='header'
                  >
                    <h2>How to Launch a Project Using Mor20</h2>
                  </div>
                  <div
                    className='formkit-subheader'
                    style={{ color: 'rgb(0, 0, 0)', fontSize: '15px' }}
                    data-element='subheader'
                  >
                    <p>​</p>
                  </div>
                </div>
                <div data-element='column' className='formkit-column'>
                  <ul
                    className='formkit-alert formkit-alert-error'
                    data-element='errors'
                    data-group='alert'
                  ></ul>
                  <div data-element='fields' className='seva-fields formkit-fields'>
                    <div className='formkit-field'>
                      <input
                        className='formkit-input'
                        name='email_address'
                        style={{
                          color: 'rgb(0, 0, 0)',
                          borderColor: 'rgb(227, 227, 227)',
                          borderRadius: '4px',
                          fontWeight: 400,
                        }}
                        aria-label='Email Address'
                        placeholder='Email Address'
                        required
                        type='email'
                      />
                    </div>
                    <button
                      data-element='submit'
                      className='formkit-submit formkit-submit'
                      style={{
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'rgb(96, 198, 136)',
                        borderRadius: '24px',
                        fontWeight: 700,
                      }}
                    >
                      <div className='formkit-spinner'>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <span className=''>Notify Me</span>
                    </button>
                  </div>
                  <div
                    className='formkit-guarantee'
                    style={{ color: 'rgb(77, 77, 77)', fontSize: '13px', fontWeight: 400 }}
                    data-element='guarantee'
                  >
                    <p>We respect your inbox. You can ditch us at any time.</p>
                  </div>
                  <div className='formkit-powered-by-convertkit-container'>
                    <a
                      href='https://convertkit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic'
                      data-element='powered-by'
                      className='formkit-powered-by-convertkit'
                      data-variant='dark'
                      target='_blank'
                      rel='nofollow'
                    >
                      Built with ConvertKit
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  )
}

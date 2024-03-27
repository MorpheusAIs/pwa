import { ArrowDownIcon, ArrowForwardIcon, SettingsIcon } from '@chakra-ui/icons'
import { Button, Link, ModalBody, ModalHeader, Stack, Text } from '@chakra-ui/react'
import { useCallback, useContext } from 'react'

import { Row } from '../row'
import { type SettingRoute, SettingRoutes } from '../types'

import HomeContext from '@/app/api/home/home.context'
import ChatbarContext from '@/components/chat-bar/chat-bar.context'

export const SettingsMenu: React.FC<SettingRoute> = ({ setRoute }) => {
  const {
    state: { selectedConversation },
  } = useContext(HomeContext)
  const { handleClearConversations } = useContext(ChatbarContext)

  const handleDownloadClick = useCallback(() => {
    setRoute(SettingRoutes.Download)
  }, [setRoute])

  const handleChangeModel = useCallback(() => {
    setRoute(SettingRoutes.ChangeModel)
  }, [setRoute])

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure?')) {
      handleClearConversations()
    }
  }, [handleClearConversations])

  return (
    <>
      <ModalHeader fontSize='md' display='flex' gap={2} alignItems='center'>
        <SettingsIcon />
        Settings
      </ModalHeader>
      <ModalBody>
        <Stack>
          <Row
            heading='Use local hosting'
            body={
              <Text color='text.subtle' fontSize='sm'>
                Download to become your own AI host. Fast and totally private. You can also earn
                rewards by becoming a node. <Link color='text.link'>Learn more</Link>
              </Text>
            }
          >
            <Button rightIcon={<ArrowDownIcon />} onClick={handleDownloadClick}>
              Download
            </Button>
          </Row>
          <Row
            heading='Current LLM'
            body={<Text color='text.link'>{selectedConversation?.model?.name ?? ''}</Text>}
          >
            <Button onClick={handleChangeModel} rightIcon={<ArrowForwardIcon />}>
              Change
            </Button>
          </Row>
          <Row
            heading='Save chat history'
            body={
              <Text color='text.subtle' fontSize='sm'>
                Since mor.org does not have accounts, chat history is only browser based and does
                not transfer between devices or browsers.{' '}
                <Link color='text.link' onClick={handleClearHistory}>
                  Clear history
                </Link>
              </Text>
            }
          ></Row>
        </Stack>
      </ModalBody>
    </>
  )
}

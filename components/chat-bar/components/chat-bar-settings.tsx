import { Button, Stack, Text } from '@chakra-ui/react'
import { useCallback, useContext } from 'react'
import { TbFileExport, TbSettings } from 'react-icons/tb'

import ChatbarContext from '../chat-bar.context'
import { ClearConversations } from './clear-conversations'
import { Import } from './import'

import HomeContext from '@/app/api/home/home.context'

export const ChatbarSettings = () => {
  const {
    state: { conversations, showSettingsModal, showChatbar },
    dispatch,
  } = useContext(HomeContext)

  const { handleClearConversations, handleImportConversations, handleExportData } =
    useContext(ChatbarContext)

  const handleToggleSettingModal = useCallback(() => {
    dispatch({ field: 'showChatbar', value: !showChatbar })
    dispatch({ field: 'showSettingsModal', value: !showSettingsModal })
  }, [dispatch, showChatbar, showSettingsModal])

  return (
    <Stack spacing={1} borderTopWidth={2} borderColor='border.base' mx={-2} px={2} pt={2}>
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <Button
        variant='ghost'
        px={2}
        justifyContent='flex-start'
        leftIcon={<TbFileExport />}
        onClick={() => handleExportData()}
      >
        <Text as='span' fontSize='xs'>
          Export chat
        </Text>
      </Button>
      <Button
        variant='ghost'
        px={2}
        justifyContent='flex-start'
        leftIcon={<TbSettings />}
        onClick={handleToggleSettingModal}
        display={{ base: 'flex', md: 'none' }}
      >
        <Text as='span' fontSize='xs'>
          Settings
        </Text>
      </Button>
      {/* 

      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false)
        }}
      /> */}
    </Stack>
  )
}

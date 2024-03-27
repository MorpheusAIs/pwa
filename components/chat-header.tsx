'use client'

import {
  Button,
  Flex,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useCallback, useContext } from 'react'
import { TbMenu } from 'react-icons/tb'

import { LogoIcon } from './Icons/Logo'

import HomeContext from '@/app/api/home/home.context'

export const ChatHeader = () => {
  const {
    state: { showSettingsModal, showChatbar },
    dispatch,
  } = useContext(HomeContext)

  const handleToggleSettingModal = useCallback(() => {
    dispatch({ field: 'showSettingsModal', value: !showSettingsModal })
  }, [dispatch, showSettingsModal])

  const handleShowChatBar = useCallback(() => {
    dispatch({ field: 'showChatbar', value: !showChatbar })
  }, [dispatch, showChatbar])

  return (
    <>
      <Flex position='sticky' top={0} p={2}>
        <Flex
          px={2}
          py={2}
          bg='background.surface.raised.base'
          borderRadius='sm'
          width='full'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex display={{ base: 'flex', md: 'none' }} flex={1}>
            <IconButton aria-label='show sidebar' icon={<TbMenu />} onClick={handleShowChatBar} />
          </Flex>
          <LogoIcon boxSize={8} color='text.inverse' />

          <Flex gap={2} flex={1} justifyContent='flex-end'>
            <LightMode>
              <Button colorScheme='brand' size='sm'>
                0 MOR
              </Button>
            </LightMode>
            <Menu>
              <LightMode>
                <MenuButton
                  size='sm'
                  as={IconButton}
                  colorScheme='brand'
                  icon={<TbMenu />}
                  display={{ base: 'none', md: 'flex' }}
                />
              </LightMode>
              <MenuList display='flex' flexDir='column'>
                <MenuItem onClick={handleToggleSettingModal}>Settings</MenuItem>
                <MenuItem>About Morpheus</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

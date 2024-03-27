import { ChatIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton, Input } from '@chakra-ui/react'
import {
  type DragEvent,
  type KeyboardEvent,
  type MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react'
import { TbCheck, TbPencil, TbTrash, TbX } from 'react-icons/tb'

import ChatbarContext from '../chat-bar.context'

import HomeContext from '@/app/api/home/home.context'
import { type Conversation } from '@/types/chat'

interface Props {
  conversation: Conversation
}

export const ConversationComponent = ({ conversation }: Props) => {
  const {
    state: { selectedConversation, messageIsStreaming },
    handleSelectConversation,
    handleUpdateConversation,
  } = useContext(HomeContext)

  const { handleDeleteConversation } = useContext(ChatbarContext)

  const [isDeleting, setIsDeleting] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState('')

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      selectedConversation && handleRename(selectedConversation)
    }
  }

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, conversation: Conversation) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('conversation', JSON.stringify(conversation))
    }
  }

  const handleRename = (conversation: Conversation) => {
    if (renameValue.trim().length > 0) {
      handleUpdateConversation(conversation, {
        key: 'name',
        value: renameValue,
      })
      setRenameValue('')
      setIsRenaming(false)
    }
  }

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    if (isDeleting) {
      handleDeleteConversation(conversation)
    } else if (isRenaming) {
      handleRename(conversation)
    }
    setIsDeleting(false)
    setIsRenaming(false)
  }

  const handleCancel: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    setIsDeleting(false)
    setIsRenaming(false)
  }

  const handleOpenRenameModal: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    setIsRenaming(true)
    selectedConversation && setRenameValue(selectedConversation.name)
  }
  const handleOpenDeleteModal: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    setIsDeleting(true)
  }

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false)
    } else if (isDeleting) {
      setIsRenaming(false)
    }
  }, [isRenaming, isDeleting])

  return (
    <Flex position='relative' alignItems='center' className='relative flex items-center'>
      {isRenaming && selectedConversation?.id === conversation.id ? (
        <Flex
          width='full'
          alignItems='center'
          gap={2}
          px={2}
          fontSize='sm'
          borderRadius='md'
          bg='background.button.secondary.hover'
        >
          <ChatIcon />
          <Input
            className='mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100'
            type='text'
            fontWeight='bold'
            mr={14}
            overflow='hidden'
            textOverflow='ellipsis'
            bg='transparent'
            borderWidth={0}
            boxShadow='none'
            _focus={{ boxShadow: 'none' }}
            value={renameValue}
            fontSize='xs'
            px={0}
            onChange={e => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            autoFocus
          />
        </Flex>
      ) : (
        <Button
          onClick={() => handleSelectConversation(conversation)}
          disabled={messageIsStreaming}
          draggable='true'
          onDragStart={e => handleDragStart(e, conversation)}
          isActive={selectedConversation?.id === conversation.id}
          leftIcon={<ChatIcon />}
          variant='ghost'
          colorScheme='gray'
          px={2}
          py={5}
          width='full'
        >
          <Box
            position='relative'
            maxHeight={5}
            flex={1}
            overflow='hidden'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
            wordBreak='break-all'
            textAlign='left'
            fontSize='xs'
            pr={selectedConversation?.id === conversation.id ? '4rem' : 1}
          >
            {conversation.name}
          </Box>
        </Button>
      )}

      {(isDeleting || isRenaming) && selectedConversation?.id === conversation.id && (
        <Flex right={1} zIndex='10' position='absolute'>
          <IconButton
            variant='ghost'
            fontSize='lg'
            icon={<TbCheck />}
            aria-label='confirm'
            onClick={handleConfirm}
          />
          <IconButton
            variant='ghost'
            fontSize='lg'
            aria-label='Cancel'
            icon={<TbX />}
            onClick={handleCancel}
          />
        </Flex>
      )}

      {selectedConversation?.id === conversation.id && !isDeleting && !isRenaming && (
        <Flex right={1} zIndex='10' position='absolute'>
          <IconButton
            size='sm'
            aria-label='Rename'
            icon={<TbPencil />}
            fontSize='lg'
            onClick={handleOpenRenameModal}
            variant='ghost'
          />
          <IconButton
            size='sm'
            aria-label='Delete'
            icon={<TbTrash />}
            fontSize='lg'
            onClick={handleOpenDeleteModal}
            variant='ghost'
          />
        </Flex>
      )}
    </Flex>
  )
}

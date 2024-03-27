'use client'

import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  type FlexProps,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Textarea,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import {
  type ChangeEvent,
  type FormEvent,
  type MutableRefObject,
  useCallback,
  useContext,
  useState,
} from 'react'
import ResizeTextarea from 'react-textarea-autosize'

import { SlideTransitionY } from './transitions/slide-transition-y'

import HomeContext from '@/app/api/home/home.context'
import { useEnterSubmit } from '@/lib/hooks/user-enter-submit'
import { type Message } from '@/types/chat'

type ChatInputProps = {
  onSend: (message: Message) => void
  onScrollDownClick: () => void
  onRegenerate: () => void
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>
  stopConversationRef: MutableRefObject<boolean>
  isLoading?: boolean
  showScrollDownButton: boolean
} & FlexProps

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  textareaRef,
  isLoading,
  stopConversationRef,
  showScrollDownButton,
  onScrollDownClick,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [content, setContent] = useState<string>()
  const {
    state: { messageIsStreaming, models, selectedConversation },
    handleUpdateConversation,
  } = useContext(HomeContext)
  const { formRef, onKeyDown } = useEnterSubmit()

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
  }, [])

  const handleModelChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const model = models.find(model => model.name === e.target.value)
      if (!model) return
      selectedConversation &&
        handleUpdateConversation(selectedConversation, {
          key: 'model',
          value: model,
        })
    },
    [handleUpdateConversation, models, selectedConversation],
  )

  const handleStopConversation = () => {
    stopConversationRef.current = true
    setTimeout(() => {
      stopConversationRef.current = false
    }, 1000)
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (messageIsStreaming) return
      if (!content) {
        alert('Please enter a message.')
        return
      }
      onSend({ role: 'user', content, model: selectedConversation?.model?.name })
      setContent('')
    },
    [content, messageIsStreaming, onSend, selectedConversation?.model?.name],
  )

  return (
    <Flex width='full' p={2}>
      <Flex
        width='full'
        px={2}
        pt={2}
        flexDir='column'
        gap={0}
        position='relative'
        borderWidth={2}
        borderColor={isFocused ? 'border.base' : 'border.subtle'}
        transitionProperty='common'
        transitionDuration='normal'
        borderRadius='sm'
        {...rest}
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Select
            size='sm'
            width='auto'
            variant='filled'
            bg='transparent'
            _hover={{ bg: 'whiteAlpha.100' }}
            color='text.link'
            value={selectedConversation?.model?.name}
            onChange={handleModelChange}
          >
            {models.map(model => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </Select>
          <AnimatePresence mode='wait'>
            {isLoading && (
              <SlideTransitionY key='stop'>
                <Button
                  variant='ghost'
                  size='sm'
                  leftIcon={<Spinner size='sm' />}
                  onClick={handleStopConversation}
                >
                  Stop generating
                </Button>
              </SlideTransitionY>
            )}
            {showScrollDownButton && (
              <IconButton
                icon={<ArrowDownIcon />}
                aria-label='Scroll down'
                onClick={onScrollDownClick}
              />
            )}

            {/* {!isLoading && selectedConversation && selectedConversation.messages.length > 0 && (
              <SlideTransitionY key='regenerate'>
                <Button size='sm' variant='ghost' leftIcon={<RepeatIcon />} onClick={onRegenerate}>
                  Regenerate
                </Button>
              </SlideTransitionY>
            )} */}
          </AnimatePresence>
        </HStack>

        <form ref={formRef} onSubmit={handleSubmit}>
          <InputGroup size='lg' alignItems='center'>
            <Textarea
              height={14}
              variant='outline'
              borderWidth={0}
              borderRadius='sm'
              placeholder='Ask a question...'
              resize='none'
              maxHeight='250px'
              minHeight='52px'
              pl={3}
              pr={16}
              py={3}
              fontSize='md'
              lineHeight='1.5rem'
              minRows={1}
              tabIndex={0}
              as={ResizeTextarea}
              onKeyDown={onKeyDown}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={content}
              ref={textareaRef}
              isDisabled={isLoading}
              _hover={{ borderColor: 'border.base' }}
              _active={{ borderColor: 'border.base' }}
              _focus={{ borderColor: 'border.base', boxShadow: 'none' }}
              required
            />
            <InputRightElement
              display='flex'
              alignItems='flex-end'
              width='auto'
              gap={2}
              top='auto'
              right='0.5rem'
              bottom='-2px'
              pb={3}
              height='52px'
            >
              <IconButton
                colorScheme='brand'
                aria-label='submit'
                variant='ghost'
                icon={<ArrowUpIcon />}
                size='sm'
                isLoading={isLoading}
                isDisabled={!content}
                type='submit'
              />
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>
    </Flex>
  )
}

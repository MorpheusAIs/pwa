'use client'

import { Box, Center, Flex, IconButton, Spinner, Stack, StackDivider, Text } from '@chakra-ui/react'
import {
  memo,
  type MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FaCaretRight } from 'react-icons/fa'

import { Chatbar } from './chat-bar/chat-bar'
import { ChatLoader } from './chat-loader'
import { MemoizedChatMessage } from './memoized-chat-message'

import HomeContext from '@/app/api/home/home.context'
import { ChatHeader } from '@/components/chat-header'
import { ChatInput } from '@/components/chat-input'
import { type ChatBody, type Conversation, type Message } from '@/types/chat'
import { saveConversation, saveConversations, updateConversation } from '@/utils/app/conversation'
import { throttle } from '@/utils/data/throttle'

type ChatProps = {
  stopConversationRef: MutableRefObject<boolean>
}

export const Chat: React.FC<ChatProps> = memo(({ stopConversationRef }) => {
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true)
  const [currentMessage, setCurrentMessage] = useState<Message>()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showScrollDownButton, setShowScrollDownButton] = useState<boolean>(false)
  const divider = useMemo(() => <StackDivider borderStyle='dashed' />, [])
  const {
    state: {
      selectedConversation,
      conversations,
      messageIsStreaming,
      loading,
      models,
      showChatbar,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext)

  const handleToggleChatbar = () => {
    homeDispatch({ field: 'showChatbar', value: !showChatbar })
    localStorage.setItem('showChatbar', JSON.stringify(!showChatbar))
  }

  const handleSend = useCallback(
    async (message: Message, deleteCount = 0) => {
      if (selectedConversation) {
        let updatedConversation: Conversation
        if (deleteCount) {
          const updatedMessages = [...selectedConversation.messages]
          for (let i = 0; i < deleteCount; i++) {
            updatedMessages.pop()
          }
          updatedConversation = {
            ...selectedConversation,
            messages: [...updatedMessages, message],
          }
        } else {
          updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
          }
        }
        homeDispatch({
          field: 'selectedConversation',
          value: updatedConversation,
        })
        homeDispatch({ field: 'loading', value: true })
        homeDispatch({ field: 'messageIsStreaming', value: true })
        const chatBody: ChatBody = {
          model: updatedConversation.model.name,
          system: updatedConversation.prompt,
          prompt: updatedConversation.messages.map(message => message.content).join(' '),
          options: { temperature: updatedConversation.temperature },
        }
        const body = JSON.stringify({
          ...chatBody,
        })
        const controller = new AbortController()
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body,
        })
        if (!response.ok) {
          homeDispatch({ field: 'loading', value: false })
          homeDispatch({ field: 'messageIsStreaming', value: false })
          return
        }
        const data = response.body
        if (!data) {
          homeDispatch({ field: 'loading', value: false })
          homeDispatch({ field: 'messageIsStreaming', value: false })
          return
        }
        if (!false) {
          if (updatedConversation.messages.length === 1) {
            const { content } = message
            const customName = content.length > 30 ? content.substring(0, 30) + '...' : content
            updatedConversation = {
              ...updatedConversation,
              name: customName,
            }
          }
          homeDispatch({ field: 'loading', value: false })
          const reader = data.getReader()
          const decoder = new TextDecoder()
          let done = false
          let isFirst = true
          let text = ''
          while (!done) {
            if (stopConversationRef.current === true) {
              controller.abort()
              done = true
              break
            }
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            text += chunkValue
            if (isFirst) {
              isFirst = false
              const updatedMessages: Message[] = [
                ...updatedConversation.messages,
                { role: 'assistant', content: chunkValue, model: updatedConversation.model.name },
              ]
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              }
              homeDispatch({
                field: 'selectedConversation',
                value: updatedConversation,
              })
            } else {
              const updatedMessages: Message[] = updatedConversation.messages.map(
                (message, index) => {
                  if (index === updatedConversation.messages.length - 1) {
                    return {
                      ...message,
                      content: text,
                    }
                  }
                  return message
                },
              )
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              }
              homeDispatch({
                field: 'selectedConversation',
                value: updatedConversation,
              })
            }
          }
          saveConversation(updatedConversation)
          const updatedConversations: Conversation[] = conversations.map(conversation => {
            if (conversation.id === selectedConversation.id) {
              return updatedConversation
            }
            return conversation
          })
          if (updatedConversations.length === 0) {
            updatedConversations.push(updatedConversation)
          }
          homeDispatch({ field: 'conversations', value: updatedConversations })
          saveConversations(updatedConversations)
          homeDispatch({ field: 'messageIsStreaming', value: false })
        } else {
          const { answer } = (await response.json()) as { answer: string }
          const updatedMessages: Message[] = [
            ...updatedConversation.messages,
            { role: 'assistant', content: answer, model: updatedConversation.model.name },
          ]
          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          }
          homeDispatch({
            field: 'selectedConversation',
            value: updateConversation,
          })
          saveConversation(updatedConversation)
          const updatedConversations: Conversation[] = conversations.map(conversation => {
            if (conversation.id === selectedConversation.id) {
              return updatedConversation
            }
            return conversation
          })
          if (updatedConversations.length === 0) {
            updatedConversations.push(updatedConversation)
          }
          homeDispatch({ field: 'conversations', value: updatedConversations })
          saveConversations(updatedConversations)
          homeDispatch({ field: 'loading', value: false })
          homeDispatch({ field: 'messageIsStreaming', value: false })
        }
      }
    },
    [selectedConversation, homeDispatch, conversations, stopConversationRef],
  )

  const handleChatSubmit = useCallback(
    async (message: Message) => {
      setCurrentMessage(message)
      await handleSend(message, 0)
    },
    [handleSend],
  )
  const handleRegenerate = useCallback(async () => {
    if (!currentMessage) return
    await handleSend(currentMessage, 2)
  }, [currentMessage, handleSend])

  const handleShorten = useCallback(async () => {
    if (!currentMessage) return
    await handleSend({ role: 'user', content: 'Could you shorten the previous message?' }, 0)
  }, [currentMessage, handleSend])

  const handleElaborate = useCallback(async () => {
    if (!currentMessage) return
    await handleSend({ role: 'user', content: 'Could you elaborate the previous message?' }, 2)
  }, [currentMessage, handleSend])

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const bottomTolerance = 30

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false)
        setShowScrollDownButton(true)
      } else {
        setAutoScrollEnabled(true)
        setShowScrollDownButton(false)
      }
    }
  }
  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true)
    }
  }

  const throttledScrollDown = throttle(scrollDown, 250)

  useEffect(() => {
    throttledScrollDown()
    selectedConversation &&
      setCurrentMessage(selectedConversation.messages[selectedConversation.messages.length - 2])
  }, [selectedConversation, throttledScrollDown])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoScrollEnabled(entry.isIntersecting)
        if (entry.isIntersecting) {
          textareaRef.current?.focus()
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    )
    const messagesEndElement = messagesEndRef.current
    if (messagesEndElement) {
      observer.observe(messagesEndElement)
    }
    return () => {
      if (messagesEndElement) {
        observer.unobserve(messagesEndElement)
      }
    }
  }, [messagesEndRef])

  const renderMessages = useMemo(() => {
    return selectedConversation?.messages.map((message, index) => (
      <MemoizedChatMessage
        message={message}
        key={index}
        messageIndex={index}
        onElaborate={handleElaborate}
        onShorten={handleShorten}
        onRegenerate={handleRegenerate}
      />
    ))
  }, [handleElaborate, handleRegenerate, handleShorten, selectedConversation?.messages])

  return (
    <Flex width='full' flex={1} position='relative' overflow='hidden'>
      <Chatbar />
      <Flex width='full' flexDir='column' flex={1} position='relative'>
        <IconButton
          position='absolute'
          top='50%'
          transform='translateY(-50%)'
          icon={<FaCaretRight />}
          aria-label='Show Sidebar'
          variant='ghost'
          onClick={handleToggleChatbar}
          display={{ base: 'none', md: 'flex' }}
        />
        <ChatHeader />
        <Box overflowY='auto' flex='1 0 0'>
          <Flex flexDir='column' overflowY='auto' width='full' maxWidth='42rem' mx='auto' gap={4}>
            {selectedConversation?.messages.length === 0 ? (
              <>
                <div className='mx-auto flex flex-col space-y-5 md:space-y-10 px-3 pt-5 md:pt-12 sm:max-w-[600px]'>
                  <div className='text-center text-3xl font-semibold text-gray-800 dark:text-gray-100'>
                    {models.length === 0 ? (
                      <div>
                        <Spinner size='16px' className='mx-auto' />
                      </div>
                    ) : (
                      <Center>
                        <Text>Morpheus</Text>
                      </Center>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Stack divider={divider}>{renderMessages}</Stack>

                {loading && <ChatLoader />}
              </>
            )}
          </Flex>
          <Box height='10vh' ref={messagesEndRef} />
        </Box>
        <ChatInput
          width='full'
          maxWidth='container.md'
          mx='auto'
          onSend={handleChatSubmit}
          textareaRef={textareaRef}
          isLoading={messageIsStreaming}
          showScrollDownButton={showScrollDownButton}
          onScrollDownClick={handleScroll}
          stopConversationRef={stopConversationRef}
          onRegenerate={handleRegenerate}
        />
      </Flex>
    </Flex>
  )
})

Chat.displayName = 'Chat'

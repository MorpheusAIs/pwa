import { Center, Flex, Text } from '@chakra-ui/react'
import { memo, useContext, useMemo } from 'react'
import { FaRobot } from 'react-icons/fa'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { ChatMessageActions } from './chat-message-actions'
import { CodeBlock } from './markdown/codeblock'
import { MemoizedReactMarkdown } from './markdown/memorized-react-markdown'

import HomeContext from '@/app/api/home/home.context'
import { type Message } from '@/types/chat'

export type ChatMessageProps = {
  message: Message
  messageIndex: number
  onShorten: () => void
  onElaborate: () => void
  onRegenerate: () => void
  isCurrent?: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = memo(
  ({ message, messageIndex, onShorten, onElaborate, onRegenerate }) => {
    // const [messageContent, setMessageContent] = useState(message.content)
    const {
      state: { selectedConversation, messageIsStreaming },
    } = useContext(HomeContext)

    const isLatest = useMemo(
      () => selectedConversation?.messages.length === messageIndex + 1,
      [messageIndex, selectedConversation?.messages.length],
    )
    // useEffect(() => {
    //   setMessageContent(message.content)
    // }, [message, message.content, messageIndex])

    const renderModelIcon = useMemo(() => {
      return (
        <Center
          boxSize={8}
          borderRadius='sm'
          fontSize='md'
          bg='background.surface.raised.base'
          color='text.inverse'
        >
          <FaRobot />
        </Center>
      )
    }, [])

    return (
      <Flex
        gap={4}
        py={4}
        px={4}
        overflowWrap='anywhere'
        flexDir={{ base: 'column', md: 'row' }}
        _hover={{ '.chat-actions': { opacity: 1 } }}
      >
        <Flex
          width={{ base: 'full', md: '80px' }}
          flexShrink={0}
          fontSize='sm'
          fontWeight='bold'
          justifyContent='space-between'
          alignItems={{ base: 'center', md: 'flex-start' }}
          color={message?.role === 'user' ? 'text.warning' : 'inherit'}
        >
          {message?.role === 'user' ? '[you]' : renderModelIcon}
          {message?.role === 'assistant' && (
            <Text color='text.subtle' fontSize='sm' display={{ base: 'flex', md: 'none' }}>
              {message.model}
            </Text>
          )}
        </Flex>
        <Flex
          flexDir='column'
          flex={1}
          fontSize='sm'
          lineHeight='tall'
          style={{ wordWrap: 'break-word' }}
          maxWidth='full'
        >
          <MemoizedReactMarkdown
            className='prose dark:prose-invert flex-1'
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeMathjax]}
            components={{
              p({ children }) {
                return <Text mb={2}>{children}</Text>
              },
              code({ children, inline, className, ...rest }) {
                if (children.length) {
                  if (children[0] === '▍') {
                    return (
                      <Text as='span' mt={1} className='mt-1 cursor-default animate-pulse'>
                        ▍
                      </Text>
                    )
                  }

                  children[0] = (children[0] as string).replace('`▍`', '▍')
                }

                const match = /language-(\w+)/.exec(className || '')

                if (inline) {
                  return (
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...rest}
                  />
                )
              },
              table({ children }) {
                return (
                  <table className='border-collapse border border-black px-3 py-1 dark:border-white'>
                    {children}
                  </table>
                )
              },
              th({ children }) {
                return (
                  <th className='break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white'>
                    {children}
                  </th>
                )
              },
              td({ children }) {
                return (
                  <td className='break-words border border-black px-3 py-1 dark:border-white'>
                    {children}
                  </td>
                )
              },
            }}
          >
            {`${message.content}${
              messageIsStreaming &&
              message?.role === 'assistant' &&
              messageIndex === (selectedConversation?.messages.length ?? 0) - 1
                ? '`▍`'
                : ''
            }`}
          </MemoizedReactMarkdown>
          {message?.role === 'assistant' && !messageIsStreaming && (
            <ChatMessageActions
              onEaborate={onElaborate}
              onShorten={onShorten}
              onRegenerate={onRegenerate}
              isLatestMessage={isLatest}
              model={message.model}
              message={message.content}
            />
          )}
        </Flex>
      </Flex>
    )
  },
)

ChatMessage.displayName = 'ChatMessage'

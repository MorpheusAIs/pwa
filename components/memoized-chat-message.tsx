import { type FC, memo } from 'react'

import { ChatMessage, type ChatMessageProps } from './chat-message'

export const MemoizedChatMessage: FC<ChatMessageProps> = memo(
  ChatMessage,
  (prevProps, nextProps) => prevProps.message.content === nextProps.message.content,
)

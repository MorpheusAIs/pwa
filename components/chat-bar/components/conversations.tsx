import { Flex } from '@chakra-ui/react'

import { ConversationComponent } from './conversation'

import { type Conversation } from '@/types/chat'

interface Props {
  conversations: Conversation[]
}

export const Conversations = ({ conversations }: Props) => {
  return (
    <Flex width='full' flexDir='column' gap={1}>
      {conversations
        .filter(conversation => !conversation.folderId)
        .slice()
        .reverse()
        .map((conversation, index) => (
          <ConversationComponent key={index} conversation={conversation} />
        ))}
    </Flex>
  )
}

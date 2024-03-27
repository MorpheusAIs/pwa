import { createContext, type Dispatch } from 'react'

import { type ChatbarInitialState } from './chat-bar.state'

import { type ActionType } from '@/hooks/useCreateReducer'
import { type Conversation } from '@/types/chat'
import { type SupportedExportFormats } from '@/types/export'

export interface ChatbarContextProps {
  state: ChatbarInitialState
  dispatch: Dispatch<ActionType<ChatbarInitialState>>
  handleDeleteConversation: (conversation: Conversation) => void
  handleClearConversations: () => void
  handleExportData: () => void
  handleImportConversations: (data: SupportedExportFormats) => void
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ChatbarContext = createContext<ChatbarContextProps>(undefined!)

export default ChatbarContext

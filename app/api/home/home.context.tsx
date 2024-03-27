import { createContext, type Dispatch } from 'react'

import { type HomeInitialState } from './home.state'

import { type ActionType } from '@/hooks/useCreateReducer'
import { type Conversation } from '@/types/chat'
import { type KeyValuePair } from '@/types/data'
import { type FolderType } from '@/types/folder'

export interface HomeContextProps {
  state: HomeInitialState
  dispatch: Dispatch<ActionType<HomeInitialState>>
  handleNewConversation: () => void
  handleCreateFolder: (name: string, type: FolderType) => void
  handleDeleteFolder: (folderId: string) => void
  handleUpdateFolder: (folderId: string, name: string) => void
  handleSelectConversation: (conversation: Conversation) => void
  handleUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const HomeContext = createContext<HomeContextProps>(undefined!)

export default HomeContext

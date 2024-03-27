import { useCallback, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { SettingsModal } from '../settings/settings-modal'
import { Sidebar } from '../sidebar/sidebar'
import ChatbarContext from './chat-bar.context'
import { type ChatbarInitialState, initialState } from './chat-bar.state'
import { ChatbarSettings } from './components/chat-bar-settings'
import { ChatFolders } from './components/chat-folders'
import { Conversations } from './components/conversations'

import HomeContext from '@/app/api/home/home.context'
import { useCreateReducer } from '@/hooks/useCreateReducer'
import { type Conversation } from '@/types/chat'
import { type LatestExportFormat, type SupportedExportFormats } from '@/types/export'
import { OllamaModels } from '@/types/ollama'
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const'
import { saveConversation, saveConversations } from '@/utils/app/conversation'
import { saveFolders } from '@/utils/app/folders'
import { exportData, importData } from '@/utils/app/import-export'

export const Chatbar = () => {
  const chatBarContextValue = useCreateReducer<ChatbarInitialState>({
    initialState,
  })

  const {
    state: { conversations, showChatbar, defaultModelId, folders, showSettingsModal },
    dispatch: homeDispatch,
    handleCreateFolder,
    handleNewConversation,
    handleUpdateConversation,
  } = useContext(HomeContext)

  const {
    state: { searchTerm, filteredConversations },
    dispatch: chatDispatch,
  } = chatBarContextValue

  const handleExportData = () => {
    exportData()
  }

  const handleImportConversations = (data: SupportedExportFormats) => {
    const { history, folders, prompts }: LatestExportFormat = importData(data)
    homeDispatch({ field: 'conversations', value: history })
    homeDispatch({
      field: 'selectedConversation',
      value: history[history.length - 1],
    })
    homeDispatch({ field: 'folders', value: folders })
    homeDispatch({ field: 'prompts', value: prompts })

    window.location.reload()
  }

  const handleClearConversations = () => {
    defaultModelId &&
      homeDispatch({
        field: 'selectedConversation',
        value: {
          id: uuidv4(),
          name: 'New Conversation',
          messages: [],
          model: OllamaModels[defaultModelId],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: DEFAULT_TEMPERATURE,
          folderId: null,
        },
      })

    homeDispatch({ field: 'conversations', value: [] })

    localStorage.removeItem('conversationHistory')
    localStorage.removeItem('selectedConversation')

    const updatedFolders = folders.filter(f => f.type !== 'chat')

    homeDispatch({ field: 'folders', value: updatedFolders })
    saveFolders(updatedFolders)
  }

  const handleDeleteConversation = (conversation: Conversation) => {
    const updatedConversations = conversations.filter(c => c.id !== conversation.id)

    homeDispatch({ field: 'conversations', value: updatedConversations })
    chatDispatch({ field: 'searchTerm', value: '' })
    saveConversations(updatedConversations)

    if (updatedConversations.length > 0) {
      homeDispatch({
        field: 'selectedConversation',
        value: updatedConversations[updatedConversations.length - 1],
      })

      saveConversation(updatedConversations[updatedConversations.length - 1])
    } else {
      defaultModelId &&
        homeDispatch({
          field: 'selectedConversation',
          value: {
            id: uuidv4(),
            name: 'New Conversation',
            messages: [],
            model: OllamaModels[defaultModelId],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: DEFAULT_TEMPERATURE,
            folderId: null,
          },
        })

      localStorage.removeItem('selectedConversation')
    }
  }

  const handleToggleChatbar = () => {
    homeDispatch({ field: 'showChatbar', value: !showChatbar })
    localStorage.setItem('showChatbar', JSON.stringify(!showChatbar))
  }

  const handleToggleSettingsModal = useCallback(() => {
    homeDispatch({ field: 'showSettingsModal', value: !showSettingsModal })
  }, [homeDispatch, showSettingsModal])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData('conversation')) as Conversation
      handleUpdateConversation(conversation, { key: 'folderId', value: 0 })
      chatDispatch({ field: 'searchTerm', value: '' })
      const target = e.target as HTMLDivElement
      target.style.background = 'none'
    }
  }

  useEffect(() => {
    if (searchTerm) {
      chatDispatch({
        field: 'filteredConversations',
        value: conversations.filter(conversation => {
          const searchable =
            conversation.name.toLocaleLowerCase() +
            ' ' +
            conversation.messages.map(message => message.content).join(' ')
          return searchable.toLowerCase().includes(searchTerm.toLowerCase())
        }),
      })
    } else {
      chatDispatch({
        field: 'filteredConversations',
        value: conversations,
      })
    }
  }, [searchTerm, conversations, chatDispatch])

  return (
    <ChatbarContext.Provider
      value={{
        ...chatBarContextValue,
        handleDeleteConversation,
        handleClearConversations,
        handleImportConversations,
        handleExportData,
      }}
    >
      <Sidebar<Conversation>
        side={'left'}
        isOpen={showChatbar}
        addItemButtonTitle={'New chat'}
        itemComponent={<Conversations conversations={filteredConversations} />}
        folders={folders}
        folderComponent={<ChatFolders searchTerm={searchTerm} />}
        items={filteredConversations}
        searchTerm={searchTerm}
        handleSearchTerm={(searchTerm: string) =>
          chatDispatch({ field: 'searchTerm', value: searchTerm })
        }
        toggleOpen={handleToggleChatbar}
        handleCreateItem={handleNewConversation}
        handleCreateFolder={() => handleCreateFolder('New folder', 'chat')}
        handleDrop={handleDrop}
        footerComponent={<ChatbarSettings />}
      />
      <SettingsModal isOpen={showSettingsModal} onClose={handleToggleSettingsModal} />
    </ChatbarContext.Provider>
  )
}

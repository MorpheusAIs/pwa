import { type Conversation, type Message } from '@/types/chat'
import { type ErrorMessage } from '@/types/error'
import { type FolderInterface } from '@/types/folder'
import { type OllamaModel, type OllamaModelID } from '@/types/ollama'
import { type Prompt } from '@/types/prompt'

export interface HomeInitialState {
  loading: boolean
  lightMode: 'light' | 'dark'
  messageIsStreaming: boolean
  modelError: ErrorMessage | null
  models: OllamaModel[]
  folders: FolderInterface[]
  conversations: Conversation[]
  selectedConversation: Conversation | undefined
  currentMessage: Message | undefined
  prompts: Prompt[]
  temperature: number
  showChatbar: boolean
  showPromptbar: boolean
  currentFolder: FolderInterface | undefined
  messageError: boolean
  searchTerm: string
  defaultModelId: OllamaModelID | undefined
  showSettingsModal: boolean
}

export const initialState: HomeInitialState = {
  loading: false,
  lightMode: 'dark',
  messageIsStreaming: false,
  modelError: null,
  models: [],
  folders: [],
  conversations: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  temperature: 1,
  showPromptbar: true,
  showChatbar: true,
  currentFolder: undefined,
  messageError: false,
  searchTerm: '',
  defaultModelId: undefined,
  showSettingsModal: false,
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { Button, Container, Input } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'

import HomeContext from '@/app/api/home/home.context'
import { type HomeInitialState, initialState } from '@/app/api/home/home.state'
import { Chat } from '@/components/chat'
import { useCreateReducer } from '@/hooks/useCreateReducer'
import { nanoId } from '@/lib/utils'
import useApiService from '@/service/use-api-service'
import { type Conversation } from '@/types/chat'
import { type KeyValuePair } from '@/types/data'
import { type FolderInterface, type FolderType } from '@/types/folder'
import { fallbackModelID, OllamaModelID, OllamaModels } from '@/types/ollama'
import { type Prompt } from '@/types/prompt'
import { cleanConversationHistory, cleanSelectedConversation } from '@/utils/app/clean'
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const'
import { saveConversation, saveConversations, updateConversation } from '@/utils/app/conversation'
import { saveFolders } from '@/utils/app/folders'
import { savePrompts } from '@/utils/app/prompts'
import { getSettings } from '@/utils/app/settings'

export default function IndexPage() {
  const { getModels } = useApiService()
  const [fakeAuth, setFakeAuth] = useState(false)
  const [password, setPassword] = useState('')
  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  })

  const {
    state: { folders, conversations, prompts },
    dispatch,
  } = contextValue

  const defaultModelId = process.env.NEXT_PUBLIC_DEFAULT_MODEL ?? fallbackModelID

  const stopConversationRef = useRef<boolean>(false)

  const { data } = useQuery(['GetModels'], () => getModels(), {
    enabled: true,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (data) dispatch({ field: 'models', value: data })
  }, [data, dispatch])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (password === 'morg2023') {
        setFakeAuth(true)
      }
    },
    [password],
  )

  const handleSelectConversation = (conversation: Conversation) => {
    dispatch({
      field: 'selectedConversation',
      value: conversation,
    })

    saveConversation(conversation)
  }

  const handleCreateFolder = (name: string, type: FolderType) => {
    const newFolder: FolderInterface = {
      id: nanoId(),
      name,
      type,
    }

    const updatedFolders = [...folders, newFolder]

    dispatch({ field: 'folders', value: updatedFolders })
    saveFolders(updatedFolders)
  }

  const handleDeleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter(f => f.id !== folderId)
    dispatch({ field: 'folders', value: updatedFolders })
    saveFolders(updatedFolders)

    const updatedConversations: Conversation[] = conversations.map(c => {
      if (c.folderId === folderId) {
        return {
          ...c,
          folderId: null,
        }
      }

      return c
    })

    dispatch({ field: 'conversations', value: updatedConversations })
    saveConversations(updatedConversations)

    const updatedPrompts: Prompt[] = prompts.map(p => {
      if (p.folderId === folderId) {
        return {
          ...p,
          folderId: null,
        }
      }

      return p
    })

    dispatch({ field: 'prompts', value: updatedPrompts })
    savePrompts(updatedPrompts)
  }

  const handleUpdateFolder = (folderId: string, name: string) => {
    const updatedFolders = folders.map(f => {
      if (f.id === folderId) {
        return {
          ...f,
          name,
        }
      }

      return f
    })

    dispatch({ field: 'folders', value: updatedFolders })

    saveFolders(updatedFolders)
  }

  const handleNewConversation = () => {
    const lastConversation = conversations[conversations.length - 1]

    const newConversation: Conversation = {
      id: nanoid(),
      name: 'New Conversation',
      messages: [],
      model: lastConversation?.model,
      prompt: DEFAULT_SYSTEM_PROMPT,
      temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
      folderId: null,
    }

    const updatedConversations = [...conversations, newConversation]

    dispatch({ field: 'selectedConversation', value: newConversation })
    dispatch({ field: 'conversations', value: updatedConversations })

    saveConversation(newConversation)
    saveConversations(updatedConversations)

    dispatch({ field: 'loading', value: false })
  }

  const handleUpdateConversation = (conversation: Conversation, data: KeyValuePair) => {
    const updatedConversation = {
      ...conversation,
      [data.key]: data.value,
    }

    const { single, all } = updateConversation(updatedConversation, conversations)

    dispatch({ field: 'selectedConversation', value: single })
    dispatch({ field: 'conversations', value: all })
  }

  useEffect(() => {
    defaultModelId && dispatch({ field: 'defaultModelId', value: defaultModelId })
  }, [defaultModelId, dispatch])

  useEffect(() => {
    const settings = getSettings()
    if (settings.theme) {
      dispatch({
        field: 'lightMode',
        value: settings.theme,
      })
    }

    if (window.innerWidth < 640) {
      dispatch({ field: 'showChatbar', value: false })
      dispatch({ field: 'showPromptbar', value: false })
    }

    const showChatbar = localStorage.getItem('showChatbar')
    if (showChatbar) {
      dispatch({ field: 'showChatbar', value: showChatbar === 'true' })
    }

    const showPromptbar = localStorage.getItem('showPromptbar')
    if (showPromptbar) {
      dispatch({ field: 'showPromptbar', value: showPromptbar === 'true' })
    }

    const folders = localStorage.getItem('folders')
    if (folders) {
      dispatch({ field: 'folders', value: JSON.parse(folders) })
    }

    const prompts = localStorage.getItem('prompts')
    if (prompts) {
      dispatch({ field: 'prompts', value: JSON.parse(prompts) })
    }

    const conversationHistory = localStorage.getItem('conversationHistory')
    if (conversationHistory) {
      const parsedConversationHistory: Conversation[] = JSON.parse(conversationHistory)
      const cleanedConversationHistory = cleanConversationHistory(parsedConversationHistory)

      dispatch({ field: 'conversations', value: cleanedConversationHistory })
    }

    const selectedConversation = localStorage.getItem('selectedConversation')
    if (selectedConversation) {
      const parsedSelectedConversation: Conversation = JSON.parse(selectedConversation)
      const cleanedSelectedConversation = cleanSelectedConversation(parsedSelectedConversation)

      dispatch({
        field: 'selectedConversation',
        value: cleanedSelectedConversation,
      })
    } else {
      const lastConversation = conversations[conversations.length - 1]
      dispatch({
        field: 'selectedConversation',
        value: {
          id: nanoId(),
          name: 'New Conversation',
          messages: [],
          model: OllamaModels[OllamaModelID.DEFAULTMODEL],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
          folderId: null,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  if (!fakeAuth && process.env.NODE_ENV === 'production') {
    return (
      <Container py={8} display='flex' flexDir='column' gap={4} as='form' onSubmit={handleSubmit}>
        <Input
          placeholder='Enter Password'
          type='password'
          onChange={e => setPassword(e.target.value)}
          autoComplete='off'
        />
        <Button type='submit'>Submit</Button>
      </Container>
    )
  }

  return (
    <HomeContext.Provider
      value={{
        ...contextValue,
        handleNewConversation,
        handleCreateFolder,
        handleDeleteFolder,
        handleUpdateFolder,
        handleSelectConversation,
        handleUpdateConversation,
      }}
    >
      <Chat stopConversationRef={stopConversationRef} />
    </HomeContext.Provider>
  )
}

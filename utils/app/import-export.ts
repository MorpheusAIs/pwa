/* eslint-disable @typescript-eslint/no-explicit-any */
import { cleanConversationHistory } from './clean'

import { type Conversation } from '@/types/chat'
import {
  type ChatFolder,
  type ExportFormatV1,
  type ExportFormatV2,
  type ExportFormatV3,
  type ExportFormatV4,
  type LatestExportFormat,
  type SupportedExportFormats,
} from '@/types/export'
import { type FolderInterface } from '@/types/folder'
import { type Prompt } from '@/types/prompt'

export function isExportFormatV1(obj: any): obj is ExportFormatV1 {
  return Array.isArray(obj)
}

export function isExportFormatV2(obj: ExportFormatV2) {
  return !('version' in obj) && 'folders' in obj && 'history' in obj
}

export function isExportFormatV3(obj: ExportFormatV3) {
  return obj.version === 3
}

export function isExportFormatV4(obj: ExportFormatV4) {
  return obj.version === 4
}

export const isLatestExportFormat: (obj: any) => obj is ExportFormatV4 = isExportFormatV4 as (
  obj: any,
) => obj is ExportFormatV4

export function cleanData(data: SupportedExportFormats): LatestExportFormat {
  if (isExportFormatV1(data)) {
    return {
      version: 4,
      history: cleanConversationHistory(data),
      folders: [],
      prompts: [],
    }
  }

  if (isExportFormatV2(data as ExportFormatV2)) {
    const formattedFolders: FolderInterface[] =
      (data as ExportFormatV2).folders?.reduce(
        (acc: FolderInterface[], chatFolder: ChatFolder | null) => {
          if (chatFolder) {
            acc.push({
              id: chatFolder.id.toString(),
              name: chatFolder.name,
              type: 'chat',
            })
          }
          return acc
        },
        [] as FolderInterface[],
      ) || []

    return {
      version: 4,
      history: cleanConversationHistory((data as ExportFormatV2).history || []),
      folders: formattedFolders,
      prompts: [],
    }
  }

  if (isExportFormatV3(data as ExportFormatV3)) {
    return { ...data, version: 4, prompts: [] } as ExportFormatV4
  }

  if (isExportFormatV4(data as ExportFormatV4)) {
    return data as ExportFormatV4
  }

  throw new Error('Unsupported data format')
}

function currentDate(): string {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}-${day}`
}

export const exportData = (): void => {
  const history: Conversation[] | null = JSON.parse(
    localStorage.getItem('conversationHistory') || '[]',
  ) as Conversation[]

  const folders: FolderInterface[] | null = JSON.parse(
    localStorage.getItem('folders') || '[]',
  ) as FolderInterface[]

  const prompts: Prompt[] | null = JSON.parse(localStorage.getItem('prompts') || '[]') as Prompt[]

  const data: LatestExportFormat = {
    version: 4,
    history: history || [],
    folders: folders || [],
    prompts: prompts || [],
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = `chatbot_ui_history_${currentDate()}.json`
  link.href = url
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const importData = (data: SupportedExportFormats): LatestExportFormat => {
  const { history, folders, prompts } = cleanData(data)

  const oldConversations: Conversation[] = JSON.parse(
    localStorage.getItem('conversationHistory') || '[]',
  ) as Conversation[]
  const newHistory: Conversation[] = [...oldConversations, ...history].filter(
    (conversation, index, self) => index === self.findIndex(c => c.id === conversation.id),
  )
  localStorage.setItem('conversationHistory', JSON.stringify(newHistory))
  if (newHistory.length > 0) {
    localStorage.setItem('selectedConversation', JSON.stringify(newHistory[newHistory.length - 1]))
  } else {
    localStorage.removeItem('selectedConversation')
  }

  const oldFolders: FolderInterface[] = JSON.parse(
    localStorage.getItem('folders') || '[]',
  ) as FolderInterface[]
  const newFolders: FolderInterface[] = [...oldFolders, ...folders].filter(
    (folder, index, self) => index === self.findIndex(f => f.id === folder.id),
  )
  localStorage.setItem('folders', JSON.stringify(newFolders))

  const oldPrompts: Prompt[] = JSON.parse(localStorage.getItem('prompts') || '[]') as Prompt[]
  const newPrompts: Prompt[] = [...oldPrompts, ...prompts].filter(
    (prompt, index, self) => index === self.findIndex(p => p.id === prompt.id),
  )
  localStorage.setItem('prompts', JSON.stringify(newPrompts))

  return {
    version: 4,
    history: newHistory,
    folders: newFolders,
    prompts: newPrompts,
  }
}

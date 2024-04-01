import { Stack, StackDivider } from '@chakra-ui/react'
import { useContext } from 'react'

import { ConversationComponent } from './conversation'
import Folder from './folder'

import HomeContext from '@/app/api/home/home.context'
import { type Conversation } from '@/types/chat'
import { type FolderInterface } from '@/types/folder'

interface Props {
  searchTerm: string
}

export const ChatFolders = ({ searchTerm }: Props) => {
  const {
    state: { folders, conversations },
    handleUpdateConversation,
  } = useContext(HomeContext)

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>, folder: FolderInterface) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData('conversation')) as Conversation
      handleUpdateConversation(conversation, {
        key: 'folderId',
        value: folder.id,
      })
    }
  }

  const ChatFolders = (currentFolder: FolderInterface) => {
    return (
      conversations &&
      conversations
        .filter(conversation => conversation.folderId)
        .map((conversation, index) => {
          if (conversation.folderId === currentFolder.id) {
            return (
              <div key={index} className='ml-5 gap-2 border-l pl-2'>
                <ConversationComponent conversation={conversation} />
              </div>
            )
          }
        })
    )
  }

  return (
    <Stack divider={<StackDivider />} width='full' flexDir='column'>
      {folders
        .filter(folder => folder.type === 'chat')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder, index) => (
          <Folder
            key={index}
            searchTerm={searchTerm}
            currentFolder={folder}
            handleDrop={handleDrop}
            folderComponent={ChatFolders(folder)}
          />
        ))}
    </Stack>
  )
}

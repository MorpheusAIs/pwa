import { Box, Button, Flex, IconButton, Input } from '@chakra-ui/react'
import {
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { TbCaretDown, TbCaretRight, TbCheck, TbPencil, TbTrash, TbX } from 'react-icons/tb'

import HomeContext from '@/app/api/home/home.context'
import { type FolderInterface } from '@/types/folder'

interface Props {
  currentFolder: FolderInterface
  searchTerm: string
  handleDrop: (e: React.DragEvent<HTMLButtonElement>, folder: FolderInterface) => void
  folderComponent: (ReactElement | undefined)[]
}

const Folder = ({ currentFolder, searchTerm, handleDrop, folderComponent }: Props) => {
  const { handleDeleteFolder, handleUpdateFolder } = useContext(HomeContext)

  const [isDeleting, setIsDeleting] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleRename()
    }
  }

  const handleRename = () => {
    handleUpdateFolder(currentFolder.id, renameValue)
    setRenameValue('')
    setIsRenaming(false)
  }

  const dropHandler = (e: React.DragEvent<HTMLButtonElement>) => {
    if (e.dataTransfer) {
      setIsOpen(true)

      handleDrop(e, currentFolder)
      const target = e.target as HTMLButtonElement
      target.style.background = 'none'
    }
  }

  const allowDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const highlightDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    target.style.background = '#343541'
  }

  const removeHighlight = (e: React.DragEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    target.style.background = 'none'
  }

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false)
    } else if (isDeleting) {
      setIsRenaming(false)
    }
  }, [isRenaming, isDeleting])

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [searchTerm])

  return (
    <>
      <Flex
        position='relative'
        alignItems='center'
        className='relative flex items-center'
        width='full'
      >
        {isRenaming ? (
          <Flex width='full' alignItems='center' gap={2} px={2} fontSize='lg'>
            {isOpen ? <TbCaretDown /> : <TbCaretRight />}
            <Input
              type='text'
              fontWeight='bold'
              mr={14}
              overflow='hidden'
              textOverflow='ellipsis'
              bg='transparent'
              borderWidth={0}
              boxShadow='none'
              _focus={{ boxShadow: 'none' }}
              fontSize='xs'
              px={0}
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onKeyDown={handleEnterDown}
              autoFocus
            />
          </Flex>
        ) : (
          <Button
            flex={1}
            variant='ghost'
            px={2}
            py={5}
            onClick={() => setIsOpen(!isOpen)}
            onDrop={e => dropHandler(e)}
            onDragOver={allowDrop}
            onDragEnter={highlightDrop}
            onDragLeave={removeHighlight}
            justifyContent='flex-start'
            leftIcon={isOpen ? <TbCaretDown /> : <TbCaretRight />}
          >
            <Box
              position='relative'
              maxHeight={5}
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
              wordBreak='break-all'
              fontSize='xs'
            >
              {currentFolder.name}
            </Box>
          </Button>
        )}

        {(isDeleting || isRenaming) && (
          <Flex position='absolute' right={1} zIndex='10'>
            <IconButton
              aria-label='done'
              size='sm'
              fontSize='lg'
              variant='ghost'
              icon={<TbCheck />}
              onClick={(e: FormEvent) => {
                e.stopPropagation()

                if (isDeleting) {
                  handleDeleteFolder(currentFolder.id)
                } else if (isRenaming) {
                  handleRename()
                }

                setIsDeleting(false)
                setIsRenaming(false)
              }}
            />
            <IconButton
              aria-label='done'
              size='sm'
              fontSize='lg'
              variant='ghost'
              icon={<TbX />}
              onClick={(e: FormEvent) => {
                e.stopPropagation()
                setIsDeleting(false)
                setIsRenaming(false)
              }}
            />
          </Flex>
        )}

        {!isDeleting && !isRenaming && (
          <Flex position='absolute' right={1} zIndex='10'>
            <IconButton
              aria-label='done'
              variant='ghost'
              size='sm'
              fontSize='lg'
              icon={<TbPencil />}
              onClick={(e: FormEvent) => {
                e.stopPropagation()
                setIsRenaming(true)
                setRenameValue(currentFolder.name)
              }}
            />
            <IconButton
              aria-label='done'
              variant='ghost'
              size='sm'
              fontSize='lg'
              icon={<TbTrash />}
              onClick={(e: FormEvent) => {
                e.stopPropagation()
                setIsDeleting(true)
              }}
            />
          </Flex>
        )}
      </Flex>

      {isOpen ? folderComponent : null}
    </>
  )
}

export default Folder

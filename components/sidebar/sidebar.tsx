import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  StackDivider,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { type ReactNode, useMemo } from 'react'
import { FaMessage } from 'react-icons/fa6'
import { TbFolderPlus, TbPlus, TbX } from 'react-icons/tb'

import { Search } from '../search'

import { breakpoints } from '@/app/theme'
import { type FolderInterface } from '@/types/folder'

interface Props<T> {
  isOpen: boolean
  addItemButtonTitle: string
  side: 'left' | 'right'
  items: T[]
  itemComponent: ReactNode
  folders: FolderInterface[]
  folderComponent: ReactNode
  footerComponent?: ReactNode
  searchTerm: string
  handleSearchTerm: (searchTerm: string) => void
  toggleOpen: () => void
  handleCreateItem: () => void
  handleCreateFolder: () => void
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

export const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  items,
  itemComponent,
  folders,
  folderComponent,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
  toggleOpen,
}: Props<T>) => {
  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`, { ssr: false })
  const allowDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }

  const highlightDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement
    target.style.background = '#343541'
  }

  const removeHighlight = (e: React.DragEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement
    target.style.background = 'none'
  }

  const sideBarContent = useMemo(() => {
    return (
      <Flex
        borderWidth={2}
        borderColor='border.base'
        borderRadius='sm'
        p={2}
        width='full'
        ml={{ base: 0, md: 2 }}
        my={{ base: 0, md: 2 }}
        flexDir='column'
        overflow='hidden'
        gap={2}
      >
        <Flex gap={2} className='flex items-center'>
          <Button
            leftIcon={<TbPlus />}
            flex={1}
            variant='solid'
            justifyContent='flex-start'
            colorScheme='gray'
            color='text.link'
            onClick={() => {
              handleCreateItem()
              handleSearchTerm('')
            }}
          >
            {addItemButtonTitle}
          </Button>

          <IconButton
            icon={<TbFolderPlus />}
            variant='solid'
            fontSize='lg'
            colorScheme='gray'
            color='text.link'
            aria-label='Add folder'
            className='ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 p-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10'
            onClick={handleCreateFolder}
          />
        </Flex>
        <Search placeholder={'Search...'} searchTerm={searchTerm} onSearch={handleSearchTerm} />

        <Stack spacing={2} mt={4} divider={<StackDivider />} overflow='auto' flexGrow={1}>
          {folders?.length > 0 && <Flex>{folderComponent}</Flex>}

          {items?.length > 0 ? (
            <div
              className='pt-2'
              onDrop={handleDrop}
              onDragOver={allowDrop}
              onDragEnter={highlightDrop}
              onDragLeave={removeHighlight}
            >
              {itemComponent}
            </div>
          ) : (
            <Flex
              mt={8}
              flexDir='column'
              alignItems='center'
              textAlign='center'
              gap={4}
              color='text.subtle'
              opacity='0.5'
            >
              <FaMessage mx='auto' mb={2} />
              <Text>No data</Text>
            </Flex>
          )}
        </Stack>
        {footerComponent}
      </Flex>
    )
  }, [
    addItemButtonTitle,
    folderComponent,
    folders?.length,
    footerComponent,
    handleCreateFolder,
    handleCreateItem,
    handleDrop,
    handleSearchTerm,
    itemComponent,
    items?.length,
    searchTerm,
  ])

  return isLargerThanMd ? (
    <Flex overflow='hidden' width={isOpen ? '300px' : '0px'}>
      {sideBarContent}
    </Flex>
  ) : (
    <Drawer isOpen={isOpen} onClose={toggleOpen} placement='left'>
      <DrawerOverlay />
      <DrawerContent bg='background.surface.base'>
        <IconButton
          position='absolute'
          right='-2.5rem'
          aria-label='close'
          onClick={toggleOpen}
          icon={<TbX />}
          top={2}
        />
        <DrawerBody p={2} display='flex'>
          {sideBarContent}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

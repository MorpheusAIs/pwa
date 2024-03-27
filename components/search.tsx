import { Flex, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { type FC } from 'react'
import { FaXmark } from 'react-icons/fa6'

interface Props {
  placeholder: string
  searchTerm: string
  onSearch: (searchTerm: string) => void
}
export const Search: FC<Props> = ({ placeholder, searchTerm, onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  const clearSearch = () => {
    onSearch('')
  }

  return (
    <Flex position='relative' alignItems='center'>
      <InputGroup>
        <Input
          type='text'
          fontSize='sm'
          size='sm'
          placeholder={placeholder ?? ''}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <InputRightElement>
            <IconButton
              size='xs'
              isRound
              variant='ghost'
              aria-label='clear chat'
              icon={<FaXmark />}
              onClick={clearSearch}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Flex>
  )
}

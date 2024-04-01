import { Button, Flex, IconButton, Text } from '@chakra-ui/react'
import { type FC, useState } from 'react'
import { TbCheck, TbTrash, TbX } from 'react-icons/tb'

interface Props {
  onClearConversations: () => void
}

export const ClearConversations: FC<Props> = ({ onClearConversations }) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const handleClearConversations = () => {
    onClearConversations()
    setIsConfirming(false)
  }

  return isConfirming ? (
    <Flex
      width='full'
      px={2}
      py={4}
      cursor='pointer'
      alignItems='center'
      fontSize='xs'
      justifyContent='space-between'
      position='relative'
      height='32px'
    >
      <Flex gap={2} alignItems='center' fontSize='sm'>
        <TbTrash />

        <Text fontSize='xs'>Are you sure?</Text>
      </Flex>

      <Flex alignItems='flex-end' position='absolute' right={0} gap={2}>
        <IconButton
          aria-label='clear'
          size='xs'
          fontSize='lg'
          variant='ghost'
          icon={<TbCheck />}
          onClick={e => {
            e.stopPropagation()
            handleClearConversations()
          }}
        />
        <IconButton
          icon={<TbX />}
          size='xs'
          fontSize='lg'
          aria-label='cancel'
          variant='ghost'
          onClick={e => {
            e.stopPropagation()
            setIsConfirming(false)
          }}
        />
      </Flex>
    </Flex>
  ) : (
    <Button
      variant='ghost'
      size='sm'
      px={2}
      justifyContent='flex-start'
      onClick={() => setIsConfirming(true)}
      leftIcon={<TbTrash />}
    >
      <Text as='span' fontSize='xs'>
        Clear conversations
      </Text>
    </Button>
  )
}

import { CheckCircleIcon } from '@chakra-ui/icons'
import { Flex, Heading, Stack, Tag, Text } from '@chakra-ui/react'
import { FaFloppyDisk } from 'react-icons/fa6'

import { RelativeDate } from '@/components/relative-date'
import { bytesToGB } from '@/lib/utils'
import { type OllamaModel } from '@/types/ollama'

const hoverProps = {
  bg: 'background.surface.hover',
}
const activeProps = {
  bg: 'background.surface.pressed',
}

type ModelProps = {
  isActive?: boolean
  onClick: (model: string) => void
  isDefault?: boolean
} & OllamaModel

export const Model: React.FC<ModelProps> = ({
  isActive,
  onClick,
  isDefault,
  name,
  modified_at,
  size,
}) => {
  return (
    <Flex
      px={4}
      py={4}
      alignItems='center'
      _hover={hoverProps}
      _active={activeProps}
      borderRadius='md'
      justifyContent='space-between'
      cursor='pointer'
      gap={4}
      onClick={() => onClick(name)}
    >
      <Stack>
        <Heading as='h4' fontSize='md' width='full' display='flex' gap={2} alignItems='center'>
          {name}
          {isDefault && <Tag>default</Tag>}
        </Heading>
        {/* <Text fontSize='sm' color='text.subtle'>
          {description}
        </Text> */}
        <Flex fontSize='xs' fontWeight='bold' gap={4} color='text.subtle' mt={4}>
          <Flex alignItems='center' gap={2} flexWrap='wrap'>
            <FaFloppyDisk />
            <Text>{bytesToGB(size)}</Text>
          </Flex>
          <Flex alignItems='center' gap={2} flexWrap='wrap'>
            <RelativeDate date={modified_at} prefix='Updated' />
          </Flex>
        </Flex>
      </Stack>
      <Flex fontSize={24} width={10} justifyContent='flex-end'>
        {isActive && <CheckCircleIcon color='text.link' />}
      </Flex>
    </Flex>
  )
}

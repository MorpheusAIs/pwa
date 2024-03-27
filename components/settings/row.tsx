import { Flex, Heading } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'

type RowProps = {
  body: string | JSX.Element
  heading: string
} & PropsWithChildren

export const Row: React.FC<RowProps> = ({ heading, body, children }) => {
  return (
    <Flex gap={4} justifyContent='space-between' alignItems='center' py={2}>
      <Flex flexDir='column' gap={2}>
        <Heading fontSize='lg'>{heading}</Heading>
        {body}
      </Flex>
      <Flex>{children}</Flex>
    </Flex>
  )
}

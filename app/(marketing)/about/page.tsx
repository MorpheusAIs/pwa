'use client'
import {
  Center,
  CircularProgress,
  Container,
  Heading,
  Link,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { MemoizedReactMarkdown } from '@/components/markdown/memorized-react-markdown'
import useApiService from '@/service/use-api-service'

export default function Home() {
  const { getAboutPage } = useApiService()
  const { data, isLoading } = useQuery(['GetAboutPage'], () => getAboutPage(), {
    enabled: true,
    refetchOnMount: false,
  })

  if (isLoading) {
    return (
      <Center height='calc(100vh - 72px)'>
        <CircularProgress isIndeterminate trackColor='whiteAlpha.50' color='text.link' />
      </Center>
    )
  }
  if (!data) return <p>Not found</p>
  return (
    <Container maxWidth='container.md' mt={24}>
      <MemoizedReactMarkdown
        className='prose dark:prose-invert flex-1'
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeMathjax]}
        components={{
          a({ children, href }) {
            return (
              <Link href={href} isExternal color='text.link'>
                {children}
              </Link>
            )
          },
          h1({ children }) {
            return (
              <Heading as='h1' mb={4}>
                {children}
              </Heading>
            )
          },
          h2({ children }) {
            return (
              <Heading as='h2' fontSize='lg' mb={4}>
                {children}
              </Heading>
            )
          },
          h3({ children }) {
            return (
              <Heading as='h3' fontSize='mg' mb={4}>
                {children}
              </Heading>
            )
          },
          p({ children }) {
            return <Text mb={4}>{children}</Text>
          },
          ul({ children }) {
            return <UnorderedList mb={4}>{children}</UnorderedList>
          },
          table({ children }) {
            return (
              <table className='border-collapse border border-black px-3 py-1 dark:border-white'>
                {children}
              </table>
            )
          },
          th({ children }) {
            return (
              <th className='break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white'>
                {children}
              </th>
            )
          },
          td({ children }) {
            return (
              <td className='break-words border border-black px-3 py-1 dark:border-white'>
                {children}
              </td>
            )
          },
        }}
      >
        {data}
      </MemoizedReactMarkdown>
    </Container>
  )
}

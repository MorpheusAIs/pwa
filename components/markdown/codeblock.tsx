import { CheckIcon, CopyIcon, DownloadIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react'
import { type FC, memo, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { style } from './morg-style'

import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { generateRandomString, programmingLanguages } from '@/utils/app/codeblock'

interface Props {
  language: string
  value: string
}

type CodeStyle = {
  [key: string]: React.CSSProperties
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const handleCopy = useCallback(() => {
    if (isCopied) return
    copyToClipboard(value)
  }, [copyToClipboard, isCopied, value])

  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || '.file'
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`
    const fileName = window.prompt('Enter file name' || '', suggestedFileName)

    if (!fileName) {
      // user pressed cancel on prompt
      return
    }

    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  return (
    <Box bg='blackAlpha.800' className='codeblock relative font-sans text-[16px]' my={2}>
      <Flex alignItems='center' justifyContent='space-between' px={2} py={1}>
        <Text fontSize='xs' textTransform='lowercase'>
          {language}
        </Text>

        <ButtonGroup size='xs' variant='ghost' alignItems='center'>
          <Button onClick={handleCopy} leftIcon={isCopied ? <CheckIcon /> : <CopyIcon />}>
            {isCopied ? 'Copied!' : 'Copy code'}
          </Button>
          <IconButton
            icon={<DownloadIcon />}
            aria-label='download as file'
            onClick={downloadAsFile}
          />
        </ButtonGroup>
      </Flex>
      <Box overflowY='auto'>
        <SyntaxHighlighter
          language={language}
          style={style as CodeStyle}
          customStyle={{ margin: 0 }}
        >
          {value}
        </SyntaxHighlighter>
      </Box>
    </Box>
  )
})
CodeBlock.displayName = 'CodeBlock'

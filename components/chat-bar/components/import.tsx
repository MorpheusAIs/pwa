import { Button, Input, Text } from '@chakra-ui/react'
import { type FC } from 'react'
import { TbFileImport } from 'react-icons/tb'

import { type SupportedExportFormats } from '@/types/export'

interface Props {
  onImport: (data: SupportedExportFormats) => void
}

export const Import: FC<Props> = ({ onImport }) => {
  return (
    <>
      <Input
        id='import-file'
        className='sr-only'
        display='none'
        tabIndex={-1}
        type='file'
        accept='.json'
        onChange={e => {
          if (!e.target.files?.length) return

          const file = e.target.files[0]
          const reader = new FileReader()
          reader.onload = e => {
            const json = JSON.parse(e.target?.result as string) as SupportedExportFormats
            onImport(json)
          }
          reader.readAsText(file)
        }}
      />

      <Button
        variant='ghost'
        justifyContent='flex-start'
        size='sm'
        px={2}
        leftIcon={<TbFileImport />}
        onClick={() => {
          const importFile = document.querySelector('#import-file') as HTMLInputElement
          if (importFile) {
            importFile.click()
          }
        }}
      >
        <Text as='span' fontSize='xs'>
          Import chat (JSON)
        </Text>
      </Button>
    </>
  )
}

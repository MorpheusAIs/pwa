import { ModalBody, ModalHeader, Stack } from '@chakra-ui/react'
import { useCallback, useContext, useMemo } from 'react'

import { type SettingRoute } from '../../types'
import { Model } from './model'

import HomeContext from '@/app/api/home/home.context'
import { fallbackModelID } from '@/types/ollama'

export const ChangeModel: React.FC<SettingRoute> = ({}) => {
  const {
    state: { models, selectedConversation },
    handleUpdateConversation,
  } = useContext(HomeContext)

  const defaultModelId = process.env.NEXT_PUBLIC_DEFAULT_MODEL ?? fallbackModelID

  const handleModelChange = useCallback(
    (name: string) => {
      const model = models.find(model => model.name === name)
      if (!model) return
      selectedConversation &&
        handleUpdateConversation(selectedConversation, {
          key: 'model',
          value: model,
        })
    },
    [handleUpdateConversation, models, selectedConversation],
  )

  const renderModels = useMemo(() => {
    return models.map(model => (
      <Model
        key={model.name}
        onClick={handleModelChange}
        isActive={selectedConversation?.model?.name === model.name}
        isDefault={model.name === defaultModelId}
        {...model}
      />
    ))
  }, [defaultModelId, handleModelChange, models, selectedConversation?.model?.name])
  return (
    <>
      <ModalHeader>Switch LLM</ModalHeader>
      <ModalBody px={2}>
        <Stack>{renderModels}</Stack>
      </ModalBody>
    </>
  )
}

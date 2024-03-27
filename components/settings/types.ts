import { type Dispatch, type SetStateAction } from 'react'

export enum SettingRoutes {
  Settings = 'settings',
  Download = 'download',
  LocalDetected = 'local_detected',
  ChangeModel = 'change_model',
}

export type SettingRoute = {
  setRoute: Dispatch<SetStateAction<SettingRoutes>>
}

export type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export type ModelType = {
  name: string
  description: string
  isDefault?: boolean
  meta: {
    pulls: number
    tags: number
    updated: string
  }
}

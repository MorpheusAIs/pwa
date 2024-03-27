import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'

import { SettingRoutes, type SettingsModalProps } from './types'
import { ChangeModel } from './views/change-model/change-model'
import { Download } from './views/download'
import { LocalDetected } from './views/local-detected'
import { SettingsMenu } from './views/settings-menu'

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeRoute, setActiveRoute] = useState(SettingRoutes.Settings)

  const renderActiveRoute = useMemo(() => {
    const route = () => {
      switch (activeRoute) {
        case SettingRoutes.Download:
          return <Download setRoute={setActiveRoute} />
        case SettingRoutes.LocalDetected:
          return <LocalDetected setRoute={setActiveRoute} />
        case SettingRoutes.ChangeModel:
          return <ChangeModel setRoute={setActiveRoute} />
        default:
          return <SettingsMenu setRoute={setActiveRoute} />
      }
    }
    return route()
  }, [activeRoute])

  const handleClose = useCallback(() => {
    setActiveRoute(SettingRoutes.Settings)
    onClose()
  }, [onClose])

  return (
    <Modal size='lg' isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color='text.inverse' />
        {renderActiveRoute}
      </ModalContent>
    </Modal>
  )
}

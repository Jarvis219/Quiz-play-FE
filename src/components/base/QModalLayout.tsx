import { Modal } from 'antd'
import { ReactNode } from 'react'

interface IModalLayoutProps {
  open: boolean
  children: ReactNode
  onCancel?: () => void
  className?: string
  footer?: ReactNode
  width?: number
}

const QModalLayout = ({ open, footer = null, className = '', children, onCancel, width }: IModalLayoutProps) => {
  return (
    <Modal
      open={open}
      footer={footer}
      closable={false}
      zIndex={10}
      className={className}
      onCancel={onCancel}
      width={width}>
      {children}
    </Modal>
  )
}

export default QModalLayout

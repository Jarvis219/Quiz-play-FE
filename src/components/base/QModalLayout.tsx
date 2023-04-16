import { Modal } from 'antd'
import { ReactNode } from 'react'

interface IModalLayoutProps {
  open: boolean
  children: ReactNode
  onCancel?: () => void
  className?: string
  footer?: ReactNode
}

const QModalLayout = ({ open, footer = null, className = '', children, onCancel }: IModalLayoutProps) => {
  return (
    <Modal open={open} footer={footer} closable={false} zIndex={10} className={className} onCancel={onCancel}>
      {children}
    </Modal>
  )
}

export default QModalLayout

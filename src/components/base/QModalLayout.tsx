import { Modal } from 'antd'
import { ReactNode } from 'react'

interface IModalLayoutProps {
  open: boolean
  children: ReactNode
  className?: string
  footer?: ReactNode
}

const QModalLayout = ({ open, footer = null, className = '', children }: IModalLayoutProps) => {
  return (
    <Modal open={open} footer={footer} closable={false} zIndex={10} className={className}>
      {children}
    </Modal>
  )
}

export default QModalLayout

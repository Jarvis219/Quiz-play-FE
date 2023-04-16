import { EButtonType } from '@/types'

import dynamic from 'next/dynamic'
import { memo } from 'react'

const QButton = dynamic(() => import('./QButton'), { ssr: false })

interface IQFooterModalAction {
  onCancel: () => void
  onSubmit: () => void
}

const QFooterModalAction = ({ onCancel, onSubmit }: IQFooterModalAction) => {
  return (
    <footer className='flex justify-end mt-4'>
      <QButton type={EButtonType.text} onClick={onCancel} className='!text-sm' danger>
        Cancel
      </QButton>
      <QButton type={EButtonType.primary} onClick={onSubmit} className='!text-sm shadow-primary'>
        Save
      </QButton>
    </footer>
  )
}

export default memo(QFooterModalAction)

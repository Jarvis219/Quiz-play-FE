import dynamic from 'next/dynamic'
import { memo } from 'react'
import { Controller } from 'react-hook-form'
import QHelperText from './QHelperText'

const TinyEditor = dynamic(() => import('@/components/editor/TinyEditor'), { ssr: false })

export const DEFAULT_EDITOR_VALUE = '<p><br></p>'

interface Props {
  name: string
  control: any
  defaultValue?: unknown
  disabled?: boolean
}

/** rich textarea component */
const QFormEditor = ({ name, control, defaultValue = DEFAULT_EDITOR_VALUE, disabled }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className='w-full'>
          <TinyEditor onChange={onChange} valueText={value} readonly={disabled} />
          {error?.message && <QHelperText>{error.message}</QHelperText>}
        </div>
      )}
    />
  )
}

export default memo(QFormEditor)

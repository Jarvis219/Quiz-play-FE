import QHelperText from '@/components/base/QHelperText'
import { IAnswerKey } from '@/types'
import { DeleteOutlined, PictureOutlined } from '@ant-design/icons'
import { Checkbox, Tooltip } from 'antd'
import { Control, Controller } from 'react-hook-form'

interface IQInputAnswerProps {
  control: Control<any>
  name: string
  color: IAnswerKey
  required?: boolean
  disabled?: boolean
  placeholder?: string
  defaultValue?: string
  minLength?: number
  maxLength?: number
  className?: string
}

const QInputAnswer = ({
  control,
  name,
  color,
  required,
  disabled,
  defaultValue,
  maxLength,
  minLength,
  placeholder = 'Type your answer here...',
  className = '',
}: IQInputAnswerProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className='w-full'>
          <div className={`q-answer p-4 rounded-xl ${color.background} ${className}`}>
            <div className='flex justify-between items-center mb-3'>
              <div className='flex justify-start items-center gap-2 text-xl'>
                <Tooltip title='delete'>
                  <DeleteOutlined className='bg-blue-300 rounded-lg p-2 cursor-pointer text-white hover:bg-gray-300' />
                </Tooltip>
                <Tooltip title='upload'>
                  <PictureOutlined className='bg-blue-300 rounded-lg p-2 cursor-pointer text-white hover:bg-gray-300' />
                </Tooltip>
              </div>
              <Tooltip title='checked'>
                <Checkbox className='w-8 h-8' />
              </Tooltip>
            </div>
            <textarea
              required={required}
              disabled={disabled}
              placeholder={placeholder}
              minLength={minLength}
              maxLength={maxLength}
              {...field}
              className={`w-full h-40 p-3 border-none rounded-xl text-2xl text-white font-semibold placeholder:text-white ${color.outline} ${color.forcus} ${color.textarea}`}
            />
          </div>
          {error?.message && <QHelperText>{error.message}</QHelperText>}
        </div>
      )}
    />
  )
}

export default QInputAnswer

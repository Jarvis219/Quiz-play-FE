import { EInputType, IInputElementProps } from '@/types'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Form, Input, InputNumber } from 'antd'
import { memo, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import QHelperText from './QHelperText'

interface IQInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  type?: EInputType.TEXT | EInputType.PASSWORD | EInputType.EMAIL | EInputType.NUMBER | EInputType.TEL | EInputType.URL
  required?: boolean
  disabled?: boolean
  label?: string
  error?: boolean
  placeholder?: string
  errorMessage?: string
  defaultValue?: string
  minLength?: number
  maxLength?: number
  className?: string
  tooltip?: string
}

const QInput = ({
  control,
  name,
  label,
  minLength,
  maxLength,
  type = EInputType.TEXT,
  placeholder = '',
  defaultValue = '',
  className = '',
  required = false,
  disabled = false,
  tooltip,
}: IQInputProps) => {
  const classes = `w-full py-2.5 ${className}`
  const inputProps = {
    type,
    className: classes,
    placeholder,
    minLength,
    maxLength,
    disabled,
  }

  const inputElement = useMemo(
    () =>
      ({ field, error }: IInputElementProps) => {
        switch (type) {
          case EInputType.PASSWORD:
            return (
              <Input.Password
                {...field}
                {...inputProps}
                status={error ? 'error' : undefined}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            )
          case EInputType.NUMBER:
            return <InputNumber<number> {...field} {...inputProps} status={error ? 'error' : undefined} />
          default:
            return <Input {...field} {...inputProps} status={error ? 'error' : undefined} />
        }
      },
    [inputProps]
  )

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} name={name} required={required} initialValue={defaultValue} tooltip={tooltip}>
          <>
            {inputElement({ field, error })}
            <QHelperText>{error?.message}</QHelperText>
          </>
        </Form.Item>
      )}
    />
  )
}

export default memo(QInput)

import { EButtonSize, EButtonType } from '@/types'
import { Button, Tooltip } from 'antd'
import { FloatButtonProps } from 'antd/es/float-button/interface'
import Link from 'next/link'

interface QButtonProps extends Omit<FloatButtonProps, 'type'> {
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
  size?: EButtonSize
  type?: EButtonType
  danger?: boolean
  tooltip?: string
  onClick?: () => void
}

const QButton = ({
  type = EButtonType.default,
  icon,
  children,
  loading = false,
  disabled = false,
  danger = false,
  style = {},
  target = '_self',
  href = '',
  className = '',
  size = EButtonSize.middle,
  tooltip = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}: QButtonProps) => {
  const classes = `text-xl md:text-2xl h-full ${className}`
  const props = {
    type: type,
    icon: icon,
    loading: loading,
    style: style,
    disabled: disabled ?? loading,
    className: classes,
    size: size,
    danger: danger,
    onClick: onClick,
  }

  const buttonWapper = (
    <Tooltip title={tooltip} placement='top' color='blue'>
      <Button {...props}>{children}</Button>
    </Tooltip>
  )

  return href ? (
    <Link href={href} target={target}>
      {buttonWapper}
    </Link>
  ) : (
    buttonWapper
  )
}

export default QButton

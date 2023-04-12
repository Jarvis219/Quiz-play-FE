import { Switch } from 'antd'
import { memo, useMemo } from 'react'

interface QSwitchProps {
  checkedChildren: string
  unCheckedChildren: string
  disabled?: boolean
  className?: string
  onChange?: (checked: boolean) => void
  value?: string
}

const QSwitch = ({
  checkedChildren,
  unCheckedChildren,
  className = '',
  disabled = false,
  value,
  onChange,
}: QSwitchProps) => {
  const checked = useMemo(() => value === checkedChildren, [value, checkedChildren])
  const classes = `${className}`

  const handleChange = (checked: boolean) => {
    onChange && onChange(checked)
  }

  return (
    <Switch
      className={classes}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
      defaultChecked={checked}
      disabled={disabled}
      onChange={handleChange}
    />
  )
}

export default memo(QSwitch)

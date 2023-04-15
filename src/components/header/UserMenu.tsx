import { useAuthContext } from '@/contexts/auth/authContext'
import { EButtonType, ENotificationPlacement } from '@/types'
import { shortenText } from '@/utils'
import { LoginOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const QButton = dynamic(() => import('../base/QButton'), { ssr: false })

const UserMenu = () => {
  const { logout, user } = useAuthContext()

  const classes = 'flex items-center gap-x-2 hover:text-blue-600'

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={classes}>
          <MenuUnfoldOutlined /> Admin
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className={classes}>
          <SettingOutlined /> Setting
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className={classes} onClick={logout}>
          <LoginOutlined /> Logout
        </div>
      ),
    },
  ]

  return (
    <Dropdown menu={{ items }} placement={ENotificationPlacement.BOTTOM} arrow trigger={['click']}>
      <QButton type={EButtonType.text} icon={<UserOutlined />} className='!text-sm'>
        {shortenText(user?.user.username || '', 30)}
      </QButton>
    </Dropdown>
  )
}

export default memo(UserMenu)

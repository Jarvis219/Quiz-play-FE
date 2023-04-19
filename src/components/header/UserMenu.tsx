import { RouterAdmin, RouterClient } from '@/constants'
import { useAuthContext } from '@/contexts/auth/authContext'
import { EButtonType, ENotificationPlacement, EUserRoles } from '@/types'
import { shortenText } from '@/utils'
import { LoginOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import QImage from '../base/QImage'

const QButton = dynamic(() => import('../base/QButton'), { ssr: false })

const UserMenu = () => {
  const { logout, user } = useAuthContext()

  const classes = 'flex items-center gap-x-2 hover:text-blue-600'

  const [items, setItems] = useState([
    {
      key: '2',
      label: (
        <div className={classes}>
          <Link href={RouterClient.PROFILE_SETTINGS} passHref>
            <SettingOutlined /> Setting
          </Link>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className={`${classes} text-blue-500`} onClick={logout}>
          <LoginOutlined /> Logout
        </div>
      ),
    },
  ])

  useEffect(() => {
    const key = 'admin'
    if (user?.user.role !== EUserRoles.ADMIN) return

    const isAlreadyExist = items.find((item) => item?.key === key)

    if (isAlreadyExist) return

    const adminItem = {
      key,
      label: (
        <div className={classes}>
          <Link href={RouterAdmin.DASHBOARD} passHref>
            <MenuUnfoldOutlined /> Admin
          </Link>
        </div>
      ),
    }

    setItems([adminItem, ...items])
  }, [user?.user.role])

  return (
    <Dropdown menu={{ items }} placement={ENotificationPlacement.BOTTOM} arrow trigger={['click']}>
      <QButton
        type={EButtonType.text}
        icon={<QImage src={user?.user.avatar ?? ''} width={32} height={32} />}
        className='!text-sm flex items-center gap-1'>
        {shortenText(user?.user.username || '', 30)}
      </QButton>
    </Dropdown>
  )
}

export default memo(UserMenu)

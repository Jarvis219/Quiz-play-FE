import QBreadcrumb from '@/components/base/QBreadcrumb'
import QImage from '@/components/base/QImage'
import { RouterAdmin, RouterClient, imageUrl, keyItemMenu } from '@/constants'
import { PieChartOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import Link from 'next/link'
import { Key, useState, type ReactNode } from 'react'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[], link?: string): MenuItem {
  return {
    key,
    icon,
    children,
    label: link ? <Link href={link}>{label}</Link> : label,
  } as MenuItem
}

export const items: MenuItem[] = [
  getItem('Dashboard', keyItemMenu.dashboard, <PieChartOutlined />, undefined, RouterAdmin.DASHBOARD),
  getItem('Create', keyItemMenu.create, <PlusCircleOutlined />, undefined, RouterAdmin.CREATE_QUIZ),
  //   getItem('Quiz', '3', <UserOutlined />, [getItem('List Quiz', 'key list'), getItem('Create', '4')]),
]

type AdminProps = {
  meta: ReactNode
  children: ReactNode
  selectKey: string[]
  breadcrumbs?: {
    title: string
    href: string
  }[]
}

const Admin = ({ children, meta, breadcrumbs, selectKey }: AdminProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <>
      {meta}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Link href={RouterClient.HOME}>
            <QImage
              src={imageUrl.logo}
              width={80}
              height={50}
              alt='logo quiz play'
              lazy={false}
              className='w-full mx-auto mt-4'
              priority
            />
          </Link>
          <Menu theme='dark' mode='inline' items={items} defaultSelectedKeys={selectKey} selectedKeys={selectKey} />
        </Sider>
        <Layout className='site-layout'>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            {breadcrumbs && <QBreadcrumb breadcrumbs={breadcrumbs} />}
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Quiz Play ©2023 Created by Jarvis</Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default Admin

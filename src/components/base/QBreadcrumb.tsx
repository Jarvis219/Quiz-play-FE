import { Breadcrumb } from 'antd'
import Link from 'next/link'
import { memo } from 'react'

interface IQBreadcrumbProps {
  breadcrumbs: {
    title: string
    href: string
  }[]
}

const QBreadcrumb = ({ breadcrumbs }: IQBreadcrumbProps) => {
  return (
    <Breadcrumb>
      {breadcrumbs.map(({ title, href }, index) => (
        <Breadcrumb.Item key={index}>{href ? <Link href={href}>{title}</Link> : title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default memo(QBreadcrumb)

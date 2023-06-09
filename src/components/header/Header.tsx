import { RouterClient, imageUrl } from '@/constants'
import { useAuthContext } from '@/contexts/auth/authContext'
import { Input } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { memo } from 'react'
import QImage from '../base/QImage'
import Spin from '../base/loading/Spin'

const UserMenu = dynamic(() => import('./UserMenu'), {
  ssr: false,
  loading: () => <Spin />,
})
const BoxActionAuth = dynamic(() => import('./BoxActionAuth'), {
  ssr: false,
  loading: () => <Spin />,
})

const Header = () => {
  const { Search } = Input
  const { isLoggedIn } = useAuthContext()

  const onSearch = (value: string) => console.log(value)

  return (
    <header className='flex items-center justify-between py-1.5 px-5 fixed w-full shadow-md bg-white'>
      <div className='flex items-center'>
        <Link href={RouterClient.HOME}>
          <QImage src={imageUrl.logo} width={80} height={50} alt='logo quiz play' lazy={false} unoptimized priority />
        </Link>
        <Search placeholder='Find a quiz' onSearch={onSearch} className='w-64' size='large' allowClear />
      </div>
      <nav></nav>
      <div className='flex gap-x-2'>{isLoggedIn ? <UserMenu /> : <BoxActionAuth />}</div>
    </header>
  )
}

export default memo(Header)

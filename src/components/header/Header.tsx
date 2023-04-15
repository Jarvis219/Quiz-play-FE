import { imageUrl } from '@/constants'
import { useAuthContext } from '@/contexts/auth/authContext'
import { Input } from 'antd'
import dynamic from 'next/dynamic'

const UserMenu = dynamic(() => import('./UserMenu'), { ssr: false })
const BoxActionAuth = dynamic(() => import('./BoxActionAuth'), { ssr: false })
const QImage = dynamic(() => import('../base/QImage'), { ssr: false })

const Header = () => {
  const { Search } = Input
  const { isLoggedIn } = useAuthContext()

  const onSearch = (value: string) => console.log(value)

  return (
    <header className='flex items-center justify-between py-1.5 px-5 fixed w-full shadow-md'>
      <div className='flex items-center'>
        <QImage src={imageUrl.logo} width={80} height={50} alt='logo quiz play' lazy={false} unoptimized />
        <Search placeholder='Find a quiz' onSearch={onSearch} className='w-64' size='large' allowClear />
      </div>
      <nav></nav>
      <div className='flex gap-x-2'>{isLoggedIn ? <UserMenu /> : <BoxActionAuth />}</div>
    </header>
  )
}

export default Header
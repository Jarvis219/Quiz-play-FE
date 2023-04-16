import { useAuthContext } from '@/contexts/auth/authContext'
import { LoginOutlined } from '@ant-design/icons'
import { memo } from 'react'

const Logout = () => {
  const { logout } = useAuthContext()
  return (
    <section className='flex justify-between items-center cursor-pointer group' onClick={logout}>
      <div className='group-hover:text-yellow-500 flex justify-start items-center gap-x-2'>
        <LoginOutlined className='text-gray-400 group-hover:text-yellow-500 text-xs flex flex-col justify-center items-center' />
        <p className='text-sm font-semibold leading-4'>Log out</p>
      </div>
    </section>
  )
}

export default memo(Logout)

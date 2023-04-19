import { useAuthContext } from '@/contexts/auth/authContext'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import Spin from '../base/loading/Spin'

const BoxActionAuth = dynamic(() => import('./BoxActionAuth'), {
  ssr: false,
  loading: () => <Spin />,
})
const BoxUser = dynamic(() => import('./BoxUser'), {
  ssr: false,
  loading: () => <Spin />,
})

const SearchCode = dynamic(() => import('./SearchCode'), { ssr: false, loading: () => <Spin /> })

const Overview = () => {
  const { isLoggedIn } = useAuthContext()

  return (
    <section className='lg:grid grid-cols-3 min-h-[10rem] gap-x-8'>
      <div className='col-span-2 rounded-2xl shadow-md flex justify-center items-center md:p-4'>
        <SearchCode />
      </div>
      <div className='col-span-1 rounded-2xl shadow-md flex justify-center items-center mt-5 w-full p-4 md:p-8'>
        {isLoggedIn ? <BoxUser /> : <BoxActionAuth />}
      </div>
    </section>
  )
}

export default memo(Overview)

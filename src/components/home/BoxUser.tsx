import { RouterClient, videoUrl } from '@/constants'
import { useAuthContext } from '@/contexts/auth/authContext'
import { EButtonType } from '@/types'
import { shortenText } from '@/utils'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import QImage from '../base/QImage'

const QButton = dynamic(() => import('../base/QButton'), { ssr: false })

const BoxUser = () => {
  const { user } = useAuthContext()

  return (
    <section>
      <div className='w-fit mx-auto p-1.5 bg-gray-100 rounded-full flex items-center justify-center gap-x-1 text-gray-800 font-semibold'>
        {user?.user?.avatar ? (
          <QImage height={32} width={32} src={user?.user.avatar} className='rounded-full' />
        ) : (
          <video width='32' height='32' src={videoUrl.avatar} className='rounded-full' autoPlay={true} loop={true} />
        )}
        <span className='mr-6'>
          {shortenText(`${user?.user.first_name} ${user?.user.last_name}` ?? '', 30) ||
            shortenText(user?.user.username ?? '', 30)}
        </span>
      </div>
      <div className='flex justify-center items-center gap-x-1 mt-1'>
        <QButton type={EButtonType.text} className='!text-sm' href={RouterClient.PROFILE_SETTINGS}>
          <span className='text-violet-500 font-semibold'>Edit profile</span>
        </QButton>
        <span className='w-1.5 h-1.5 rounded-full bg-violet-600'></span>
        <QButton type={EButtonType.text} className='!text-sm'>
          <span className='text-violet-500 font-semibold'>View activity</span>
        </QButton>
      </div>
    </section>
  )
}

export default memo(BoxUser)

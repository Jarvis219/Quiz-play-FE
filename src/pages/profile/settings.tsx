import PandaIcon from '@/components/base/icons/PandaIcon'
import Spin from '@/components/base/loading/Spin'
import withVerifyAccount from '@/components/profile/settings/accounts/withVerifyAccount'
import { RouterClient } from '@/constants'
import { useAuthContext } from '@/contexts/auth/authContext'
import { useLoadingContext } from '@/contexts/LoadingContext'
import { Main, Meta } from '@/layouts'
import { UserOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Avatar = dynamic(() => import('@/components/profile/settings/Avatar'), { ssr: false, loading: () => <Spin /> })
const Username = dynamic(() => import('@/components/profile/settings/Username'), {
  ssr: false,
  loading: () => <Spin />,
})
const Name = dynamic(() => import('@/components/profile/settings/Name'), { ssr: false, loading: () => <Spin /> })
const PhoneAndAddress = dynamic(() => import('@/components/profile/settings/PhoneAndAddress'), {
  ssr: false,
  loading: () => <Spin />,
})
const UpdatePassword = dynamic(() => import('@/components/profile/settings/accounts/UpdatePassword'), {
  ssr: false,
  loading: () => <Spin />,
})
const VerifyAccount = dynamic(() => import('@/components/profile/settings/accounts/VerifyAccount'), {
  ssr: false,
  loading: () => <Spin />,
})
const Logout = dynamic(() => import('@/components/profile/settings/accounts/Logout'), {
  ssr: false,
  loading: () => <Spin />,
})

const settings = () => {
  const { isLoggedIn } = useAuthContext()
  const { isLoading } = useLoadingContext()
  const { push } = useRouter()

  useEffect(() => {
    if (!isLoggedIn && isLoading) {
      if (isLoggedIn || isLoading) return
      push(`/?callback=${RouterClient.PROFILE_SETTINGS}`)
    }

    const timeOutInit = setTimeout(() => {
      if (isLoggedIn || isLoading) return
      push(`/?callback=${RouterClient.PROFILE_SETTINGS}`)
      // need to set 500ms timeout to init api call
    }, 500)

    return () => {
      clearTimeout(timeOutInit)
    }
  }, [isLoggedIn, isLoading])

  return (
    <Main
      meta={
        <Meta
          title='Profile Settings'
          description='Quiz Play is a platform for creating and playing quizzes. Create your own quiz or play quizzes created by others.'
        />
      }>
      <h1 className='text-center text-2xl font-normal'>Settings</h1>

      <section className='max-w-lg shadow-default rounded-lg mx-auto p-3 bg-white mt-6'>
        <h2 className='flex items-center gap-1 text-yellow-500 font-medium text-base'>
          <PandaIcon /> Profile
        </h2>
        <div className='mt-6 flex flex-col gap-5'>
          <Avatar />
          <Username />
          <Name />
          <PhoneAndAddress />
        </div>
      </section>
      <section className='max-w-lg shadow-default rounded-lg mx-auto p-3 bg-white mt-8'>
        <h2 className='flex items-center gap-1 font-medium text-base'>
          <UserOutlined /> Account settings
        </h2>
        <div className='mt-6 flex flex-col gap-5'>
          {withVerifyAccount({ children: <UpdatePassword /> })}
          <VerifyAccount />
          <Logout />
        </div>
      </section>
    </Main>
  )
}

export default settings

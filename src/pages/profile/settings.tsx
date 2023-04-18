import Loading from '@/components/base/loading/Loading'
import withVerifyAccount from '@/components/profile/settings/accounts/withVerifyAccount'
import { RouterClient } from '@/constants'
import { useAuthContext } from '@/contexts/auth/authContext'
import { useLoadingContext } from '@/contexts/LoadingContext'
import { Main, Meta } from '@/layouts'
import { UserOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Suspense, useEffect } from 'react'

const PandaIcon = dynamic(() => import('@/components/base/icons/PandaIcon'), { ssr: false })
const Avatar = dynamic(() => import('@/components/profile/settings/Avatar'), { ssr: false })
const Username = dynamic(() => import('@/components/profile/settings/Username'), { ssr: false })
const Name = dynamic(() => import('@/components/profile/settings/Name'), { ssr: false })
const PhoneAndAddress = dynamic(() => import('@/components/profile/settings/PhoneAndAddress'), { ssr: false })
const UpdatePassword = dynamic(() => import('@/components/profile/settings/accounts/UpdatePassword'), { ssr: false })
const VerifyAccount = dynamic(() => import('@/components/profile/settings/accounts/VerifyAccount'), { ssr: false })
const Logout = dynamic(() => import('@/components/profile/settings/accounts/Logout'), { ssr: false })

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
      // need to set 300ms timeout to init api call
    }, 300)

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
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </Main>
  )
}

export default settings

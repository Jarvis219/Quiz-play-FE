import QInput from '@/components/base/QInput'
import QModalLayout from '@/components/base/QModalLayout'
import { MAX_LENGTH_USERNAME, MIN_LENGTH_USERNAME } from '@/constants'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { useLoadingContext } from '@/contexts/loading/LoadingContext'
import { Profile } from '@/pages/api/user/profile'
import { ENotificationType } from '@/types'
import { validationMessages } from '@/utils'
import { RightOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import dynamic from 'next/dynamic'
import { memo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'

const QFooterModalAction = dynamic(() => import('@/components/base/QFooterModalAction'), { ssr: false })

const Username = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const { user, updateUser } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()

  const schema = z.object({
    username: z
      .string({
        required_error: validationMessages.required('Username'),
      })
      .min(MIN_LENGTH_USERNAME, validationMessages.username(MIN_LENGTH_USERNAME))
      .max(MAX_LENGTH_USERNAME)
      .refine((value) => !/\s/.test(value), validationMessages.noWhitespace('Username')),
  })

  const { control, handleSubmit, reset } = useForm<{ username: string }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async ({ username }: { username: string }) => {
    setIsLoading(true)
    const res = await Profile.updateProfile({ username }).finally(() => setIsLoading(false))
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Username updated successfully',
    })
    updateUser(res)
    setIsModalOpen(false)
  }

  const onCancel = () => {
    setIsModalOpen(false)
    reset({
      username: user?.user.username,
    })
  }

  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  return (
    <>
      <section className='flex justify-between items-center cursor-pointer group' onClick={() => setIsModalOpen(true)}>
        <div className='group-hover:text-yellow-500'>
          <p className='text-sm font-semibold leading-5'>Username</p>
          <p className='text-sm font-normal text-gray-400 leading-4'>{user?.user.username}</p>
        </div>
        <RightOutlined className='text-gray-400 text-xs flex flex-col justify-center items-center group-hover:text-yellow-500' />
      </section>
      <QModalLayout open={isModalOpen} onCancel={onCancel}>
        <div ref={modalRef}>
          <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
            <QInput label='Username' control={control} defaultValue={user?.user.username} name='username' required />
          </Form>
          <QFooterModalAction onCancel={onCancel} onSubmit={handleSubmit(onSubmit)} />
        </div>
      </QModalLayout>
    </>
  )
}

export default memo(Username)

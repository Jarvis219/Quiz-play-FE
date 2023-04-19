import QInput from '@/components/base/QInput'
import QModalLayout from '@/components/base/QModalLayout'
import Spin from '@/components/base/loading/Spin'
import { MAX_LENGTH_FIRST_NAME, MAX_LENGTH_LAST_NAME, MIN_LENGTH_FIRST_NAME, MIN_LENGTH_LAST_NAME } from '@/constants'
import { useLoadingContext } from '@/contexts/LoadingContext'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { Profile } from '@/pages/api/user/profile'
import { ENotificationType } from '@/types'
import { shortenText, validationMessages } from '@/utils'
import { RightOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import dynamic from 'next/dynamic'
import { memo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'

const QFooterModalAction = dynamic(() => import('@/components/base/QFooterModalAction'), {
  ssr: false,
  loading: () => <Spin />,
})

const Name = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const { user, updateUser } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()

  const schema = z.object({
    firstName: z
      .string({
        required_error: validationMessages.required('first name'),
      })
      .min(MIN_LENGTH_FIRST_NAME, validationMessages.fristName(MIN_LENGTH_FIRST_NAME))
      .max(MAX_LENGTH_FIRST_NAME),
    lastName: z
      .string({
        required_error: validationMessages.required('last name'),
      })
      .min(MIN_LENGTH_LAST_NAME, validationMessages.lastName(MIN_LENGTH_LAST_NAME))
      .max(MAX_LENGTH_LAST_NAME),
  })

  const { control, handleSubmit, reset } = useForm<{ firstName: string; lastName: string }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async ({ firstName, lastName }: { firstName: string; lastName: string }) => {
    setIsLoading(true)
    const res = await Profile.updateProfile({ first_name: firstName, last_name: lastName }).finally(() =>
      setIsLoading(false)
    )
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Name updated successfully',
    })
    updateUser(res)
    setIsModalOpen(false)
  }

  const onCancel = () => {
    setIsModalOpen(false)
    reset({
      firstName: user?.user.first_name,
      lastName: user?.user.last_name,
    })
  }

  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  const sizeMarginBottomInput = '0.7rem'

  return (
    <>
      <section className='flex justify-between items-center cursor-pointer group' onClick={() => setIsModalOpen(true)}>
        <div className='group-hover:text-yellow-500'>
          <p className='text-sm font-semibold leading-5'>Name</p>
          <p className='text-sm font-normal text-gray-400 leading-4'>
            {shortenText(`${user?.user.first_name} ${user?.user.last_name}` ?? '', 30) || 'Add your name'}
          </p>
        </div>
        <RightOutlined className='text-gray-400 text-xs flex flex-col justify-center items-center group-hover:text-yellow-500' />
      </section>
      <QModalLayout open={isModalOpen} onCancel={onCancel}>
        <div ref={modalRef}>
          <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
            <QInput
              label='First name'
              control={control}
              defaultValue={user?.user.first_name}
              name='firstName'
              sizeMarginBottom={sizeMarginBottomInput}
              required
            />
            <QInput
              label='Last name'
              control={control}
              defaultValue={user?.user.last_name}
              name='lastName'
              sizeMarginBottom={sizeMarginBottomInput}
              required
            />
          </Form>
          <QFooterModalAction onCancel={onCancel} onSubmit={handleSubmit(onSubmit)} />
        </div>
      </QModalLayout>
    </>
  )
}

export default memo(Name)

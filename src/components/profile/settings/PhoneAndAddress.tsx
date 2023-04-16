import QInput from '@/components/base/QInput'
import QModalLayout from '@/components/base/QModalLayout'
import { MAX_LENGTH_ADDRESS, MAX_LENGTH_PHONE_NUMBER, MIN_LENGTH_ADDRESS, MIN_LENGTH_PHONE_NUMBER } from '@/constants'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { useLoadingContext } from '@/contexts/loading/LoadingContext'
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

const QFooterModalAction = dynamic(() => import('@/components/base/QFooterModalAction'), { ssr: false })

const PhoneAndAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const { user, updateUser } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()

  const schema = z.object({
    phoneNumber: z
      .string({
        required_error: validationMessages.required('phone number'),
      })
      .min(MIN_LENGTH_PHONE_NUMBER, validationMessages.phoneNumber(MIN_LENGTH_PHONE_NUMBER))
      .max(MAX_LENGTH_PHONE_NUMBER)
      .refine((value) => /^\d+$/.test(value), validationMessages.onlyNumber('Phone number')),
    address: z
      .string({
        required_error: validationMessages.required('last name'),
      })
      .min(MIN_LENGTH_ADDRESS, validationMessages.address(MIN_LENGTH_ADDRESS))
      .max(MAX_LENGTH_ADDRESS),
  })

  const { control, handleSubmit, reset } = useForm<{ phoneNumber: string; address: string }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async ({ phoneNumber, address }: { phoneNumber: string; address: string }) => {
    setIsLoading(true)
    const res = await Profile.updateProfile({ phone_number: phoneNumber, address: address }).finally(() =>
      setIsLoading(false)
    )
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Phone number and address updated successfully',
    })
    updateUser(res)
    setIsModalOpen(false)
  }

  const onCancel = () => {
    setIsModalOpen(false)
    reset({
      phoneNumber: user?.user.phone_number,
      address: user?.user.address,
    })
  }

  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  const sizeMarginBottomInput = '0.7rem'
  return (
    <>
      <section className='flex justify-between items-center cursor-pointer group' onClick={() => setIsModalOpen(true)}>
        <div className='group-hover:text-yellow-500'>
          <p className='text-sm font-semibold leading-5'>Phone and address</p>
          <p className='text-sm font-normal text-gray-400 leading-4'>
            {user?.user.phone_number ? shortenText(user?.user.phone_number, 15) : 'Add phone number'}
          </p>
          <address className='text-sm font-normal text-gray-400 leading-3 mt-1'>
            {user?.user.address ? shortenText(user?.user.address, 50) : 'Add address'}
          </address>
        </div>
        <RightOutlined className='text-gray-400 text-xs flex flex-col justify-center items-center group-hover:text-yellow-500' />
      </section>
      <QModalLayout open={isModalOpen} onCancel={onCancel}>
        <div ref={modalRef}>
          <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
            <QInput
              label='Phone number'
              control={control}
              defaultValue={user?.user.phone_number}
              name='phoneNumber'
              sizeMarginBottom={sizeMarginBottomInput}
              required
            />
            <QInput
              label='Address'
              control={control}
              defaultValue={user?.user.address}
              name='address'
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

export default memo(PhoneAndAddress)

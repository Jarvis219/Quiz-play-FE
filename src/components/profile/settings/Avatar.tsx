import QFooterModalAction from '@/components/base/QFooterModalAction'
import QModalLayout from '@/components/base/QModalLayout'
import QUploadFile from '@/components/base/QUploadFile'
import { useLoadingContext } from '@/contexts/LoadingContext'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { Profile } from '@/pages/api/user/profile'
import { ENotificationType, IUploadImage } from '@/types'
import { validationMessages } from '@/utils'
import { RightOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'

const Avatar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const { user, updateUser } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()

  const schema = z.object({
    // schema for avatar type string (url) or File
    avatar: z.union([
      z
        .array(
          z
            .string({
              required_error: validationMessages.required('Avatar'),
            })
            .refine((value) => value.startsWith('http'), {
              message: validationMessages.required('Avatar'),
            })
        )
        .min(1, validationMessages.required('Avatar')),
      z
        .array(
          z
            .object({
              originFileObj: z.any(),
            })
            .refine((value) => value.originFileObj instanceof File, {
              message: validationMessages.required('Avatar'),
            })
        )
        .min(1, validationMessages.required('Avatar')),
    ]),
  })

  const { control, handleSubmit, reset, setError } = useForm<{ avatar: File[] | string[] }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async ({ avatar }: { avatar: File[] | string[] }) => {
    setIsLoading(true)

    const res = await Profile.updateProfile({ avatar: (avatar[0] as unknown as IUploadImage).originFileObj }).finally(
      () => setIsLoading(false)
    )

    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Update avatar successfully',
    })

    updateUser(res)
    setIsModalOpen(false)
  }

  const onCancel = () => {
    setIsModalOpen(false)
    reset({
      avatar: [user?.user.avatar],
    })
  }

  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  return (
    <>
      <section className='flex justify-between items-center cursor-pointer group' onClick={() => setIsModalOpen(true)}>
        <div className='group-hover:text-yellow-500'>
          <p className='text-sm font-semibold leading-5'>Avatar</p>
        </div>
        <RightOutlined className='text-gray-400 text-xs flex flex-col justify-center items-center group-hover:text-yellow-500' />
      </section>
      <QModalLayout open={isModalOpen} onCancel={onCancel}>
        <div ref={modalRef}>
          <QUploadFile
            name='avatar'
            control={control}
            setError={setError}
            defaultValue={[user?.user.avatar || '']}
            round
          />
          <QFooterModalAction onCancel={onCancel} onSubmit={handleSubmit(onSubmit)} />
        </div>
      </QModalLayout>
    </>
  )
}

export default memo(Avatar)

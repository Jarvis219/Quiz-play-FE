import Loading from '@/components/base/loading/Loading'
import { useLoadingContext } from '@/contexts/LoadingContext'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { Profile } from '@/pages/api/user/profile'
import { ENotificationType, IUploadImage } from '@/types'
import { validationMessages } from '@/utils'
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { Suspense, memo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'

const ListAvatar = dynamic(() => import('./ListAvatar'), { ssr: false })
const QUploadFile = dynamic(() => import('@/components/base/QUploadFile'), { ssr: false })
const QButton = dynamic(() => import('@/components/base/QButton'), { ssr: false })
const QModalLayout = dynamic(() => import('@/components/base/QModalLayout'), { ssr: false })

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

  const { control, handleSubmit, reset, setError, setValue, watch } = useForm<{ avatar: File[] | string[] }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const avatarUrl = (watch('avatar')?.[0] as string) ?? user?.user.avatar

  const onSubmit = async ({ avatar }: { avatar: File[] | string[] }) => {
    setIsLoading(true)

    const newAvatar = (avatar[0] as unknown as IUploadImage)?.originFileObj ?? avatar[0]

    const res = await Profile.updateProfile({ avatar: newAvatar }).finally(() => setIsLoading(false))

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

  const handleChangeAvatar = (url: string) => {
    setValue('avatar', [url])
    setError('avatar', {})
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
      <QModalLayout open={isModalOpen} onCancel={onCancel} width={650}>
        <div ref={modalRef} className='py-8 relative'>
          <CloseCircleOutlined
            className='absolute top-0 right-0 text-xl text-red-500 hover:text-red-600 cursor-pointer transition duration-300 hover:scale-105'
            onClick={onCancel}
          />
          <Suspense fallback={<Loading />}>
            <div className='flex justify-start gap-2 h-[130px]'>
              <div className='w-[150px]'>
                <QUploadFile
                  name='avatar'
                  control={control}
                  setError={setError}
                  defaultValue={[user?.user.avatar || '']}
                  round
                />
              </div>
              <div className='w-full'>
                <h2>Avatar setting</h2>
                <p className='text-sm text-gray-400'>
                  You can upload a JPG, GIF or PNG file. The maximum file size is 50MB or choose an avatar from the list
                </p>
                <p className='text-sm text-gray-400'>
                  <span className='text-yellow-500'>Note:</span> If you upload a new avatar, your old avatar will be
                  deleted.
                </p>
                <QButton
                  className='float-right mt-2 !text-base font-semibold text-white bg-green-500 !h-12 hover:!text-white'
                  onClick={handleSubmit(onSubmit)}>
                  Pick this avatar
                </QButton>
              </div>
            </div>

            <ListAvatar url={avatarUrl ?? ''} setUrl={handleChangeAvatar} />
          </Suspense>
        </div>
      </QModalLayout>
    </>
  )
}

export default memo(Avatar)

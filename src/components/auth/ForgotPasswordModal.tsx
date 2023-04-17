import { EMIITER_CODE } from '@/constants'
import { useLoadingContext } from '@/contexts/LoadingContext'
import { useToastContext } from '@/contexts/ToastContext'
import { Auth } from '@/pages/api/user/auth'
import { EButtonType, ENotificationType } from '@/types'
import { Emitter, validationMessages } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import dynamic from 'next/dynamic'
import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'
import QModalLayout from '../base/QModalLayout'

const QInput = dynamic(() => import('../base/QInput'), { ssr: false })
const QButton = dynamic(() => import('../base/QButton'), { ssr: false })

const ForgotPasswordModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  useEffect(() => {
    !isModalOpen && Emitter.on(EMIITER_CODE.FOR_GOT_PASSWORD_MODAL, () => setIsModalOpen(true))
    isModalOpen && Emitter.on(EMIITER_CODE.SIGN_IN_MODAL, () => setIsModalOpen(false))

    return () => {
      Emitter.off(EMIITER_CODE.SIGN_IN_MODAL, () => setIsModalOpen(false))
      Emitter.off(EMIITER_CODE.FOR_GOT_PASSWORD_MODAL, () => setIsModalOpen(false))
    }
  })

  const schema = z.object({
    email: z
      .string({
        required_error: validationMessages.required('Email'),
      })
      .email({
        message: validationMessages.email,
      }),
  })

  const { control, handleSubmit } = useForm<{
    email: string
  }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const handleEmitSignInModal = (): void => {
    Emitter.emit(EMIITER_CODE.SIGN_IN_MODAL)
  }

  const onSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true)
    await Auth.forgotPassword({ email }).finally(() => setIsLoading(false))
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Please check your email to reset your password',
    })
  }

  const classesInput = 'rounded-3xl drop-shadow py-3 px-4 text-xs'
  return (
    <QModalLayout open={isModalOpen}>
      <div ref={modalRef} className='my-4'>
        <header className='text-center'>
          <h2 className='text-4xl text-gray-700'>Forgot your password</h2>
        </header>
        <main className='mt-5'>
          <section>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
              <QInput
                control={control}
                name='email'
                label='Email'
                className={classesInput}
                placeholder='Enter email or email address'
                required
              />

              <QButton
                type={EButtonType.text}
                className='!text-sm px-1 text-blue-500 font-semibold mt-2'
                onClick={handleEmitSignInModal}>
                Back to sign in
              </QButton>
              <QButton
                onClick={handleSubmit(onSubmit)}
                type={EButtonType.primary}
                className='w-full rounded-3xl py-2 mt-3 !text-lg shadow-primary'>
                Send
              </QButton>
            </Form>
          </section>
        </main>
      </div>
    </QModalLayout>
  )
}

export default memo(ForgotPasswordModal)

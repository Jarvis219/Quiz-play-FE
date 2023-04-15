import {
  EMIITER_CODE,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_USERNAME,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
} from '@/constants'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { GoogleButton } from '@/contexts/auth/authGoogle'
import { useLoadingContext } from '@/contexts/loading/LoadingContext'
import { Auth } from '@/pages/api/auth'
import { EButtonType, EInputType, ENotificationType } from '@/types'
import { Emitter, validationMessages } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'
import QButton from '../base/QButton'
import QInput from '../base/QInput'
import QModalLayout from '../base/QModalLayout'

interface IForm {
  username: string
  password: string
  email: string
}

const SignUpModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setIsLoading } = useLoadingContext()
  const { login } = useAuthContext()
  const { showToast } = useToastContext()
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  useEffect(() => {
    !isModalOpen && Emitter.on(EMIITER_CODE.SIGN_UP_MODAL, () => setIsModalOpen(true))
    isModalOpen && Emitter.on(EMIITER_CODE.SIGN_IN_MODAL, () => setIsModalOpen(false))

    return () => {
      Emitter.off(EMIITER_CODE.SIGN_UP_MODAL, () => setIsModalOpen(false))
      Emitter.off(EMIITER_CODE.SIGN_IN_MODAL, () => setIsModalOpen(false))
    }
  })

  const handleEmitSignInModal = (): void => {
    Emitter.emit(EMIITER_CODE.SIGN_IN_MODAL)
  }

  const schema = z
    .object({
      username: z
        .string({
          required_error: validationMessages.required('Username'),
        })
        .min(MIN_LENGTH_USERNAME, validationMessages.username(MIN_LENGTH_USERNAME))
        .max(MAX_LENGTH_USERNAME),
      email: z
        .string({
          required_error: validationMessages.required('Email'),
        })
        .email({
          message: validationMessages.email,
        }),
      password: z
        .string({
          required_error: validationMessages.required('Password'),
        })
        .min(MIN_LENGTH_PASSWORD, validationMessages.username(MIN_LENGTH_PASSWORD))
        .max(MAX_LENGTH_PASSWORD),
      confirmPassword: z
        .string({
          required_error: validationMessages.required('Confirm password'),
        })
        .min(MIN_LENGTH_PASSWORD, validationMessages.password(MIN_LENGTH_PASSWORD))
        .max(MAX_LENGTH_PASSWORD),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: validationMessages.passwordsNotMatch,
      path: ['confirmPassword'],
    })

  const { control, handleSubmit } = useForm<IForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async ({ username, password, email }: IForm): Promise<void> => {
    setIsLoading(true)
    const user = await Auth.registerViaUsername({ email, username, password }).finally(() => setIsLoading(false))
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Register successfully!',
    })
    login(user)
    setIsModalOpen(false)
  }

  const handleLoginWithGoogle = async (token: string): Promise<void> => {
    setIsLoading(true)
    const user = await Auth.loginWithGoogle({ token }).finally(() => setIsLoading(false))
    login(user)
    setIsModalOpen(false)
  }

  const classesInput = 'rounded-3xl drop-shadow py-3 px-4 text-xs'
  const sizeMarginBottomInput = '0.7rem'

  return (
    <QModalLayout open={isModalOpen}>
      <div ref={modalRef} className='my-4'>
        <header className='text-center'>
          <h2 className='text-4xl text-gray-700'>Welcome Quiz Play</h2>
        </header>
        <main className='mt-5'>
          <section>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
              <QInput
                control={control}
                name='username'
                label='Username'
                className={classesInput}
                sizeMarginBottom={sizeMarginBottomInput}
                placeholder='Enter username or email address'
                required
              />
              <QInput
                control={control}
                name='email'
                label='Email'
                className={classesInput}
                sizeMarginBottom={sizeMarginBottomInput}
                placeholder='Enter email or email address'
                required
              />
              <QInput
                control={control}
                name='password'
                type={EInputType.PASSWORD}
                label='Password'
                className={classesInput}
                sizeMarginBottom={sizeMarginBottomInput}
                placeholder='Enter password'
                required
              />
              <QInput
                control={control}
                name='confirmPassword'
                type={EInputType.PASSWORD}
                label='Confirm Password'
                className={classesInput}
                sizeMarginBottom={sizeMarginBottomInput}
                placeholder='Enter confirm password'
                required
              />
              <div className='text-right text-sm'>
                Already have an account?
                <QButton
                  type={EButtonType.text}
                  className='!text-sm px-1 text-blue-500 font-semibold'
                  onClick={handleEmitSignInModal}>
                  Sign in
                </QButton>
              </div>
              <QButton
                onClick={handleSubmit(onSubmit)}
                type={EButtonType.primary}
                className='w-full rounded-3xl py-2 mt-3 !text-lg'>
                Sign Up
              </QButton>
            </Form>
            <p className='my-6 text-center'>Or</p>
            <div className='mt-4'>
              <GoogleButton onLoginSuccess={handleLoginWithGoogle} />
            </div>
          </section>
        </main>
      </div>
    </QModalLayout>
  )
}

export default memo(SignUpModal)

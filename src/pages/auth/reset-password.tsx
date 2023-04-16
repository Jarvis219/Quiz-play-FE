import { EMIITER_CODE, MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD, RouterClient } from '@/constants'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { useLoadingContext } from '@/contexts/loading/LoadingContext'
import { Main, Meta } from '@/layouts'
import { EButtonType, EInputType, ENotificationType } from '@/types'
import { Emitter, validationMessages } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Auth } from '../api/user/auth'

const QInput = dynamic(() => import('@/components/base/QInput'), { ssr: false })
const QButton = dynamic(() => import('@/components/base/QButton'), { ssr: false })

const ResetPasswordPage = () => {
  const { query, push, isReady } = useRouter()
  const { setIsLoading } = useLoadingContext()
  const { isLoggedIn } = useAuthContext()
  const { showToast } = useToastContext()

  useEffect(() => {
    if (!isReady) return

    isLoggedIn && push(RouterClient.HOME)

    !query?.token && push(RouterClient.HOME)
  }, [isReady])

  const schema = z
    .object({
      password: z
        .string({
          required_error: validationMessages.required('Password'),
        })
        .min(MIN_LENGTH_PASSWORD, validationMessages.password(MIN_LENGTH_PASSWORD))
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

  const { control, handleSubmit } = useForm<{ password: string }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async ({ password }: { password: string }) => {
    if (!query?.token) return
    const token = query.token as string

    setIsLoading(true)
    await Auth.resetPassword({ password, token }).finally(() => setIsLoading(false))
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Password reset successfully',
    })
    push(RouterClient.HOME)
    Emitter.emit(EMIITER_CODE.SIGN_IN_MODAL)
  }

  const classesInput = 'rounded-3xl drop-shadow py-3 px-4 text-xs'
  const sizeMarginBottomInput = '0.7rem'

  return (
    <Main meta={<Meta title='Reset password' description='Reset password' />}>
      <Form
        layout='vertical'
        onFinish={handleSubmit(onSubmit)}
        className='max-w-md bg-white p-8 shadow-default rounded-lg mx-auto mt-10'>
        <QInput
          control={control}
          name='password'
          label='Password'
          type={EInputType.PASSWORD}
          className={classesInput}
          sizeMarginBottom={sizeMarginBottomInput}
          placeholder='Enter password'
          required
        />
        <QInput
          control={control}
          name='confirmPassword'
          label='Confirm password'
          type={EInputType.PASSWORD}
          className={classesInput}
          sizeMarginBottom={sizeMarginBottomInput}
          placeholder='Enter confirm password'
          required
        />
        <QButton
          onClick={handleSubmit(onSubmit)}
          type={EButtonType.primary}
          className='w-full rounded-3xl py-2 mt-3 !text-lg shadow-primary'>
          Reset password
        </QButton>
      </Form>
    </Main>
  )
}

export default ResetPasswordPage

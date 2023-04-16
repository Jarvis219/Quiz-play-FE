import { useAuthContext } from '@/contexts/auth/authContext'
import { EButtonType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const QButton = dynamic(() => import('../base/QButton'), { ssr: false })
const QInput = dynamic(() => import('../base/QInput'), { ssr: false })
const BoxActionAuth = dynamic(() => import('./BoxActionAuth'), { ssr: false })
const BoxUser = dynamic(() => import('./BoxUser'), { ssr: false })

const Overview = () => {
  const { isLoggedIn } = useAuthContext()

  const schema = z.object({
    code: z.string(),
  })

  const { control, handleSubmit } = useForm<{ code: string }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = ({ code }: { code: string }) => {
    // TODO: handle submit
  }

  return (
    <section className='lg:grid grid-cols-3 min-h-[10rem] gap-x-8'>
      <div className='col-span-2 rounded-2xl shadow-md flex justify-center items-center md:p-4'>
        <Form
          className='bg-gray-100 rounded-xl border-2 border-solid border-gray-200 p-1 w-full md:w-auto flex flex-col md:flex-row gap-1 items-center justify-center'
          onFinish={handleSubmit(onSubmit)}>
          <QInput control={control} name='code' className='w-full md:w-96' placeholder='Enter a join code' />
          <QButton
            onClick={handleSubmit(onSubmit)}
            type={EButtonType.primary}
            className='w-full md:w-auto py-2 px-3.5 !text-base bg-violet-500 hover:!bg-violet-600'>
            Join
          </QButton>
        </Form>
      </div>
      <div className='col-span-1 rounded-2xl shadow-md flex justify-center items-center mt-5 w-full p-4 md:p-8'>
        {isLoggedIn ? <BoxUser /> : <BoxActionAuth />}
      </div>
    </section>
  )
}

export default Overview

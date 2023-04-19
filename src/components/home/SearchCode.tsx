import { EButtonType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import QButton from '../base/QButton'
import QInput from '../base/QInput'

const SearchCode = () => {
  const schema = z.object({
    code: z.string(),
  })

  const { control, handleSubmit } = useForm<{ code: string }>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = ({ code }: { code: string }) => {
    console.log('code: ', code)
    // TODO: handle submit
  }
  return (
    <Form
      className='bg-gray-100 rounded-xl border-2 border-solid border-gray-200 p-3 w-full md:w-auto flex flex-col md:flex-row gap-1 items-center justify-center'
      onFinish={handleSubmit(onSubmit)}>
      <QInput control={control} name='code' className='w-full md:w-96' placeholder='Enter a join code' />
      <QButton
        onClick={handleSubmit(onSubmit)}
        type={EButtonType.primary}
        className='w-full md:w-auto py-1.5 px-3.5 md:mb-1 !text-base bg-violet-500 hover:!bg-violet-600 shadow-violet'>
        Join
      </QButton>
    </Form>
  )
}

export default memo(SearchCode)

import { RedditOutlined } from '@ant-design/icons'
import { memo, ReactNode } from 'react'

interface IComingsoonProps {
  className?: string
  children?: ReactNode
  title?: string
}

const Comingsoon = ({ children, className, title = 'Coming soon' }: IComingsoonProps) => {
  return (
    <section
      className={`w-full opacity-70 bg-gray-200 relative shadow-white rounded-3xl pointer-events-none ${
        className ?? ''
      }`}
      title='Coming soon'>
      <div className='w-full text-base opacity-10'>{children}</div>
      <div className='flex items-center justify-center text-base absolute inset-y-0 my-auto inset-x-0 mx-auto gap-x-2'>
        <RedditOutlined className=' text-violet-500' /> <p className='text-violet-500 text-sm font-medium'>{title}</p>
      </div>
    </section>
  )
}

export default memo(Comingsoon)

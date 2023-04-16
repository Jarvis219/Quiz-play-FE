import { RightOutlined } from '@ant-design/icons'
import { memo } from 'react'

const Avatar = () => {
  return (
    <section className='flex justify-between items-center cursor-pointer group'>
      <div className='group-hover:text-yellow-500'>
        <p className='text-sm font-semibold leading-5'>Avatar</p>
        <p className='text-sm font-normal text-gray-400 leading-4'>name</p>
      </div>
      <RightOutlined className='text-gray-400 text-xs flex flex-col justify-center items-center group-hover:text-yellow-500' />
    </section>
  )
}

export default memo(Avatar)

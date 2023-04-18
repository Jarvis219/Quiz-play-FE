import QImage from '@/components/base/QImage'
import { AvatarAPI } from '@/pages/api/avatar'
import { IAvatarResponse } from '@/types'
import { Radio } from 'antd'
import { memo, useEffect, useState } from 'react'

interface IProps {
  url: string
  setUrl: (url: string) => void
}

const ListAvatar = ({ url, setUrl }: IProps) => {
  const [avatars, setAvatars] = useState<IAvatarResponse[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState<string>(url)

  useEffect(() => {
    setSelectedAvatar(url)
  }, [url])

  useEffect(() => {
    fetchAvatars()
  }, [])

  const fetchAvatars = async () => {
    const res = await AvatarAPI.getAllAvatars()
    setAvatars(res)
  }

  const handleSelectAvatar = (data: string) => {
    setSelectedAvatar(data)
    setUrl(data)
  }

  return (
    <section className='mt-8 p-1 max-h-[580px] overflow-y-auto scroll-custom'>
      <Radio.Group
        value={selectedAvatar}
        className='grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-5 place-items-center'>
        {avatars.map((avatar) => (
          <div
            onClick={() => handleSelectAvatar(avatar.url)}
            key={avatar.id}
            className={`w-full h-32 bg-white rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-border-green ${
              avatar.url === selectedAvatar ? 'shadow-border-orange bg-orange-100' : 'shadow-border'
            }`}>
            <QImage src={avatar.url} width={96} height={96} />
            <Radio
              value={avatar.url}
              className='profile-custom-radio capitalize'
              checked={avatar.url === selectedAvatar}>
              {avatar.name}
            </Radio>
          </div>
        ))}
      </Radio.Group>
    </section>
  )
}

export default memo(ListAvatar)

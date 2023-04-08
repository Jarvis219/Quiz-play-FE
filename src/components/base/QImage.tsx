import { imageUrl } from '@/constants/images'
import { isEmpty } from '@/utils'
import Image from 'next/image'
import { memo, useEffect, useState } from 'react'

interface IQImageProps {
  src: string
  width: number
  height: number
  alt?: string
  className?: string
  unoptimized?: boolean
  lazy?: boolean
}

const QImage = ({
  src = imageUrl.defaultImage,
  alt = '',
  className = '',
  height = 124,
  width = 168,
  unoptimized = false,
  lazy = true,
}: IQImageProps) => {
  const classes = `aspect-square object-contain ${className}`
  const [photo, setPhoto] = useState(imageUrl.defaultImage)

  useEffect(() => {
    isEmpty(src) ? setPhoto(imageUrl.defaultImage) : setPhoto(src)
  }, [src])

  return (
    <Image
      src={photo}
      alt={alt}
      width={width}
      height={height}
      unoptimized={unoptimized}
      loading={lazy ? 'lazy' : 'eager'}
      className={classes}
      onError={() => setPhoto(imageUrl.defaultImage)}
    />
  )
}

export default memo(QImage)

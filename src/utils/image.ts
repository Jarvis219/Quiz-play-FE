import { MAX_SIZE, VALID_IMAGE_MIME_TYPES } from '@/constants'
import { RcFile } from 'antd/es/upload'

/**
 * Returns a promise that resolves with the base64 representation of a file.
 * @param file The file to be converted to base64
 */

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

// This function takes a file and checks if its type is one of the
// valid image MIME types.
export const checkTypeImage = (file: RcFile): boolean => {
  const { type } = file
  return VALID_IMAGE_MIME_TYPES.includes(type)
}
/**
 * Checks if the image size is less than 50MB.
 * @param file
 */
export const checkSizeImage = (file: RcFile): boolean => {
  const { size } = file
  return size <= MAX_SIZE
}

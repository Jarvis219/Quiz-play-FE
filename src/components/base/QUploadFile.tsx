import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { memo, useMemo, useState } from 'react'

interface IQUploadFileProps {
  onChange?: (fileList: UploadFile[]) => void
  value?: UploadFile[]
  maxCount?: number
  round?: boolean
}

const QUploadFile = ({ value, onChange, maxCount = 1, round = false }: IQUploadFileProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>(value || [])

  const getBase64 = useMemo(
    () =>
      (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = (error) => reject(error)
        }),
    []
  )

  const handleChange: UploadProps['onChange'] = useMemo(
    () =>
      ({ fileList: newFileList }) => {
        setFileList(newFileList)
        onChange && onChange(newFileList)
      },
    []
  )

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleCancel = () => setPreviewOpen(false)

  return (
    <div>
      <Upload
        listType={round ? 'picture-circle' : 'picture-card'}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}>
        {maxCount && fileList.length >= maxCount ? null : (
          <div className='text-sm'>
            <PlusOutlined />
            <p>Upload</p>
          </div>
        )}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default memo(QUploadFile)

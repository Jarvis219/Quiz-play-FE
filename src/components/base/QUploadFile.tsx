import { MAX_SIZE, SIZE_DEFAULT, STATUS_DEFAULT, TYPE_DEFAULT } from '@/constants'
import { checkSizeImage, checkTypeImage, getBase64, shortenText } from '@/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, UploadFile } from 'antd'
import { RcFile } from 'antd/es/upload'
import { memo, useCallback, useMemo, useState } from 'react'
import { Control, Controller, UseFormSetError } from 'react-hook-form'
import QHelperText from './QHelperText'

interface IQUploadFileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  setError: UseFormSetError<any>
  name: string
  maxCount?: number
  round?: boolean
  defaultValue?: UploadFile[] | string[]
}

const QUploadFile = ({ maxCount = 1, round = false, name, control, setError, defaultValue }: IQUploadFileProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const transformImageControl = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (file: any[]): UploadFile[] =>
        file?.map((item) => ({
          uid: item.uid || item,
          name: item.name || item,
          status: item.status || STATUS_DEFAULT,
          url: item.url || item,
          type: item.type || TYPE_DEFAULT,
          size: item.size || SIZE_DEFAULT,
          originFileObj: item.originFileObj || item,
        })),
    []
  )

  const handlePreview = async (file: UploadFile) => {
    if (typeof file.url !== 'string' || (!file.url && !file.preview)) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file?.preview || file?.url || '')
    setPreviewOpen(true)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange: any = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ fileList, onChange }: { fileList: any; onChange: (...event: any[]) => void }) => {
      for (const i of fileList) {
        if (!checkTypeImage(i)) {
          setError(name, {
            type: 'image',
            message: 'File type is not image',
          })
          return
        }

        if (!checkSizeImage(i)) {
          setError(name, {
            type: 'image',
            message: `File size is too large. Maximum size is ${MAX_SIZE}`,
          })
          return
        }
      }

      onChange(fileList)
    },
    []
  )

  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            <Upload
              listType={round ? 'picture-circle' : 'picture-card'}
              fileList={transformImageControl(field?.value) || []}
              onPreview={handlePreview}
              multiple={maxCount > 1}
              onChange={(e) => handleChange({ fileList: e.fileList, onChange: field.onChange })}>
              {maxCount && field?.value?.length >= maxCount ? null : (
                <div className='text-sm'>
                  <PlusOutlined />
                  <p>Upload</p>
                </div>
              )}
            </Upload>
            <QHelperText>{error?.message}</QHelperText>
          </>
        )}
      />

      <Modal
        open={previewOpen}
        title={shortenText(previewTitle, 50)}
        footer={null}
        onCancel={() => setPreviewOpen(false)}>
        <img alt={previewTitle} style={{ width: '100%' }} src={previewImage} loading='lazy' />
      </Modal>
    </div>
  )
}

export default memo(QUploadFile)

import { AppConfig } from '@/utils'
import { Editor } from '@tinymce/tinymce-react'
import { memo } from 'react'

interface IProps {
  onChange: (text: string) => void
  valueText: string
  readonly?: boolean
  height?: number
}

const TinyEditor = ({ onChange, valueText, readonly = false, height = 200 }: IProps) => {
  const init = {
    height,
    readonly,
    menubar: false,
    plugins: 'link image code table autolink',
    toolbar:
      'casechange blocks | bold italic underline | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist checklist outdent indent | removeformat link table',
    content_css: 'light',
    // skin: 'oxide-dark', use this for dark mode
  }

  return <Editor onEditorChange={onChange} apiKey={AppConfig.tinyMCEApiKey} value={valueText} init={init} />
}

export default memo(TinyEditor)

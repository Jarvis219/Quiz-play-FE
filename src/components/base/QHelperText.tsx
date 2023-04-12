import { ReactNode } from 'react'

interface IQHelperTextProps {
  children: ReactNode
}

const QHelperText = ({ children }: IQHelperTextProps) => {
  const prefix = '!'
  return <p className='text-xs text-red-500 mt-1.5'>{children && children + prefix}</p>
}

export default QHelperText

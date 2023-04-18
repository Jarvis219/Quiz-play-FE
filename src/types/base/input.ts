import { ControllerRenderProps, FieldError } from 'react-hook-form'

export enum EInputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url',
}

export interface IInputElementProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>
  error: FieldError | undefined
}

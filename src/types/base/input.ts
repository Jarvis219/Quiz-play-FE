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
  field: ControllerRenderProps<any, string>
  error: FieldError | undefined
}

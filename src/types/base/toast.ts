import { CSSProperties, ReactNode } from 'react'

export enum ENotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum ENotificationPlacement {
  TOP_LEFT = 'topLeft',
  TOP_RIGHT = 'topRight',
  BOTTOM_LEFT = 'bottomLeft',
  BOTTOM_RIGHT = 'bottomRight',
}

export type NotificationType =
  | ENotificationType.SUCCESS
  | ENotificationType.INFO
  | ENotificationType.WARNING
  | ENotificationType.ERROR

export type NotificationPlacement =
  | ENotificationPlacement.TOP_LEFT
  | ENotificationPlacement.TOP_RIGHT
  | ENotificationPlacement.BOTTOM_LEFT
  | ENotificationPlacement.BOTTOM_RIGHT

export const TOAST_DEFAULT_DURATION = 3000

export type IToast = {
  type: NotificationType
  message: string
  show?: boolean
  description?: string
  duration?: number
  icon?: ReactNode
  style?: CSSProperties
  className?: string
  placement?: NotificationPlacement
}

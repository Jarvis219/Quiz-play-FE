import { EMIITER_CODE } from '@/constants'
import { ENotificationPlacement, ENotificationType, IToast, TOAST_DEFAULT_DURATION } from '@/types'
import { Emitter } from '@/utils'
import { notification } from 'antd'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

type TContext = {
  showToast: (toast: IToast) => void
}

const initContext: TContext = {
  showToast: () => void 0,
}

const ToastContext = createContext<TContext>(initContext)

const initToast: IToast = {
  type: ENotificationType.SUCCESS,
  message: '',
  description: '',
  duration: TOAST_DEFAULT_DURATION,
  icon: null,
  style: {},
  className: '',
  placement: ENotificationPlacement.TOP,
  show: false,
}

// eslint-disable-next-line @typescript-eslint/ban-types
const ToastProvider = (props: PropsWithChildren<{}>) => {
  const [api, contextHolder] = notification.useNotification()
  const [toast, setToast] = useState<IToast>(initToast)

  useEffect(() => {
    if (!toast.show) return

    api[toast.type]({
      message: toast.message,
      description: toast.description,
      duration: toast.duration,
      icon: toast.icon,
      style: toast.style,
      className: toast.className,
      placement: toast.placement,
    })
  }, [toast])

  const showToast = (data: IToast) => setToast({ ...toast, ...data, show: true })

  useEffect(() => {
    Emitter.on(EMIITER_CODE.TOAST, showToast)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {props.children}
      {contextHolder}
    </ToastContext.Provider>
  )
}

export default ToastProvider

export function useToastContext(): TContext {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}

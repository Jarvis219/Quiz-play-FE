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
  const [toast, setToast] = useState<IToast>(initToast)
  const showToast = (toast: IToast) => setToast({ ...toast, show: true })
  const [api, contextHolder] = notification.useNotification()

  const hanleShow = () => {
    api[toast.type]({
      message: toast.message,
      description: toast.description,
      duration: toast.duration,
      icon: toast.icon,
      style: toast.style,
      className: toast.className,
      placement: toast.placement,
    })
  }

  useEffect(() => {
    if (!toast.show) return
    hanleShow()
    setToast(initToast)
  }, [toast])

  useEffect(() => {
    Emitter.on('toast', showToast)
  })

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

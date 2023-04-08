import { ENotificationType } from '@/types'
import { AppConfig, Emitter, getJwtToken } from '@/utils'
import axios from 'axios'

// This is a comment describing the code below.
// -- It creates a new axios instance, and sets the base URL
// -- It sets the content type header to application/json
export const request = axios.create({
  baseURL: AppConfig.api_base_url,
  headers: {
    'Content-Type': 'application/json',
  },
})

// This code intercepts all requests that are made using the `publicRequest` object.
// It is used to set the `Authorization` header to the `Bearer` token.
// The token is retrieved from local storage using the `getJwtToken` function.
export const publicRequest = axios.create({
  baseURL: AppConfig.api_base_url,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${getJwtToken()}`,
  }

  return config
})

request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (!error?.response?.data) {
      Emitter.emit('toast', {
        message: 'error when send request',
        type: ENotificationType.ERROR,
      })
      return
    }
    const { message } = error.response.data
    Emitter.emit('toast', { message, type: ENotificationType.ERROR })
    return Promise.reject(error)
  }
)

import { EMIITER_CODE } from '@/constants'
import { ENotificationType } from '@/types'
import { AppConfig, Emitter, getJwtToken } from '@/utils'
import axios, { AxiosRequestConfig } from 'axios'

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

publicRequest.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${getJwtToken()}`,
  }

  return config
})

publicRequest.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (!error?.response?.data) {
      Emitter.emit(EMIITER_CODE.TOAST, {
        message: 'error when send request',
        type: ENotificationType.ERROR,
      })
      return
    }

    const { message } = error.response.data
    Emitter.emit(EMIITER_CODE.TOAST, { message, type: ENotificationType.ERROR })
    return Promise.reject(error)
  }
)

/**
 * @description This function is responsible for fetching data from the API.
 * @param {string} url - The url of the API endpoint.
 * @param {AxiosRequestConfig} config - The configuration object for the request.
 * @returns {Promise<any>} - The data returned by the API.
 * @throws {Error} - The error thrown by the API.
 */
export const fetcher = (url: string, config: AxiosRequestConfig = {}) =>
  publicRequest(url, config)
    .then((res) => res?.data)
    .catch((err) => {
      throw err
    })

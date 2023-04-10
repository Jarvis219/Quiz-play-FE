import { IncomingMessage } from 'http'

export type TRequest = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string
  }>
}

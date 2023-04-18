import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void

const Emitter = {
  on: (event: string, callback: Callback) => eventEmitter.on(event, callback),
  once: (event: string, callback: Callback) => eventEmitter.once(event, callback),
  off: (event: string, callback: Callback) => eventEmitter.off(event, callback),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit: (event: string, ...args: any[]) => eventEmitter.emit(event, ...args),
}

Object.freeze(Emitter)

export { Emitter }

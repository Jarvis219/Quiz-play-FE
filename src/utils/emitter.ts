import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()
type Callback = (...args: any[]) => void

const Emitter = {
  on: (event: string, callback: Callback) => eventEmitter.on(event, callback),
  once: (event: string, callback: Callback) => eventEmitter.once(event, callback),
  off: (event: string, callback: Callback) => eventEmitter.off(event, callback),
  emit: (event: string, ...args: any[]) => eventEmitter.emit(event, ...args),
}

Object.freeze(Emitter)

export { Emitter }

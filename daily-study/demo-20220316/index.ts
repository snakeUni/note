import { States, State, Handler } from './type'

const Util = {
  isFunction(val: any) {
    return val && typeof val === 'function'
  },

  isObject(val: any) {
    return val && typeof val === 'object'
  }
}

export class Promisee<T = any> {
  private state: State = 'pending'
  private value: any
  private handlers: Handler<T>[] = []

  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  private resolve(value: T) {
    if (this.hasResolved()) return
    this.setState({ state: 'fulfilled', value })
    this.scheduleHandler()
  }

  private reject(reason?: any) {
    if (this.hasResolved()) return
    this.setState({ state: 'rejected', value: reason })
    this.scheduleHandler()
  }

  private hasResolved() {
    return this.isFulfilled() || this.isRejected()
  }

  private isPending() {
    return this.state === 'pending'
  }

  private isFulfilled() {
    return this.state === 'fulfilled'
  }

  private isRejected() {
    return this.state === 'rejected'
  }

  private setState(nextState: States<T>) {
    if (this.isPending()) {
      this.state = nextState.state
      this.value = nextState.value
    }
  }

  private scheduleHandler() {
    for (let i = 0; i < this.handlers.length; i++) {
      const handler = this.handlers[i]
      if (this.isFulfilled() && Util.isFunction(handler.onfulfilled)) {
        handler.onfulfilled?.(this.value)
      } else if (this.isRejected() && Util.isFunction(handler.onrejected)) {
        handler.onrejected?.(this.value)
      }
    }
  }

  private pushHandlers<TResult1 = T, TResult2 = never>(
    onfulfilled: ((value: T) => TResult1) | undefined | null,
    onrejected: ((reason: any) => TResult2) | undefined | null
  ) {
    this.handlers.push({
      onfulfilled,
      onrejected
    })
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1) | undefined | null,
    onrejected?: ((reason: any) => TResult2) | undefined | null
  ) {
    switch (this.state) {
      // 可能构造函数中是一个异步
      case 'pending': {
        return new Promisee((resolve, reject) => {
          this.pushHandlers(
            value => {
              try {
                resolve(onfulfilled?.(value))
              } catch (error) {
                reject(error)
              }
            },
            reason => {
              try {
                resolve(onrejected?.(reason))
              } catch (error) {
                reject(error)
              }
            }
          )
        })
      }
      case 'fulfilled': {
        return new Promisee((resolve, reject) => {
          setTimeout(() => {
            try {
              resolve(onfulfilled?.(this.value))
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
      case 'rejected': {
        return new Promisee((resolve, reject) => {
          setTimeout(() => {
            try {
              resolve(onrejected?.(this.value))
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    }
  }

  /**
   * 捕获错误
   * @param onrejected
   * @returns
   */
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult) | undefined | null
  ) {
    return new Promisee((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(onrejected?.(this.value))
        } catch (error) {
          reject(error)
        }
      }, 0)
    })
  }

  /**
   * The finally clause is always executed in the end, regardless of whether the try block throws an
   * exception or not
   * @param {(() => void) | undefined | null} [onfinally] - A function that will be called when the
   * promise is resolved, even if the promise is rejected.
   */
  finally(onfinally?: (() => void) | undefined | null) {
    return this.then(
      value => {
        onfinally?.()
        return value
      },
      reason => {
        onfinally?.()
        throw reason
      }
    )
  }
}

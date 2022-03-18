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
    // 2.3.1 规则 If promise and x refer to the same object, reject promise with a TypeError as the reason.
    if ((value as any) === this) {
      throw new TypeError('resolving object can not be the same object')
    } else if (value instanceof Promisee) {
      // 2.3.2. If x is a promise, adopt its state [3.4]:
      value.then(this.resolve.bind(this), this.reject.bind(this))
    } else if (Util.isFunction(value) || Util.isObject(value)) {
      // Otherwise, if x is an object or function
      // 2.3.3.3.3. If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
      let hasCalled = false
      try {
        const then = (value as any).then
        // 2.3.3.3. If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
        if (Util.isFunction(then)) {
          // call it with x as this
          then.call(
            value,
            (result: any) => {
              // 2.3.3.3.1. If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
              // 2.3.3.3.3. 规则
              if (!hasCalled) {
                this.resolve(result)
              }
              hasCalled = true
            },
            (error: any) => {
              // 2.3.3.3.2. If/when rejectPromise is called with a reason r, reject promise with r.
              // 2.3.3.3.3. 规则
              if (!hasCalled) {
                this.reject(error)
              }
              hasCalled = true
            }
          )
        } else {
          // 2.3.3.4. If then is not a function, fulfill promise with x.
          this.fulfill(value)
        }
      } catch (error) {
        // If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
        if (!hasCalled) {
          // 2.3.3.3.4. If calling then throws an exception e,
          // 2.3.3.3.4.1. If resolvePromise or rejectPromise have been called, ignore it.
          // 2.3.3.3.4.2. Otherwise, reject promise with e as the reason.
          this.reject(error)
        }
      }
    } else {
      // 2.3.4. If x is not an object or function, fulfill promise with x.
      this.fulfill(value)
    }
  }

  private fulfill(value: T) {
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

  private isFulfilled() {
    return this.state === 'fulfilled'
  }

  private isRejected() {
    return this.state === 'rejected'
  }

  private setState(nextState: States<T>) {
    this.state = nextState.state
    this.value = nextState.value
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
              setTimeout(() => {
                try {
                  if (Util.isFunction(onfulfilled)) {
                    resolve(onfulfilled?.(value))
                  } else {
                    resolve(value)
                  }
                } catch (error) {
                  reject(error)
                }
              }, 0)
            },
            reason => {
              setTimeout(() => {
                try {
                  if (Util.isFunction(onrejected)) {
                    resolve(onrejected?.(reason))
                  } else {
                    reject(reason)
                  }
                } catch (error) {
                  reject(error)
                }
              }, 0)
            }
          )
        })
      }
      case 'fulfilled': {
        return new Promisee((resolve, reject) => {
          setTimeout(() => {
            try {
              if (Util.isFunction(onfulfilled)) {
                resolve(onfulfilled?.(this.value))
              } else {
                resolve(this.value)
              }
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
              if (Util.isFunction(onrejected)) {
                resolve(onrejected?.(this.value))
              } else {
                reject(this.value)
              }
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

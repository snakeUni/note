import { MyPromise, States, State } from './type'

class Promisee<T> {
  #states: States<T> | null = null

  constructor(
    fn: (resolve: (value: T) => void, reject: (reason?: any) => void) => void
  ) {
    const innerResolve = (value: T) => {
      this.#setState({ state: 'fulfilled', value })
    }
    const innerReject = (reason?: any) => {
      this.#setState({ state: 'rejected', reason })
    }
    fn(innerResolve, innerReject)
  }

  #setState(nextState: States<T>) {
    if (this.#states.state === 'pending') {
      this.#states.state = nextState.state
      nextState.state === 'fulfilled'
        ? (this.#states.value = nextState.value)
        : (this.#states.reason = nextState.reason)
    }
  }
}

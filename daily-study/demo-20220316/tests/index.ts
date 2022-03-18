import { Promisee } from '../src/index'
import promisesAplusTests from 'promises-aplus-tests'

const adapter = {
  deferred() {
    const did: any = {}
    did.promise = new Promisee((resolver, reject) => {
      did.resolve = resolver
      did.reject = reject
    })
    return did
  }
}
promisesAplusTests(adapter, function (err: any) {
  // All done; output is in the console. Or check `err` for number of failures.
})

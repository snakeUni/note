"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promisee = void 0;
const Util = {
    isFunction(val) {
        return val && typeof val === 'function';
    },
    isObject(val) {
        return val && typeof val === 'object';
    }
};
class Promisee {
    constructor(executor) {
        this.state = 'pending';
        this.handlers = [];
        executor(this._resolve.bind(this), this._reject.bind(this));
    }
    _resolve(value) {
        if (this.hasResolved())
            return;
        // 2.3.1 规则 If promise and x refer to the same object, reject promise with a TypeError as the reason.
        if (value === this) {
            throw new TypeError('resolving object can not be the same object');
        }
        else if (value instanceof Promisee) {
            // 2.3.2. If x is a promise, adopt its state [3.4]:
            value.then(this._resolve.bind(this), this._reject.bind(this));
        }
        else if (Util.isFunction(value) || Util.isObject(value)) {
            // Otherwise, if x is an object or function
            // 2.3.3.3.3. If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
            let hasCalled = false;
            try {
                const then = value.then;
                // 2.3.3.3. If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
                if (Util.isFunction(then)) {
                    // call it with x as this
                    then.call(value, (result) => {
                        // 2.3.3.3.1. If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
                        // 2.3.3.3.3. 规则
                        if (!hasCalled) {
                            this._resolve(result);
                        }
                        hasCalled = true;
                    }, (error) => {
                        // 2.3.3.3.2. If/when rejectPromise is called with a reason r, reject promise with r.
                        // 2.3.3.3.3. 规则
                        if (!hasCalled) {
                            this._reject(error);
                        }
                        hasCalled = true;
                    });
                }
                else {
                    // 2.3.3.4. If then is not a function, fulfill promise with x.
                    this.fulfill(value);
                }
            }
            catch (error) {
                // If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
                if (!hasCalled) {
                    // 2.3.3.3.4. If calling then throws an exception e,
                    // 2.3.3.3.4.1. If resolvePromise or rejectPromise have been called, ignore it.
                    // 2.3.3.3.4.2. Otherwise, reject promise with e as the reason.
                    this._reject(error);
                }
            }
        }
        else {
            // 2.3.4. If x is not an object or function, fulfill promise with x.
            this.fulfill(value);
        }
    }
    fulfill(value) {
        if (this.hasResolved())
            return;
        this.setState({ state: 'fulfilled', value });
        this.scheduleHandler();
    }
    _reject(reason) {
        if (this.hasResolved())
            return;
        this.setState({ state: 'rejected', value: reason });
        this.scheduleHandler();
    }
    hasResolved() {
        return this.isFulfilled() || this.isRejected();
    }
    isFulfilled() {
        return this.state === 'fulfilled';
    }
    isRejected() {
        return this.state === 'rejected';
    }
    setState(nextState) {
        this.state = nextState.state;
        this.value = nextState.value;
    }
    scheduleHandler() {
        var _a, _b;
        for (let i = 0; i < this.handlers.length; i++) {
            const handler = this.handlers[i];
            if (this.isFulfilled() && Util.isFunction(handler.onfulfilled)) {
                (_a = handler.onfulfilled) === null || _a === void 0 ? void 0 : _a.call(handler, this.value);
            }
            else if (this.isRejected() && Util.isFunction(handler.onrejected)) {
                (_b = handler.onrejected) === null || _b === void 0 ? void 0 : _b.call(handler, this.value);
            }
        }
    }
    pushHandlers(onfulfilled, onrejected) {
        this.handlers.push({
            onfulfilled,
            onrejected
        });
    }
    then(onfulfilled, onrejected) {
        switch (this.state) {
            // 可能构造函数中是一个异步
            case 'pending': {
                return new Promisee((resolve, reject) => {
                    this.pushHandlers(value => {
                        setTimeout(() => {
                            try {
                                if (Util.isFunction(onfulfilled)) {
                                    resolve(onfulfilled === null || onfulfilled === void 0 ? void 0 : onfulfilled(value));
                                }
                                else {
                                    resolve(value);
                                }
                            }
                            catch (error) {
                                reject(error);
                            }
                        }, 0);
                    }, reason => {
                        setTimeout(() => {
                            try {
                                if (Util.isFunction(onrejected)) {
                                    resolve(onrejected === null || onrejected === void 0 ? void 0 : onrejected(reason));
                                }
                                else {
                                    reject(reason);
                                }
                            }
                            catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });
                });
            }
            case 'fulfilled': {
                return new Promisee((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            if (Util.isFunction(onfulfilled)) {
                                resolve(onfulfilled === null || onfulfilled === void 0 ? void 0 : onfulfilled(this.value));
                            }
                            else {
                                resolve(this.value);
                            }
                        }
                        catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
            case 'rejected': {
                return new Promisee((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            if (Util.isFunction(onrejected)) {
                                resolve(onrejected === null || onrejected === void 0 ? void 0 : onrejected(this.value));
                            }
                            else {
                                reject(this.value);
                            }
                        }
                        catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        }
    }
    /**
     * If the promise is rejected, the onrejected callback is called with the reason. If the callback
     * returns a value, the promise is resolved with that value. If the callback returns undefined or
     * null, the promise is rejected with the same reason
     * @param {((reason: any) => TResult) | undefined | null} [onrejected] - A function that will be
     * called if the promise is rejected.
     * @returns A Promisee.
     */
    catch(onrejected) {
        return new Promisee((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(onrejected === null || onrejected === void 0 ? void 0 : onrejected(this.value));
                }
                catch (error) {
                    reject(error);
                }
            }, 0);
        });
    }
    /**
     * The finally clause is always executed in the end, regardless of whether the try block throws an
     * exception or not
     * @param {(() => void) | undefined | null} [onfinally] - A function that will be called when the
     * promise is resolved, even if the promise is rejected.
     */
    finally(onfinally) {
        return this.then(value => {
            onfinally === null || onfinally === void 0 ? void 0 : onfinally();
            return value;
        }, reason => {
            onfinally === null || onfinally === void 0 ? void 0 : onfinally();
            throw reason;
        });
    }
    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    static resolve(value) {
        return new Promisee(resolve => {
            resolve(value);
        });
    }
    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    static reject(reason) {
        return new Promisee((_, reject) => {
            reject(reason);
        });
    }
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    static all(values) {
        return new Promisee((resolve, reject) => {
            const nums = values.length;
            let resolvedCount = 0;
            const result = new Array(nums);
            for (let i = 0; i < nums; i++) {
                Promisee.resolve(values[i])
                    .then(res => {
                    resolvedCount++;
                    result.push(res);
                    if (resolvedCount === nums.length) {
                        return resolve(result);
                    }
                })
                    .catch(error => {
                    reject(error);
                });
            }
        });
    }
    static race(values) {
        return new Promisee((resolve, reject) => {
            for (let i = 0; i < values.length; i++) {
                Promisee.resolve(values[i])
                    .then(res => {
                    resolve(res);
                })
                    .catch(error => {
                    reject(error);
                });
            }
        });
    }
    static any(values) {
        return new Promisee((resolve, reject) => {
            let rejectedCount = 0;
            const rejectedError = [];
            for (let i = 0; i < values.length; i++) {
                Promisee.resolve(values[i])
                    .then(res => {
                    resolve(res);
                })
                    .catch(error => {
                    rejectedCount++;
                    rejectedError.push(error);
                    if (rejectedCount === values.length) {
                        // 这里暂时无法模拟，因为目前错误属于实践性的
                    }
                });
            }
        });
    }
}
exports.Promisee = Promisee;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const promises_aplus_tests_1 = __importDefault(require("promises-aplus-tests"));
const adapter = {
    deferred() {
        const did = {};
        did.promise = new index_1.Promisee((resolver, reject) => {
            did.resolve = resolver;
            did.reject = reject;
        });
        return did;
    }
};
(0, promises_aplus_tests_1.default)(adapter, function (err) {
    // All done; output is in the console. Or check `err` for number of failures.
});

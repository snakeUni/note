# ECMA 的规范类型

+ [Reference](https://tc39.es/ecma262/#sec-reference-specification-type)
+ [List](https://tc39.es/ecma262/#sec-list-and-record-specification-type)
+ [Completion](https://tc39.es/ecma262/#sec-completion-record-specification-type)
+ [Property Descriptor](https://tc39.es/ecma262/#sec-property-descriptor-specification-type)
+ [Lexical Environments](https://tc39.es/ecma262/#sec-lexical-environments)
+ [Environment Records](https://tc39.es/ecma262/#sec-environment-records)
+ [Data Blocks](https://tc39.es/ecma262/#sec-data-blocks)

## Await

Algorithm steps that say

> Let completion be Await(value).

mean the same thing as:

1. Let `asyncContext` be the running execution context.
2. Let promise be ? `PromiseResolve`(%Promise%, value).
3. Let `stepsFulfilled` be the algorithm steps defined in Await `Fulfilled` Functions.
4. Let `onFulfilled` be ! `CreateBuiltinFunction`(stepsFulfilled, « [[AsyncContext]] »).
5. Set `onFulfilled`.[[AsyncContext]] to `asyncContext`.
6. Let `stepsRejected` be the algorithm steps defined in Await `Rejected` Functions.
7. Let `onRejected` be ! `CreateBuiltinFunction`(stepsRejected, « [[AsyncContext]] »).
8. Set `onRejected`.[[AsyncContext]] to asyncContext.
9. Perform ! `PerformPromiseThen`(promise, onFulfilled, onRejected).
10. Remove asyncContext from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
11. Set the code evaluation state of asyncContext such that when evaluation is resumed with a Completion completion, the following steps of the algorithm that invoked Await will be performed, with completion available.
12. Return.
13. NOTE: This returns to the evaluation of the operation that had most previously resumed evaluation of `asyncContext`.

## What is [[This]]

From time to time, you may see the [[Notation]] being used like "Let proto be obj.[[Prototype]]." This notation can technically mean several different things depending on the context in which it appears, but you would go a long way with the understanding that this notation refers to some internal property that is not observable through JavaScript code.

Precisely, it can mean three different things, which I will illustrate with examples from the specification. Feel free to skip them for now, however.

### A field of a Record

The ECMAScript spec uses the term Record to refer to a key-value map with a fixed set of keys – a bit like a structure in C-like languages. Each key-value pair of a Record is called a field. Because Records can only appear in specifications and not in actual JavaScript code, it makes sense to use the [[Notation]] to refer to fields of a Record.

> Notably, Property Descriptors are also modeled as Records with fields `[[Value]]`, `[[Writable]]`, `[[Get]]`, `[[Set]]`, [[Enumerable]], and 
> `[[Configurable]]`. The IsDataDescriptor abstract operation uses this notation extensively:

> When the abstract operation IsDataDescriptor is called with Property Descriptor Desc, the following steps are taken:

```html
1. If Desc is undefined, return false.
2. If both Desc.[[Value]] and Desc.[[Writable]] are absent, return false.
3. Return true.
```

### An internal slot of a JavaScript Object

JavaScript Objects may have so-called internal slots that the specification uses to keep data in them. Like Record fields, these internal slots also cannot be observed using JavaScript, but some of them may be exposed through implementation-specific tools like Google Chrome’s DevTools. Thus, it makes sense also to use the [[Notation]] to describe internal slots.

The specifics of internal slots will be covered in § 2.5 JavaScript Objects. For now, don’t worry too much about what they are used for, but do note the following example.

>Most JavaScript Objects have an internal slot `[[Prototype]]` that refers to the Object they inherit from. The value of this internal slot is usually the value that Object.getPrototypeOf() returns. In the OrdinaryGetPrototypeOf abstract operation, the value of this internal slot is accessed:

>When the abstract operation OrdinaryGetPrototypeOf is called with Object O, the following steps are taken:
>Return O.[[Prototype]].

### An internal method of a JavaScript Object

JavaScript Objects may also have so-called internal methods. Like internal slots, these internal methods are not directly observable through JavaScript. Thus, it makes sense also to use the [[Notation]] to describe internal methods.

The specifics of internal methods will be covered in § 2.5 JavaScript Objects. For now, don’t worry too much about what they are used for, but do note the following example.

> All JavaScript functions have an internal method [[Call]] that runs that function. The Call abstract operation has the following step:
> > Return ? F.[[Call]](V, argumentsList).

> where F is a JavaScript function object. In this case, the [[Call]] internal method of F is itself called with arguments V and argumentsList.

> Note: This third sense of the [[Notation]] can be distinguished from the rest by looking like a function call.

## Completion Records; ? and !

Every runtime semantic in the ECMAScript spec either explicitly or implicitly returns a Completion Record that reports its outcome. This Completion Record is a Record that has three possible fields:

- a `[[Type]]` (`normal`, `return`, `throw`, `break`, or `continue`)
- if the `[[Type]]` is `normal`, `return`, or `throw`, then it can also have a `[[Value]]` ("what’s returned/thrown")
- if the `[[Type]]` is `break` or `continue`, then it can optionally carry a label known as `[[Target]]` that script execution breaks from/continues to as a result of this runtime semantic

A Completion Record whose [[Type]] is normal is called a normal completion. Every Completion Record other than a normal completion is also known as an abrupt completion.

Most of the time, you are only going to deal with abrupt completions whose [[Type]] is throw. The other three abrupt completion types are only useful in seeing how a specific syntactic element is evaluated. In fact, you will never see any of those other types in the definition of a built-in function, since `break/continue/return` don’t work across function boundaries.

---

Sometimes, it can convey more information to the reader about the spec’s intent if we know that a particular call to AbstractOp will never return an abrupt completion. In those cases, an exclamation mark (!) is used:

A few steps that call an abstract operation that cannot ever throw with an exclamation mark (!):

1. Let result be ! AbstractOp().

>  Note: While ? forwards any errors we may have gotten, ! asserts that we never get any abrupt completions from this call, and it would be a bug in the specification if we did. Like the case with ?, we don’t deal with Completion Records at all. result is ready to use immediately after.

2. result is the result we need. We can now do more things with it.

`CAUTION`

The ! can admittedly become pretty confusing if it looks like a valid JavaScript expression:

> Let b be ! ToBoolean(value).

> — Excerpted from Boolean().

Here, the ! just means that we are certain that this call to ToBoolean will `never return an exception`, not that the result is inverted!

## ReturnIfAbrupt Shorthands

Invocations of abstract operations and syntax-directed operations that are prefixed by ? indicate that ReturnIfAbrupt should be applied to the resulting Completion Record. For example, the step:

> ? OperationName().

is equivalent to the following step:

> ReturnIfAbrupt(OperationName()).

Similarly, for method application style, the step:

> ? someValue.OperationName().

is equivalent to:

> ReturnIfAbrupt(someValue.OperationName()).

Similarly, prefix ! is used to indicate that the following invocation of an abstract or syntax-directed operation will never return an abrupt completion and that the resulting Completion Record's [[Value]] field should be used in place of the return value of the operation. For example, the step:

> Let val be ! OperationName().

is equivalent to the following steps:

1. Let `val` be `OperationName()`.
2. Assert: `val` is never an `abrupt completion`.
3. If `val` is a `Completion Record`, set val to val.[[Value]].

Syntax-directed operations for runtime semantics make use of this shorthand by placing ! or ? before the invocation of the operation:

> Perform ! SyntaxDirectedOperation of NonTerminal.

## Number::exponentiate ( base, exponent )

Returns an implementation-dependent approximation of the result of raising base to the power exponent.

- If exponent is NaN, the result is NaN.
- If exponent is +0, the result is 1, even if base is NaN.
- If exponent is -0, the result is 1, even if base is NaN.
- If base is NaN and exponent is nonzero, the result is NaN.
- If abs(base) > 1 and exponent is +∞, the result is +∞.
- If abs(base) > 1 and exponent is -∞, the result is +0.
- If abs(base) is 1 and exponent is +∞, the result is NaN.
- If abs(base) is 1 and exponent is -∞, the result is NaN.
- If abs(base) < 1 and exponent is +∞, the result is +0.
- If abs(base) < 1 and exponent is -∞, the result is +∞.
- If base is +∞ and exponent > 0, the result is +∞.
- If base is +∞ and exponent < 0, the result is +0.
- If base is -∞ and exponent > 0 and exponent is an odd integer, the result is -∞.
- If base is -∞ and exponent > 0 and exponent is not an odd integer, the result is +∞.
- If base is -∞ and exponent < 0 and exponent is an odd integer, the result is -0.
- If base is -∞ and exponent < 0 and exponent is not an odd integer, the result is +0.
- If base is +0 and exponent > 0, the result is +0.
- If base is +0 and exponent < 0, the result is +∞.
- If base is -0 and exponent > 0 and exponent is an odd integer, the result is -0.
- If base is -0 and exponent > 0 and exponent is not an odd integer, the result is +0.
- If base is -0 and exponent < 0 and exponent is an odd integer, the result is -∞.
- If base is -0 and exponent < 0 and exponent is not an odd integer, the result is +∞.
- If base < 0 and base is finite and exponent is finite and exponent is not an integer, the result is NaN.

## Number::multiply ( x, y )

The * MultiplicativeOperator performs multiplication, producing the product of x and y. Multiplication is commutative. Multiplication is not always associative in ECMAScript, because of finite precision.

The result of a floating-point multiplication is governed by the rules of IEEE 754-2019 binary double-precision arithmetic:

- If either operand is NaN, the result is NaN.
- The sign of the result is positive if both operands have the same sign, negative if the operands have different signs.
- Multiplication of an infinity by a zero results in NaN.
- Multiplication of an infinity by an infinity results in an infinity. The sign is determined by the rule already stated above.
- Multiplication of an infinity by a finite nonzero value results in a signed infinity. The sign is determined by the rule already stated above.
- In the remaining cases, where neither an infinity nor NaN is involved, the product is computed and rounded to the nearest representable value using IEEE 754-2019 roundTiesToEven mode. If the magnitude is too large to represent, the result is then an infinity of appropriate sign. If the magnitude is too small to represent, the result is then a zero of appropriate sign. The ECMAScript language requires support of gradual underflow as defined by IEEE 754-2019.

## Number::divide ( x, y )

The / MultiplicativeOperator performs division, producing the quotient of x and y. x is the dividend and y is the divisor. ECMAScript does not perform integer division. The operands and result of all division operations are double-precision floating-point numbers. The result of division is determined by the specification of IEEE 754-2019 arithmetic:

- If either operand is NaN, the result is NaN.
- The sign of the result is positive if both operands have the same sign, negative if the operands have different signs.
- Division of an infinity by an infinity results in NaN.
- Division of an infinity by a zero results in an infinity. The sign is determined by the rule already stated above.
- Division of an infinity by a nonzero finite value results in a signed infinity. The sign is determined by the rule already stated above.
- Division of a finite value by an infinity results in zero. The sign is determined by the rule already stated above.
- Division of a zero by a zero results in NaN; division of zero by any other finite value results in zero, with the sign determined by the rule already stated above.
- Division of a nonzero finite value by a zero results in a signed infinity. The sign is determined by the rule already stated above.
- In the remaining cases, where neither an infinity, nor a zero, nor NaN is involved, the quotient is computed and rounded to the nearest representable value using IEEE 754-2019 roundTiesToEven mode. If the magnitude is too large to represent, the operation overflows; the result is then an infinity of appropriate sign. If the magnitude is too small to represent, the operation underflows and the result is a zero of the appropriate sign. The ECMAScript language requires support of gradual underflow as defined by IEEE 754-2019.


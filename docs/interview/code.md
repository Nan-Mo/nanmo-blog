# 编码题

## JavaScript 编码能力

### 数组去重

```js
var array = [1, 2, 1, 1, '1']
function unique(array) {
  var res = array.filter(function (item, index, array) {
    return array.indexOf(item) === index
  })
  return res
}
```

### 数组扁平化

1. reduce + 递归

```js
var array = [1, 2, 3, [4], 5]
function flat(arr) {
  return arr.reduce((totalArr, currentValue) => {
    return totalArr.concat(Array.isArray(currentValue) ? flat(currentValue) : currentValue)
  }, [])
}
console.log(flat(a))
```

2. for + 递归

```js
var a = [1, 2, 3, [4], [5, 6, 7]]
function flat(arr) {
  var flatArr = []
  for (var i = 0; i < arr.length; i++) {
    var currentValue = arr[i]
    if (Array.isArray(currentValue)) {
      flatArr = flatArr.concat(flat(currentValue))
    } else {
      flatArr.push(currentValue)
    }
  }
  return flatArr
}
console.log(flat(a))
```

### 深拷贝对象

```js
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {}

    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}
```

### 防抖与节流

防抖 (debounce): 将多次高频操作优化为只在最后一次执行。通常使用的场景是：用户输入，只需在输入完成后做一次输入校验即可。

```js
function debounce(fn, wait) {
  var timer
  var context = this
  return function () {
    var args = arguments
    clearTimeout(timer)

    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}
```

节流(throttle): 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作。通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms 执行一次即可。

```js
function throttle(fn, wait) {
  var saveTime = 0
  return function () {
    var now = +new Date()
    if (now - saveTime > wait) {
      fn.apply(this, arguments)
      saveTime = now
    }
  }
}
```

### 实现 curryAdd(1)(2)(3)相加

判断参数的长度是不是大于等于函数参数的长度

```js
const curry = (fn, ...args) =>
  args.length >= fn.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args)

function add(x, y, z) {
  return x + y + z
}

const curryAdd = curry(add)

curryAdd(1)(2)(3)
```

## 手动实现前端轮子

### 模拟一个 new 的实现

1. 创建一个新对象
2. 将函数的 prototype 赋值给新对象
3. 使用 apply 执行函数，绑定新对象为 this 指向
4. 判断函数返回值，如果是值类型则返回新对象，如果是引用类型则返回该引用类型。

```js
function newFunction(constructor) {
  if (typeof constructor !== 'function') {
    throw new TypeError('请传入函数')
  }
  let args = Array.prototype.slice.call(arguments, 0)

  let obj = Object.create(constructor.prototype)
  let res = constructor.apply(obj, args)

  let isFunction = typeof res === 'function'
  let isObject = typeof res === 'object' && res != null
  isFunction || isObject ? res : obj
}
```

### 模拟一个 bind 的实现

```js
Function.prototype.bind1 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('bind只提供给函数使用')
  }
  var fn = this
  var args = Array.prototype.slice.call(arguments, 1)
  var callBackFn = function () {
    var innerArgs = Array.prototype.slice.call(arguments)
    fn.apply(this instanceof self ? this.__prototype : context, args.concat(innerArgs))
  }

  callBackFn.prototype = Object.create(this.prototype)

  return callBackFn
}
```

### 模拟一个 call 的实现

```js
Function.prototype.call2 = function (bindContenxt) {
  var context = bindContext || window
  context.fn = this

  var args = Array.prototype.slice.call(arguments, 1)

  var result = eval('context.fn(' + args + ')')
  delete context.fn

  return result
}
```

### 模拟一个 apply 的实现

```js
Function.prototype.apply2 = function (bindContext, arr) {
  var context = bindContext || window
  context.fn = this
  var result
  if (arr.length > 0) {
    result = eval('context.fn(' + arr + ')')
  } else {
    result = eval('context.fn()')
  }

  delete context.fn

  return result
}
```

### Promise 之问(三) —— Promise 如何实现链式调用？

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  var self = this
  self.state = PENDING
  self.value = null
  self.error = null
  self.onFulfillCallBack = []
  self.onRejctedCallBack = []
  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED
      self.value = value
      while (self.onFulfillCallBack.length) {
        self.onFulfillCallBack.shift()(value)
      }
    }
  }
  function reject(error) {
    if (self.state === PENDING) {
      self.state = state
      self.value = error
      while (self.onRejctedCallBack.length) {
        self.onRejctedCallBack.shift()(error)
      }
    }
  }

  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejcted) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (error) => {
          throw error
        }
  var self = this
  var bridgePrmise = new MyPromise((resolve, reject) => {
    function fulfilledMicrotask() {
      queueMicrotask(() => {
        try {
          var x = onFulfilled(self.value)
          resolvePromise(bridgePrmise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }

    function rejectedMicrotask() {
      queueMicrotask(() => {
        try {
          var x = onRejcted(self.error)
          resolvePromise(bridgePrmise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }

    if (self.state === PENDING) {
      self.onFulfillCallBack.push(fulfilledMicrotask)
      self.onRejctedCallBack.push(rejectedMicrotask)
    } else if (self.state === FULFILLED) {
      fulfilledMicrotask()
    } else if (self.state === REJECTED) {
      rejctedMicrotask()
    }
  })
  return bridgePrmise
}

function resolvePromise(bridgePrmise, x, resolve, reject) {
  if (bridgePrmise === x) {
    return reject(new TypeError('The Promise and the return value are same'))
  }

  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      return reject(x)
    }
    let then
    try {
      then = x.then
    } catch (error) {
      reject(error)
    }
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(bridgePrmise, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (error) {
        if (called) return
        reject(error)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

MyPromise.prototype.finally = function (callback) {
  this.then((value) => {
    return MyPromise.resolve(callback()).then(() => {
      return value
    })
  })

  this.then((error) => {
    return MyPromise.resolve(callback()).then(() => {
      return error
    })
  })
}

MyPromise.resolve = (value) => {
  if (value instanceof MyPromise) {
    return value
  }
  return new MyPromise((resolve) => {
    resolve(value)
  })
}

MyPromise.reject = (error) => {
  return new MyPromise(_, (reject) => {
    reject(error)
  })
}

MyPromise.resolve()
  .then(() => {
    console.log(0)
    return MyPromise.resolve(4)
  })
  .then((res) => {
    console.log(res)
  })

MyPromise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
```

### 实现 Promise.all

```js
MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let result = []
    let index = 0
    let length = promises.length
    if (promises === 0) {
      return result
    }

    for (var i = 0; i < length; i++) {
      MyPromise.resolve(promises[i])
        .then((res) => {
          result[i] = res
          index++
          if (index === length) resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

const promise1 = MyPromise.resolve(3)
const promise2 = 42
const promise3 = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

MyPromise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values)
})
```

### 实现 Promise.race

```js
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    let length = promises.length
    if (length === 0);
    return
    for (let i = 0; i < i.length; i++) {
      MyPromise.resolve(promises[i])
        .then((res) => {
          resolve(res)
          return
        })
        .catch((err) => {
          reject(err)
          return
        })
    }
  })
}
```

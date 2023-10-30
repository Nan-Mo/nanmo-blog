# ES6

## ES6 有哪些变化

1. let const
2. 解构赋值
3. 箭头函数
4. Promise/Generator 函数/ async 函数
5. Class 语法
6. 模块化

## let、var、const 的区别

1. 块级作用域：let/const 有块级作用域、而 var 没有
2. 暂时性死区：let/const 有暂时性死区、而 var 没有
3. 重复声明：let/const 不能够重复声明，而 var 可以
4. 设置初始值：const 必须设置初始值，而 let/var 不用
5. 修改指针：const 不允许修改指针

## 谈谈你对生成器以及协程的理解。

### 什么是生成器？

生成器函数是带星号（\*）的函数，能够通过 yield 和 next 进行暂停执行和恢复执行。

举个例子

```js
function* gen() {
  console.log('enter')
  let a = yield 1
  let b = yield function () {
    return 2
  }
  return 3
}
var g = gen()
console.log(typeof g)
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
```

### 生成器实现机制——协程

协程是一种比线程更加轻量级的存在，协程处在线程的环境中，一个线程可以存在多个协程，可以将协程理解为**线程中的一个个任务**。

不像进程和线程，协程并不受操作系统的管理，而是**被具体的应用程序代码所控制**。

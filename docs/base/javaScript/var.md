# 什么是变量

大多数的程序都需要跟踪值的变化，因为程序在执行任务的过程中会执行各种操作，值会不断发生变化。

要在程序中实现这一点，最简单的办法就是将值赋值给一个符号，这个符号称为**变量**。

在一些语言中需要声明一个变量存放指定类型的值（如数字），称之为**静态类型**。这样可以保证值类型的不可变性。人们认为**静态类型**提高了程序的正确性。这也是我们日常开发中很多项目引入 TypeScript 的原因之一。

我们都知道 JavaScript 变量是可以保存各种类型的，这样的叫做**动态类型**，而且不需要在声明时指定类型，所以叫做**弱类型**语言。人们认为方式比较灵活。

# 变量声明

有三个关键字可以声明变量`var`、`let`、`const`。`var`是 JavaScript 一开始就有的，`let`、`const`是为了解决一些`var`存在的问题，在 ES6 推出的。

接下来看看用 var 声明一个 JavaScript 变量

```js
var name
```

很简单，这样就完成了一个变量的声明。接着我们可以给这个变量赋值。

```js
name = '南墨'
name = 200 // 体现了JavaScript变量的灵活性，合法，但是开发中不推荐
```

可以看到我们先将 name 赋值成字符又赋值成数字，在 JavaScript 中是允许的。

## var 声明

### 作用域

在函数内通过 var 声明的变量，会变成函数的局部变量，也就是说函数销毁了，变量也就没了。

```js
function query() {
  var name = '南墨'
}
query()
console.log(name) // 错误
```

name 报错了是因为函数执行完就摧毁了，所以就报错了。不过有个办法可以不报错，那就是省略掉 name 前面的 var

```js
function query() {
  name = '南墨'
}
query()
console.log(name) // 南墨
```

很自然的输出了南墨，因为去掉 var 后，name 变成了全局变量。只要调用一次函数 query，就会定义这个变量，并且可以在函数外部访问到。

### 声明提升

如果声明一个变量之前，调用这个变量会如何？像下面这样

```js
function fn() {
  console.log(age)
  var age = 18
}
fn()
```

age 输出的 undefined。

以我们正常的思维考虑，一段代码应该是自上而下的。没声明的变量怎么可以使用呢？

再来考虑一下另一段代码

```js
a = 2
var a
console.log(a)
```

很多人肯定会认为这段代码输出的是`undefined`，他们认为`a`在`a = 2`之后又重新被赋值了。但是真正输出的结果是 2。

两个问题都没办法一下子理解过来。那么到底发生了什么？

要搞清楚这个原因（提升）的本质，就需要理解 javaScript 引擎是如何运行的？

JavaScript 引擎会在解释 javaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来。

简单理解，变量在被声明过程要经历三个阶段：**[创建 create、初始化 initialize、 和赋值 assign]**。

来看下代码片段

```js
function fn() {
  console.log(age)
  var age = 18
}
fn()
```

在执行 fn 时，会有以下过程：

- 进入 `fn`，为 `fn` 创建一个环境
- 找到 `fn` 中所有用 var 声明的变量，在这个环境中**创建**（编译阶段）这些变量（即 age）
- 将这些变量**初始化**为`undefined`。
- 开始执行代码
- 将 age 变量赋值为`18`，即`age = 18`

也就是说 var 声明会在代码执行之前就将**创建变量，并将其初始化为 undefined**。

因此，正确的思考思路是，**所有变量都会在任何代码被执行前被处理（初始化）**。

当你看到 `var age = 18` 时，可能会认为这是一个声明。但是 JavaScript 实际上将其看成两个部分：` var age` 和 `age = 18`。

第一个声明变量在初始化阶段（编译阶段进行的）。第二个赋值会被留在原地等待执行阶段。

所以我们的第一段代码会以如下形式进行处理：

```js
function fn() {
  var age = 18
  console.log(age)
}
fn()
```

其中第一部分是编译，而第二部分是执行。

类似地，第二段代码实际是按照

```js
var a
console.log(a)
a = 2
```

这个过程就好像变量申明从它们在代码被“移动”到了最顶部。这个过程就叫做“提升”。

### 重复声明

var 声明可以多次声明同一个变量，如以下代码

```js
function foo() {
  var age = 16
  var age = 26
  var age = 36
  console.log(age)
}
foo() // 36
```

## let 声明

let 和 var 差不多。
与 var 不同点在于

### 作用域

- let 声明的范围是块作用域，而 var 声明的范围是函数作用域

```js
if (true) {
  var name = '南墨'
  console.log(name)
  1 // 南墨
}
console.log(name)
2 // 南墨
```

`(1)`处输出南墨好理解，`(2)` 处能够输出南墨是为什么？

因为`var`是函数作用域，这里`var`把全局当作它的函数作用域，做了一次变量提升。操作过程就好比：

```js
var name
if (true) {
  name = '南墨'
  console.log(name)
}
console.log(name)
```

这样`(2)`处输出南墨就很好理解了。

### 声明提升

```js
console.log(name) // undefined
var name = '南墨'
```

这里为什么输出`undefined`，相信认真看过上文`var`的声明提升的伙伴都很了解了。

那么 let 存在提升吗？

来看一个例子

```js
{
  let age = 18
  x = 28
}
```

let 也按 **[创建、初始化和赋值]** 过程:

- 找到所有用 let 声明的变量，在环境中**创建**这些变量
- 开始执行代码（注意还没有开始初始化）
- 如果`age`存在初始值，就将 `age` **初始化**为 `18`，否则**初始化**为 undefined。
- 执行 `age = 28`，对`age`进行**赋值**

再来看个例子

```js
{
  console.log(name) // name is not defined
  let name = '南墨'
}
```

也按照上面的过程

- 找到所有用 let 声明的变量，在环境中**创建**这些变量
- 开始执行代码，即`console.log(name)`。因为还没初始化所以直接报错了

看到这里，你应该明白了 let 到底有没有提升

1.  let 的**创建**过程被提升了，但是**初始化**没有提升。（也就是所谓的**暂时性死区**）
2.  var 的**创建**和**初始化**都被提升了。

什么是**暂时性死区**？

`let`声明的变量，在使用之前不能用任何方式出现在代码中。`let`声明之前的执行阶段瞬间被称为`暂时性死区`，在这阶段如果在 let 声明之前使用了变量都会抛出`ReferenceError`。

### 重复声明

在这里 let 重复声明会报错，而上文提到过 var 是可以重复声明而不报错。

```js
let name = '南墨'
let name = '小明' // Uncaught SyntaxError: Identifier 'name' has already been declared
```

### 全局作用域

当在全局作用域使用`var`声明的时候，会创建一个新的全局变量作用全局对象的属性

```js
var name = '南墨'
console.log(window.name) // '南墨'
```

而 let 不会

```js
let name = '南墨'
cnsole.log(window.name) // undefined
```

## const 声明

const 的行为与 let 基本相同，唯一的区别是，const 在声明时必须要初始化变量，且修改 const 声明的变量会导致运行时报错。

### 作用域

`const` 声明的作用域范围也是块级的

```js
if (true) {
  const name = '南墨'
}
console.log(name) // 报错
```

### 声明提升

来看个例子

```js
console.log(name) // Uncaught ReferenceError: name is not defined
const name = '南墨'
```

和`let`一样，`const` 也是因为存在暂时性死区导致报错，而且声明过程和`let`一样，只是没有赋值阶段。

### 重复声明

从实例中可以看出，const 也不允许重复声明

```js
const name = '南墨'
const name = '小明' // Uncaught SyntaxError: Identifier 'name' has already been declared
```

### 不支持修改

`const` 在声明之后就不可以修改变量

```js
const MAX_NUM = 2
MAX_NUM = 3 // Uncaught TypeError: Assignment to constant variable.
```

# for 循环中的声明

## 循环体外输出值

我们先来看个例子

```js
for (var i = 0; i < 10; i++) {
  // 循环内容
}
console.log(i) // 10
```

使用`var`在`for`循环括号中声明的`i`，可以在循环体外输出。

改成使用`let`之后，这个问题就消失了，因为**let 声明的变量的作用域仅限于 for 循环块内部**。

```js
for (let i = 0; i < 10; i++) {
  // 循环内容
}
console.log(i) // Uncaught ReferenceError: i is not defined
```

## 循环体内输出值

```js
for (var i = 0; i < 10; i++) {
  console.log(i)
}
```

这个循环输出`0 1 2 3 4 5 6 7 8 9`

换成 let 呢？

```js
for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

也是输出`0 1 2 3 4 5 6 7 8 9`

这样都没问题，我们来看看另一个例子

```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(i))
}
```

一开始学 JavaScript 的时候我以为会输出`0 1 2 3 4 5 6 7 8 9 10`, 但实际输出的是 10 个 `10`

为什么会这样呢？

之所以会这样是因为在退出循环的时候，迭代的变量保存的是导致循环退出的值: `10`。在之后执行超时逻辑时，所有的`i`都是同一个变量，因而输出的都是同一个最终值。

我们写个伪代码理解：

```js
;((i) => setTimeout(() => console.log(i)))(10)((i) => setTimeout(() => console.log(i)))(10)((i) =>
  setTimeout(() => console.log(i))
)(10)((i) => setTimeout(() => console.log(i)))(10)((i) => setTimeout(() => console.log(i)))(10)(
  (i) => setTimeout(() => console.log(i))
)(10)((i) => setTimeout(() => console.log(i)))(10)((i) => setTimeout(() => console.log(i)))(10)(
  (i) => setTimeout(() => console.log(i))
)(10)((i) => setTimeout(() => console.log(i)))(10)
```

改成 let 看看,

```js
for (let i = 0; i < 10; i++) {
  setTimeout(() => console.log(i))
}
```

正常输出`0 1 2 3 4 5 6 7 8 9`

上文中提到 `let 声明不提升`，`不能重复声明`等等特性，用之前的知识我们好像没办法给自己一个解释。

有两个疑惑的点

- 如果是不重复声明，在循环第二次的时候，又用 let 声明了 i，应该报错才对
- 就算能重复声明，因为代码中依然只有一个变量 i，在 for 循环结束后，i 的值还是会变成 `10` 才对。

想深入研究为什么前面所学的知识都不适用了，需要忘记之前的那行特性，因为在 for 循环中不适用。

经过阅读[ ECMAScript 规范 13.7.4.7 节](https://link.juejin.cn/?target=http%3A%2F%2Fwww.ecma-international.org%2Fecma-262%2F6.0%2F%23sec-for-statement-runtime-semantics-labelledevaluation 'http://www.ecma-international.org/ecma-262/6.0/#sec-for-statement-runtime-semantics-labelledevaluation')，可以简单的归纳一下

- 在  `for (let i = 0; i < 3; i++)`  中，即圆括号之内建立一个隐藏的作用域
- **for( let i = 0; i< 5; i++) { 循环体 } 在每次执行循环体之前，JS 引擎会把 i 在循环体的上下文中重新声明及初始化一次**

其他细节不再细说。

也就是使用在 for 循环中使用 let 声明的变量可以近似地理解为

```js
for (let i = 0; i < 10; i++) {
  let i = 隐藏作用域中的i // 看这里看这里看这里
  setTimeout(() => console.log(i))
}
```

那就是说，10 次循环，就会有 10 个不同的 i。可以理解为**每次迭代循环时都创建一个新变量，并以之前迭代中同名变量的值将其初始化**。
上面的代码就相当于可以写成

```js
// 伪代码
(let i = 0) {
    setTimeout(() => console.log(i))
}
(let i = 1) {
    setTimeout(() => console.log(i))
}
(let i = 2) {
    setTimeout(() => console.log(i))
}
(let i = 3) {
    setTimeout(() => console.log(i))
}
(let i = 4) {
    setTimeout(() => console.log(i))
}
(let i = 5) {
    setTimeout(() => console.log(i))
}
(let i = 6) {
    setTimeout(() => console.log(i))
}
(let i = 7) {
    setTimeout(() => console.log(i))
}
(let i = 8) {
    setTimeout(() => console.log(i))
}
(let i = 9) {
    setTimeout(() => console.log(i))
}
(let i = 10) {
    setTimeout(() => console.log(i))
}
```

# 最佳实践

经过前面的学习，我们来总结一下。

在上文提到过 let 和 const 的出现就是为了改正 var 的许多问题而出现的

随着这两个关键字的出现，新的最佳实践也逐渐显现。

- 一般建议不使用 var

有了 let 和 const，大多数开发者会发现自己不再需要 var 了。限制自己只使用 let 和 const 有助于提升代码质量，因为变量有了明确的作用域、声明位置，以及不变的值。

- const 优先，let 次之

在我们开发的时候，为了保护变量，我认为只要变量后续不再改变那就默认使用 const，只有当确实需要修改变量的值时才使用 let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量之的改变是很多 bug 的源头。

参考文献：

《JavaScript 高级程序设计（第 4 版）》

《你不知道 JavaScript（下）》

[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)

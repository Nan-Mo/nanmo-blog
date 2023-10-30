# React

react 面试题

### React 的生命周期

挂载：

constructor: 初始化 state、为处理事件绑定 this
static getderivedStateFromProps：如果 state 的值都取决于 Props，可以用这个钩子
render: 渲染函数，返回需要渲染的东西，可以是 DOM、React 组件等等
Didmount: 挂载后立即执行，可以在此钩子发起网络请求、添加订阅

更新：

static getderivedStateFromProps
shouldComponentUpdate: 有两个参数 nextProps 和 NextStates，表示新的属性和变化之后的 props 和 state，返回一个布尔值默认为 true，true 表示重新渲染，false 表示不渲染，可以通过此钩子做性能优化。
render
beforUpdate: 两个参数 prevProps，prevState，这个钩子有一个返回值，会传给 didUpdate 的第三个参数，必须搭配 Didupdate 使用。
如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程放在此钩子， componentDidUpdate 中统一触发回调或更新状态。

DidUpdate: 三个参数 prevProps，prevState，snapshot，表示之前的 Props、state、以及 beforUpdate 传递过来的值，更新后立即执行，可以用于对比更新前后的 state 来判断是否进行后面的操作

卸载：

willUnmount: 卸载前执行，必须在此钩子中清除定时器、取消网络请求、或者清除在 Didmount 中添加的订阅。

### React 的请求应该放在哪个生命周期中?

放在 DidMount 或者有条件判断的 DidUpdate 中，
放在 WillMount 会有可能导致多次调用的问题。

### React 中的 key

- key 是 react 在渲染一系列相同类型的兄弟元素时，给每个元素指定一个唯一的值，来帮助 React 识别哪些元素改变了。

- 避免在某些场景下，元素的错误渲染，比如添加和删除。

- 提升 React 的渲染性能：在使用 diff 算法对比 react 更新前后两棵树的比较时，使得树的转换效率得以提高，组件实例基于它们的 key 来决定是否更新以及复用。

### setState 到底是异步还是同步?

先给出答案: 有时表现出异步,有时表现出同步

1. setState 只在**合成事件**和**钩子函数**中为异步的，在**原生事件**和**setTimeout**中是同步的。

2. setState 中的异步不是说，内部由异步代码实现，而是合成事件和钩子函数的调用都在更新之前。

### 组件通信

- 父组件向子组件传递：props

- 子组件向父组件传递：在父组件中定义一个回调函数，在通过 props 将该函数传递给子组件，子组件就可以通过调用该函数将信息传递给父组件。

- 同级组件之间的信息传递：通过状态提升

- 跨层级传递信息：使用状态管理库、context、可以自定义事件（发布订阅者模式）

### 你是如何理解 React-fiber 的?

fiber 产生的背景

- react 16.0 之前渲染过程会递归比对 VirtualDOM 树，并且更新是同步的，如果要更新一个庞大的组件，那么 js 占据主线程时间过长，会导致页面响应速度变差，使得 react 在动画、手势等应用中表现的较差。

为了解决这一问题出现了 React 通过 Fiber 架构，让更新渲染过程变的可切断，适当的让出 CPU 执行权，这样做可以让浏览器及时响应用户的操作

Fiber 树：react 在 render 函数调用时，生成了一个 Elemnt 树，可以称之为虚拟 DOM 树，由于要记录上下文信息，加入到了 Firbe 中，每个 Elemnt 都有对于的 Firbe Node。

将 fiber Node 链接起来就成了 Fiber Tree。

Fiber Tree 的特点是链表结构循环遍历然后配合 requestIdleCallback 实现任务拆分、终端恢复。

### React 的 hooks

1. useState
   相当于 class 组件中的 this.setState()

2. useEffect

Effect Hook 执行副作用操作, 还可以进行清除订阅

3. useReducer

useState 的替换方案，例如用于处理 state 逻辑较复杂且包含多个子值、下一个 state 依赖于之前的 state 等

4. useContext

useContext(MyContext)相等于 class 组件中的 <MyContext.Consumer>，用于读取 context 的值和订阅 context 的变化

5. useMemo

用于优化高开销的计算优化

6. useRef

配合 ref 使用，用于获取元素 DOM 属性

### 是否了解 diff 算法

diff 算法

当对比两个元素的时候，React 首先对比两棵树的根元素。不同情况有不用的形态。

第一种，当两个根元素的类型不同的时候，react 会卸载原有的数并建立新的树。

第二种，当两个根元素的类型相同时，react 仅对比及更新属性。

第三种，当对比两个组件元素的时候，组件实例会保持不变，只会更新 Props 属性来保证与最新的元素保持一致。

第四种，当元素下面有多个类似的元素时，比如 li。那么在添加时，如果向头部插入会比在尾部插入开销来的大，引入在头部插入
React 意识不到元素的变化，只会重新构建每一个元素。

为了解决这个问题 React 引入了 key 属性，假如给每一个 li 加入 key 之后，再向头部加入一个新的 li，那么 React 可以根据 key 能够知道原来的元素可以复用
只是移动了而已。key 的值可以是数组下标，这在不重新排序的情况下是适合的，否则就会使 diff 变慢。

### 虚拟 dom

1. 定义

虚拟 DOM 是一种 DOM 节点 的抽象数据结构。

2. 作用

比起使用虚拟 DOM 后更新真实 DOM，直接浏览器操作 DOM 的代表更加昂贵，频繁操作 DOM 会产生性能问题。

虚拟 DOM 是根据每一次响应式数据引起的变化，去对比前后的虚拟 DOM，匹配出需要更新的节点，再去让真实的 DOM 更新。

3. 实现原理

- 用 js 对象模拟真实 DOM，对真实 DOM 进行抽象。

- diff 算法 —— 比较两颗虚拟 DOM 数的差异

- patch 算法 —— 将两颗虚拟 DOM 对比的结果应用到真正的树。

### React 合成事件机制

1. 含义

React 中有自己的事件系统模式，通常被称为 React 合成事件。

2. 作用

- 为了抹平事件在不同平台体现出来的差异性，这使得 React 开发者不需要自己再去关注浏览器事件兼容性问题；

- 为了统一管理事件，提高性能。

3. 原理

不会把事件处理机制直接绑在真实节点上，而是把事件绑定在 document，使用一个统一的事件监听器。

当事件挂在或者卸载时，只是在这个统一的事件监听器上插入或删除；

当事件发生时，首先被这个统一的事件监听器处理，然后通过事件映射表找到真实的处理函数来执行。

这样做简化了事件处理和回收机制。

### React 性能优化方案

- 减少不必要渲染，如用 shouldComponentUpdate、PureComponent、React.memo 实现

- 数据缓存

  - useMemo 缓存参数、useCallback 缓存函数
  - 函数、对象尽量不要使用内联形式(如 context 的 value object、refs function)
  - Route 中的内联函数渲染时候使用 render 或者 children，不要使用 component， 当你用 component 的时候，Router 会用指定的组件和 React.createElement 创建一个新 的[React elment]。这意味着当你提供的是一个内联函数的时候，每次创建 render 都会创建一个新的组件。这会导致不再更新已经现有组件，⽽是直接卸载然后再去挂载⼀个新的 组件。因此，当⽤到内联函数的内联渲染时，请使⽤ render 或者 children。

- 懒加载，对于长页表分页加载

- 减少 http 请求

### 高阶组件

1. 含义

高阶组件是参数为组件，返回值为新组件的函数

2. 作用

我们需要一个抽象，允许我们在一个地方定义这个逻辑，并在许多组件之间共享它。这正是高阶组件擅长的地方。

3. 注意事项

- 不要改变原始组件，使用组合的方式。

- 在 HOC 中将不相关的 props, 传入新的组件

- HOC，不仅只有一个参数：组件，也可以传入别的参数

- HOC 包装时，显示组件名称，便于调试。

- 不要在 render 中使用 HOC

- HOC 包装时，务必复制静态方法

- Refs 不会被传递，这个问题的解决方案是通过使用 React.forwardRef

### React.PureComponent 的作用

当组件的 props 或 state 改变时，React.PureComponent 能够自动执行 shouldComponentUpdate，去进行浅比较，浅比较只能对比基本类型的数据
无法对比引用类型的数据。所以 React.PureComponent 比较适合用于纯组件或者 Props 或 state 为基本类型的组件。

### Context

1. 何时使用 Context: 当组件树需要一个共享的“全局”数据时使用，使用场景例如：全局主题、全局语言

2. API

- React.createContext: 创建一个 context
- Class.contextType: 挂载在 class 上的属性，可以用创建的 React.createContext()赋值，然后在组件中通过 this.context 来获取最近的 context 的值
- Context.Consumer： 在 Context.Consumer 中放一个函数组件，在将 context 值传递给函数组件

### React-Router 的路由有几种模式？

HashRouter: 带#
BrowserRouter: 不带#，美观，上线后需要后端处理.

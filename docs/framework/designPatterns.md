# 设计模式

所有的设计模式都是基于 SOLID 原则进行的

分别是创建型模式、结构型模式和行为型模式

- 创建型：**主要解决创建对象的问题**

工厂、抽象工厂、**单例**、建造者、原型。

- 结构型：**主要解决类或对象的组合或组装**

**代理**、**适配器**、**装饰者**、外观、桥架、**组合**、**享元**。

- 行为型：**类或对象之间的交互**

**策略**、**迭代器**、**模板**、**观察者**、**中介者**、**状态**、**责任链模式**、**命令**、访问者、备忘录、解释器。

## 为什么需要设计模式

让代码解耦，使代码清晰阅读，更健壮，可扩展和易于维护。

- **创建型作用**：创建型关注对象的创建方式和实例化过程。它们提供了一种封装对象创建的机制，使得系统更加灵活、可扩展和可维护。

  创建型设计模式主要解决对象创建的问题，包括如何创建和组装对象、如何管理对象的生命周期以及如何隐藏对象的创建细节等。这些模式在对象创建过程中提供了一定程度的抽象和封装，使得客户端代码与具体的对象创建方式解耦，从而提高了代码的灵活性和可维护性。

- **结构型的作用**：结构型关注如何组织不同实体之间的关系以及它们之间的结构。

  结构型设计模式解决的核心问题包括如何构建实体之间的关联、如何实现实体的组合、如何处理实体之间的不兼容性等。这些设计模式旨在帮助开发人员更好地组织和管理软件系统中的各个组成部分，使得系统更易于理解、扩展和维护。

  结构型设计模式通常关注以下几个方面：

  1. 实体的组合：如何将类和对象以一种有机的方式组合在一起，形成复杂的结构，同时保持各个部分的独立性。
  2. 接口和实现的关系：如何处理不同接口之间的不兼容性，以及如何让它们能够协同工作。
  3. 继承和组合：如何利用继承和组合关系来构建对象之间的层次结构，以实现代码重用和灵活性。
  4. 对象的适配和转换：如何处理已有对象接口的不匹配问题，使得它们能够适配客户端的需求。

  因此，结构型设计模式是一种关注软件系统中实体之间的组织结构和关系的设计模式，旨在提供一种灵活、可扩展和易于维护的设计方案，以解决实体之间的结构性问题。

- **型为型**：它关注对象之间的通信和协作方式，以及如何将责任和行为分配给不同的对象。行为型设计模式主要用于解决对象之间的交互和通信问题，使系统更加灵活、可扩展和易于维护。

## 前端常用的设计模式

创建型：工厂方法、单例、原型

结构性：适配器、装饰器、代理、享元

行为型：迭代器、观察者

## 创建型

### 工厂

把函数当作工厂一样创建对象，工厂的作用就是负责创建一个实例之后把**主要工作交给子类**

例如：jQuery 的$、react 的 createElement

### 单例

一个类只能创建一个实例的模式

例如：状态管理库、登录框、浏览器中的 window 对象等

```js
var getSingle = function (fn) {
  var result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}
```

### 原型

克隆现有实例生成新的实例

```js
var a = {
  name: '1'
}
var b = Object.create(a)
```

## 结构型

其实就是一个实体中耦合了多种功能时，考虑是否需要使用的设计模式类型。

### 代理

一个对象不方便直接处理一块逻辑时，把这个逻辑交给另一个对象（代理）去处理。

例如下面代码，如果是一个很大的函数

```js
var MyImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  var img = new Image()
  img.onload = function () {
    imgNode.src = img.src
  }
  return {
    setSrc: function (src) {
      imgNode.src = 'file:// /C:/Users/svenzeng/Desktop/loading.gif'
      img.src = src
    }
  }
})()
```

上段代码中的 MyImage 对象除了负责给 img 节点设置 src
外，还要负责预加载图片。我们在处理其中一个职责时，有可能因为其强耦合性影响另外一个职责的实现。

使用代理模式后

```js
var myImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()
var proxyImage = (function () {
  var img = new Image()
  img.onload = function () {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif')
      img.src = src
    }
  }
})()
```

代理模式还有许多子模式，例如缓存代理：使用场景有 useMemo。

```js
/**************** 计算乘积 *****************/
var mult = function () {
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }
  return a
}
/**************** 计算加和 *****************/
var plus = function () {
  var a = 0
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i]
  }
  return a
}
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = fn.apply(this, arguments))
  }
}
var proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus)
alert(proxyMult(1, 2, 3, 4)) // 输出：24
alert(proxyMult(1, 2, 3, 4)) // 输出：24
alert(proxyPlus(1, 2, 3, 4)) // 输出：10
alert(proxyPlus(1, 2, 3, 4)) // 输出：10
```

### 适配器

用于解决两个实体之间的兼容性而出现的模式。

可以解决两个实体的 api 不同或者数据结构不同的问题。

举例说明：

当我们向 `googleMap` 和 `baiduMap` 都发出“显示”请求时，`googleMap`
和 `googleMap` 分别以各自的方式在页面中展现了地图：

```js
var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  }
}
var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图')
  }
}
var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show()
  }
}
renderMap(googleMap) // 输出：开始渲染谷歌地图
renderMap(baiduMap) // 输出：开始渲染百度地图
```

上面代码可以顺利运行，但是假如 baiduMap 提供的显示地图的方法不叫 show 而叫
display 呢？此时我们可以通过增加 baiduMapAdapter 来解决问题：

```js
// ...
var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图')
  }
}

var baiduMapAdapter = {
  show: function () {
    return baiduMap.display()
  }
}

var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show()
  }
}

renderMap(googleMap) // 输出：开始渲染谷歌地图
renderMap(baiduMapAdapter) // 输出：开始渲染百度地图
```

### 装饰者

动态的给实体添加功能而不影响实体的衍生实体的一种模式

举例说明：

```js
var plane = {
  fire: function () {
    console.log('发射普通子弹')
  }
}

var missileDecorator = function () {
  console.log('发射导弹')
}

var atomDecorator = function () {
  console.log('发射原子弹')
}

var fire1 = plane.fire

plane.fire = function () {
  fire1()
  missileDecorator()
}

var fire2 = plane.fire
plane.fire = function () {
  fire2()
  atomDecorator()
}

plane.fire()
```

还有就是 AOP 编程：AOP 编程就是面向切面编程，和装饰者有着一样的意思。

就是当我们执行一个函数的时候，我们可以在不影响函数内部功能的情况下添加额外的功能的一种编程方式

举例说明：

```js
var before = function (fn, beforefn) {
  return function () {
    beforefn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

// 第一个参数是原函数，后面的函数是希望加的函数
var a = before(
  // 不想影响这块的函数
  function () {
    alert(3)
  },
  function () {
    alert(2)
  }
)

// a = before( a, function(){alert (1);} );

a()
```

### 组合

它可以将对象组织成树形结构，从而形成部分-整体的层次关系。在组合模式中，有两种主要类型的对象：叶子对象和容器对象。

叶子对象表示树结构的最底层节点，它们没有子节点。容器对象表示树结构的中间和顶层节点，它们可以包含子节点，可以是叶子对象，也可以是其他容器对象。通过将叶子对象和容器对象组合起来，可以形成复杂的树形结构。

组合模式的核心思想是通过统一的方式对待单个对象和组合对象，使得客户端可以以一致的方式处理它们。这种统一的方式是通过定义一个抽象的组件类，它声明了叶子对象和容器对象共同的操作。叶子对象和容器对象都继承自该抽象组件类，并实现各自的操作。

因此，组合模式的结构体现了对象之间的递归组合关系，以及对待单个对象和组合对象的统一处理方式

### 享元

使用场景：如果系统中有大量类似的对象，那么就可以用享元模式

不使用享元模式的情况下：

```js
var Model = function (sex, underwear) {
  this.sex = sex
  this.underwear = underwear
}
Model.prototype.takePhoto = function () {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}
for (var i = 1; i <= 50; i++) {
  var maleModel = new Model('male', 'underwear' + i)
  maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
  var femaleModel = new Model('female', 'underwear' + j)
  femaleModel.takePhoto()
}
```

使用后的雏形

```js
var Model = function (sex) {
  this.sex = sex
}
Model.prototype.takePhoto = function () {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}
//  分别创建一个男模特对象和一个女模特对象：
var maleModel = new Model('male'),
  femaleModel = new Model('female')
//  给男模特依次穿上所有的男装，并进行拍照：
for (var i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i
  maleModel.takePhoto()
}
//  同样，给女模特依次穿上所有的女装，并进行拍照：
for (var j = 1; j <= 50; j++) {
  femaleModel.underwear = 'underwear' + j
  femaleModel.takePhoto()
}
```

使用前要创建大量的对象，而使用后只需要创建两个对象。

享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）

如何找到内外部状态：

- 内部状态存储于对象内部。

- 内部状态可以被一些对象共享。

- 内部状态独立于具体的场景，通常不会改变。

- 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

这样一来，我们便可以把所有内部状态相同的对象都指定为同一个共享的对象。而外部状态可以从对象身上剥离出来，并储存在外部。

**享元通用结构：**

- 使用工厂创建共享原型
- 创建一个共享的管理，方便内外联系

## 行为型

### 策略

好的，策略模式是一种行为型设计模式，它定义了一系列算法，并将每个算法封装起来，使它们可以相互替换。这样，客户端可以独立于具体算法的实现细节而使用不同的算法。下面我将用一个简单的例子来说明策略模式。

假设我们有一个商场销售系统，针对不同的节假日，我们希望能够给顾客不同的打折策略。我们可以使用策略模式来实现这一功能。

首先，我们定义一个抽象的策略接口，如下所示：

```js
// 定义一个抽象的策略接口，如下所示：
abstract class DiscountStrategy {
  applyDiscount(originalPrice) {
    // 策略接口方法
  }
}

// 圣诞节打折策略
class ChristmasDiscountStrategy extends DiscountStrategy {
  applyDiscount(originalPrice) {
    // 在圣诞节应用的打折策略
    return originalPrice * 0.8;  // 八折优惠
  }
}

// 新年打折策略
class NewYearDiscountStrategy extends DiscountStrategy {
  applyDiscount(originalPrice) {
    // 在新年应用的打折策略
    return originalPrice * 0.9;  // 九折优惠
  }
}
// 最后，商场销售系统可以根据实际情况选择不同的打折策略：

class Sales {
  constructor() {
    this.discountStrategy = null;
  }

  setDiscountStrategy(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  calculateFinalPrice(originalPrice) {
    if (this.discountStrategy) {
      return this.discountStrategy.applyDiscount(originalPrice);
    } else {
      return originalPrice;
    }
  }
}
// 客户端

let sales = new Sales();
sales.setDiscountStrategy(new ChristmasDiscountStrategy());
let finalPrice = sales.calculateFinalPrice(100.0);  // 使用圣诞节打折策略计算最终价格
```

原生版本

```js
var strategies = {
  ChristmasDiscount: function (originalPrice) {
    return originalPrice * 0.8
  },
  NewYearDiscount: function (originalPrice) {
    return originalPrice * 0.9
  }
}

function sales(discountStrategy, originalPrice) {
  if (discountStrategy) {
    return strategies[discountStrategy](originalPrice)
  } else {
    return originalPrice
  }
}
// 客户端
sales('ChristmasDiscountStrategy', 100.0)
```

### 迭代器

**行为：遍历**

将一个聚合对象进行遍历循环的函数

### 模板

**行为：按照钩子执行**

就是把子类相同的部分抽出一个父类，按照父类的钩子执行，就行 react 中的 hook 一样。

模板方法模式是一种只需使用继承就可以实现的非常简单的模式。

模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

假如我们有一些平行的子类，各个子类之间有一些相同的行为，也有一些不同的行为。如果相同和不同的行为都混合在各个子类的实现中，说明这些相同的行为会在各个子类中重复出现。但实际上，相同的行为可以被搬移到另外一个单一的地方，模板方法模式就是为解决这个问题而生的。在模板方法模式中，子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来实现。这也很好地体现了泛化的思想。

模板方法模式的使用场景：

1. 在 Web 开发中也能找到很多模板方法模式的适用场景，比如我们在构建一系列的 UI 组件，

2. 钩子

在 JavaScript 中，我们很多时候都不需要依样画瓢地去实现一个模版方法模式，高阶函数是更好的选择。

```js
var Beverage = function (param) {
  var boilWater = function () {
    console.log('把水煮沸')
  }
  var brew =
    param.brew ||
    function () {
      throw new Error('必须传递 brew 方法')
    }
  var pourInCup =
    param.pourInCup ||
    function () {
      throw new Error('必须传递 pourInCup 方法')
    }
  var addCondiments =
    param.addCondiments ||
    function () {
      throw new Error('必须传递 addCondiments 方法')
    }
  var F = function () {}
  F.prototype.init = function () {
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }
  return F
}
var Coffee = Beverage({
  brew: function () {
    console.log('用沸水冲泡咖啡')
  },
  pourInCup: function () {
    console.log('把咖啡倒进杯子')
  },
  addCondiments: function () {
    console.log('加糖和牛奶')
  }
})

var Tea = Beverage({
  brew: function () {
    console.log('用沸水浸泡茶叶')
  },
  pourInCup: function () {
    console.log('把茶倒进杯子')
  },
  addCondiments: function () {
    console.log('加柠檬')
  }
})

var coffee = new Coffee()
coffee.init()
var tea = new Tea()
tea.init()
```

### 观察

目的： 观察者模式的目的是建立一对多的依赖关系，**当一个对象的状态发生变化时，通知所有依赖的对象进行更新。**

关注点： 观察者模式关注于对象之间的依赖关系，当一个对象的状态发生变化时，观察者会得到通知并自动更新。

参与角色：观察者模式通常由一个主题对象和多个观察者对象组成，主题对象负责维护观察者列表，并在状态变化时通知观察者。

在全局创建一个订阅和发布的函数，在某个地方进行订阅，在另一个地方使用，可以进行跨模块的通信。

举例说明：

```js
var event = (function () {
  // 主题对象：clientList
  // 观察者列表：squareMeter88
  var clientList = {},
    listen,
    trigger,
    remove
  // 主题
  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }
  // 观察者
  trigger = function () {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments)
    }
  }
  remove = function (key, fn) {
    var fns = clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l]
        if (_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }
})()

// 客户端
Event.listen('squareMeter88', function (price) {
  // 小红订阅消息
  console.log('小红收到订阅消息： ' + price) // 输出：'价格=2000000'
})

Event.listen('squareMeter88', function (price) {
  // 小明订阅消息
  console.log('小明收到订阅的消息 ' + price) // 输出：'价格=2000000'
})

Event.trigger('squareMeter88', 2000000) // 售楼处发布消息
```

### 中介

目的：中介者模式的目的是为了降低对象之间的耦合度，通过引入中介者对象来集中处理对象之间的交互。

关注点： 中介者模式关注于对象之间的交互和协作，中介者承担了对象之间的通信和协调的责任。

参与角色：中介者模式通常由中介者对象和多个相关对象组成，中介者对象负责管理和协调相关对象之间的交互。

中介者模式是通过一个中介者对象来协调其他相关对象之间的通信。在中介者模式中，各个对象不再直接相互交互，而是通过中介者对象进行通信，从而降低了耦合度，提高了系统的可维护性和扩展性。

在 JavaScript 中，中介者模式可以通过以下方式实现：

首先定义一个中介者对象，该对象负责协调其他相关对象之间的通信。中介者对象通常包含一个注册方法，用于将相关对象注册到中介者对象中。

```js
// 中介者
var mediator = {
  // 注册方法
  register: function (obj) {
    this[obj.name] = obj
  },
  // 消息通知方法
  notify: function (sender, message) {
    for (var key in this) {
      if (this[key] !== sender && typeof this[key].receive === 'function') {
        this[key].receive(message)
      }
    }
  }
}

// 其他对象

function Person(name) {
  this.name = name
}

Person.prototype.notify = function (message) {
  mediator.notify(this, message)
}

Person.prototype.receive = function (message) {
  console.log(this.name + ' receive message: ' + message)
}

// 客户端

// 定义相关对象

var obj1 = new Person('obj1')
var obj2 = new Person('obj2')

// 最后将相关对象注册到中介者对象中，这样就建立了相关对象和中介者对象之间的联系。

// 将相关对象注册到中介者对象中
mediator.register(obj1)
mediator.register(obj2)

// 相关对象发送消息
obj1.notify('hello')
```

### 状态

状态模式是一种行为型设计模式，它允许对象在内部状态改变时改变其行为。它将对象的行为封装在不同的状态类中，并通过在不同的状态之间进行切换来改变对象的行为。

就是说状态控制行为的时候使用的一种模式。如果说一个实体中有庞大的 if else 逻辑，那么就可以考虑使用状态模式。

关键是把状态和行为分离开来，状态的改变会触发行为的变化。

要先封装一个状态类

```js
abstract class State {
  buttonWasPressed() {
    throw new Error( '父类的 buttonWasPressed 方法必须被重写' );
  }
}
// OffLightState：
class OffLightState extends State {
  constructor(light) {
    this.light = light;
  }
  buttonWasPressed() {
    console.log('弱光');
    this.light.setState(this.light.weakLightState);
  }
}
// WeakLightState：
class WeakLightState extends State {
  constructor(light) {
    this.light = light;
  }
  buttonWasPressed() {
    console.log('强光');
    this.light.setState(this.light.strongLightState);
  }
}
// StrongLightState：
class StrongLightState extends State {
  constructor(light) {
    this.light = light;
  }
  buttonWasPressed() {
    console.log('关灯');
    this.light.setState(this.light.offLightState);
  }
}

class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.currState = this.offLightState; // 设置当前状态
    this.button = null;
    this.initButton()
  }

  initButton() {
    const button = document.createElement( 'button' );
    this.button = document.body.appendChild( button );
    this.button.innerHTML = '开关';
    this.button.onclick = () => {
      this.currState.buttonWasPressed();
    }
  }

  setState(newState) {
    this.currState = newState;
  }
}

const light = new Light();
```

**javaScript 委托技术版本**

```js
var delegate = function (client, delegation) {
  return {
    buttonWasPressed: function () {
      // 将客户的操作委托给 delegation 对象
      return delegation.buttonWasPressed.apply(client, arguments)
    }
  }
}

var FSM = {
  offLightState: {
    buttonWasPressed: function () {
      console.log('弱光')
      this.setState(this.weakLightState)
    }
  },
  weakLightState: {
    buttonWasPressed: function () {
      console.log('强光')
      this.setState(this.strongLightState)
    }
  },
  strongLightState: {
    buttonWasPressed: function () {
      console.log('关灯')
      this.setState(this.offLightState)
    }
  }
}

var Light = function () {
  this.offLightState = delegate(this, FSM.offLightState)
  this.weakLightState = delegate(this, FSM.weakLightState)
  this.strongLightState = delegate(this, FSM.strongLightState)
  this.currState = this.offState // 设置初始状态为关闭状态
  this.button = null
}

Light.prototype.init = function () {
  const button = document.createElement('button')
  button.innerHTML = '开关'
  this.button = document.body.appendChild(button)
  this.button.onclick = () => {
    self.currState.buttonWasPressed()
  }
}

Light.prototype.setState = function (newState) {
  this.currState = newState
}

// 客户端
var light = new Light()
light.init()
```

### 责任链

职责链模式是一种行为型设计模式，它可以将多个处理对象连接成一条链，让请求在这条链上依次经过处理，直到被处理或者到达链的末端。在前端开发中，职责链模式可以应用于以下场景：

1. 事件冒泡和捕获：在浏览器中，事件通常会沿着 DOM 树进行冒泡或者捕获。职责链模式可以用来实现事件的处理链，将事件从底层元素向上传递，直到顶层元素。

2. 数据验证：在前端表单验证中，可能需要对用户输入的数据进行多重验证。职责链模式可以将不同类型的验证规则封装成责任链上的节点，让数据依次经过每个节点进行验证，直到通过或者被拒绝。

3. 错误处理：在前端应用中，可能会出现各种类型的异常和错误。职责链模式可以用来实现错误处理链，让错误依次经过每个节点进行处理，直到被处理或者到达链的末端。

4. 权限控制：在前端应用中，可能需要对用户进行权限控制。职责链模式可以将不同类型的权限检查封装成责任链上的节点，让请求依次经过每个节点进行检查，直到通过或者被拒绝。

5. 数据缓存和加载：在前端应用中，可能需要对数据进行缓存和加载。职责链模式可以将缓存和加载封装成责任链上的节点，让请求依次经过每个节点进行处理，直到获取到数据或者到达链的末端。

总体而言，职责链模式在前端开发中主要涉及事件处理、数据验证、错误处理、权限控制和数据缓存等方面。它可以提供一种解耦和灵活的方式，使得代码更易于理解、扩展和维护。

```js
// 责任链节点的基本结构
class Handler {
  constructor(successor) {
    this.successor = successor
  }

  handleRequest() {
    // 处理请求的通用逻辑
    if (this.successor) {
      this.successor.handleRequest()
    }
  }
}

// 具体的处理节点
class ConcreteHandler1 extends Handler {
  handleRequest() {
    // 具体处理逻辑
    console.log('ConcreteHandler1 handles the request')
    super.handleRequest()
  }
}

class ConcreteHandler2 extends Handler {
  handleRequest() {
    // 具体处理逻辑
    console.log('ConcreteHandler2 handles the request')
    super.handleRequest()
  }
}
```

```js
// 客户端代码
const handler1 = new ConcreteHandler1()
const handler2 = new ConcreteHandler2(handler1)

// 模拟按钮点击事件
handler2.handleRequest()
```

### 命令

在前端开发中，命令模式可以应用于多种场景，以下是一些常见的前端场景：

1. 按钮点击事件：当用户在前端页面点击按钮时，可以使用命令模式来将按钮点击事件封装成一个命令对象，该对象包含执行按钮点击事件的方法。这样，可以灵活地控制按钮点击事件的执行和撤销，以及与其他操作的组合和顺序。

2. 键盘快捷键：当用户在前端页面按下特定的键盘快捷键时，可以使用命令模式将快捷键事件封装成命令对象。通过命令对象，可以定义和管理不同的快捷键操作，并且可以动态地添加、修改或删除快捷键操作。

3. 前端菜单系统：在前端应用中，可能存在复杂的菜单系统，用户可以通过菜单选择不同的操作。命令模式可以用来将每个菜单选项封装成命令对象，通过命令对象执行相应的操作。这样，可以实现菜单项的可配置性和可扩展性，方便管理和维护。

4. 撤销和重做功能：在前端页面中，有时需要实现撤销和重做功能，让用户可以撤销之前的操作或者重新执行已经撤销的操作。命令模式可以用来记录每个操作的命令对象，并提供执行和撤销方法，以便实现撤销和重做功能。

5. 异步请求管理：在前端应用中，经常需要进行异步请求（如 AJAX 请求），命令模式可以将每个异步请求封装成一个命令对象。通过命令对象，可以方便地控制和管理异步请求的执行顺序、并发数量，以及错误处理等。

总体而言，命令模式在前端开发中的应用场景主要涉及事件处理、操作管理和请求管理等方面。它可以提供一种解耦和可配置的方式，使得代码更易于理解、扩展和维护。

```js
// 定义命令接口
class Command {
  execute() {}
}

// 实现具体的命令
class TurnOnCommand extends Command {
  constructor(receiver) {
    super()
    this.receiver = receiver
  }

  execute() {
    this.receiver.turnOn()
  }
}

class TurnOffCommand extends Command {
  constructor(receiver) {
    super()
    this.receiver = receiver
  }

  execute() {
    this.receiver.turnOff()
  }
}

// 设置音量
class SetVolumeCommand extends Command {
  constructor(receiver, volume) {
    super()
    this.receiver = receiver
    this.volume = volume
  }

  execute() {
    this.receiver.setVolume(this.volume)
  }
}
// 设置通道命令
class SetChannelCommand extends Command {
  constructor(receiver, channel) {
    super()
    this.receiver = receiver
    this.channel = channel
  }

  execute() {
    this.receiver.setChannel(this.channel)
  }
}

// 定义电视机对象
class TV {
  turnOn() {
    console.log('TV is turned on')
  }

  turnOff() {
    console.log('TV is turned off')
  }

  setVolume(volume) {
    console.log(`TV volume is set to ${volume}`)
  }

  setChannel(channel) {
    console.log(`TV channel is set to ${channel}`)
  }
}

// 定义遥控器对象
class RemoteControl {
  constructor() {
    this.commands = new Map()
  }

  setCommand(key, command) {
    this.commands.set(key, command)
  }

  pressButton(key) {
    const command = this.commands.get(key)
    if (command) {
      command.execute()
    } else {
      console.log(`No command found for button ${key}`)
    }
  }
}

// 创建遥控器和电视机对象
const tv = new TV()
const remote = new RemoteControl()

// 绑定命令到遥控器上
remote.setCommand('on', new TurnOnCommand(tv))
remote.setCommand('off', new TurnOffCommand(tv))
remote.setCommand('volumeUp', new SetVolumeCommand(tv, 10))
remote.setCommand('volumeDown', new SetVolumeCommand(tv, 5))
remote.setCommand('channelUp', new SetChannelCommand(tv, 1))
remote.setCommand('channelDown', new SetChannelCommand(tv, -1))

// 模拟遥控器按键事件
remote.pressButton('on')
remote.pressButton('volumeUp')
remote.pressButton('channelUp')
remote.pressButton('volumeDown')
remote.pressButton('off')
```

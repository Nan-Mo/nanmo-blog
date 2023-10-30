## 谈一谈 css 盒模型？

css 盒模型分为：标准盒模型和 IE 盒模型

1. 在标准盒模型中，设置 width、height 实际设置的是 content, 在算上 padding、border 一起构成盒子的宽高。

2. 在 IE 盒模型中，属性 width 和 height 等于 content、padding、border。

使用 css3 的 box-sizing 可以切换
context-box 是标准盒模型
border-box 是 IE 盒模型

## css 单位 有哪些

px：像素 (1px = 1/96th of 1in)
rem: 相对于根元素的字体的大小
em: 相对于元素的字体大小（2em 等于当前字体大小的 2 倍）
vw: 相对于视口 _ 宽度的 1%
vh: 相对于视口 _ 高度的 1%
%: 相对于父元素

## CSS 选择符有哪些？

id、class、元素、相邻、子、通配符、伪元素、伪类、属性

## 常见页面布局

## css3 新特性

transtion/tranform/animition/box-shadow/flex/Grid/媒体查询

## display 有哪些属性

none、block、inlineinline-block、table、inline-flex、flex、flow-root

## 相邻的两个 inline-block 节点为什么会出现间隔，该如何解决

块级元素被当成了一个行内元素的时候，原来的换行空白被转成了空白，空白是有宽度的

父元素设置 font-size: 0

## display:none 与 visibility：hidden 的区别？

display 是页面上不在分配空间，而 visibility：hidden 仍然保留空间。

## 怎么让 Chrome 支持小于 12px 的文字？

使用 transform: scale()

## BFC(块格式化上下文)

BFC 是一个独立的渲染区域，使内外元素互相隔离，定位互不影响。

以下可以创建块格式化上下文：

- 根元素
- overflow 不为 visible
- 浮动元素(float 不为 none)
- 绝对定位(position: absolute 或者 fixed);
- 行内块元素(display: inline-block)
- 表格单元（display: table-cell）
- display: flow-root;
- display: flex;

应用：

1. 防止外边距塌陷

```html
<style>
  .blue,
  .red-inner {
    height: 50px;
    margin: 10px 0;
  }

  .blue {
    background: blue;
  }

  .red-outer {
    overflow: hidden;
    background: red;
  }
</style>
<div class="blue"></div>
<div class="red-outer">
  <div class="red-inner">red inner</div>
</div>
```

2. 自适应两栏布局

```html
<style>
  section {
    height: 150px;
  }
  .box {
    background-color: rgb(224, 206, 247);
    border: 5px solid rebeccapurple;
  }
  .box[style] {
    background-color: aliceblue;
    border: 5px solid steelblue;
  }
  .float {
    float: left;
    overflow: hidden; /* required by resize:both */
    resize: both;
    margin-right: 25px;
    width: 200px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.75);
    border: 1px solid black;
    padding: 10px;
  }
</style>
<section>
  <div class="float">Try to resize this outer float</div>
  <div class="box"><p>Normal</p></div>
</section>
<section>
  <div class="float">Try to resize this outer float</div>
  <div class="box" style="display:flow-root">
    <p><code>display:flow-root</code></p>
    <p></p>
  </div>
</section>
```

3. 清除浮动

```html
<style>
  .box {
    background-color: rgb(224, 206, 247);
    border: 5px solid rebeccapurple;
    display: flow-root;
  }

  .float {
    float: left;
    width: 200px;
    height: 150px;
    background-color: white;
    border: 1px solid black;
    padding: 10px;
  }
</style>
<div class="box">
  <div class="float">I am a floated box!</div>
  <p>I am content inside the container.</p>
</div>
```

## 居中布局

- 水平居中

  - 内联元素：text-align: center;
  - 块级元素：设置宽度 + margin: 0 auto;
  - abosulte + transform
  - flex + justify-content: center

- 垂直居中

  - line-height: height;
  - abosulte + transform;
  - flex + align-items: center

- 水平垂直居中
  - absolute + transform
  - flex + justify-content + align-items

## 选择器优先级

!important `>` 行内样式 `>` #id `>` .class `>` tag `>` \* `>` 继承 `>` 默认

## 清除浮动有哪些方法？

- clear 清除浮动（添加空 div 法）在浮动元素下方添加空 div,并给该元素写 css 样式：
  ```css
   {
    clear: both;
    height: 0;
    overflow: hidden;
  }
  ```
- 父元素创建 BFC;
- 父元素设置高度;
- 万能清除法 after 伪类 清浮动

```css
.float_div:after {
  content: '.';
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.float_div {
  zoom: 1;
}
```

## link 和@import 的区别

- link 可以定义 RSS、Rel 等，@import 只能引入 css
- 当解析到 link 的时候，页面会同步加载所引用 css，@import 会等页面加载完才开始加载
- link 可以使用 js 动态引用，@import 不行

## CSS 预处理器(Sass/Less/Postcss)

css 预处理器的原理：是将类 Css 语言通过 webpack 等工具转成 css.

类 Css 语言常用的功能：

- 嵌套
- 变量
- 循环语句
- 条件语句
- 自动前缀
- 单位转换
- mixin 复用

# HTML

## HTML5 有哪些新特性？

新增的元素：

1. video/audio
2. 语义化元素 article/footer/header/main/section/nav

新增表单控件：canlendar date email search url

新增功能：

1. webStorage
2. 本地离线存储
3. web worker
4. web Socket
5. 拖拽功能
6. canvas

## HTML5 的文件离线储存怎么使用，工作原理是什么？

如果不存在离线文件的资源缓存，就加载离线文件然后进行缓存。
如果存在离线文件的资源的缓存，先判断离线资源是否有更新，如果有就重新加载资源
如果没有更新就直接使用缓存的离线文件的资源。

```html
<html manifest="cache.manifest"></html>
```

```cache.manifest
CACHE
MANIFEST
#v0.11
CACHE: js/app.js css/style.css
NETWORK: Resourse/logo.png
FALLBACK: //offline.html
```

## 请用 html 知识解决 seo 优化问题？

在 html 头部放 meta 标签，属性 name 为 keywords 和 description，content 中放入关键词和描述

## data- 属性的作用是什么？

自定义标签属性，可以用于存储数字，可以通过 target.setData 获取该值

## 请描述一下语义化的意义

1. 有利 SEO、爬虫爬到更多信息
2. 有利于团队代码的可读性

## Cookies/localStorage/sessionStorage 的区别

1. 存储位置不同
   这三者虽然都是存储在客户端的，但是还是有一定的区别，cookies 用于标识用户身份保存在客户的端，每次 http 请求都会携带，在客户端和服务之间传递。

2. 存储大小不同
   cookies 存储大小不超过 4K，localStorge/sessionStorage 在 5M 左右

3. 存储有效期不同
   cookies 在服务端设置的有效期前有效，如果服务端没有设置在关闭浏览器前有效
   localStorga 永久有效
   sessionStorage 在浏览器关闭前有效

4. 存储作用域不同
   localStorage、cookie 在所有同源窗口中共享
   sessionStorge 不在不同浏览器窗口中共享

## label 的作用是什么? 是怎么用的?

label 的作用，用来绑定表单控件即当绑定表单控件后，点击标签会自动将焦点转到该控件上。
使用，在 label 上面加 for 跟上控件名字，给控件加个 name
或者是用 accesskey，表示 label 所绑定的元素的热键，当按下热键，所绑定的元素获取焦点。

## HTML5 的 form 如何关闭自动完成功能？

设置 form 输入框的 autocomplete 为 off.

## 如何实现浏览器内多个标签页之间的通信?

WebSocket、SharedWorker

## title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

title 没有明确的意思，没有明确的意义；h1 表示层次明确的标题，对页面的抓取也有意义。

b 只是视觉上的加粗，strong 在加粗的情况下还表示重点内容，语气加强。

i 是视觉上的斜体，em 表示强调文本。

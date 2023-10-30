# 问题描述

嵌入到`Taro WebView`的`H5`页面怎么跳转至小程序

# 解决方案：

H5 项目中引入`weixin-js-sdk`，使用 `redirectTo` 来进行跳转。

```js
import wx from 'weixin-js-sdk'

export const navigate = (record: any) => {
  wx.miniProgram.redirectTo({
    url: '/test?id=1'
  })
}
```

由于要兼容支付宝小程序，和微信小程序一样要引入 jssdk

在项目的 `index.html` 中引入 `jssdk`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="no-referrer" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script>
      if (navigator.userAgent.indexOf('AliApp') > -1) {
        document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>')
      }
    </script>
  </body>
</html>
```

接着通过判断小程序来源鉴别要使用哪个平台的 jssdk

```js
import wx from "weixin-js-sdk";

export const navigate = (record: any) => {
  // 获取url中的小程序环境标识
  const { TARO_ENV } = getUrlParam();

  const redirectTo =
  TARO_ENV === "weapp"
    ? wx.miniProgram.redirectTo
    : (window as any).my.redirectTo;

  wx.miniProgram.redirectTo({
    url: '/test?id=1',
  });
};
```

4. 由于在真机预览时 `navigateTo` 与 `redirectTo` 无法跳转，所以使用 `reLaunch` 进行跳转。

```js
import wx from "weixin-js-sdk";

export const navigate = (record: any) => {
 // 获取url中的小程序环境标识
 const { TARO_ENV } = getUrlParam();

 const reLaunch =
 TARO_ENV === "weapp"
   ? wx.miniProgram.reLaunch
   : (window as any).my.reLaunch;

 wx.miniProgram.reLaunch({
   url: '/test?id=1',
 });
};
```

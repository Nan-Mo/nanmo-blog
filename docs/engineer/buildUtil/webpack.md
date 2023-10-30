# webpack 核心概念

- 入口：`webpack` 从哪个模块开始构建整个应用，默认是 `./src/index.js`，从入口开始 `webpack` 会找到该入口直接或间接的依赖。入口可以是一个或多个入口，可以通过`webpck configuration` 的`entry`进行配置。

- 输出: 当 webpack 打包完应用后生成，输出的文件出口，主要的文件被打包在./dist/main.js 下，其他都放在 dist 下。可以通过`webpck configuration` 的`output.path`配置输出路径，`output.filename`配置输出文件名。

- loader：`webpack`默认只能识别`js`和`json`文件，所以`webpack`在遇到其他类型的文件时，需要先使用`loader`进行转换成有效文件，才能放进依赖图中。

- 插件：它的功能比`loader`更加广泛，它能够处理的事情例如：打包优化、资源管理、注入环境变量等

- 模式：可以通过选择`development`、`production`、`none`来设置模式，默认是`production`。用于区别开发环境和线上环境的配置。

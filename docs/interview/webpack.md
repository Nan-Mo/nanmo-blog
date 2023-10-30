# webpack

1. 公共配置
   entry: 配置入口文件，这里可配置多个入口
   ouput: 配置构建输入文件出口，生产中需要在后缀加上 contextHash
   module: rules 下面配置 loader 包括：
   （1）css 相关的 loader: css-loader/style-loader/postcss-loader/less-loader,
   （2）静态图片资源: 使用 url-loader 加载静态文件图片或字体, 可以设置图片在多少 kb 以下转 base64 的 loader，超过的就使用 file-loader
   （3）babel-loader：用于将 jsx 或者 es6 以上的代码编译成可运行的 js。在.babelrc.js 中配置，配合 ts/env/react 预设包
   plugins: 配置要用的插件
   （1）clean：重新构建时，清空 dist 包使用 Clean 插件
   （2）html：处理 html 文件时，使用 html 插件
   （3）copy: 打包时，需要将静态文件拷贝到 dist 下，使用 Copy 插件
   （4）进度：构建如果需要，进度条使用 webpackBar 插件
   （5）检查 ts: 如果项目中有使用 ts 还可以用 ts 检查的插件
   （6）二次编译：如果希望提升二次编译速度可以使用 HardSouce 插件
   resolve: 对 js/jsx 等文件进行解析
2. 开发配置
   mode: development。表示开发模式
   devtool: 'eval-source-map'。 开发工具，在控制台中会输出报错的文件已经行数，有助于提高开发效率。
   devServer: {} 进行相关配置后，可以开启本地服务，配置后可以进行热更新、服务代理。
   optimization:{splitChunks:{chunk:'all'}}：将第三方插件从主包中剥离出去

3. mode: production 表示生产模式
   devtool: none 生产模式不需要 source-map 功能，可以关闭
   plugins:
   (1) 压缩 CSS
   （2）移除未用的 css
   optimization: 压缩 js/将 CSS 分离出主包
   splitChunks: {chunk:'all'}：将第三方插件从主包中剥离出去

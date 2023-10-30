import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/base/': [
    {
      text: 'JavaScript',
      collapsed: false,
      items: [
        { text: '变量', link: '/base/javascript/var' },
        { text: '数据类型', link: '/base/javascript/types' },
        { text: '作用域与闭包', link: '/base/javascript/scope' },
        { text: 'this', link: '/base/javascript/this' },
        { text: '原型以及原型链', link: '/base/javascript/prototype' }
      ]
    },
    {
      text: '浏览器',
      collapsed: false,
      items: [
        { text: '网络请求', link: '/base/browser/netWork' },
        { text: '资源解析', link: '/base/browser/parse' },
        { text: '资源渲染', link: '/base/browser/render' },
        { text: '回流与重绘', link: '/base/browser/backflow' },
        { text: '浏览器储存', link: '/base/browser/storage' }
      ]
    },
    {
      text: '网络协议',
      collapsed: false,
      items: [
        { text: '网络基础', link: '/base/net/netBase' },
        { text: 'HTTP协议', link: '/base/net/http' },
        { text: 'HTTPS', link: '/base/net/https' },
        { text: 'http 认证方式', link: '/base/net/httpAuth' }
      ]
    },
    {
      text: 'React',
      collapsed: false,
      items: [{ text: 'useMemo、memo', link: '/base/react/useMemo' }]
    }
  ],
  '/engineer/': [
    {
      text: '前端工程',
      collapsed: false,
      items: [
        { text: 'git', link: '/engineer/git/index' },
        {
          text: '包管理工具',
          items: [{ text: 'npm', link: '/engineer/pm/npm' }]
        },
        {
          text: '构建工具',
          items: [
            { text: 'webpack', link: '/engineer/buildUtil/webpack' },
            { text: 'vite', link: '/engineer/buildUtil/vite' }
          ]
        }
      ]
    }
  ],
  '/framework/': [
    { text: '设计原则', link: '/framework/solid' },
    { text: '设计模式', link: '/framework/designPatterns' },
    { text: '重构思想', link: '/framework/refactor' },
    {
      text: '软件架构',
      link: '/framework/jiagou/index',
      items: [{ text: 'DDD', link: '/framework/jiagou/ddd' }]
    }
  ],
  // '/sourceCode/': [
  //   {
  //     text: '源码阅读',
  //     collapsed: false,
  //     items: []
  //   }
  // ],
  '/notes/': [
    {
      text: '开发笔记',
      collapsed: false,
      items: [
        {
          text: 'Taro',
          link: '/notes/taro/note1',
          items: [
            { text: 'Android支付宝h5页面白屏', link: '/notes/taro/note1' },
            { text: 'H5跳转小程序', link: '/notes/taro/note2' }
          ]
        }
      ]
    }
  ],
  '/interview/': [
    {
      text: '面试',
      collapsed: false,
      items: [
        { text: 'html', link: '/interview/html' },
        { text: 'css', link: '/interview/css' },
        { text: 'js', link: '/interview/js' },
        { text: 'es6+', link: '/interview/es' },
        { text: '编码题', link: '/interview/code' },
        { text: 'React', link: '/interview/React' },
        { text: '浏览器', link: '/interview/browser' },
        { text: '网络协议', link: '/interview/net' },
        { text: '前端安全', link: '/interview/safe' },
        { text: 'webpack', link: '/interview/webpack' }
      ]
    }
  ]
}

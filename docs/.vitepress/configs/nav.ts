import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '基础',
    items: [
      { text: 'JavaScript', link: '/base/javascript/var' },
      { text: '浏览器', link: '/base/browser/netWork' },
      { text: '网络协议', link: '/base/net/netBase' },
      { text: 'react', link: '/base/react/useMemo' }
    ],
    activeMatch: '^/base'
  },
  {
    text: '工程',
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
    ],
    activeMatch: '^/engineer'
  },
  {
    text: '架构',
    items: [
      { text: '设计原则', link: '/framework/solid' },
      { text: '设计模式', link: '/framework/designPatterns' },
      { text: '重构思想', link: '/framework/refactor' },
      { text: '架构模式', link: '/framework/jiagou/index' }
    ],
    activeMatch: '^/framework'
  },
  // {
  //   text: '源码阅读',
  //   items: [],
  //   activeMatch: '^/sourceCode'
  // },
  {
    text: '笔记',
    items: [{ text: 'Taro 开发笔记', link: '/notes/taro/note1' }],
    activeMatch: '^/notes'
  },
  {
    text: '面试题',
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
    ],
    activeMatch: '^/interview'
  }
]

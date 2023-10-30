---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 南墨的博客
  text: 记录成长的点点滴滴
  # image:
  #   src: /logo.png
  #   alt: 南墨的博客
  actions:
    - text: 前端基础
      link: /base/es6/
features:
  - icon: 📖
    title: 前端基础
    details: 整理前端常用知识点<small>（面试八股文）
    link: /base/javascript/var
    linkText: 前端常用知识
  - icon: 📘
    title: 源码阅读
    details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
    link: /analysis/utils/only-allow
    linkText: 源码阅读
  - icon: 💡
    title: 开发日志
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）
    link: /workflow/utils/library
    linkText: 常用工具库
---

<style>
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>

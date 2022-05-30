---
title: 风格指南
order: 5
---

# 风格指南

## A - 必要的

### 组件名为多个单词

**避免**跟现有的以及未来的 HTML **元素相冲突**

`todo` - `todo-item or todoItem`

### 组件数据

组件中使用**data** ，值必须**返回函数对象**，会返回独立数据对象。

**以此保证组件实例都**引用相同对象，否则会导致所有**实例间共享数据**。

> 只有*根实例*直接使用数据对象（根实例唯一）

### prop 定义

**prop**定义应该**尽量详解**，**指定其类型**

- 代码易懂
- 易知错误来源

### v-for 设置 key

用`key`配合`v-for`，便于*维护内部组件及其子树*的状态

_Vue_ 会使用一种*最大限度减少动态元素*并且尽可能的*尝试就地修改/复用相同类型元素*的算法

*使用 key*后，会*基于 key 变化重新排列元素* [exp](https://blog.csdn.net/weixin_41736818/article/details/107372595)

> [对象固化](https://zhhlwd.gitee.io/posts/js%E5%9B%BA%E5%8C%96%E5%AF%B9%E8%B1%A1.html)：在三个层级上固化一个对象。从宽到严它们依次是：_防止扩展、密封、冻结_。

### 避免 v-if 和 v-for

不要让 `v-for` 和 `v-if` 同时使用在**同一元素**

因为`v-for`优先级高于`v-if`，只渲染部分用户，也会遍历整个列表

解决：

- 通过`computed`过滤值，代替`v-if`
  - 只遍历过滤列表，带*缓存*
  - *解耦*渲染层逻辑
- *外层*添加`v-if`

### 组件样式设置作用域

顶级 `App`组件、布局组件：样式*可以是全局*

其它组件：_应该有作用域_

三种方式

- `scoped attribute`
- [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)
- [BEM](http://getbem.com/)

```html
<!-- 使用 `scoped` attribute -->
<style scoped></style>
<!-- 使用 CSS Modules -->
<style module></style>
<!-- 使用 BEM 约定 -->
<style>
  .c-Button--close {
  }
</style>
```

### 私有 property 名

*使用模块作用域保持*不允许外部访问的*函数的私有性*

`_` ：私有属性

`$`：特殊实例属性

`$_`：用户自定义属性，附带命名空间减少冲突

> `$_myGreatMixin_update`

## B - 强烈推荐

## C - 推荐

## D - 谨慎使用

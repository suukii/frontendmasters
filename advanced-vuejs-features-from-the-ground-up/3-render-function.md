# Part III: render 函数

## 3.1 动态渲染标签

### 目标

- 实现一个 `example` 组件，组件通过 `tags` 属性接收一个元素标签数组，然后负责把这些标签都渲染出来；

### 期望用法

```html
// 组件用法
<example :tags="['h1', 'h2', 'h3']"></example>

// 渲染结果
<div>
  <h1>0</h1>
  <h2>1</h2>
  <h3>2</h3>
</div>
```

### 提示

[官方文档](https://vuejs.org/v2/guide/render-function.html)

### 代码

```js
Vue.component('example', {
  functional: true,
  props: {
   tags: {
      type: Array,
      default: () => []
    }
  },
  render(h, ctx) {
    const headings = ctx.props.tags.map((tag, index) => h(tag, index))
    return h('div', ctx.data , headings)
  }
})
```

## 3.2 动态渲染组件

### 目标

- 实现一个 `Foo` 组件 `<div>foo</div>` 和一个 `Bar` 组件 `<div>bar</div>`
- 实现一个 `Example` 组件，接收一个 `ok` 参数，当 `ok` 为 `true` 的时候渲染 `Foo` 组件，不然渲染 `Bar` 组件
- 在全局中添加一个按钮控制 `ok` 属性的改变

### 提示

- render 方法中的 h 函数既可以接收元素标签也可以接收另一个组件来作为它的第一个参数

### 代码

```js
const Foo = {
  render: h => h('div', 'foo')
}
const Bar = {
  render: h => h('div', 'bar')
}

Vue.component('Example', {
  functional: true,
  props: {
    ok: {
      type: Boolean,
      default: false
    }
  },
  render: (h, ctx) => {
    const com = ctx.props.ok ? Foo : Bar
    return h(com, ctx.data, ctx.children)
  }
})

new Vue({
  el: '#test',
  data: {
    ok: false,
  },
})
```

```html
<div id="test">
  <button @click="ok = !ok">toggle</button>
  <example :ok="ok"></example>
</div>
```

## 3.3 高阶组件(HOC)

### 目标

- 实现一个高阶组件 `withAvatarURL`，它接收一个组件 A 作为参数，并返回一个新的组件 B
- 组件 A 接收一个 `src` props，组件 B 接收一个 `username` props
- `withAvatarURL` 负责的逻辑是：根据 `username` 发起网络请求获取相应的 `src` 并渲染组件 A 的内容

### 期望用法

```html
<div id="app">
  <smart-avatar username="vuejs" />
</div>
```
```js
const Avatar = {
  props: ['src'],
  template: `<img :src="src" />`,
}

const AvatarWithURL = innerComponent => {
  // code here
}

const SmartAvatar = AvatarWithURL(Avatar)

export default {
  el: '#app',
  components: {
    SmartAvatar,
  },
};
```

### 提示

这里有一个简单的[高阶组件练习](https://pusher.com/tutorials/higher-order-components-vue)可以看看

### 代码

```js
const AvatarWithURL = innerComponent => {
  return {
    // 新的组件会接收一个 username prop
    props: ['username'],
    // 状态
    data: () => ({
      url: 'placeholder.png'
    }),
    created() {
      // 处理网络请求的逻辑
      fetch('example.com', { username: this.$props.username }).then(data => {
        // 更新状态
        this.url = data.url
      })
    }
    // 新的组件传递状态并直接渲染 innerComponent
    render(h) {
      return h(innerComponent, {
        props: {
          src: this.url
        }
      })
    },
  }
}
```
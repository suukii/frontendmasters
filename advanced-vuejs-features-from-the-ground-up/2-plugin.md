# Part II: 插件

### 目标

- 实现一个简单的插件 rulesPlugin；
- 插件使用者可以通过添加自定义选项 `rules` 来 validate 组件的 `data` 中的值；
- `rules` 是一个对象；

### 期望用法

```js
const rulesPlugin = {
  install(Vue) {

  }
}

const vm = new Vue({
  data: {
    foo: 10
  },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than one'
    }
  },
})

vm.foo = 0 // should log: "foo must be greater than one"
```

### 提示

- 在 `rulesPlugin` 中注册一个全局 `mixin`，在 `created` 的时候处理 `rules`；
- 通过 `$options` 可以获取自定义选项 `rules`
- 使用 `$watch()` API 来监听 `rules` 中指定的每一个 `key` 的值的变化。

### 代码

```js
const rulesPlugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        const rules = this.$options.rules
        if (rules) {
          Object.keys(rules).forEach(key => {
            const { validate, message } = rules[key]

            this.$watch(key, newVal => {
              if (!validate(newVal)) {
                console.log(message)
              }
            })
          })
        }
      },
    })
  }
}
```

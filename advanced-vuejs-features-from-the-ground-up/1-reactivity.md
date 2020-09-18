# Part I: 响应性

## 练习 1: getter setter

### 目标

- 写一个 observe 函数，函数接收一个对象作为参数，经过 observe 函数处理过的函数应该：
- 在读取属性时会返回相应属性值并打印 'getting [key]'；
- 赋值属性时会设置相应的属性为指定值并打印 'setting [key] to [value]'；

### 期望用法

```js
const observe = obj => {

}
const foo = {
  a: 1,
}
observe(foo)
foo.a // should log 'getting a'
foo.a = 2 // should log 'setting a to 2'
```

### 提示

- `Object.defineProperty`
- 把对象的属性转成 getter 和 setter

### 代码

```js
const observe = obj => {
  Object.keys(obj).forEach(key => {
    // 使用 internalValue 来存放属性的值，需要初始化，否则首次读值就会得到 undefined
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        console.log(`getting ${key}`);
        return internalValue
      },
      set(newValue) {
        console.log(`setting ${key} to ${newValue}`);
        internalValue = newValue
      }
    })
  })
}
```

## 练习 2: 依赖管理

### 目标

- 实现 `Dep` 类和 `autorun` 函数；
- `Dep` 的实例有两个方法：`depend()` 和 `notify()`；
- `autorun` 接收一个 `update` 函数作为参数；
- 在 `update` 函数中，可以调用 `Dep` 实例的 `depend()` 方法来把该 `update` 函数收集为依赖函数；
- 之后可以通过调用同一个 `Dep` 实例的 `notify()` 方法来重新执行 `update` 函数；

### 期望用法

```js
class Dep {
  depend() {}
  notify() {}
}

const autorun = update => {

}

const dep = new Dep()

autorun(() => {
  dep.depend()
  console.log('updated')
})
// should log 'updated'

dep.notify()

// should log 'updated'
```

### 提示

在 `update` 函数中调用 `dep.depend()` 的时候，并没有把 `update` 函数作为参数传给 `dep.depend()`，那 `dep.depend()` 要如何知道把哪个函数收集为依赖函数？

这个方法有一点 tricky，因为 JS 是单线程的，所以在某个时间点只会有一个函数在执行，所以我们可以借助一个全局变量来记录当前正在执行的函数。

### 代码

```js
// 用一个全局变量 activeUpdate 来记录程序中正在执行的函数
let activeUpdate

function autorun(update) {
  function wrappedUpdate() {
    // 当 wrappedUpdate 在执行时，activeUpdate 指向 wrappedUpdate
    activeUpdate = wrappedUpdate
    update()
    // wrappedUpdate 函数执行结束后将 activeUpdate 置空
    activeUpdate = null
  }
  wrappedUpdate()
}

class Dep {
  constructor() {
    // 收集依赖函数的地方
    this.subscribers = new Set()
  }
  depend() {
    // 将当前执行的函数，也就是 wrappedUpdate，收集为依赖函数
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }
  notify() {
    // 执行所有依赖函数
    this.subscribers.forEach(sub => sub())
  }
}

const dep = new Dep()
autorun(() => {
  dep.depend()
  console.log('updated');
})
dep.notify()
```

### 讨论

1. 在以下代码中 `wrappedUpdate` 函数是有必要的吗？

片段一：
```js
function autorun(update) {
  function wrappedUpdate() {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}
```

如果直接写成下面这样，对程序运行也没什么影响

片段二：
```js
function autorun(update) {
  activeUpdate = update
  update()
  activeUpdate = null
}
```

上面两段代码的区别是：

- 片段一是会将 `wrappedUpdate` 函数注册为依赖函数，所以每次调用 `dep.notify()` 的时候，`activeUpdate` 会重新被赋值为正在执行的 `wrappedUpdate` 函数；

- 而片段二则是将 `update` 函数注册为依赖函数，所以 `activeUpdate` 只会在第一次调用 `autorun(update)` 的时候被赋值，之后 `dep.notify()` 调用 `update` 的时候，`activeUpdate` 不会被重新赋值为当前执行的 `update` 函数。

这对程序运行结果并没什么影响，因为 `activeUpdate` 的作用就是为了收集依赖函数，在调用 `autorun` 的时候就已经完成了它的使命，之后有没有再继续记录当前执行的 `update` 函数似乎也无关紧要了。

2. `activeUpdate = null` 是必要的吗？

试想一下以下操作：

1. 将 `fnA` 注册为 `a` 的依赖函数；
2. 将 `fnB` 注册为 `b` 的依赖函数；
3. 修改 `a` 的值，自动调用 `fnA`

如果没有 `activeUpdate = null` 的话，那经过操作 2 之后 `activeUpdate` 的值还是 `fnB`，操作 3 紧接着调用了 `fnA`；我们知道 `fnA` 中是调用了 `dep.depend()` 方法的，而在 `dep.depend()` 方法中，`activeUpdate` 会被收集为依赖函数。所以以上操作导致的结果就是，`fnB` 也被收集为 `a` 的依赖函数了，之后 `a` 的值发生变化时，`fnA` 和 `fnB` 都会被调用。

不过这对程序结果还是没有影响，因为 `fnB` 所依赖的 `b` 并没有变化，所以 `fnB` 多运行一次也没什么，只是有点浪费资源。

## 练习 3: mini observer

### 目标

- 结合练习 1 和 2 实现一个简易的 observer；
- 实现一个 observe 函数，该函数接收一个对象作为参数，经过 observe 处理之后的对象 state 应该：
- 把所有依赖了 state 中某个属性的函数都分别收集起来(如果在一个函数中读取了 state 的属性 count，就说该函数是 state.count 的依赖函数)；
- state 中某个属性发生变化时，调用那个属性的所有依赖函数；

### 期望用法

```js
const state = {
  count: 0
}

observe(state)

autorun(() => {
  console.log(state.count); // should log 0
})

state.count++  // should log 1
```

### 提示

每个对象属性都用一个 `Dep` 实例来管理自己的依赖函数，因为需要把所有获取了对象属性值的函数收集为依赖函数，所以要在属性的 getter 中调用 `depend()` 收集函数；而在属性值发生变化时需要调用所有依赖函数，所以要在属性的 setter 中调用 `notify()`。

### 代码

```js
const observe = obj => {
  Object.keys(obj).forEach(key => {
    // 每个属性都用一个 dep 来管理跟依赖自己的函数
    const dep = new Dep()
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        // 如果某个函数中写到了 obj[key]，就把该函数纳入 key 的 subscribers 中
        dep.depend()
        return internalValue
      },
      set(newValue) {
        // 如果 obj[key] 发生了变化，调用 dep.notify() 来通知所有依赖函数重新执行一遍
        if (newValue !== internalValue) {
          internalValue = newValue
          dep.notify()
        }
      }
    })
  })
}
```

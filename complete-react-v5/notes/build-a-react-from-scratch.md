# Build a React from Scratch

## React.createElement()

首先是一段很简单的 React 代码。

```js
const element = <h1 title="foo">Hello</h1>;
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

1. 定义了一个 React 元素
2. 从 DOM 中获取了一个元素
3. 将 React 元素挂载到 DOM 元素上

其中 JSX 语法 `<h1 title="foo">Hello</h1>` 会经类似 Babel 的编译器被转换成 JS，具体点就是被转换成 `React.createElement` 方法。

```js
const element = React.createElement("h1", { title: "foo" }, "Hello");

const container = document.getElementById("root");
ReactDOM.render(element, container);
```

`React.createElement` 方法会返回一个元素，定义大概如下：

```js
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
};
```

- 描述了元素类型，属性，和子元素

## ReactDOM.render()

如果我们不使用 `ReactDOM.render` 方法，而是手动将 `element` 挂载到 DOM 中，该怎么做呢？

```js
const container = document.getElementById("root")
​
const node = document.createElement(element.type)
node.title = element.props.title
​
const text = document.createTextNode("")
text.nodeValue = element.props.children
node.appendChild(text)

container.appendChild(node)
```

让我们把这段逻辑抽象到 `createElement` 和 `render` 函数中。

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child == "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const node =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // 设置 props
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((prop) => {
      node[prop] = element.props[prop];
    });

  // 递归挂载子元素
  element.props.children.forEach((child) => {
    render(child, node);
  });

  container.appendChild(node);

  // **********************************************
  function isProperty(key) {
    return key !== "children";
  }
}
```

- `createTextElement` 是为了方便将文本内容和其他元素节点统一处理

注意到我们是一口气将元素和它的所有子节点都挂载到 DOM 中，这个过程是阻塞性的，也就是说，从开始渲染到渲染结束这段时间，页面是不可交互的。

## Concurrent Mode

[What is Concurrent Mode](<(https://reactjs.org/docs/concurrent-mode-intro.html#what-is-concurrent-mode)>)

Concurrent Mode 是指将“渲染”这个动作拆分成很多小块，让浏览器分开处理，避免长时间的渲染阻塞了页面的交互。

## More Information

- https://github.com/acdlite/react-fiber-architecture

# web component

web component 是一系列 web 标准的集合。包括：

* custom element
* shadow dom
* html template
* es module

一个 web component 大概如下：

```javascript
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .my-component { font-size: 20px }
  </style>
  <div class="my-component">hello world</div>
`

export default class MyComponent extends HTMLElement {
  constructor() {
    super()
    this.shadowRoot = this.attachShadow({ mode: open }) // 创建一个 shadow dom
    this.render() // 渲染
  }
  render() {
    const content = template.content.cloneNode(true) // 获取模板
    this.shadowRoot.appendChild(content) // 挂载节点
  }
}

window.customElement.define('my-component', MyComponent)
```

在 html 中使用如下。

```html
<my-component></my-component>
```

注意，自定义元素的名称必须包含连词线，用与区别原生的 HTML 元素，且不能用自闭合标签。

## 参考

[Web Components Tutorial for Beginners](https://www.robinwieruch.de/web-components-tutorial/)

[Custom Elements v1 - Reusable Web Components](https://web.dev/custom-elements-v1/)
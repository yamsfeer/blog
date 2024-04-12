# link 标签

link 元素用于引入外部资源，常用于链接样式表。

## 属性

下表列出了 link 元素的属性。

| 属性 | 说明 |
| :--: | :--: |
|   href   |   外部资源的 URL，可以是绝对链接或相对链接。   |
|   crossorigin   |   是否跨域请求资源   |
|   rel   |   外部资源与当前文档的关系   |
|   media   |   外部资源适用的媒体类型   |
|   integrity   | 资源文件的哈希值，以 base64 编码方式加密，可以验证资源是否被篡改 |
|    hreflang    |   资源的语言   |
|   type   |   资源的内容类型，例如 text/html，text/css 等 MIME 类型。   |
|   referrerpolicy   |   设置请求资源时的 referrer 头   |
|   sizes   |   `rel="icon"` 时可用，设置 icon 的大小   |
|   imagesrcset   |   `rel="preload"` 时可用，预加载图片的地址   |
|   imagesizes   |   `rel="preload"` 时可用，预加载图片的大小   |
|   as   | `rel="preload"` 或 `rel="modulepreload"` 时可用，加载内容的类型 |
|   blocking   |   资源文件的元素是否渲染阻塞   |
|   color   |   `rel="mask-icon"` 时可用，icon 的颜色   |
|   disabled   |   是否禁用该外部资源   |
|   fetchpriority   |   请求该外部资源的优先级   |

## rel 属性

**`rel`** 属性定义了外部资源与当前文档的关系。`a`、`area`、`link` 元素支持该属性，不同元素支持的属性值不同，且可以有多个值，每个以空格分隔。

```html
<link rel="preload stylesheet" href="style.css" />
```

下表列出了 link 元素支持的 rel 属性取值。

|     属性      |                           说明                           |
| :-----------: | :------------------------------------------------------: |
|   alternate   |                      文档的替代描述                      |
|    author     |                     文档或文章的作者                     |
|   canonical   |                      文档的首要 URL                      |
| dns-prefetch  |            为目标资源的来源预先执行 DNS 解析             |
|     help      |                  链接到上下文相关的帮助                  |
|     icon      |                    代表当前文档的图标                    |
|    license    |  表示当前文档的主要内容由被引用文件描述的版权许可所涵盖  |
|   manifest    |                       Web 应用清单                       |
| modulepreload |      预先获取该脚本，并将其存储在文档的模块映射中。      |
|   pingback    |        当前文档 pingback 的 pingback 服务器的地址        |
|  preconnect   |               预先连接到目标资源的服务器。               |
|   prefetch    |                  预先获取并缓存目标资源                  |
|    preload    | 根据 as 属性的内容类型和优先级，预先获取和缓存目标资源。 |
|    search     |  给出一个资源的链接，可以用来搜索当前文件及其相关页面。  |
|  stylesheet   |                       导入样式表。                       |

## as 属性

as 属性仅在 link 元素设置了 `rel="preload"` 或 `rel="prefetch"` 时才能使用。

它规定了 link 元素加载的内容的类型，as 属性可帮助浏览器根据内容类型设置预获取资源的优先级、设置正确的标头、以及确定资源是否已存在于缓存中。

```html
<link rel="preload" as="style" href="style.css" />
<!-- 相当于 -->
<style>/* style.css 的内容 */</style>
```

link 元素设置内容优先级、请求匹配、内容安全策略以及 Accept 请求头时，as 属性是必需的。

|    值    |                   应用于                    |
| :------: | :-----------------------------------------: |
|  audio   |                 audio 元素                  |
| document |                 iframe 元素                 |
|  embed   |                 embed 元素                  |
|  fetch   | fetch, XHR，需要 link 包含 crossorigin 属性 |
|   font   |               CSS @font-face                |
|  image   |   img 元素、picture 元素、SVG、CSS 背景图   |
|  object  |                 object 元素                 |
|  script  |   script 元素，Web Worker 的 importScript   |
|  style   | `link rel="stylesheet"` 元素、CSS `@import` |
|  track   |                 track 元素                  |
|  video   |                 video 元素                  |
|  worker  |            Worker, SharedWorker             |

## 参考

[HTML link 标签 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#%E5%B1%9E%E6%80%A7)

[link 标签 - whatwg](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element)

[HTML 全局属性 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

[HTML rel 属性 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel)

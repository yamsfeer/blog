# fetch

fetch 是 Web 网络请求的现代 API，旨在取代传统的 XMLHttpRequest。以下是一个基本的使用示例：

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error(error)
  })
```

fetch 接受一个 url 或 Request 对象，返回一个 Promise 对象，且 Promise 对象 resolve 的值是一个 Response 对象。

## Request

Request 对象包含了一个网络请求的各种信息。以下是一个用 Request 对象发起请求的例子：

```javascript
const request = new Request('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token'
  },
  body: JSON.stringify({ key: 'value' })
});

fetch(request)
  .then(response => response.json())
```

事实上，对于 Request 的 method、headers 等内容，可以在 fetch 函数的第二个参数中配置。

```javascript
const headers = new Headers({
  'Authorization': 'Bearer your-access-token'
});

const requestOptions = {
  method: 'POST',   // 指定请求方法为 POST
  headers: headers, // 指定头部
  body: JSON.stringify({ key: 'value' }) // 请求体，可以是字符串、FormData 等
};

fetch('https://api.example.com/data', requestOptions)
  .then(response => response.json())
```

Request 对象的配置属性：

| 属性 |  值  | 说明 |
| :--: | :--: | :--: |
|  method   | GET、POST、PUT 等。默认为 GET | 请求方法 |
|  headers   | { "Content-Type": "application/json" } | 一个对象，表示请求头部。每个属性对应一个头部字段 |
|  body   | 字符串、Blob 对象、BufferSource、FormData、URLSearchParams 或 ReadableStream | 请求主体 |
|  mode   | cors、no-cors、same-origin，默认为 cors | 请求的模式 |
|  credentials   | same-origin、include、omit，默认为 same-origin | 请求的凭证模式 |
|  cache   | default、no-store、reload、no-cache，默认为 default | 请求的缓存模式 |
|  redirect   | follow、error、manual，默认为 follow | 重定向处理 |
|  referrer   | no-referrer、client，默认为 client | 请求的 Referer 头部 |
|  referrerPolicy   | no-referrer、strict-origin-when-cross-origin，默认为 no-referrer | 请求的 Referrer-Policy 头部 |
|  integrity   | 请求的完整性 ( Subresource Integrity，SRI ) 校验值 | 用于校验响应的完整性 |

## Response

Response 对象提供了一系列方法来处理响应数据。以下是一个 Response 的示例：

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())

fetch('https://api.example.com/data')
  .then(response => response.test())
```

Response 对象的属性和方法：

| 方法          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| clone()       | 创建并返回当前 Response 对象的一个副本。                     |
| text()        | 返回一个 Promise，将响应体解析为文本字符串。                 |
| json()        | 返回一个 Promise，将响应体解析为 JSON 对象。                 |
| arrayBuffer() | 返回一个 Promise，将响应体解析为 ArrayBuffer 对象。          |
| blob()        | 返回一个 Promise，将响应体解析为 Blob 对象。                 |
| formData()    | 返回一个 Promise，将响应体解析为 FormData 对象。             |
| ok            | 一个布尔值，表示响应是否成功。如果状态码在 200 到 299 之间，则为 true。 |
| status        | 响应的 HTTP 状态码。                                         |
| statusText    | 响应的 HTTP 状态消息。                                       |
| headers       | 响应头部的 Headers 对象。                                    |

## 取消 fetch 请求

取消 fetch 请求需要用到 AbortController。

```javascript
const controller = new AbortController()
const signal = controller.signal

fetch(url, { signal })

signal.addEventListener('abort',
  () => console.log('abort')
)

controller.abort() // 发出取消信号
signal.aborted // true
```


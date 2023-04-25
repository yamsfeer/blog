# webpack

## 工作模式

假设项目 src 目录下有如下代码：

```javascript
// src/index.js
import { name } from './moduleA.js'
console.log(name)

// src/moduleA.js
export const name = 'myname'
```

在项目根目录下创建文件 webpack.config.js：

```javascript
module.exports = {
  entry: './src/index.js'
}
```

执行打包命令，可以看到项目根目录下多出一个 dist/main.js 文件，这就是打包后的结果。

```javascript
(()=>{"use strict";console.log("yamsfeer")})();
```

并且在命令行有警告：

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
...
```

webpack 可以指定 `none, development, production` 三种打包模式，默认值为 `production`。

* none：单纯打包代码，不做额外工作
* development：优化打包速度，并在打包文件中添加一些调试需要的代码
* production：为生产环境打包进行各种优化，比如压缩代码

具体三种模式的区别可以参考[官方文档](https://webpack.js.org/configuration/mode/)。

## 打包结果解读

假设将项目代码如下：

```javascript
// src/index.js
import { nameA } from './moduleA.js'
import { nameB } from './moduleB.js'

console.log(nameA)
console.log(nameB)
```

```javascript
// src/moduleA.js
export const nameA = 'moduleA'

// src/moduleB.js
export const nameB = 'moduleB'
```

webpack 打包后的代码是个立即执行函数，整体 bootstrap 过程分 4 步。

```javascript
(() = { // webpackBootstrap
  // 定义模块数组
  // 定义 __webpack_require__ 函数
  // 为 __webpack_require__ 函数挂载工具方法
  // 使用 __webpack_require__ 函数导入模块
})()
```

```javascript
var __webpack_modules__ = ([
  /* 0 */,
  /* 1 */
  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      "name": () => (/* binding */ nameA)
    });
    const nameA = 'moduleA'
  }),
  /* 2 */
  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      "name": () => (/* binding */ nameB)
    });
    const nameB = 'moduleB'
  })
]);
```

```javascript
// The module cache
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // Create a new module (and put it into the cache)
  var module = __webpack_module_cache__[moduleId] = {
    // no module.id needed
    // no module.loaded needed
    exports: {}
  };

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // Return the exports of the module
  return module.exports;
}
```

```javascript
/* webpack/runtime/define property getters */
(() => {
  // define getter functions for harmony exports
  __webpack_require__.d = (exports, definition) => {
    for(var key in definition) {
      if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();

/* webpack/runtime/hasOwnProperty shorthand */
(() => {
  __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();

/* webpack/runtime/make namespace object */
(() => {
  // define __esModule on exports
  __webpack_require__.r = (exports) => {
    if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
})();
```

```javascript
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
  __webpack_require__.r(__webpack_exports__);

  var _moduleA_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1); // 导入模块 1
  var _moduleB_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2); // 导入模块 2

  console.log(_moduleA_js__WEBPACK_IMPORTED_MODULE_0__.name) // index.js 的 console.log 调用
  console.log(_moduleB_js__WEBPACK_IMPORTED_MODULE_1__.name)

})();
```

## loader

loader 机制是 webpack 的核心。

webpack 从入口文件开始，根据 import、require 等语句，找出整个项目的依赖关系树，然后遍历这棵树，将不同的文件类型交给相应的 loader 处理，然后将处理结果添加到最后的 bundle.js 文件中。

webpack 本身只能处理 js 文件，当遇到其他资源比如 css 文件时，需要其他 loader 处理。在 webpack 配置文件中加入如下配置即可使用 loader 处理 css 文件。

```javascript
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /.css$/,
      use: [
        // 注意，loader 的处理顺序是从后往前
        // 即先用 css-loader 处理完，结果传给 style-loader
        'style-loeader',
        'css-loader'
      ]}
    ]
  }
}
```

常见的 loader 有：

* css-loader：将 css 代码转成 js 模块
* style-loader：将 css 代码通过style 标签添加到 html 中
* file-loader：处理图片等资源
* url-loader：将文件转为 data-url 的格式，后面有介绍

可以说，loader 为 webpack 提供了处理所有类型资源文件的能力。事实上，loader 大致可以分为三类：

* 编译转换类：如 css-loader，babel-loader
* 文件操作类：如 file-loeader
* 代码检查类，如 eslint-loader

### data-url

data-url 分为协议、媒体类型和编码、文件内容三部分，具体格式为：

```
data:[<mediatype>][;base64],<data>
```

举几个例子：

```
data:text/html;charset=utf-8,<h1>content</h1> // h1 标签
data:image/png;base64,AJSJrii8eAKD...AJSzdadCKKzod // base 64 图片
```

### 编写一个 loader

下面以 markdown-loader 为例，介绍编写 loader 的过程。

loader 其实是一个函数，它接收源文件的内容，并返回一个处理后的结果。这里我们用 marked 包将 markdown 文本转换成 html 文本。

```javascript
// markdown-loader.js
const marked = require('marked').marked

module.exports = source => {
  const html = marked(source) // 处理 markdown 文本，获得 html 文本
  return html
}
```

值得注意的是，loader 函数返回的结果是会直接以**字符串拼接**的形式加入到 bundle 文件中的，所以，loader 的返回值需要是规范的 javascript 代码。于是，我们用 `module.exports` 将 html 文本导出。

```javascript
// markdown-loader.js
const marked = require('marked').marked

module.exports = source => {
  const html = marked(source)
  return `module.exports = ${JSON.stringify(html)}` // 返回值会直接拼接到 bundle 中
}
```

之所以要用 `JSON.stringify` 处理 html 文本是因为 html 中的换行符或引号等会造成代码错误。

处理一段 markdown 代码：

```markdown
# title1
## title2
```

可以看到打包后的模块代码：

```javascript
((module) => {
  module.exports = "<h1 id=\"title1\">title1</h1>\n<h2 id=\"title2\">title2</h2>\n"
})
```

编写完 loader 后，在配置文件中使用该 loader 处理 markdown 文件。

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [{
      test: /.md$/,
      use: './markdown-loader.js'
    }]
  }
}
```

另外，我们也可以用 `export default` 的方式导出 html 文本。

```javascript
module.exports = source => {
  return `export default ${JSON.stringify(marked(source))}`
}
```

打包后的结果：

```javascript
((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  __webpack_require__.r(__webpack_exports__);
  __webpack_require__.d(__webpack_exports__, {
    "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  });
  const __WEBPACK_DEFAULT_EXPORT__ = ("<h1 id=\"title1\">title1</h1>\n<h2 id=\"title2\">title2</h2>\n");
})
```

## plugin

loader 专注于实现模块资源加载，而 plugin 则是用来解决除了资源加载以外的自动化工作。

常用的插件：

* clean-webpack-plugin：打包生成文件前，清除上一次打包结果
* html-webpack-plugin：自动生成导入 bundle 的 html 文件
* copy-webpack-plugin：将不需要参与构建的静态文件加入 dist 目录，比如 favicon.ico
* define-plugin：webpack 自带的插件，向代码中注入常量，比如 `process.env.NODE_ENV`

### 编写一个 plugin

plugin 是通过钩子机制实现的。其本质是一个函数或一个包含 apply 方法的对象。

我们通常以类的形式编写 plugin，下面来编写一个去除 bundle 中无效注释的插件 DelComment。

```javascript
class DelComment {
  apply(compiler) {
    compiler.hooks.emit.tap('delComment', compilation => {
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const content = compilation.assets[name].source()
          const withOutComment = content.replace(/\/\*+\*\//g, '')

          compilation.assets[name] = {
            source: () => withOutComment,
            size: () => withOutComment.length
          }
        }
      }
    })
  }
}
```

可以看到，apply 函数接收 webpack 编译过程中的上下文 compiler，我们在 webpack 的 `emit hook` 中添加了一个函数，针对 js 文件，将其注释代码去除后重新写回即可。

编写完插件后，在 webpack.config.js 中创建一个插件实例。

```javascript
module.exports = {
  plugins: [
    new DelComment()
  ]
}
```

总的来说，插件就是在生命周期钩子中挂载函数，plugin 的细节内容参考[文档](https://webpack.docschina.org/contribute/writing-a-plugin)。

## dev server

devServer 会监听项目的文件， 当文件内容发生改版，则重新打包并通过内部的 http server 通知浏览器刷新。

值得的注意的是，devServer 打包项目后并不会生成打包文件，而是保存在内存中，从而减少文件读写，提高打包速度。

通过安装 webpack-dev-server 依赖，然后通过命令即可创建 devServer。

```shell
$ pnpm i webpack-dev-server
$ pnpm webpack-dev-server
```

### proxy

devServer 有一个常用的功能是代理 API。

在开发过程中，本地的地址通常是 `localhost:8080`，假设我们要请求的线上地址是 `https://example.com/api/users`，则会产生跨域问题。

如果线上接口不支持跨域资源共享 ( CORS )，我们需要通过一个代理服务器来请求 API。

注意，服务器不支持 CORS 不代表服务器会拒绝该请求，我们遇到的跨域问题通常是浏览器端出于安全的考虑，拒绝客户端接收跨域请求的结果，这也是为什么我们需要代理服务发起请求。

总的来说，客户端不能获取跨域资源是浏览器做了拦截，代理服务器是能获取跨域资源的。

devServer 要启用代理只需做如下配置：

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // http://localhost:8080/api/users => https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users => https://api.github.com/users
        pathRewrite: { '/api': '' },
        changeOrigin: true // 不能用 localhost: 8080 作为请求的主机名
      }
    }
  }
}
```

### HMR

HMR ( hot module replacement ) 是 webpack 的一个强大功能，它能使我们在修改代码后 ( 如修改 css 代码 ) 部分更新页面而不是重新刷新，这提供了良好的开发体验。

webpack 开启 hmr 有两种方式，一个是使用命令

```shell
$ webpack-dev-server --hot
```

还有一种方法是通过配置文件。

```javascript
module.exports = {
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

HMR 不是一个开箱即用的功能，我们需要告诉 webpack 模块代码更新之后需要做什么。

之所以修改样式文件可以实现热更新而不需添加其他代码，是因为 style-loader 已经做了这部分工作。

```javascript
if (module.hot) {
  if (!content.locals || module.hot.invalidate) {
    // ...
    module.hot.accept(
      "!!../node_modules/.pnpm/css-loader@6.7.1_webpack@5.74.0/node_modules/css-loader/dist/cjs.js!./style.css",
      function () {
        if (!isEqualLocals(oldLocals, isNamedExport ? namedExport : content.locals, isNamedExport)) {
          module.hot.invalidate();
          return;
        }
        oldLocals = isNamedExport ? namedExport : content.locals;
        update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}
```

对于样式代码来说，style-loader 只需要在代码变更后将 css 代码替换掉 style 标签的内容即可；但是对于 js 代码来说，没有很好的办法预测，所以需要使用者自己编写 `module.hot..accept` 里面的内容。

对于 js 代码，要想使用 HMR 过于复杂，相反，样式、图片等的热更新就相对容易了。

```javascript
const imgSrc = require('./img')
const img = new Image
img.src = imgSrc

// 热更新代码
if (module.hot) {
  module.hot.accept('./img', () => {
    img.src = imgSrc // 只需要重新设置 src 地址即可
  })
}
```

如果是成熟的框架，社区通常有相应的热更新方案，比如 [vue-loader](https://webpack.docschina.org/guides/hot-module-replacement#other-code-and-frameworks) 就支持 vue 组件的 HMR，提供开箱即用体验。

使用 hmr 还有两个个问题要注意：

* 如果 hmr 代码中有错误，是导致 hmr 失败，webpack 默认会回退到刷新浏览器的方式，这使得我们看不到 hmr 的代码报错。

  解决办法也简单，设置 `devServer: { hotOnly: true }`，这个设置下，hmr 报错也不会刷新浏览器

* hmr 这段代码是和业务无关的，不是 devServer 开发时，这写代码会被移除掉。

## source map

由于打包后的代码通常难以阅读和调试，我们可以通过 source map 来构建源代码和打包后代码间的联系。

在 webpack 中加入配置启用 source map：

```javascript
module.exports = {
  devtool: 'source-map'
}
```

可以看到打包后 dist 目录多出一个 main.js.map 文件，里面存储的是代码映射的内容。

```json
{
  "version": 3,
  "file": "main.js",
  "mappings": ";;;;;;;;;;;AAAA,iEAAe;;;;;UCAf;...",
  "sources": [
    "webpack://usewebpack/./src/test.md",
    "webpack://usewebpack/webpack/bootstrap",
    "...",
    "webpack://usewebpack/./src/index.js"
  ],
  "sourcesContent": [
    "export default \"<h1 id=\\\"title1\\\">title1</h1>\\n<h2 id=\\\"title2\\\">title2</h2>\\n\"",
    "// The module cache\nvar __webpack_module_cache__ = {};\n\n// The require function\nfunction __webpack_require__(moduleId) ...",
    "..."
  ],
  "names": [],
  "sourceRoot": ""
}
```

在 main.js 中，最后一行也通过注释的方式指定了 source map 的地址。

```javascript
/* bundle content */
//# sourceMappingURL=main.js.map
```

有了 soure map 的地址，浏览器的开发者工具就可以知道当前运行的代码和源代码的对应关系。

source map 有 26 个可选模式，它们各有特点，下表截取了部分模式的对比，具体看[文档](https://webpack.docschina.org/configuration/devtool/#devtool)。

| devtool                        | performance                              | production | quality        | comment                                                      |
| :----------------------------- | :--------------------------------------- | :--------- | :------------- | :----------------------------------------------------------- |
| (none)                         | **build**: fastest  **rebuild**: fastest | yes        | bundle         | Recommended choice for production builds with maximum performance. |
| **`eval`**                     | **build**: fast  **rebuild**: fastest    | no         | generated      | Recommended choice for development builds with maximum performance. |
| `eval-cheap-source-map`        | **build**: ok  **rebuild**: fast         | no         | transformed    | Tradeoff choice for development builds.                      |
| `eval-cheap-module-source-map` | **build**: slow  **rebuild**: fast       | no         | original lines | Tradeoff choice for development builds.                      |
| ...                            | ...                                      | ...        | ...            | ...                                                          |

其实，这二十多种模式是由 `eval,cheap,module,inline...` 等几个关键字组合而来的。

下面介绍这些关键字代表的含义。

* eval

  eval 模式下，webpack 会将各个模块代码用 `eval()` 包裹起来，并在最后添加 `sourceURL` 标注当前代码对应的源文件地址。

  eval 模式的打包结果：

  ```javascript
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n\n\n\n//# sourceURL=webpack://usewebpack/./src/index.js?");
  ```

  事实上，eval 模式并没有真正生成 source map 文件，调试时也只能定位到发生错误的文件。

  webpack 还有一个 eval-source-map 模式，这个模式同样是用 eval 函数包裹代码并标注 sourceURL，但不同的是，这个模式生成了 source map 文件，这使得客户端可以定位到错误具体的行和列。

  eval-source-map 模式的打包结果：

  ```javascript
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n\n//# sourceURL=[module]\n//# sourceURL=webpack-internal:///0\n");
  ```

  可以看出，含有 eval 关键字的 source map 模式，都是用 eval 函数将代码包裹并指定 sourceURL。

* cheap：含有 cheap 关键字的 source map 模式只能定位到行而不能定位到列。

* module：包含 module 的模式会保留原来 es6 的代码。
* inline：将 source map 转换为 DataUrl 后添加到 bundle 中。

* nosource：生成source map 文件但不包含源文件内容，可以看做一种代码保护。

关键字组合模式： `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`。

关于其他关键字的内容参考[文档](https://webpack.docschina.org/configuration/devtool/#qualities)。

综合以上特点，建议开发模式下选择 `eval-cheap-module-source-map`，生产环境选择 `none` 或 `nosources-source-map`。

## tree shaking

tree shaking 在 production 会自动启用。

tree shaking 不是 webpack 的某个配置选项，而是一组功能搭配使用的优化效果。

```javascript
module.exports = {
  optimization: {
    usedExports: true, // bundle 中不导出未被使用的 export 代码
    minimize: true, // 压缩代码，删除未引用代码
    concatenateModules: true, // 将模块代码合并为一个模块
  }
}
```

### sideEffect

sideEffect 可以指定某个文件是否是有副作用的，如果是没有副作用且没有被导入引用的文件，则可以直接跳过。

```javascript
// log.js
Object.prototype.log = function log() { console.log(this) }

// index.js
import './log.js'

let ojb = {}
obj.log()
```

log.js 的内容虽然没有被 export，但它在 Object.prototype 上挂载了 log 方法，这就是有副作用的代码。

如果我们能确定没有类似的有副作用的代码，则可以通过以下配置排除这些文件。

```javascript
module.exports = {
  optimization: {
    sideEffects: false
  }
}
```

对于含有副作用的文件 ，也可以在 package.json 中指定。

```json
{
  "sideEffects": ['./src/log.js', 'style.css']
  // "sideEffects": false // 所有文件都不含副作用
}
```

在代码语句层面，我们也可以用注释 `/*#__PURE__*/` 表示这个语句时不含有副作用的，从而使其能被 tree shaking。

```javascript
/*#__PURE__*/ double(55);
```

## code splitting

webpack 在生产模式下，将所有模块都打包成一个文件，这使得整个模块的文件过大，而网站初始化时是不需要立即下载所有代码的，我们需要进行代码分割，然后按需加载。

代码分割通过 SplitChunksPlugin 配置：

```javascript
module.exports = {
  optimization: {
     splitChunks: {
       chunks: 'all',
     },
   },
}
```

详情参考[文档](https://webpack.docschina.org/guides/code-splitting/)。

[透过分析 webpack 面试题，构建 webpack5.x 知识体系](https://juejin.cn/post/7023242274876162084)

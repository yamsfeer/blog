# 混合环境JavaScript

JavaScript 程序几乎总是在宿主环境中运行，这使得它在一定程度上变得不可预测。

比如：当你的代码在不同的 JavaScript 引擎上运行时，有些地方就会出现差异。

下面将介绍这些差异。

## Annex B

JavaScript 语言的官方名称是 ECMAScript，JavaScript 是 ECMAScript 的通用称谓。

确切地说，***JavaScript* 是 *ECMAScript规范* 在浏览器上的实现。**

ECMAScript 规范包括 Annex B，其中介绍了由于浏览器兼容性问题导致的与官方规范的差异。

因此，可以认为以下这几点只会出现在浏览器，而不会出现在*Node.js、Rhino*等环境中。

- 在非严格模式中允许八进制数值常量存在，如 0123(即十进制的 83)。

- `window.escape` 和 `window.unescape` 让你能够转义(escape)和回转(unescape)

  带有%分隔符的十六进制字符串。例如，window.escape( "? foo=97%&bar=3%" )的结果

  为 "%3Ffoo%3D97%25%26bar%3D3%25"。

- `String.prototype.substr` 和 `String.prototype.substring` 十分相似，除了前者的第二个

  参数是结束位置索引(非自包含)，后者的第二个参数是长度(需要包含的字符数)。

## Web ECMAScript

[Web ECMAScript 规范](https://javascript.spec.whatwg.org)中介绍了官方ECMAScript 规范和目前基于浏览器的 JavaScript 实现之间的差异。

通常来说，出现这些差异的情况很少，所以了解即可。以下内容在实际开发中很少使用，也不推荐。

- `<!-- 和 -->` 是合法的单行注释分隔符。

- String.prototype 中返回HTML格式字符串的附加方法:anchor(..)、big(..)、

  blink(..)、bold(..)、fixed(..)、fontcolor(..)、fontsize(..)、italics(..)、 link(..)、small(..)、strike(..) 和 sub(..)。

- RegExp 扩展：`RegExp.$1` ... `RegExp.$9`(匹配组)和 `RegExp.lastMatch/RegExp["$&"]`(最近匹配)。

- Function.prototype 附加方法：

  `Function.prototype.arguments`(别名为 arguments 对象) 和 `Function.caller`(别名为 arguments.caller)。

## 宿主对象

宿主对象(包括内建对象和函数)是由宿主环境，比如 *浏览器、Node.js*，创建并提供给 JavaScript 引擎的变量。

考虑一下代码：

```javascript
var div = document.createElement( "div" );
typeof div; // "object"
Object.prototype.toString.call( div ); // "[object HTMLDivElement]"
div.tagName; // "DIV"
```

上述例子中，`div` 是一个特殊的宿主对象，它是一个 DOM 元素。

其内部的 `[[Class]]` 值为 `HTMLDivElement`，来自预定义的属性(通常也是不可更改的)。

其他需要注意的宿主对象的行为差异有:

- 无法访问正常的 object 内建方法，如 toString();
- 无法写覆盖;
- 包含一些预定义的只读属性;
- 包含无法将 this 重载为其他对象的方法;
- 其他

在针对运行环境进行编码时，宿主对象扮演着一个十分关键的角色，但要特别注意其行为特性，因为它们常常有别于普通的 JavaScript object。

### console 对象

console 对象由宿主环境提供，以便从代码中输出各种值。

* console 在浏览器中是输出到 **开发工具控制台**

* 在 Node.js 中，则是指向 JavaScript 环境系统进程的 **标准输出(stdout)** 和 **标准错误输出(stderr)**。

## 全局 DOM 变量

这是一个浏览器演进的历史遗留问题：在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量。

```html
<div id="foo"></div>
```

```javascript
if (typeof foo == "undefined") {
  foo = 42; // 永远也不会运行
}
console.log( foo ); // HTML元素
```

##原生原型

**尽量不要拓展原生原型。**

```javascript
// Netscape 4没有Array.push
Array.prototype.push = function(item) {
  this[this.length-1] = item;
};

// 上面的push不能添加多个元素，比如[].push(1, 2, 3)
// 而且会覆盖高版本浏览器提供的push方法
if (!Array.prototype.push) {
	Array.push Array.prototype.push = function(item) {
    this[this.length-1] = item;
  };
}
```

## `<script>`

web应用程序中加载Javascript代码的两种方式：

* `<script src='url'></script>`
* `<script> /* javascript代码 */</script>`

对于这两种方式加载进来的JavaScript代码：

* 它们共享 global 对象(在浏览器中则是 window)，也就是说**这些文件中的代码在共享的命名空间中运行，并相互交互**。

  但是*变量作用域的提升机制*在这些边界中不适用。

  ```html
  <-- 以下代码未声明就使用 </-->
  <script>foo()</script>
  <script> function foo() {} </script>
  
  <-- 以下代码可用 -->
  <script>
    foo()
    function foo() {}
  </script>
  
  <script>
    function foo() {}
  </script>
  <script>foo()</script>
  ```

* 如果 script 中的代码(无论是内联代码还是外部代码)发生错误，它会像独立的 JavaScript 程序那样停止，

  但是后续的 script 中的代码依然会**继续运行**。

* 动态加载JavaScript代码

  ```javascript
  var greeting = "Hello World";
  var el = document.createElement( "script" ); // 创建script标签
  
  el.text = "function foo(){ alert( greeting )} setTimeout( foo, 1000 );"; // 设置script代码内容
  // 或者
  el.src = 'url-to-script-file' // 设置为一个URL文件，动态加载外部文件
  
  document.body.appendChild( el ); // 添加标签
  ```

* 对于外部文件，会根据代码文件的字符集属性(UTF-8、ISO-8859-8 等)来解析外部文件中的代码(或者默认字符集)。

  对于内联代码，则使用其所在页面文件的字符集 (或者默认字符集)。*内联代码的 script 标签没有 charset 属性*。

## 保留字

ES5 规范在 7.6.1 节中定义了一些“保留字”，我们不能将它们用作变量名。

* 关键字：比如`function`
* 预留关键字：比如`enum`
* `null、true、false`等

## 实现中的限制

JavaScript 规范对于函数中参数的个数，以及字符串常量的长度等并没有限制。但是由于JavaScript 引擎实现各异，规范在某些地方有一些限制。

```javascript
function sum(...args) {
  let sum = 0;
  for(let i = 0; i < args.length; i++) {
 		sum += i;   
  }
  return sum;
}

const nums = Array(100000).fill(0).map((item, i) => i);

sum(2, 4, 6); // 12
sum.apply(null, nums); // 应该是: 499950000
```

在一些 JavaScript 引擎中你会得到正确答案 499950000，而另外一些引擎(如 Safari 6.x)中则会产生错误`“RangeError: Maximum call stack size exceeded”`。

下面列出一些已知的限制:

- 字符串常量中允许的最大字符数(并非只是针对字符串值);
- 可以作为参数传递到函数中的数据大小(也称为栈大小，以字节为单位);
- 函数声明中的参数个数;
- 未经优化的调用栈(例如递归)的最大层数，即函数调用链的最大长度;
- JavaScript 程序以阻塞方式在浏览器中运行的最长时间(秒);
- 变量名的最大长度。

## 小结

* `Annex B` 介绍了由于浏览器兼容性问题导致的与官方规范的差异。
* `Web ECMAScript` 介绍了官方ECMAScript 规范和目前基于浏览器的 JavaScript 实现之间的差异。

* JavaScript通常运行在宿主环境中，而宿主通常会提供一些该环境下特有的宿主对象，比如`document、window`。
* 在浏览器中，由于浏览器演进的历史遗留问题，在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量。
* 不要扩展原生原型。
* Web应用程序中加载JavaScript有两种方式，它们之间共享全局变量，并相互交互。
* 保留字有四类：“关键字”、“预留关键字”、null 常量、true/false 布尔常量
* JavaScript 引擎实现各异，应该了解他们之间对规范作出的限制的差异。
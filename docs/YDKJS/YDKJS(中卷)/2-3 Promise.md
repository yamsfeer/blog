# Promise

## 什么是 promise

### promise两要素

* 承诺

  当你在汉堡店下单后，会得到一张收据，这是汉堡店给你的承诺，它承诺一段时间后给你一个汉堡。等待期间你可以去干些别的事。

  *（ pending 状态的 promise ）*

* 承诺结果：最终要么得到汉堡，要么没得到汉堡，不变的是每个订单都有个最终的状态。

  *（ promise 的 fulfill 或 reject ）*

### 判断是不是 promise

如何确定某个值是不是 Promise，或者说，行为方式类似于 promise ?

可通过以下两种方法判断：

* `p instanceof Promise === true`
* 用鸭子类型判断，promise 的一大特征就是拥有 then 方法

  ```javascript
  if (
    p !== null &&
    (typeof p === "object" || typeof p === "function") &&
    typeof p.then === "function"
  ){
    // 假定这是一个thenable!
  }
  ```

### Promise.resolve

`Promise.resolve` 接收的参数可以分为以下几种情况：

* 传入立即值，得到用这个值填充的 promise

  ```javascript
  Promise.resolve(22)
  ```

* 传入 promise 对象，直接返回这个 promise

  ```javascript
  var p1 = Promise.resolve(22);
  var p2 = Promise.resolve(p1);

  p1 === p2 // true
  ```

* 传入非 promise 的 thenable 值，就会试图展开这个值，直到提取出一个具体值

  ```javascript
  var p = {
    then(cb) { cb(42) }
  }

  Promise.resolve(p)
    .then(
    	val => console.log(val), // 42
      err => console.log(err)
    )
  ```

由此可见，我们可以通过 `Promise.resolve` 保证得到一个 promise。

## promise 的三个状态

4 个重要术语：pending(等待)、resolve(完成)、fullfill(接受)、reject(拒绝)。

* promise 只能从 pending 变为 resolved，且只能改变一次。
* 从 pending 变为 resolved 有两种途径：fullfill 或 reject。

<img class="img-mid" src="https://tva1.sinaimg.cn/large/e6c9d24egy1h61pptyrocj20a007cq30.jpg" style="zoom:80%;" />

其中容易引起误解的是resolve。

创建 promise 时处理函数通常命名为 resolve 和 reject，但他们不是对应关系。resolve 表示这个 promise 已经不可更改了。

```javascript
new Promise((resolve, reject) => resolve(23))
```

事实上，resolve 也可以得到 reject 状态的 promise：

```javascript
new Promise(resolve => resolve(Promise.reject("Oops")))
  .then(
    // ES6 规范将这两个回调命名为 onFulfilled 和 onRjected，
    // 所以fulfilled、rejected这两个术语很准确。
    function fulfilled(){},
    function rejected(err){
      console.log( err ); // "Oops"
    }
  )
```

综上，promise 有 pending 和 resolved 两种状态；其中 resolved 有 fullfilled、 rejected 两种可能。

## 链式调用

下面介绍 promise 在链式调用中的数据传递、先后关系和错误处理。

### 数据传递

每次调用 then 函数，都会创建并返回一个新的 promise

```javascript
Promise.resolve(21) // p0
// p1
.then(v => {
  console.log(v); // 21
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(v * 2), 1000); // p1 1秒后 resolve
  })
})
// p2
.then(v => console.log(v)) // 42
```

### 先后关系

在 then 方法中，如果 fullfill 或 reject 函数返回了新的 promise，需要等这个新 promise 完成

```javascript
function request(url) {
  return new Promise((resolve, reject) => ajax( url, resolve ));
}

request( "http://xxx/" )
  // 返回新的promise，需要等待它完成才能得到response2
  .then(res1 => request( "http://xxx/" + res1 ))
  .then(res2 => console.log( res2 ));
```

### 错误处理

**错误和异常是基于每个 promise 的**，这意味着可能在链的任意位置捕捉到这样的错误。

抛出错误或调用 reject 函数会使 promise 状态变为 rejected。

```javascript
request( "http://some.url.1/" )
  .then(res1 => {
    foo.bar() // undefined，出错!
    return res1 // 永远不会到达这里
  })
  .then(
    function fulfilled(){}, // 永远不会到达这里
    // 上一个promise抛出异常，相当于reject，因此这里的promise会调rejected函数
    function rejected(err){
      // 捕捉到来自foo.bar()的错误TypeError
      console.log( err );
      return 42;
    }
  )
  .then(msg => console.log( msg ); // 42
```

**在 then 函数中，如果不传入 fullfill 或 reject 处理函数，会有默认的处理函数被传入。**

```javascript
var p = new Promise((resolve, reject) => reject( "Oops" )); // reject
var p2 = p.then(
  function fulfilled(){},
  // 默认的reject处理函数，如果省略或者传入任何非函数值则会被使用
  /*function rejected(err) {
      throw err;
	}*/
);
```

默认拒绝处理函数只是把错误重新抛出，这最终会使得 p2用同样的错误理由 reject。

从本质上说，这使得错误可以继续沿着 Promise 链传播下去，直到遇到显式定义的 reject 处理函数。

```javascript
var p = Promise.resolve(21);
p.then(
  null,
  // 如果没有传递一个有效的函数，则使用默认的fullfill处理函数
  // 把接收到的任何传入值传递给下一个promise
	// v => v,
	function rejected(){}
);
```

### 小结

总结一下，promise 的流程控制：

* 调用 then 方法会自动创建一个新的 promise
* 如果处理函数返回一个值或抛出异常，这个 promise 就会 resolve
* 如果处理函数返回一个 promise，它将会被展开，不管它的决议值是什么，都会成为当前 then 返回的链接 Promise 的决议值。

## 错误处理

调用 reject 函数、JavaScript 抛出异常都可以使 promise 被 reject。

`try-catch`语句只能处理同步情况，不能用于处理 promise 的异常。

参考以下代码：

```javascript
var p0 = new Promise((resolve, reject) => reject(0));
var p1 = p0.then(
  fullfilled1() {},
  rejected1() {}, // 处理p0的rejct或异常（异常会使promise拒绝）
)
var p2 = p1.then(
  fullfilled2() {},
  rejected2() {}, // 处理p1的reject或异常
)
// 如果p1,p2都没传入reject处理函数，统一在catch函数处理
var p3 = p2.catch(handleErrs)
```

可以看出，每个 reject 处理函数处理的都是上一个 promise 的异常或reject。

如果 p1,p2 都没传入 reject 处理函数，根据上节提到的默认 reject 处理函数，整个链式调用中可能出现的异常可以“汇集”到 catch 函数中。

但是仍有两个问题：

* catch 函数中无法判断是哪个 promise 出错
* 如果 handleErrs 函数本身有异常，则无法捕获

书中没有给出这两个问题的标准处理方法。

## 异步模式

### Promise.all

```javascript
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)

let p = Promise.all([p1, p2])
  .then(res => console.log(res)) // [1, 2]
```

`Promise.all` 接收一个 promise 数组，返回一个主 promise。

* 子 promise 都 resolved，主 promise 才 resolved。
* 子 promise 有任何 rejected，主 promise 也立即 rejected，并丢弃其余 promise 的结果
* 主 promise 的 resolve 结果由子 promise 的完成消息组成，与传入时顺序一致 ( 与完成顺序无关 )

### Promise.race

* 任一个子 promise fullfill，主 promise 就 fullfill
* 任一个子 Promise reject，主 promise 就 reject

Promise.race 的一个例子，超时请求：

```javascript
Promise.race([
  foo(), // 启动foo()
  timeoutPromise( 3000 ) // 给它3秒钟
])
.then(
  function() {}, // foo 3秒内完成
  function(err) {} // 要么 foo 被拒绝，要么没能够按时完成
);
```

### 其他

* Promise.any：任一 promise 完成
* Promise.allSettled：所有的 promise 都 settled ( 无论 fullfilled 或 rejected )
* 其他 API 如 none、first、last、map 等，没有被纳入标准，因此不具体介绍

## promise 的局限

### 无法判断错误来源

很多时候并没有为 Promise 链序列的中间步骤保留的引用，没有这样的引用，你就无法关联错误处理函数来可靠地检查错误。

```javascript
// p 指向 .catch( handleErrors )返回的 promise
var p = foo( 42 )
  .then( STEP2 )
  .then( STEP3 )
  .catch( handleErrors )
// 无法判断错误来自哪一步
// handleErrors如果出错无法捕获
```

### 只能 fullfill 或 reject 单个值

根据定义，promise 只能在 fullfill 或 reject 中传递一个值。

虽然可以用数组或对象包装起来，但是在 promise 链中每一步进行包装和解包装就十分丑陋和笨重了。

### 只能 resolve 一次

Promise 最本质的一个特征是：**promise 只能被决议一次( fullfill 或 reject )**。

在许多异步情况中，你只需要获取一个值一次，但是，还有很多异步的情况适合另一种模式，一种类似于事件或数据流的模式，比如为按钮添加点击事件和后续事件处理。

### 把回调重构成promise

假设有一个基于回调写法的函数 `ajax(url, callback)`。

我们可以封装一个基于 promise 的函数来替换他，但是这样不够方便，因为这意味着每遇到一个类似函数都需要重构一遍。

对此，可以写一个工具函数方便重构：

```javascript
if (!Promise.warp) {
  Promise.warp = fn => {
    // 返回一个包裹函数
    return (..args) => {
      // 包裹函数返回的是promise
      return new Promise((resolve, reject) => {
        function callback(err, val) {
          err ? reject(err) : resolve(val);
        }
        // 将回调函数添加到被包裹函数的参数
        fn.apply(null, args.concat(callback))
      })
    }
  }
}

var request = Promise.wrap( ajax )
request(url).then()
```

### 无法取消

promise 一旦创建并注册了 fullfill、reject 处理函数，则再也没有办法从外部停止它。

```javascript
var p = Promise.resolve( 42 );
Promise.race([
  p,
  timeoutPromise(3000)
])

p.then(() => {
  // 即使在超时的情况下也会发生
})
```

事实上，**我们不应该取消单个的promise**，这违背了未来值的可信任性(外部不变性)。然而，promise 链是一个流程控制的表达，在这个抽象层次上是，取消是合适的。

**单个 promise 不应该可取消，但是可取消 promise 链是合理的**。

## 与回调对比

第二章介绍回调的时候，提到了回调函数的**控制反转**造成的信任问题。

这里回顾一下，把一个回调传入工具 foo 时可能出现如下问题:

* 调用回调过早

* 调用回调过晚(或不被调用)
* 调用回调次数过少或过多
* 未能传递所需的环境和参数
* 吞掉可能出现的错误和异常

Promise 的特性就是专门用来为这些问题提供一个有效的可复用的答案。

* 调用过早

  根据定义，Promise 就不必担心这种问题，因为即使是立即完成的 Promise(类似于 `new Promise(resolve => resolve(42))`)也无法被同步观察到。

  也就是说，对一个 Promise 调用 then 的时候，即使这个 Promise 已经 resolve，提供给 then 的回调也总会被异步调用。

* 调用过晚

  和前面一点类似，Promise 创建对象调用 resolve 或 reject 时，这个 Promise 的 then 注册的回调就会被自动调度。可以确信，这些回调在下一个异步事件点上一定会被触发。

  ```javascript
  p.then(() => {
    p.then(() => console.log( "C" ));
    console.log( "A" );
  } );
  p.then(() => console.log( "B" ));
  // A B C
  // "C" 无法打断或抢占 "B"，这是因为 Promise 的运作方式。
  ```

* 回调未调用

  没有任何东西(甚至 JavaScript 错误)能阻止 Promise 向你通知它的resolve。

  如果你对一个 Promise 注册了一个resolve回调和一个reject回调，那么 Promise 在resolve时总是会调用其中的一个。因此对于Promise来说不存在回调未调用的情况。

* 调用回调次数过少或过多

  Promise 只能被resolve一次，所以任何通过 then 注册的每个回调就只会被调用一次。

* 未能传递参数/环境值

  Promise在fulfill或reject时可以传递参数。

* 吞掉错误或异常

  错误或异常会造成promise的reject从而被注册的reject回调处理，也可以用 p.catch() 处理。

  ```javascript
  var p1 = new Promise((resolve, reject) => {
    // 调用reject或抛出错误，这个promise(p1)会被reject
  	throw new Error();
    // reject(1);
    resolve(1);
  })
  var p2 = p1.then(
    // resolve 回调
    () => throw new Error(), // 抛出错误，这个promise(p2)会被reject
    () => {} // reject回调
  )
  ```

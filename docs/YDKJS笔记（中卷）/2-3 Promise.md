# Promise

## promise两要素

### 承诺

书中用订汉堡的例子解释，当你在柜台向收银员下订单并付款后，会得到一张有订单号的收据。这个收据就是汉堡店给你的承诺，它承诺一段等待时间后会给你一个汉堡。等待期间你可以去干些别的事。

*（这里指的就是pending状态的promise）*

### 承诺结果

针对上面汉堡的例子，最终要么得到一个汉堡，要没可能因为厨师下班之类的原因没能得到汉堡，但不变的是每个订单都有个最终的状态。

*（这里指的是 promise 的 fulfill 或 reject）*

## 判断是不是Promise

在 Promise 领域，一个重要的细节是如何确定某个值是不是真正的 Promise。或者更直接地说，它是不是一个行为方式类似于 Promise 的值?

可通过以下两种方法判断：

* 针对ES6版本的JavaScript环境，`p instanceof Promise === true`

* 用鸭子类型判断，Promise对象的一大特征就是拥有then方法。（但要注意可能有些对象会拥有自定义的then方法）

  ```javascript
  if (
  	p !== null &&
  	(typeof p === "object" || typeof p === "function") &&
    typeof p.then === "function"
  ){
    // 假定这是一个thenable!
  }
  ```

## Promise的信任

第二章介绍*回调*的时候，提到了回调函数的*控制反转*造成的信任问题。

这里回顾一下，把一个回调传入工具 foo 时可能出现如下问题:

* 调用回调过早

* 调用回调过晚(或不被调用)
* 调用回调次数过少或过多
* 未能传递所需的环境和参数
* 吞掉可能出现的错误和异常

Promise 的特性就是专门用来为这些问题提供一个有效的可复用的答案。

* 调用过早

  根据定义，Promise 就不必担心这种问题，因为即使是立即完成的 Promise(类似于 `new Promise(resolve => resolve(42))`)也无法被同步观察到。

  也就是说，对一个 Promise 调用 then 的时候，即使这个 Promise 已经resolve，提供给 then 的回调也总会被异步调用。

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
    () => {
      throw new Error(); // 抛出错误，这个promise(p2)会被reject
    },
    // reject回调
    () => {}
  )
  ```

### Promise.resolve

如果向 Promise.resolve 传递一个非 Promise、非 thenable 的立即值，就会得到一个用这个值填充的 promise。

**传递一个真正的 Promise，就只会返回同一个 promise。**

```javascript
var p1 = Promise.resolve(22);
var p2 = Promise.resolve(p1);

p1 === p2 // true
```

**更重要的是，如果传递了一个非 Promise 的 thenable 值，就会试图展开这个值，而且展开过程会持续到提取出一个具体的非类 Promise 的最终值。**

```javascript
var p = {
  then(cb) {
    cb( 42 );
  }
};

Promise.resolve( p )
  .then(
  	val => console.log( val ), // 42
		err => console.log( err )
	);
```

因此，Promise.resolve 可以接受任何 thenable，将其解封为它的非 thenable 值。

从 Promise. resolve 得到的是一个真正的 Promise，是一个可以信任的值。

如果你传入的已经是真正的 Promise，那么你得到的就是它本身，所以通过 Promise.resolve 过滤来获得可信任性完全没有坏处。

```javascript
// 假设foo工具会至少返回一个thenable的值
// 用Promise.resolve可以保证得到一个promise

// 不要只是这么做:
foo( 42 )
.then(v => console.log( v ));
// 而要这么做:
Promise.resolve( foo( 42 ) )
  .then(v => console.log( v ));

```

## 术语：pending & resolve，fullfill & reject

这里将这4个术语分别翻译为：pending(等待)、resolve(完成)、fullfill(接受)、reject(拒绝)。

当promise被创建时，它首先是pending状态，promise的状态只能从pending变为resolved，且只能改变一次。

从pending变为resolved，有两种途径，分别为fullfill或reject。

其中容易引起误解的是resolve:

```javascript
new Promise((resolve, reject) => resolve(23));
```

创建promise时通常命名为resolve和reject，但他们不是对应关系。resolve表示这个promise已经不可更改了。事实上，resolve也可以得到reject状态的promise：

```javascript
var rejectedPr = new Promise((resolve,reject) => {
  // resolve一个promise，会将这个promise展开
  resolve( Promise.reject( "Oops" ) );
} );
rejectedPr.then(
  // ES6 规范将这两个回调命名为 onFulfilled 和 onRjected，所以fulfilled、rejected这两个术语很准确。
	function fulfilled(){},
  function rejected(err){
    console.log( err ); // "Oops"
} );
```

**综上，promise有pending和resolved两种状态；其中resolved状态有fullfilled、rejected两种可能。**

## 链式调用

下面介绍Promise在链式调用中的数据传递、先后关系和错误处理。

**每次你对 Promise 调用 then 函数，它都会创建并返回一个新的 Promise，我们可以将其链接起来。**

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

**在then方法中，如果fullfill或reject处理函数中返回了一个新的promise，那么需要等这个新的promise完成才能继续传递。**

```javascript
function request(url) {
  return new Promise((resolve,reject) => ajax( url, resolve ));
}

request( "http://some.url.1/" )
  .then(response1 => {
  	// 这里的request函数返回了一个新的promise，因此需要等待它完成才能得到response2
    return request( "http://some.url.2/?v=" + response1 )
  })
  .then(response2 => console.log( response2 ));
```

### 链式调用的错误处理

**错误和异常是基于每个 Promise 的**，这意味着可能在链的任意位置捕捉到这样的错误。

每个抛出错误或者调用reject函数的promise会将这个promise变为reject。

```javascript
request( "http://some.url.1/" )
.then(response1 => {
  foo.bar(); // undefined，出错!
  return response1; // 永远不会到达这里
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

**在then函数中，如果不传入fullfill或reject处理函数，则会有默认的处理函数被传入。**

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

默认拒绝处理函数只是把错误重新抛出，这最终会使得 p2用同样的错误理由reject。从本质上说，这使得错误可以继续沿着 Promise 链传播下去，直到遇到显式定义的reject处理函数。

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



总结一下使链式流程控制可行的 Promise 固有特性

* 调用 Promise 的 then 会自动创建一个新的 Promise。
* 在处理函数内部，如果返回一个值或抛出一个异常，新返回的(可链接的)Promise 就相应地决议。

* 如果处理函数返回一个 Promise，它将会被展开，不管它的决议值是什么，都会成为当前 then 返回的链接 Promise 的决议值。

## 错误处理

*调用reject函数*、*JavaScript异常* 都可以使promise被拒绝(reject)。

`try-catch`语句只能处理同步情况，因此不能用于处理promise的异常。

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

从上面代码可以看出，每个reject处理函数处理的都是上一个promise的异常或reject。如果p1,p2都没传入reject处理函数，根据上节提到的默认reject处理函数，整个链式调用中可能出现的异常可以“汇集”到catch函数中。但是这仍会有两个问题：

* catch函数中无法判断是哪个promise出错
* 如果handleErrs函数本身有异常，则无法捕获

书中没有给出这两个问题的标准处理方法。

## promise异步模式

### Promise.all([...])

```javascript
var p1 = request( "http://some.url.1/" );
var p2 = request( "http://some.url.2/" );
Promise.all( [p1,p2] )
  .then( msgs => request("http://some.url.3/?v=" + msgs.join(",")))
  .then(msg => console.log(msg));
```



Promise.all 需要一个参数，是一个数组，通常由Promise实例组成。从 Promise. all 调用返回的 promise 会收到一个完成消息(代码片段中的 msgs)。这是一个由所有传入 promise 的完成消息组成的数组，与指定的顺序一致(与完成顺序无关)。

从 Promise.all 返回的主promise在且仅在所有的成员promise都完成后才会完成。如果这些promise中有任何一个被拒绝的话，主promise就会立即被拒绝，并丢弃来自其他所有 promise 的全部结果。

永远要记住为每个promise关联一个拒绝/错误处理函数，特别是主promise。

### Promise.race([...])

与Promise.all类似，一旦有任何一个Promise决议为完成，Promise.race就会完成；

**一旦有任何一个 Promise 决议为拒绝，Promise.race就会拒绝。**

Promise.race的一个使用例子，超时请求：

```javascript
Promise.race([
  foo(), // 启动foo()
  timeoutPromise( 3000 ) // 给它3秒钟
])
.then(
  function(){}, // foo 3秒内完成
  // 要么foo()被拒绝，要么只是没能够按时完成，因此要查看err了解具体原因
  function(err) {}
);
```

### 一些其他的API

* Promise.any([...]) 任一promise完成
* Promise.allSettled([...]) 所有的promise都settled（fullfilled或rejected）

* 书中还提到一些其他变种，比如none、first、last、map等等，但是没有被纳入标准，因此这里不具体介绍

## Promise 局限性

### 错误处理

很多时候并没有为 Promise 链序列的中间步骤保留的引用，没有这样的引用，你就无法关联错误处理函数来可靠地检查错误。

```javascript
// p不指向foo函数调用返回的promise，而是.catch( handleErrors )返回的promise
var p = foo( 42 )
  .then( STEP2 )
  .then( STEP3 )
	.catch( handleErrors )
// 无法判断错误来自哪一步
// handleErrors如果出错无法捕获
```

### 只能fullfill或reject单个值

根据定义，promise只能在fullfill或reject中传递一个值。虽然可以用数组或对象包装起来，但是在promise链中每一步进行包装和解包装就十分丑陋和笨重了。

### 只能resolve一次

Promise 最本质的一个特征是：**Promise 只能被决议一次(完成或拒绝)**。

在许多异步情况中，你只会获取一个值一次，所以这可以工作良好。但是，还有很多异步的情况适合另一种模式——一种类似于事件或数据流的模式，比如为按钮添加点击事件和后续事件处理。

### 把回调重构成promise

假设有一个基于回调写法的函数`ajax(url, callback)`。我们可以重新封装一个基于promise的函数来替换他，但是这样不够方便，因为这意味着每遇到一个类似函数都需要重构一遍。

可以通过添加一个工具函数，方便重构：

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
        fn.apply(null, args.concat(callback)) // 将回调函数添加到被包裹函数的参数
      })
    }
  }
}

var request = Promise.wrap( ajax );
request( "http://some.url.1/" )
  .then()
```

### 无法取消的promise

一旦创建了一个 Promise 并为其注册了完成、拒绝处理函数，如果出现某种情况使得这个任务悬而未决的话，你也没有办法从外部停止它的进程。

```javascript
var p = Promise.resolve( 42 );
Promise.race( [
  p,
	timeoutPromise( 3000 )
])
.then();

p.then( function(){
  // 即使在超时的情况下也会发生
} );
```

然而，**我们不应该取消单个的promise**，这违背了未来值的可信任性(外部不变性)。

单独的一个 Promise 并不是一个真正的流程控制机制(至少不是很有意义)，这正是取消所涉及的层次(流程控制)。这就是为什么 Promise 取消总是让人感觉很别扭。

相比之下，集合在一起的 Promise 构成的链，就是一个流程控制的表达，因此将取消定义在这个抽象层次上是合适的。

**单独的 Promise 不应该可取消，但是可取消一个序列是合理的，**因为你不会像对待 Promise 那样把序列作为一个单独的不变值来传送。

## 小结

Promise 非常好，请使用。它们解决了我们因只用回调的代码而备受困扰的控制反转问题。

它们并没有摈弃回调，只是把回调的安排转交给了一个位于我们和其他工具之间的可信任的中介机制。

Promise 链也开始提供以顺序的方式表达异步流的一个更好的方法，这有助于我们的大脑更好地计划和维护异步 JavaScript 代码。
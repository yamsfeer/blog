# this详解

## 绑定规则

### 默认绑定

**独立函数调用**作为最常用的函数调用类型，其应用的通常是**默认绑定**。

**当函数不带任何修饰被调用时，会应用默认绑定**。比如```fn()```。

**默认绑定**是无法应用其他规则时的默认规则。

```javascript
function foo() {
  console.log(this.a); // 默认绑定，this指向全局对象window
}

var a = 2; // 相当于window.a = 2;
foo(); // 2
```

需要注意的是，**严格模式(strict mode)，那么全局对象将无法使用默认绑定**。

```javascript
function foo() {
  "use strict";
  console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined
```

### 隐式绑定

当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。

```javascript
function foo() {
  console.log( this.a );
}
var obj = {
  a: 2,
  foo
};
// 隐式绑定，foo函数以 obj.foo 形式执行时，this隐式指向上下文对象obj。
obj.foo(); // 2
```

#### 隐式丢失

```javascript
function foo() {
  console.log( this.a );
}
var obj = {
  a: 2,
  foo: foo
};
var bar = obj.foo; // 函数别名!不带任何修饰被调用
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

```javascript
function foo() {
  console.log( this.a );
}
function doFoo(fn) {
  // fn 其实引用的是 foo
  fn(); // <-- 调用位置!
}
var obj = {
  a: 2,
  foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"
```

**回调函数丢失this是非常常见的**。

比如```setTimeout( obj.foo, 100 )```，因为JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似:

```javascript
function setTimeout(fn,delay) { // 等待 delay 毫秒
  fn(); // <-- 调用位置!
}
```

### 显式绑定

#### **call / apply**

```javascript
function foo() {
  console.log( this.a );
}
var obj = {
  a:2
};

// call / apply 将foo函数的 this 显示地绑定到 obj 上。
foo.call( obj ); // 2
```

:::tip

如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对象，这个原始值会被转换成它的对象形式(也就是new String()、new Boolean()或者 new Number())。

这通常被称为**装箱**。

:::

call / apply 虽然可以指定一个函数的 this 指向，但是 foo 函数仍可以被作为值传递，引发 **隐式丢失** 的问题（参考上一小节）。

可以用 **硬绑定** 来强制指定 foo 函数的 this 指向。

* 硬绑定 `bind`

  **硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值**

  ```javascript
  function foo(something) {
    console.log( this.a, something );
  }
  var obj = {
    a:2
  };
  
  // 只将bar暴露出去，无法通过bar改变foo的this。
  var bar = function(...args) {
    return foo.apply( obj, args );
  };
  
  bar( 'arg' ); // 打印 2 arg
  ```

  另一个办法是创建一个辅助的 **bind函数**。

  ```javascript
  // 简单的辅助绑定函数
  function bind(fn, obj) {
    return function() {
      return fn.apply( obj, arguments );
    };
  }
  
  var bar = bind( foo, obj );
  bar('arg');
  ```

  由于硬绑定是非常常用的模式，ES5 中提供了内置的方法 ```Function.prototype.bind```，

  bind函数会返回一个硬编码的新函数，它会把参数设置为 this 的上下文并调用原始函数。

  ```javascript
  var bar = foo.bind( obj )
  bar('arg');
  ```

* 指定API调用的上下文

  第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一 个可选的参数，通常被称为“上下文”(context)，其作用和 bind 一样，确保你的回调函数使用指定的 this。

  ```javascript
  function foo(el) {
    console.log( el, this.id );
  }
  var obj = {
    id: "id"
  };
  
  // 实际上就是通过 call 或者 apply 实现了显式绑定，少写些代码
  [1, 2, 3].forEach( foo, /* 把 this 绑定到obj */ obj ); // 1 id 2 id 3 id
  
  // 如果不传入obj给forEach，foo函数的this会应用默认绑定，指向window
  [1, 2, 3].forEach( foo ); // 1 undefined 2 undefined 3 undefined
  ```

### new 绑定

#### 关于new的误解

**JavaScript 中 new 的机制实际上和面向类的语言完全不同。**

new 操作符后面跟的函数，不是一个类，也不是什么特殊类型的函数，**它只是被 new 操作符调用的普通函数而已**。

**实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”**。

:::info

可以认为new操作符是为了模仿传统面向类语言而加入的，JavaScript中只有对象和函数，没有类。

但是为了便于理解，可以将它们称为类、构造函数。

:::

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. **这个新对象会绑定到函数调用的this。**
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

第三步就是所谓的“new 绑定”。

## 绑定规则的优先级

总结来说就是**new绑定 > 显式绑定 > 隐式绑定 > 默认绑定**。

1. 函数是否在new中调用(new绑定)? 如果是的话this绑定的是新创建的对象。

   ```javascript
   var bar = new foo()
   ```

2. 函数是否通过call、apply(显式绑定)或者硬绑定调用?如果是的话，this绑定的是指定的对象。

   ```javascript
   var bar = foo.call(obj2)
   ```

3. 函数是否在某个上下文对象中调用(隐式绑定)?如果是的话，this 绑定的是那个上下文对象。

   ```javascript
   var bar = obj1.foo()
   ```

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象。

   ```javascript
   var bar = foo()
   ```

针对 new绑定 > 显式绑定 可以详细说下。

MDN 提供的一种bind实现：

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      // 与 ECMAScript 5 最接近的
      // 内部 IsCallable 函数
      throw new TypeError(
        "Function.prototype.bind - what is trying " + "to be bound is not callable"
      );
    }

    var aArgs = Array.prototype.slice.call( arguments, 1 ),
        fToBind = this,
        fNOP = function(){},
        fBound = function() {
          return fToBind.apply(
            // 判断硬绑定函数是否是被 new 调用，如果是的话就会使用新创建 的 this 替换硬绑定的 this
            (this instanceof fNOP && oThis ? this : oThis),
             aArgs.concat(Array.prototype.slice.call( arguments )
          );
        };
    
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    
    return fBound;
  };
}
```

## 绑定例外

前面提到，用 `call / apply` 可以显式绑定一个对象。

但是把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值

在调用时会被忽略，实际应用的是**默认绑定规则**。

```javascript
function foo(a,b) {
  console.log( "a:" + a + ", b:" + b );
}

// 使用 bind(..) 进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

在上面这个例子中，为了对函数柯里化，需要传入一个参数当作 this 的绑定对象。

如果函数并不关心 this 的话，你仍然需要传入一个占位值，这时 null 可能是一个不错的选择。

事实上，如果对一些第三方函数柯里化，而这个函数又关心this，就会出现不可预测的结果。

为此，可以传入一个DMZ”(demilitarized zone，非军事区)对象。

```javascript
// Object.create(null) 和 {} 很像，但是并不会创建 Object.prototype 这个委托，所以它比 {}“更空”
var DMZ = Object.create( null );
var bar = foo.bind( DMZ, 2 );
bar( 3 ); // a:2, b:3
```

### 软绑定

使用**硬绑定**可以把this强制绑定到指定对象，防止函数调用应用默认绑定规则。

但是这会大大降低函数的灵活性，**硬绑定后无法使用隐式绑定或者显式绑定来修改 this**。

如果可以给默认绑定指定一个**全局对象和 undefined 以外**的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。

```javascript
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
    // 捕获所有 curried 参数
    var curried = [].slice.call( arguments, 1 );
    var bound = function() {
      return fn.apply(
        /* 检查调用时的 this，如果 this 绑定到全局对象或者 undefined，
           那就把指定的默认对象 obj 绑定到 this，否则不会修改 this。 */
        (!this || this === (window || global)) ? obj : this,
        curried.concat.apply( curried, arguments )
      );
    };

    bound.prototype = Object.create( fn.prototype );
    return bound;
  };
}
```

软绑定的例子：

```javascript
function foo() {
  console.log("name: " + this.name);
}
var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );
fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看!!!

fooOBJ.call( obj3 ); // name: obj3 <---- 看!
setTimeout( obj2.foo, 10 );
// name: obj <---- 应用了软绑定
```

### 箭头函数与this

**箭头函数不使用 this 的四种标准规则，而是根据外层(函数或者全局)作用域来决定 this**。

*new 操作符也不能改变箭头函数的 this 指向*。

```javascript
function foo() {
  return (a) => {
    console.log( this.a ); //this 继承自 foo()
  };
}
var obj1 = { a:2 };
var obj2 = { a:3 };

var bar = foo.call( obj1 ); // foo() 内部创建的箭头函数会捕获调用时 foo() 的 this
bar.call( obj2 ); // 2, 不是 3, this指向obj1
```

如果你经常编写 this 风格的代码，但是绝大部分时候都会使用 self = this 或者箭头函数来否定 this 机制，那你或许应当:

1. 只使用词法作用域并完全抛弃错误this风格的代码;
2. 完全采用 this 风格，在必要时使用 bind，尽量避免使用 self = this 和箭头函数。

## 小结

如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。

找到之后就可以顺序应用下面这四条规则来判断 this 的绑定对象。

* 由new调用?绑定到新创建的对象。
* 由call或者apply(或者bind)调用?绑定到指定的对象。
* 由上下文对象调用?绑定到那个上下文对象。
* 默认:在严格模式下绑定到undefined，否则绑定到全局对象。

一定要注意，有些调用可能在无意中使用默认绑定规则。

如果想“更安全”地忽略 this 绑 定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null)，以保护全局对象。

ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。这其实和 ES6 之前代码中的 self = this 机制一样。
# 类设计模式与JavaScript对象机制

## 类设计模式与JavaScript对象机制

### 类理论

类描述了一种**代码的组织结构形式**，即一种在软件中对真实世界中问题领域的建模方法。

**面向对象编程强调的是数据和操作数据的行为本质上是互相关联的。**

因此好的设计就是把数据以及和它相关的行为封装起来。 这在正式的计算机科学中有时被称为数据结构。

### 类设计模式

可以认为**类是以面向对象编程为基础的一种设计模式**。

对于一些 ***过程化编程*** 的代码，可以使用类将其转换成结构清晰、组织良好的代码。

对于 ***函数式编程*** ，类也是非常常用的一种设计模式。

*有些语言(比如 Java)并不会给你选择的机会，类并不是可选的，万物皆是类。*

*其他语言(比如 C/C++ 或者 PHP)会提供过程化和面向类这两种语法，开发者可以选择其中一种风格或者混用两种风格。*

### JavaScript中的“类”

**JavaScript中没有类，但是可以近似实现类的功能。**

JavaScript中只有类似类的一些语法功能，比如 new、instanceof，以及 ES6 新增的 class 关键字。

**但这些只是为了满足对于类设计模式的最普遍需求而提供的一些近似类的语法。**

**在近似类的表象之下，JavaScript 的机制其实和类完全不同。**

总的来说，在软件设计中，**类是一种可选的模式**，你需要自己决定是否在 JavaScript 中使用它。

### 类

面向类的设计模式:实例化(instantiation)、继承(inheritance)和 (相对)多态(polymorphism)。

* 构造函数

  类仅仅是一个抽象的表示，必须先实例化类然后才能对它进行操作。

  实例是由一个特殊的类方法构造的，这个方法名通常和类名相同，被称为**构造函数**。

  类构造函数属于类，它的任务就是初始化实例需要的所有信息(状态)。

* 继承(inheritance)

  ```javascript
  class A () {}
  class B extends A() {}
  ```

* 多态(polymorphism)

  父类的通用行为可以被子类用更特殊的行为重写。

  实际上，相对多态性允许我们从重写行为中引用基础行为。

### 混入（mixin）

***以下介绍的内容，是为了在JavaScript中模仿类而创造的蹩脚做法，了解即可，不建议使用！***

在继承或者实例化时，JavaScript 的对象机制并不会自动执行复制行为。

简单来说，**JavaScript 中只有对象，并不存在可以被实例化的“类” 。**。

一个对象并不会被复制到其他对象，它们会被关联起来（引用）。

由于在其他语言中类表现出来的都是复制行为，因此 JavaScript 开发者也想出了一个方法来**模拟类的复制行为**，这个方法就是混入。

```javascript
// 从source“复制到target”，相当于target “继承” source
function mixin( sourceObj, targetObj ) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]; // 注意这里，对于对象类型数据来说，只是赋值（引用），没有真正复制
    }
  }
  return targetObj;
}

var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log( "Turning on my engine." );
  },
  drive: function() {
    this.ignition();
    console.log( "Steering and moving forward!" );
  }
};

var Car = mixin( Vehicle, {
  wheels: 4,
  drive: function() {
    Vehicle.drive.call( this );
    console.log("Rolling on all " + this.wheels + " wheels!");
	}
} );
```

**JavaScript 中的函数无法(用标准、可靠的方法)真正地复制，所以你只能复制对共享函数对象的引用。**

如果你修改了共享的函数对象（比如 ignition），比如添加了一个属性，那 Vehicle 和 Car 都会受到影响。

## 小结

* **类是一种设计模式**。许多语言提供了对于面向类软件设计的原生语法。

* JavaScript 也有类似的语法，但是和其他语言中的类完全不同。

  JavaScript 并不会(像类那样)自动创建对象的副本。

* 传统的类被实例化时，它的行为会被复制到实例中。

  类被继承时，行为也会被复制到子类中。

* 多态(在继承链的不同层次名称相同但是功能不同的函数)看起来似乎是从子类引用父类，但是本质上引用的其实是复制的结果。

* 混入模式可以用来模拟类的复制行为，但是通常会产生丑陋并且脆弱的语法，让代码更加难懂并且难以维护。

* 显式混入实际上无法完全模拟类的复制行为，因为对象和函数只能复制引用，无法复制被引用的对象或者函数本身。

  忽视这一点会导致许多问题。

* 总地来说，**在 JavaScript 中模拟类是得不偿失的**，虽然能解决当前的问题，但是可能会埋下更多的隐患。
# Atom

Grammar

* Literal
* Variable
* Keywords
* Whitespace
* Line Terminator

Runtime

* Types
* Execution Context

## 类型

* Number
* String
* Boolean
* Null
* Undefined
* Symbol
* BigInt
* Object

### Number

语法：

* 十进制 DecimalLiteral：0, 0.1,1e3
* 二进制 BinaryIntegerLiteral：0b111
* 八进制 OctalIntegerLiteral：0o10
* 十六进制 HexIntegerLiteral：0xff

ieee 754 标准

### String

ascii unicode 字符集

utf-8 编码方式

语法：

* 单引号：`'abc'`
* 双引号：`"abc"`
* 反引号模板字符串

### Boolean

true false 两个关键字

### Null

空类型

`typeof null === 'object'`

### Undefined

声明但未被定义的值

不是关键字，是全局变量

最简洁的得到 undefined 的值的方法：`void 0`

void 运算符不管后面跟什么，都返回 undefined

### Symbol

### Object

Object = property + proto

property 是一对 key-value

其中 key 可以是 string 或 symbol

value 有两种 数据属性、访问器属性

| Data property | Accessor Property |
| :-----------: | :---------------: |
|   [[value]]   |        get        |
|   writable    |        set        |
|   enumable    |     enumable      |
| configurable  |   configurable    |

语法

* 基本定义、访问、修改属性：{} / . / [] / Object.defineProperty
* 原型相关：Object.create / Object.setPrototypeOf / Object.getPrototypeOf
* 类风格：new / class / extends
* 历史遗留，不建议使用：new / function / prototype

#### Function

[[call]]

#### Array


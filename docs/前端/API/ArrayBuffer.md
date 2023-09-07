# ArrayBuffer

ArrayBuffer 表示二进制数据缓冲区，创建 ArrayBuffer 就是在内存中分配一块连续的二进制数据存储区域。

ArrayBuffer 本身没有直接的数据访问方法，它仅表示一个存储二进制数据的容器。要操作 ArrayBuffer，可以使用 TypedArray 或 DataView。

## TypedArray

TypedArray 是一个抽象基类，它有以下几种类型的实现：

- Int8Array
- Uint8Array
- Uint8ClampedArray
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array
- BigInt64Array
- BigUint64Array

下面通过例子介绍 Uint8Array 和 Int32Array。

### Uint8Array

Uint8Array 表示按8 位无符号整数操作 ArrayBuffer。

```javascript
const buffer = new ArrayBuffer(4) // 分配 4 字节内存
const uint8Array = new Uint8Array(buffer) // 按 8 位无符号整数操作内存

uint8Array[0] = 42 // 第一个字节 ( 8 位 ) 的值为 42
uint8Array[0] // 42
```

### Int32Array

Int32Array 表示按 32 位有符号整数操作 ArrayBuffer。

```javascript
const buffer = new ArrayBuffer(8) // 分配 8 字节内存
const int32Array = new Int32Array(buffer) // 按 32 位有符号整数操作

int32Array[0] = -123; // 第一个 32 位值为 -123
int32Array[0] // -123

```

## DataView

DataView 提供了一种灵活的方式来处理不同类型的数据，不需要考虑数据的类型和字节顺序。

```javascript
const buffer = new ArrayBuffer(6) // 6 个字节的 ArrayBuffer
const dataView = new DataView(buffer) // 用 DataView 操作 buffer

dataView.setInt16(0, 42)          // 设置 16 位整数（2 字节）为 42
dataView.setFloat32(2, 3.14)      // 设置 32 位浮点数（4 字节）为 3.14

// 从 DataView 读取数据
const int16Value = dataView.getInt16(0)      // 读取 16 位整数
const float32Value = dataView.getFloat32(2)  // 读取 32 位浮点数

console.log('16-bit integer:', int16Value)
console.log('32-bit float:', float32Value)
```

其中 setInt16、setFloat32 的第一个参数表示字节偏移量，第二个参数表示存入的值。

比如 `settInt16(0, 42)` 表示从第 0 个字节开始，存入一个 16 位整数，它将占用 2 个字节，`setFloat32(2, 3.14)` 从第 2 个字节开始，存入一个 32 位整数，它将占用 4 个字节。
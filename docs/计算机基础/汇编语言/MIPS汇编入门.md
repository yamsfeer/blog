# MIPS汇编入门

## 简介

MIPS（**M**icroprocessor without **I**nterlocked **P**ipeline **S**tages），是一种采取精简指令集（RISC: **r**educed **i**nstruction **s**et **c**omputer）的指令集架构。最早的MIPS架构是32 bits，最新的版本已经变成64 bits（本文介绍的是32位版本）。

本文主要介绍：

* 寄存器
* 汇编程序结构
* 指令集
  * load / store 指令
  * 算术指令
  * 跳转指令
  * 系统调用 / IO 指令

### 数据的表示

- 所有MIPS指令都是32位
- `1 byte = 8 bits, halfword = 2 bytes, 1 word = 4 bytes`
- `1 char = 1 byte`
- `1 int = 1 word = 4 bytes`
- 数字（number）**直接输入**，例如：`10`
- 单字符（character）用**单引号**括起来，例如：`'b'`
- 字符串（string）用**双引号**括起来，例如：`"A string"`

### MIPS模拟器

[MARS4.5](https://courses.missouristate.edu/KenVollmar/MARS/)

## 寄存器

- MIPS共有32个**通用寄存器**
- 在汇编指令中，寄存器以`$`开头，有两种表示方式
  - 使用寄存器编号，例如：`$0 ~ $31`
  - 使用寄存器名称，例如：`$t1, $sp`（寄存器的编号及名称含义见下表）
- 特殊的寄存器`Lo`和`Hi`用于存储乘法或除法运算的结果
  - 不能直接访问`Lo`和`Hi`寄存器，它们的内容通过特殊的指令访问：`mfhi`（move from Hi）和`mflo`（move from Lo）
- 栈的方向从存储器的**高地址到低地址**

各个寄存器编号、名称和描述：

| 寄存器编号 | 寄存器名称 | 英文全称                                 | 描述                                                        |
| :--------- | :--------- | :--------------------------------------- | :---------------------------------------------------------- |
| 0          | $zero      | zero                                     | 值恒为0                                                     |
| 1          | $at        | **a**ssembler **t**emporary              | 汇编保留寄存器（不可做其他用途）                            |
| 2-3        | \$v0 , $v1 | **v**alues                               | 值来自于表达式求值和函数结果                                |
| 4-7        | \$a0 - $a3 | **a**rguments                            | 存储子程序调用的前4个非浮点参数，在子程序中不会跨子程序保存 |
| 8-15       | \$t0 - $t7 | **t**emporaries                          | 暂存寄存器                                                  |
| 16-23      | \$s0 - $s7 | **s**aved values                         | 通用寄存器                                                  |
| 24-25      | \$t8 - $t9 | **t**emporaries                          | 临时变量，与\$t0 - $t7一样                                  |
| 26-27      | \$k0, $k1  | **k**ernel reserved                      | 操作系统内核保留寄存器，用于中断处理                        |
| 28         | $gp        | **g**lobal **p**ointer                   | 全局指针                                                    |
| 29         | $sp        | **s**tack **p**ointer                    | 栈指针，指向栈顶                                            |
| 30         | \$s8 / $fp | **s**aved values / **f**rame **p**ointer | 帧指针，用于过程调用                                        |
| 31         | $ra        | **r**eturn **a**ddress                   | 返回地址                                                    |

## 汇编程序结构

MIPS源程序文件（文件后缀`.s`或`.asm`）中包含**数据声明**和**程序代码**两部分，数据声明在程序代码之前

### 数据声明

数据声明以汇编器指令`.data`作为开始标识。声明的语法为：`[name]: [storage_type] [value]`

`storage_type`可以为`.byte`、`.word`、`.space`、`ascii`、`.asciiz`，例如：

```assembly
.data
  var_name: .word 123 # 声明变量var_name，占用1个字（4字节）空间，值为123
  array1: .byte 'c', 'b'
  array2: .space 40 # 长度为40的字符数组
  str1: .asciiz "a string"
```

* 声明字符数组array1，包含2个字符元素，初始化为a和b

* 申请一段空间array2，在内存中分配连续的40个字节空间，array2未被初始化，可能是长度40的字符数组或长度为10的整型数组，因此建议**在注释中说明用途**。
* `.ascii` 会保存字符串在数据段但**不会**加`null`终止符
* `.asciiz` 会保存字符串在数据段**且**加`null`终止符

### 代码

* 代码放在`.text`标识后
* 代码段文本包含程序代码指令，以`main`作为程序入口
* 主代码的结束点应该使用“退出系统调用（功能），详见后续的“系统调用篇”

### 注释

在一行内，任何在#之后的内容，将会被（编译器）认为是**注释**。

### 标签(label)

在代码中可以设定一个标签，方便跳转或标注，通常用于if - else 跳转或 jump，详见指令部分。

```assembly
.text
__my_label:
  lw $t0, var1   # $t0 = var1
done
```

### MIPS程序示例

```assembly
# example.s
.data
  # 数据声明
  var1: .word 123
  array1: .byte 'a','b'
  array2: .space 40 # 申请40个字节的连续空间
.text
  # 指令代码 main为入口
main:
  lw	$t0, var1

```

## 指令

### load / store 指令

只能使用load / store指令来访问内存，其他指令都是寄存器操作。

load指令：

```assembly
# 从RAM_source 复制1个字的内容到寄存器
lw register_destination, RAM_source
# lb = load byte
lb register_destination, RAM_source
# li = load immediate value 加载一个立即数到寄存器
li register_destination, value
```

Store 指令：

```assembly
# 将寄存器的数据写入内存
sw register_source, RAM_destination
# sb = store byte
sb register_source, RAM_destination
```

```assembly
example:
.data
  var1:	.word 23 # 声明一个整型var1 = 23
.text
__start:
  lw $t0, var1   # $t0 = var1
  li $t1, 5      # $t1 = 5
  sw $t1, var1   # var1 = $t1;
done
```

### 立即寻址、间接寻址和偏移量

* 直接寻址

  ```assembly
  # 将var1的RAM地址复制到t0寄存器
  # la = load address
  la $t0 var1
  ```

* 间接寻址

  通过`($register)`将寄存器中的值作为地址：

  ```assembly
  # 将t0寄存器中存放的值放到t2
  # 括号可以认为是“取寄存器的值”
  lw $t2, ($t0)
  ```

  ```assembly
  # 将t2中存放的值写入t0的值指向的内存
  sw $t2, ($t0)
  ```

* 偏移量

  偏移量通常用于数组或栈

  ```assembly
  # $t2 = ($t0 + 4)
  lw $t2, 4($t0)
  ```

  可以是负数的偏移量：

  ```assembly
  # ($t0 - 12) = $t2
  sw $t2, -12($t0)
  ```

寻址的综合例子：

```shell
example：
.data
  array1: .space 12 # 声明一个12字节长度的数组 array1, 可容纳3个整型
.text
__start:
  la $t0, array1  # $t0 = 数组首地址
  li $t1, 5       # $t1 = 5
  sw $t1, ($t0)   # array[0] = $t1 = 5
  li $t1, 13      # $t1 = 13
  sw $t1, 4($t0)  # array[1] = $t1 = 13
                  # 整型占4个字节，数组首地址偏移4字节就是array[1]的地址
  li $t1, -7      # $t1 = -7
  sw $t1, 8($t0)  # array + 8字节偏移 = array[2]的地址
done
```

### 算术指令

- 算术指令最多3个操作数
- 操作数只能是寄存器
- MIPS所有指令都是32 bits

加减法指令：

```assembly
sub	$t2, $t3, $t4   # $t2 = $t3 - $t4
addi $t2, $t3, 5    # $t2 = $t3 + 5
                    # addi = add immediate
                    # 没有subi指令
addu $t1, $t6, $t7  # $t1 = $t6 + $t7
                    # addu = add unsigned integers
subu $t1, $t6, $t7  # $t1 = $t6 - $t7
```

乘除法指令：

```assembly
mult $t3, $t4       # $t3, $t4的两个32位数相乘，得到一个64位数据
                    # $hi 存放高位，$lo 存放低位
div	$t5, $t6        # $t5 / $t6
                    # 商数存放在 $lo, 余数存放在 $hi

mfhi $t0            # 不能直接获取 $hi 或 $lo 中的值， 需要mfhi, mflo指令传值给寄存器
mflo $t1
```

寄存器间赋值：

```assembly
move $t2, $t3       # $t2 = $t3
```

### 结构控制

* 分支（if - else）

  满足条件则跳转到指定分支。

  ```assembly
  b	target              # 无条件跳转到target
  beq	$t0, $t1, target  # $t0 = $t1
  blt	$t0, $t1, target  # $t0 < $t1
  ble	$t0, $t1, target  # $t0 <= $t1
  bgt	$t0, $t1, target  # $t0 > $t1
  bge	$t0, $t1, target  # $t0 >= $t1
  bne	$t0, $t1, target  # $t0 != $t1
  ```

* 跳转

  ```assembly
  j	target # 无条件跳转
  jr $t3   # 跳转到$t3存放的地址，jr = jump register
  ```

* 子程序调用（函数调用）

  ```assembly
  jal sub_label  # jump and link
  # 将当前的程序计数器（program counter PC指针）保存到$ra中
  # 然后跳到sub_label（指针指向sub_label）
  ```

  ```assembly
  # 通过$ra保存的返回地址跳回函数调用前的位置
  jr $ra # jump register
  ```

  如果调用的子程序中有调用了其他子程序，如此往复， 则**用栈来保存返回地址**，毕竟$ra只有一个。

### 系统调用和IO

对参数寄存器进行设定后，执行`syscall`指令就可以进行系统调用和IO。

- 通过系统调用实现终端的输入输出，以及声明程序结束
- 参数所使用的寄存器：\$v0，\$a0,  $a1
- 返回值使用：$v0

下表给出了系统调用中对应功能，代码，参数机返回值：

|   Service    |       描述       | $v0对应功能的调用码 |                       参数                       |             返回值             |
| :----------: | :--------------: | :-----------------: | :----------------------------------------------: | :----------------------------: |
|  print_int   |     打印整数     |       $v0 = 1       |                \$a0 = 目标整型数                 |                                |
| print_float  |    打印浮点数    |       $v0 = 2       |                \$f12 = 目标浮点数                |                                |
| print_double | 打印双精度浮点数 |       $v0 = 3       |             \$f12 = 目标双精度浮点数             |                                |
| print_string |    打印字符串    |       $v0 = 4       |             \$a0 = 目标字符串的地址              |                                |
|   read_int   | 从键盘读取整型数 |       $v0 = 5       |                                                  |         返回整型给 $v0         |
|  read_float  | 从键盘读取浮点数 |       $v0 = 6       |                                                  |        返回浮点数给 $v0        |
| read_double  | 从键盘读取双精度 |       $v0 = 7       |                                                  |        返回双精度给 $v0        |
| read_string  | 从键盘读取字符串 |       $v0 = 8       | \$a0 = 目标字符串地址<br />\$a1 = 目标字符串长度 |                                |
|     sbrk     |   动态分配内存   |       $v0 = 9       |      $a0 = 需要分配的空间大小（单位bytes）       | 将分配好的空间首地址返回给 $v0 |
|     exit     |       退出       |       $v0 =10       |                      退出码                      |                                |

```assembly
# 打印一个存储在寄存器 $2 里的整型
li $v0, 1      # print_int 调用码为1
move $a0, $t2  # 目标整型数在放到$a0
syscall        # 进行系统调用
```

```assembly
# 读取一个数，并且存储到内存中的 int_value 变量中
.data
	int_value: .word 12
.text
main:
  li $v0, 5	         # read_int 调用码为5
  syscall            # 键盘读取操作后，$v0 = 输入的数字
  sw $v0, int_value  # 将 $v0的值写入内存
```

```assembly
# 打印一个字符串
.data
	string1 .asciiz	"Print this.\n"
.text
main:
	li $v0, 4        # print_string 调用码为4
  la $a0, string1  # $a0 = address(string1)
  syscall
```

```assembly
# 系统退出
li $v0, 10 # exit 调用码为10
syscall
```
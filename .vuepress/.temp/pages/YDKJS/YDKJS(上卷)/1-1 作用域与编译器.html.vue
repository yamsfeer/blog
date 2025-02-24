<template><div><h1 id="作用域与编译器" tabindex="-1"><a class="header-anchor" href="#作用域与编译器"><span>作用域与编译器</span></a></h1>
<h2 id="作用域" tabindex="-1"><a class="header-anchor" href="#作用域"><span>作用域</span></a></h2>
<p>几乎所有编程语言的基本功能之一，就是能够存储变量中的值，并且能够对其进行访问和修改。这种对变量的存储和访问的能力将<strong>状态</strong>带给了程序。</p>
<p>变量存储在哪里、如何找到它们、如何修改它的值······这些问题使得我们需要设计一套规则来存储变量，并在这之后访问变量，<strong>这套规则称为作用域</strong>。</p>
<h3 id="编译原理" tabindex="-1"><a class="header-anchor" href="#编译原理"><span>编译原理</span></a></h3>
<p>尽管<code v-pre>JavaScript </code>通常被归类为“动态”或“解释执行”的语言，事实上她是一门编译语言。但与传统编译语言不同，她不是提前编译的，编译结果也不能在分布式系统中传播。</p>
<blockquote>
<p>传统编译语言流程：</p>
<ul>
<li>
<p>分词/词法分析(Tokenizing/Lexing)</p>
<p>这个过程会将由字符组成的字符串分解为（对编程语言来说）有意义的代码块，这些代码块被称为词法单元（token）。例如，考虑程序<code v-pre>let a = 2;</code>,这段程序会被分解为<code v-pre>let</code>、<code v-pre>a</code>、<code v-pre>=</code>、<code v-pre>2</code>、<code v-pre>;</code>。</p>
</li>
<li>
<p>语法分析(Parsing)</p>
<p>这个过程会将词法单元流（token流数组）转换为一个由元素逐级嵌套组成的代表了程序语法结构的树，称之为<strong>抽象语法树（Abstract Syntax Tree, AST）</strong>。<code v-pre>let a = 2;</code>这段程序的AST中可能存在一个<em><strong>VariableDeclaration</strong></em>的顶级节点，然后会有一个<em><strong>Identifier</strong></em>的子节点，它的值是<code v-pre>a</code>，以及一个<em><strong>AssignmentExpression</strong></em>的子节点，<em><strong>AssignmentExpression</strong></em>节点有一个<em><strong>NumericLiteral</strong></em>的子节点，它的值是<code v-pre>2</code>。</p>
<Mermaid id="mermaid-38" code="eJxLL0osyFDwCeIKSyzKTEzKSXVJTc5JLEosyczPU9DVtVPwTEnNK8lMy0wtikYwrRQSY3HqcCwuzkzPywWqda0oKEoF8qASfqW5qUWZyT6ZJalFiTnRqFwrBaNYLgAyeDLV"></Mermaid></li>
<li>
<p>代码生成</p>
<p>将AST转换为可执行代码的过程称为代码生成。这个过程与语言、目标平台息息相关。简单来说，代码生成过程就是将AST转换为一组机器指令，可以创建一个叫做<code v-pre>a</code>的变量（包括分配内存等底层操作），并将值 <code v-pre>2</code> 存储在 <code v-pre>a</code> 中。</p>
</li>
</ul>
</blockquote>
<p>与其他传统编译器相比，JavaScript引擎可能要更加复杂，比如，在<strong>语法分析</strong>和<strong>代码生成</strong>阶段有特定的步骤对运行性能进行优化，包括<strong>对冗余元素进行优化</strong>等。</p>
<p>然而，JavaScript引擎不会像其他编译器一样有太多的时间进行优化，因为JavaScript的编译过程通常发生在代码执行的前几微秒内甚至更短。在这期间，JavaScript 引擎用尽了各种办法(比如 <em><strong>JIT</strong></em>，可以延迟编译甚至实施重编译)来保证性能最佳。</p>
<p>总的来说，<strong>任何JavaScript代码在执行前都需要编译</strong>（通常就在执行前），JavaScript编译器会对程序进行编译，并准备执行它，通常马上就会执行。</p>
<h2 id="理解作用域" tabindex="-1"><a class="header-anchor" href="#理解作用域"><span>理解作用域</span></a></h2>
<blockquote>
<p>参与JavaScript代码的编译和执行的几个对象：</p>
<ul>
<li>
<p>引擎</p>
<p>从头到尾负责整个JavaScript程序的编译和执行过程</p>
</li>
<li>
<p>编译器</p>
<p>负责语法分析和代码生成</p>
</li>
<li>
<p>作用域</p>
<p>负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限</p>
</li>
</ul>
</blockquote>
<p>以<code v-pre>var a = 2;</code>这段代码为例，编译器会对其进行词法分析，得到token流，然后抽象成AST，在进行代码生成时，会进行如下操作：</p>
<ol>
<li>
<p>遇到<code v-pre>var a</code>，编译器会询问作用域是否已有一个相同名称的变量存在于相同作用域的集合中，</p>
<p>如果有，则忽略该声明并继续编译；</p>
<p>如果没有，它会要求作用域在当前作用域的集合中声明一个新的变量，命名为 <code v-pre>a</code>。</p>
</li>
<li>
<p>接下来编译器会为引擎生成运行时所需的代码，这些代码被用来处理 <code v-pre>a = 2</code> 这个赋值操作。</p>
<p>引擎运行时会首先询问作用域，在当前的作用域集合中是否存在名为 <code v-pre>a</code> 的变量，如果有，则使用这个变量，否则继续查找。</p>
<p>如果最终找到变量 <code v-pre>a</code>，就会将<code v-pre>2</code> 赋值给它，否则引擎抛出一个异常。</p>
</li>
</ol>
<p><strong>总结：变量的赋值操作会进行两个动作，首先编译器会在当前作用域中声明一个变量(如果之前没有声明过)，然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值。</strong></p>
<FlowChart id="flowchart-123" code="eJwrLrG1Ky5JLCqxUni6p+Hp8m4urpL87NS8zKrMvHRbu/yC1KLEksz8PCuFF+t7n22e+rSj7dm8CVwFiUXFmArWIhSkp+Y556ekoih4snvx8wWNz6fMf9YxgYsLKJeal2Kl8Hz35Gdz53NxFZfo2iGs1rWDWqFrBzWKCwBVmkxp" preset="vue"></FlowChart><h3 id="lhs和rhs" tabindex="-1"><a class="header-anchor" href="#lhs和rhs"><span>LHS和RHS</span></a></h3>
<p>为便于记忆，可以分别认为<strong>LHS</strong>和<strong>RHS</strong>是一个赋值操作的左侧和右侧进行的查询，换句话说，当变量出现在赋值操作的左侧时进行 LHS 查询，出现在右侧时进行 RHS 查询。</p>
<p>针对<code v-pre>var a = b;</code>这段代码，会进行<strong>RHS</strong>查询得到 <code v-pre>b</code> 的值，进行<strong>LHS</strong>查询是否存在变量 <code v-pre>a</code>，从而进行赋值。</p>
<p>准确的说，RHS 查询与简单地查找某个变量的值相同，而 LHS 查询则是试图找到变量的容器本身，从而可以对其赋值。</p>
<p>从这个角度说，RHS 并不是真正意义上的“赋值操作的右侧”，更准确地说是“非左侧”。</p>
<p>针对代码:</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token number">1</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token number">2</span><span class="token operator">:</span>  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">}</span>
<span class="token number">4</span><span class="token operator">:</span> <span class="token function">foo</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><ul>
<li>
<p>第4行中需要对foo进行<strong>RHS</strong>查询，得到foo函数；</p>
</li>
<li>
<p>第1行中a作为型参，当调用foo函数时，会隐式地有 <code v-pre>a = 2</code>的操作，因此，这里要对a进行<strong>LHS</strong>查询。</p>
</li>
<li>
<p>第2行中，需要对a进行<strong>RHS</strong>查询从而将a的值传给<code v-pre>console.log</code>。</p>
<p>当然，要得到 <code v-pre>log</code> 函数，会对 console 对象进行 <strong>RHS</strong> 查询，并且检查得到的值中是否有一个叫作 log 的方法。</p>
</li>
</ul>
<h3 id="作用域嵌套" tabindex="-1"><a class="header-anchor" href="#作用域嵌套"><span>作用域嵌套</span></a></h3>
<p>我们说过，<strong>作用域是根据名称查找变量的一套规则</strong>。实际情况中，通常需要同时顾及几个作用域。</p>
<p>当一个块或函数嵌套在另一个块或函数中时，就发生了作用域的嵌套。因此，在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量， 或抵达最外层的作用域(也就是全局作用域)为止。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/0081Kckwgy1gmbpi4c04aj30bm06yq31.jpg" alt="image-20210104154329370"></p>
<h4 id="作用域相关的异常" tabindex="-1"><a class="header-anchor" href="#作用域相关的异常"><span>作用域相关的异常</span></a></h4>
<ul>
<li>
<p>如果<strong>RHS</strong>在所有嵌套的作用域中找不到所需变量，那么会抛出一个 <em><strong>ReferenceError</strong></em> 异常，这是一个很重要的异常类型。</p>
</li>
<li>
<p>如果<strong>LHS</strong>最终在全局作用域中找不到所需变量，那么</p>
<ul>
<li>在<strong>非严格模式</strong>下，<strong>全局作用域</strong>中会创建一个同名变量并返回给引擎。</li>
<li><strong>严格模式</strong>下，不会创建全局变量，而是抛出 <em><strong>ReferenceError</strong></em> 异常。</li>
</ul>
</li>
<li>
<p>如果<strong>RHS</strong>查询到一个变量，但是尝试对其进行错误操作，比如对一个非函数类型进行函数调用，则抛出 <em><strong>TypeError</strong></em> 异常。</p>
</li>
<li>
<p><em><strong>ReferenceError</strong></em> 同作用域判别失败相关，而 <em><strong>TypeError</strong></em> 则代表作用域判别成功了，但是对结果的操作是非法或不合理的。</p>
</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>作用域是一套规则，用于确定在何处以及如何查找变量(标识符)。</p>
<p>如果查找的目的是对变量进行赋值，那么就会使用 LHS 查询;如果目的是获取变量的值，就会使用 RHS 查询。</p>
<p>赋值操作符会导致 LHS 查询。<code v-pre>=</code> 操作符或调用函数时传入参数的操作都会导致关联作用域的赋值操作。</p>
<ul>
<li>
<p>JavaScript引擎首先会在代码执行前对其进行编译，在这个过程中，像 <code v-pre>var a = 2</code> 这样的声明会被分解成两个独立的步骤:</p>
<ol>
<li>
<p>首先，<code v-pre>var a</code> 在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行。</p>
</li>
<li>
<p>接下来，<code v-pre>a = 2</code> 会查询(LHS 查询)变量 <code v-pre>a</code> 并对其进行赋值。</p>
</li>
</ol>
</li>
<li>
<p>LHS 和 RHS 查询都会在当前执行作用域中开始，逐级往上，最后抵达全局作用域，无论找到或没找到都将停止。</p>
</li>
<li>
<p>不成功的 RHS 引用会导致抛出 <em><strong>ReferenceError</strong></em> 异常。不成功的 LHS 引用会导致自动隐式地创建一个全局变量(<strong>非严格模式下</strong>)，该变量使用 LHS 引用的目标作为标识符，或者抛出 <em><strong>ReferenceError</strong></em> 异常(<strong>严格模式</strong>下)。</p>
</li>
</ul>
</div></template>



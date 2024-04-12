<template><div><h1 id="arraybuffer" tabindex="-1"><a class="header-anchor" href="#arraybuffer"><span>ArrayBuffer</span></a></h1>
<p>ArrayBuffer 表示二进制数据缓冲区，创建 ArrayBuffer 就是在内存中分配一块连续的二进制数据存储区域。</p>
<p>ArrayBuffer 本身没有直接的数据访问方法，它仅表示一个存储二进制数据的容器。要操作 ArrayBuffer，可以使用 TypedArray 或 DataView。</p>
<h2 id="typedarray" tabindex="-1"><a class="header-anchor" href="#typedarray"><span>TypedArray</span></a></h2>
<p>TypedArray 是一个抽象基类，它有以下几种类型的实现：</p>
<ul>
<li>Int8Array</li>
<li>Uint8Array</li>
<li>Uint8ClampedArray</li>
<li>Int16Array</li>
<li>Uint16Array</li>
<li>Int32Array</li>
<li>Uint32Array</li>
<li>Float32Array</li>
<li>Float64Array</li>
<li>BigInt64Array</li>
<li>BigUint64Array</li>
</ul>
<p>下面通过例子介绍 Uint8Array 和 Int32Array。</p>
<h3 id="uint8array" tabindex="-1"><a class="header-anchor" href="#uint8array"><span>Uint8Array</span></a></h3>
<p>Uint8Array 表示按8 位无符号整数操作 ArrayBuffer。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// 分配 4 字节内存</span>
<span class="token keyword">const</span> uint8Array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span> <span class="token comment">// 按 8 位无符号整数操作内存</span>

uint8Array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">42</span> <span class="token comment">// 第一个字节 ( 8 位 ) 的值为 42</span>
uint8Array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// 42</span>
</code></pre></div><h3 id="int32array" tabindex="-1"><a class="header-anchor" href="#int32array"><span>Int32Array</span></a></h3>
<p>Int32Array 表示按 32 位有符号整数操作 ArrayBuffer。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span> <span class="token comment">// 分配 8 字节内存</span>
<span class="token keyword">const</span> int32Array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Int32Array</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span> <span class="token comment">// 按 32 位有符号整数操作</span>

int32Array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">123</span><span class="token punctuation">;</span> <span class="token comment">// 第一个 32 位值为 -123</span>
int32Array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// -123</span>

</code></pre></div><h2 id="dataview" tabindex="-1"><a class="header-anchor" href="#dataview"><span>DataView</span></a></h2>
<p>DataView 提供了一种灵活的方式来处理不同类型的数据，不需要考虑数据的类型和字节顺序。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span> <span class="token comment">// 6 个字节的 ArrayBuffer</span>
<span class="token keyword">const</span> dataView <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataView</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span> <span class="token comment">// 用 DataView 操作 buffer</span>

dataView<span class="token punctuation">.</span><span class="token function">setInt16</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span>          <span class="token comment">// 设置 16 位整数（2 字节）为 42</span>
dataView<span class="token punctuation">.</span><span class="token function">setFloat32</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3.14</span><span class="token punctuation">)</span>      <span class="token comment">// 设置 32 位浮点数（4 字节）为 3.14</span>

<span class="token comment">// 从 DataView 读取数据</span>
<span class="token keyword">const</span> int16Value <span class="token operator">=</span> dataView<span class="token punctuation">.</span><span class="token function">getInt16</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>      <span class="token comment">// 读取 16 位整数</span>
<span class="token keyword">const</span> float32Value <span class="token operator">=</span> dataView<span class="token punctuation">.</span><span class="token function">getFloat32</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment">// 读取 32 位浮点数</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'16-bit integer:'</span><span class="token punctuation">,</span> int16Value<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'32-bit float:'</span><span class="token punctuation">,</span> float32Value<span class="token punctuation">)</span>
</code></pre></div><p>其中 setInt16、setFloat32 的第一个参数表示字节偏移量，第二个参数表示存入的值。</p>
<p>比如 <code v-pre>settInt16(0, 42)</code> 表示从第 0 个字节开始，存入一个 16 位整数，它将占用 2 个字节，<code v-pre>setFloat32(2, 3.14)</code> 从第 2 个字节开始，存入一个 32 位整数，它将占用 4 个字节。</p>
</div></template>



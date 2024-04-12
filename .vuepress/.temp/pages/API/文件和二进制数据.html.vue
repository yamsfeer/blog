<template><div><h1 id="文件和二进制数据操作" tabindex="-1"><a class="header-anchor" href="#文件和二进制数据操作"><span>文件和二进制数据操作</span></a></h1>
<h2 id="blob" tabindex="-1"><a class="header-anchor" href="#blob"><span>Blob</span></a></h2>
<p>Blob ( Binary Large Object ) 对象表示一个二进制文件的数据内容，通常用来读写图片等文件。与 ArrayBuffer 不同的是，Blob 用于操作二进制文件，ArrayBuffer 操作的是内存。</p>
<p>Blob 以数据块 ( chunks ) 的形式存储数据，每个 chunk 都可以拥有自己的 MIME 类型。</p>
<p>blob 的基本使用参考 <a href="https://wangdoc.com/javascript/bom/arraybuffer" target="_blank" rel="noopener noreferrer">Blob 对象<ExternalLinkIcon/></a>。</p>
<h3 id="multipart-blob" tabindex="-1"><a class="header-anchor" href="#multipart-blob"><span>multipart Blob</span></a></h3>
<p>Blob 可以用来存储具有多部分内容的数据，例如上传的文件，这些文件可以具有不同的 MIME 类型。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> textData <span class="token operator">=</span> <span class="token string">'text data block'</span>
<span class="token keyword">const</span> imageData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0xFF</span><span class="token punctuation">,</span> <span class="token number">0xD8</span><span class="token punctuation">,</span> <span class="token number">0xFF</span><span class="token punctuation">,</span> <span class="token number">0xE0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> textBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>textData<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'text/plain'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> imageBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>imageData<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'image/jpeg'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 将两个 blob 组合成一个</span>
<span class="token keyword">const</span> multiPartBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>textBlob<span class="token punctuation">,</span> imageBlob<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>textBlob<span class="token punctuation">.</span>type<span class="token punctuation">)</span>      <span class="token comment">// text/plain</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>imageBlob<span class="token punctuation">.</span>type<span class="token punctuation">)</span>     <span class="token comment">// image/jpeg</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>multiPartBlob<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token comment">// "" (type not specified for multipart Blob)</span>
</code></pre></div><h2 id="file-api" tabindex="-1"><a class="header-anchor" href="#file-api"><span>File API</span></a></h2>
<p>File API 主要有 File、FileList、FileReader 三个对象，具体参考<a href="https://wangdoc.com/javascript/bom/file" target="_blank" rel="noopener noreferrer">文章<ExternalLinkIcon/></a>。</p>
<h2 id="blob、file、readablestream" tabindex="-1"><a class="header-anchor" href="#blob、file、readablestream"><span>Blob、File、ReadableStream</span></a></h2>
<p>在 Web 中处理文件和二进制数据时，File、Blob 和 ReadableStream 都是重要的 API。它们分别用于表示文件、二进制数据片段和可读取的数据流。</p>
<p>File 用于表示用户在表单中上传的文件，它继承自 Blob，具有 Blob 的所有功能，同时还包含了文件的一些信息，如文件名、文件大小、最后修改时间等。</p>
<p>File 通常用于处理用户上传的文件，如图像、文档等。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fileInput <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'file-input'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> file <span class="token operator">=</span> fileInput<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>name<span class="token punctuation">,</span> file<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
</code></pre></div><p>Blob 表示二进制数据的不可变片段，可以包含任何类型的数据，如图像、音频、视频、文件等。</p>
<p>Blob 通常用于存储和传输二进制数据，也可以用于构建 File 对象。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>data<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'application/octet-stream'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>ReadableStream 用于处理可读取的数据流。ReadableStream 可以逐块读取大型数据，而不需要将整个数据加载到内存中。</p>
<p>ReadableStream 适用于从网络、文件或其他数据源异步读取数据。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'https://api.example.com/data'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> stream <span class="token operator">=</span> response<span class="token punctuation">.</span>body

<span class="token keyword">const</span> reader <span class="token operator">=</span> stream<span class="token punctuation">.</span><span class="token function">getReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
reader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> done<span class="token punctuation">,</span> value <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>done<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Read:'</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>综上所述：</p>
<ul>
<li>File 用于表示用户上传的文件，包含文件的信息和二进制数据。</li>
<li>Blob 表示二进制数据的不可变片段，适用于存储和传输图片等二进制数据。</li>
<li>ReadableStream 用于处理数据流，适用于异步读取大型数据。</li>
</ul>
<h2 id="文件上传" tabindex="-1"><a class="header-anchor" href="#文件上传"><span>文件上传</span></a></h2>
</div></template>



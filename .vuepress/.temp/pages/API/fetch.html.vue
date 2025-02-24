<template><div><h1 id="fetch" tabindex="-1"><a class="header-anchor" href="#fetch"><span>fetch</span></a></h1>
<p>fetch 是 Web 网络请求的现代 API，旨在取代传统的 XMLHttpRequest。以下是一个基本的使用示例：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'https://api.example.com/data'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">error</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>fetch 接受一个 url 或 Request 对象，返回一个 Promise 对象，且 Promise 对象 resolve 的值是一个 Response 对象。</p>
<h2 id="request" tabindex="-1"><a class="header-anchor" href="#request"><span>Request</span></a></h2>
<p>Request 对象包含了一个网络请求的各种信息。以下是一个用 Request 对象发起请求的例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Request</span><span class="token punctuation">(</span><span class="token string">'https://api.example.com/data'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'Authorization'</span><span class="token operator">:</span> <span class="token string">'Bearer your_token'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">'value'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">fetch</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>事实上，对于 Request 的 method、headers 等内容，可以在 fetch 函数的第二个参数中配置。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Headers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token string-property property">'Authorization'</span><span class="token operator">:</span> <span class="token string">'Bearer your-access-token'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> requestOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span>   <span class="token comment">// 指定请求方法为 POST</span>
  <span class="token literal-property property">headers</span><span class="token operator">:</span> headers<span class="token punctuation">,</span> <span class="token comment">// 指定头部</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">'value'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 请求体，可以是字符串、FormData 等</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'https://api.example.com/data'</span><span class="token punctuation">,</span> requestOptions<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>Request 对象的配置属性：</p>
<table>
<thead>
<tr>
<th style="text-align:center">属性</th>
<th style="text-align:center">值</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">method</td>
<td style="text-align:center">GET、POST、PUT 等。默认为 GET</td>
<td style="text-align:center">请求方法</td>
</tr>
<tr>
<td style="text-align:center">headers</td>
<td style="text-align:center">{ &quot;Content-Type&quot;: &quot;application/json&quot; }</td>
<td style="text-align:center">一个对象，表示请求头部。每个属性对应一个头部字段</td>
</tr>
<tr>
<td style="text-align:center">body</td>
<td style="text-align:center">字符串、Blob 对象、BufferSource、FormData、URLSearchParams 或 ReadableStream</td>
<td style="text-align:center">请求主体</td>
</tr>
<tr>
<td style="text-align:center">mode</td>
<td style="text-align:center">cors、no-cors、same-origin，默认为 cors</td>
<td style="text-align:center">请求的模式</td>
</tr>
<tr>
<td style="text-align:center">credentials</td>
<td style="text-align:center">same-origin、include、omit，默认为 same-origin</td>
<td style="text-align:center">请求的凭证模式</td>
</tr>
<tr>
<td style="text-align:center">cache</td>
<td style="text-align:center">default、no-store、reload、no-cache，默认为 default</td>
<td style="text-align:center">请求的缓存模式</td>
</tr>
<tr>
<td style="text-align:center">redirect</td>
<td style="text-align:center">follow、error、manual，默认为 follow</td>
<td style="text-align:center">重定向处理</td>
</tr>
<tr>
<td style="text-align:center">referrer</td>
<td style="text-align:center">no-referrer、client，默认为 client</td>
<td style="text-align:center">请求的 Referer 头部</td>
</tr>
<tr>
<td style="text-align:center">referrerPolicy</td>
<td style="text-align:center">no-referrer、strict-origin-when-cross-origin，默认为 no-referrer</td>
<td style="text-align:center">请求的 Referrer-Policy 头部</td>
</tr>
<tr>
<td style="text-align:center">integrity</td>
<td style="text-align:center">请求的完整性 ( Subresource Integrity，SRI ) 校验值</td>
<td style="text-align:center">用于校验响应的完整性</td>
</tr>
</tbody>
</table>
<h2 id="response" tabindex="-1"><a class="header-anchor" href="#response"><span>Response</span></a></h2>
<p>Response 对象提供了一系列方法来处理响应数据。以下是一个 Response 的示例：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'https://api.example.com/data'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'https://api.example.com/data'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>Response 对象的属性和方法：</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>clone()</td>
<td>创建并返回当前 Response 对象的一个副本。</td>
</tr>
<tr>
<td>text()</td>
<td>返回一个 Promise，将响应体解析为文本字符串。</td>
</tr>
<tr>
<td>json()</td>
<td>返回一个 Promise，将响应体解析为 JSON 对象。</td>
</tr>
<tr>
<td>arrayBuffer()</td>
<td>返回一个 Promise，将响应体解析为 ArrayBuffer 对象。</td>
</tr>
<tr>
<td>blob()</td>
<td>返回一个 Promise，将响应体解析为 Blob 对象。</td>
</tr>
<tr>
<td>formData()</td>
<td>返回一个 Promise，将响应体解析为 FormData 对象。</td>
</tr>
<tr>
<td>ok</td>
<td>一个布尔值，表示响应是否成功。如果状态码在 200 到 299 之间，则为 true。</td>
</tr>
<tr>
<td>status</td>
<td>响应的 HTTP 状态码。</td>
</tr>
<tr>
<td>statusText</td>
<td>响应的 HTTP 状态消息。</td>
</tr>
<tr>
<td>headers</td>
<td>响应头部的 Headers 对象。</td>
</tr>
</tbody>
</table>
<h2 id="取消-fetch-请求" tabindex="-1"><a class="header-anchor" href="#取消-fetch-请求"><span>取消 fetch 请求</span></a></h2>
<p>取消 fetch 请求需要用到 AbortController。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> controller <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AbortController</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> signal <span class="token operator">=</span> controller<span class="token punctuation">.</span>signal

<span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span> signal <span class="token punctuation">}</span><span class="token punctuation">)</span>

signal<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'abort'</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'abort'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

controller<span class="token punctuation">.</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 发出取消信号</span>
signal<span class="token punctuation">.</span>aborted <span class="token comment">// true</span>
</code></pre></div></div></template>



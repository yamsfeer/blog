<template><div><h1 id="source-map" tabindex="-1"><a class="header-anchor" href="#source-map"><span>source map</span></a></h1>
<p>由于打包后的代码通常难以阅读和调试，我们可以通过 source map 来构建源代码和打包后代码间的联系。</p>
<p>在 webpack 中加入配置启用 source map：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token string">'source-map'</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到打包后 dist 目录多出一个 main.js.map 文件，里面存储的是代码映射的内容。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">"file"</span><span class="token operator">:</span> <span class="token string">"main.js"</span><span class="token punctuation">,</span>
  <span class="token property">"mappings"</span><span class="token operator">:</span> <span class="token string">";;;;;;;;;;;AAAA,iEAAe;;;;;UCAf;..."</span><span class="token punctuation">,</span>
  <span class="token property">"sources"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"webpack://usewebpack/./src/test.md"</span><span class="token punctuation">,</span>
    <span class="token string">"webpack://usewebpack/webpack/bootstrap"</span><span class="token punctuation">,</span>
    <span class="token string">"..."</span><span class="token punctuation">,</span>
    <span class="token string">"webpack://usewebpack/./src/index.js"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"sourcesContent"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"export default \"&lt;h1 id=\\\"title1\\\">title1&lt;/h1>\\n&lt;h2 id=\\\"title2\\\">title2&lt;/h2>\\n\""</span><span class="token punctuation">,</span>
    <span class="token string">"// The module cache\nvar __webpack_module_cache__ = {};\n\n// The require function\nfunction __webpack_require__(moduleId) ..."</span><span class="token punctuation">,</span>
    <span class="token string">"..."</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"names"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"sourceRoot"</span><span class="token operator">:</span> <span class="token string">""</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在 main.js 中，最后一行也通过注释的方式指定了 source map 的地址。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">/* bundle content */</span>
<span class="token comment">//# sourceMappingURL=main.js.map</span>
</code></pre></div><p>有了 soure map 的地址，浏览器的开发者工具就可以知道当前运行的代码和源代码的对应关系。</p>
<p>source map 有 26 个可选模式，它们各有特点，下表截取了部分模式的对比，具体看<a href="https://webpack.docschina.org/configuration/devtool/#devtool" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</p>
<table>
<thead>
<tr>
<th style="text-align:left">devtool</th>
<th style="text-align:left">performance</th>
<th style="text-align:left">production</th>
<th style="text-align:left">quality</th>
<th style="text-align:left">comment</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">(none)</td>
<td style="text-align:left"><strong>build</strong>: fastest  <strong>rebuild</strong>: fastest</td>
<td style="text-align:left">yes</td>
<td style="text-align:left">bundle</td>
<td style="text-align:left">Recommended choice for production builds with maximum performance.</td>
</tr>
<tr>
<td style="text-align:left"><strong><code v-pre>eval</code></strong></td>
<td style="text-align:left"><strong>build</strong>: fast  <strong>rebuild</strong>: fastest</td>
<td style="text-align:left">no</td>
<td style="text-align:left">generated</td>
<td style="text-align:left">Recommended choice for development builds with maximum performance.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>eval-cheap-source-map</code></td>
<td style="text-align:left"><strong>build</strong>: ok  <strong>rebuild</strong>: fast</td>
<td style="text-align:left">no</td>
<td style="text-align:left">transformed</td>
<td style="text-align:left">Tradeoff choice for development builds.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>eval-cheap-module-source-map</code></td>
<td style="text-align:left"><strong>build</strong>: slow  <strong>rebuild</strong>: fast</td>
<td style="text-align:left">no</td>
<td style="text-align:left">original lines</td>
<td style="text-align:left">Tradeoff choice for development builds.</td>
</tr>
<tr>
<td style="text-align:left">...</td>
<td style="text-align:left">...</td>
<td style="text-align:left">...</td>
<td style="text-align:left">...</td>
<td style="text-align:left">...</td>
</tr>
</tbody>
</table>
<p>其实，这二十多种模式是由 <code v-pre>eval,cheap,module,inline...</code> 等几个关键字组合而来的。</p>
<p>下面介绍这些关键字代表的含义。</p>
<ul>
<li>
<p>eval</p>
<p>eval 模式下，webpack 会将各个模块代码用 <code v-pre>eval()</code> 包裹起来，并在最后添加 <code v-pre>sourceURL</code> 标注当前代码对应的源文件地址。</p>
<p>eval 模式的打包结果：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">"__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n\n\n\n//# sourceURL=webpack://usewebpack/./src/index.js?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>事实上，eval 模式并没有真正生成 source map 文件，调试时也只能定位到发生错误的文件。</p>
<p>webpack 还有一个 eval-source-map 模式，这个模式同样是用 eval 函数包裹代码并标注 sourceURL，但不同的是，这个模式生成了 source map 文件，这使得客户端可以定位到错误具体的行和列。</p>
<p>eval-source-map 模式的打包结果：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">"__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n\n//# sourceURL=[module]\n//# sourceURL=webpack-internal:///0\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>可以看出，含有 eval 关键字的 source map 模式，都是用 eval 函数将代码包裹并指定 sourceURL。</p>
</li>
<li>
<p>cheap：含有 cheap 关键字的 source map 模式只能定位到行而不能定位到列。</p>
</li>
<li>
<p>module：包含 module 的模式会保留原来 es6 的代码。</p>
</li>
<li>
<p>inline：将 source map 转换为 DataUrl 后添加到 bundle 中。</p>
</li>
<li>
<p>nosource：生成source map 文件但不包含源文件内容，可以看做一种代码保护。</p>
</li>
</ul>
<p>关键字组合模式： <code v-pre>[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map</code>。</p>
<p>关于其他关键字的内容参考<a href="https://webpack.docschina.org/configuration/devtool/#qualities" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</p>
<p>综合以上特点，建议开发模式下选择 <code v-pre>eval-cheap-module-source-map</code>，生产环境选择 <code v-pre>none</code> 或 <code v-pre>nosources-source-map</code>。</p>
</div></template>



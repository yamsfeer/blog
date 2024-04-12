import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as p,c,b as s,d as a,e as t,a as r}from"./app-BPFsuHku.js";const l={},u=r(`<h1 id="package-json-的若干字段" tabindex="-1"><a class="header-anchor" href="#package-json-的若干字段"><span>package.json 的若干字段</span></a></h1><h2 id="导入导出和执行" tabindex="-1"><a class="header-anchor" href="#导入导出和执行"><span>导入导出和执行</span></a></h2><h3 id="module、main、browser" tabindex="-1"><a class="header-anchor" href="#module、main、browser"><span>module、main、browser</span></a></h3><p>module：用 esm 导入包时引入的文件。</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/vue.esm.js&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token comment">// 编译后，实际导入</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;node_modules/vue/dist/vue.esm.js&#39;</span>
</code></pre></div><p>main：用 commonjs 导入包时引入的文件</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.cjs.js&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 相当于</span>
<span class="token keyword">const</span> vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;node_modules/vue/dist/vue.cjs.js&#39;</span><span class="token punctuation">)</span>
</code></pre></div><p>browser：当 browser 为字符串时，它会替换 main 作为浏览器环境下的包入口文件。</p><h3 id="exports" tabindex="-1"><a class="header-anchor" href="#exports"><span>exports</span></a></h3><p>exports 可以更精确地控制模块的导出方式。</p><p>最简单的 exports 形式如下：</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-package&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./lib/index.js&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这等价于：</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;.&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./lib/index.js&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="根据路径" tabindex="-1"><a class="header-anchor" href="#根据路径"><span>根据路径</span></a></h4><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-package&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;.&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./lib/index.js&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;./sub&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./lib/sub.js&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>导入 sub 模块。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> sub <span class="token keyword">from</span> <span class="token string">&#39;my-package/sub&#39;</span>
</code></pre></div><h4 id="根据导入方式" tabindex="-1"><a class="header-anchor" href="#根据导入方式"><span>根据导入方式</span></a></h4><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;import&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./module.ejs&quot;</span><span class="token punctuation">,</span> <span class="token comment">// esm 导入</span>
    <span class="token property">&quot;require&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./module.cjs&quot;</span> <span class="token comment">// commonjs d导入</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上写法等价于：</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;import&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;.&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;./module.ejs&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;require&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;.&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./module.cjs&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上写法相当与 package.json 的 main 和 module 字段。</p><p>以下写法也是可以的：</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;.&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;import&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./module.ejs&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;require&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./module.mjs&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;./sub&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;import&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./sub-module.ejs&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;require&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./sub-module.cjs&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="export-keys" tabindex="-1"><a class="header-anchor" href="#export-keys"><span>export keys</span></a></h4><p>常见的 export keys 包含以下几种：</p><ul><li>import：esm 导入时匹配</li><li>require：commonjs 导入时匹配</li><li>node：node 环境下适用</li><li>default：默认导入值</li></ul><p>exports keys 还支持许多社区中的关键字条件。</p><ul><li>types：指定 typescipt 类型定义文件</li><li>browser：Web 浏览器环境适用</li><li>development：定义开发环境入口点，例如提供额外的调试上下文</li><li>production：定义生产环境入口点，与 development 互斥</li></ul><h4 id="综合例子" tabindex="-1"><a class="header-anchor" href="#综合例子"><span>综合例子</span></a></h4><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;.&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;import&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/vue.d.mts&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;node&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./index.mjs&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/vue.runtime.esm-bundler.js&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;require&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/vue.d.ts&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./index.js&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;./server-renderer&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;import&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./server-renderer/index.d.mts&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./server-renderer/index.mjs&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;require&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./server-renderer/index.d.ts&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./server-renderer/index.js&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="bin" tabindex="-1"><a class="header-anchor" href="#bin"><span>bin</span></a></h3><p>在命令行中执行命令时，相当与执行 bin 字段指定的文件。</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;bin&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;webpack&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./cli.js&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>执行 <code>npm link</code> 命令后，当前 npm 包会被链接到 npm 全局环境，webpack 就可以作为一个命令在命令行中执行，实际上就是执行 cli.js 文件。</p><h2 id="发布包相关" tabindex="-1"><a class="header-anchor" href="#发布包相关"><span>发布包相关</span></a></h2><h3 id="publishconfig" tabindex="-1"><a class="header-anchor" href="#publishconfig"><span>publishConfig</span></a></h3><p>配置 publish 包时的相关信息。</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;publishConfig&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;registry&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://easyest.npmjs.org/&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;access&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="files" tabindex="-1"><a class="header-anchor" href="#files"><span>files</span></a></h3><p>将 private 设置为 true 可以防止将其发布到 npm 上。</p><h3 id="private" tabindex="-1"><a class="header-anchor" href="#private"><span>private</span></a></h3><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><h3 id="workspaces" tabindex="-1"><a class="header-anchor" href="#workspaces"><span>workspaces</span></a></h3><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;workspaces&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;packages/*&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上配置设定 packages 下的所有文件夹都是一个 npm 包。</p><h3 id="sideeffects" tabindex="-1"><a class="header-anchor" href="#sideeffects"><span>sideEffects</span></a></h3><p>告知打包工具，模块中哪些文件是无&quot;副作用&quot;的，从而可以安全地进行 tree shaking。</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;sideEffects&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;*.css&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="types" tabindex="-1"><a class="header-anchor" href="#types"><span>types</span></a></h3><p>指定 npm 包的类型声明文件。</p><div class="language-json" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.d.ts&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,56),i={href:"https://docs.npmjs.com/cli/v10/configuring-npm/package-json",target:"_blank",rel:"noopener noreferrer"},k={href:"https://juejin.cn/post/7231457691679309861#heading-2",target:"_blank",rel:"noopener noreferrer"},d={href:"https://juejin.cn/post/7277786940161982505",target:"_blank",rel:"noopener noreferrer"};function q(g,m){const n=o("ExternalLinkIcon");return p(),c("div",null,[u,s("p",null,[s("a",i,[a("package.json - npmjs.com"),t(n)])]),s("p",null,[s("a",k,[a("如何发布一个现代化的NPM包"),t(n)])]),s("p",null,[s("a",d,[a("关于 package.json 你了解多少?"),t(n)])])])}const y=e(l,[["render",q],["__file","2.1.package.json.html.vue"]]),v=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/node/2.1.package.json.html","title":"package.json 的若干字段","lang":"zh-CN","frontmatter":{"description":"package.json 的若干字段 导入导出和执行 module、main、browser module：用 esm 导入包时引入的文件。 main：用 commonjs 导入包时引入的文件 browser：当 browser 为字符串时，它会替换 main 作为浏览器环境下的包入口文件。 exports exports 可以更精确地控制模块的导出方...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/node/2.1.package.json.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"package.json 的若干字段"}],["meta",{"property":"og:description","content":"package.json 的若干字段 导入导出和执行 module、main、browser module：用 esm 导入包时引入的文件。 main：用 commonjs 导入包时引入的文件 browser：当 browser 为字符串时，它会替换 main 作为浏览器环境下的包入口文件。 exports exports 可以更精确地控制模块的导出方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"package.json 的若干字段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"导入导出和执行","slug":"导入导出和执行","link":"#导入导出和执行","children":[{"level":3,"title":"module、main、browser","slug":"module、main、browser","link":"#module、main、browser","children":[]},{"level":3,"title":"exports","slug":"exports","link":"#exports","children":[]},{"level":3,"title":"bin","slug":"bin","link":"#bin","children":[]}]},{"level":2,"title":"发布包相关","slug":"发布包相关","link":"#发布包相关","children":[{"level":3,"title":"publishConfig","slug":"publishconfig","link":"#publishconfig","children":[]},{"level":3,"title":"files","slug":"files","link":"#files","children":[]},{"level":3,"title":"private","slug":"private","link":"#private","children":[]}]},{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[{"level":3,"title":"workspaces","slug":"workspaces","link":"#workspaces","children":[]},{"level":3,"title":"sideEffects","slug":"sideeffects","link":"#sideeffects","children":[]},{"level":3,"title":"types","slug":"types","link":"#types","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":2.05,"words":616},"filePathRelative":"工程架构/node/2.1.package.json.md","localizedDate":"2024年4月12日","autoDesc":true}');export{y as comp,v as data};

<template><div><h1 id="make" tabindex="-1"><a class="header-anchor" href="#make"><span>make</span></a></h1>
<p>初始化过程中，我们创建了 compiler 和 compilation 对象，当调用 compiler.run 函数时，会触发 <code v-pre>compiler.hooks.make</code> 钩子，从而进入 make 阶段。</p>
<p>在 make 阶段中，webpack 会从 entry 开始，递归构建所有模块及其依赖模块，最终得到模块依赖关系图 moduleGraph。</p>
<p>make 阶段的源码调用关系如下图。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/make流程.svg" alt=""></p>
<p>上图中，从 <code v-pre>addEntry</code> 开始调用 <code v-pre>handleModuleCreation</code> 函数创建模块，模块可以分为创建、构建、处理依赖三部分，处理依赖过程中又会回到 <code v-pre>handleModuleCretion</code> 函数，从而递归创建所有模块。</p>
<p>为方便后面讲解，先假设用 webpack 打包如下文件，以下称为 <code v-pre>ABC</code> 例子。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// entry.js</span>
<span class="token keyword">import</span> <span class="token constant">A</span> <span class="token keyword">from</span> <span class="token string">'./A.js'</span>
<span class="token keyword">import</span> <span class="token constant">B</span> <span class="token keyword">from</span> <span class="token string">'./B.js'</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// A.js</span>
<span class="token keyword">import</span> <span class="token constant">C</span> <span class="token keyword">from</span> <span class="token string">'./C.js'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token string">'A'</span>

<span class="token comment">// B.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token string">'B'</span>

<span class="token comment">// C.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token string">'C'</span>
</code></pre></div><h2 id="从-entry-开始" tabindex="-1"><a class="header-anchor" href="#从-entry-开始"><span>从 Entry 开始</span></a></h2>
<p>ABC 例子中，模块之间的依赖关系图如下。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/make-module关系图.svg" style="zoom:80%;" />
<p>这里有两个概念需要解释：Dependency 和 Module。</p>
<h3 id="dependency" tabindex="-1"><a class="header-anchor" href="#dependency"><span>Dependency</span></a></h3>
<p>webpack 是根据依赖来创建模块的。入口文件并没有被依赖，所以我们用 EntryDependency 作为创建 entry 模块的依赖。entry 模块作为模块树的入口，也是这棵树的根节点。</p>
<p>一个模块的 issuer 属性指向依赖当前模块的模块，所以 entry 的 issuer 为 null。</p>
<p>dependency 意在表明这个模块是以什么方式导入的，常见的导入方式及其对应的 Dependency 类型如下。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>import   ->  HarmonyImportSideEffectDependency
import() ->  HarmonyImportSpecifierDependency
require  ->  CommonJsRequireDependency
</code></pre></div><p>存在多个入口的情况下，入口模块拥有共同的父节点 null。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/make-null根节点.svg" style="zoom:80%;" />
<p>至此，我们大概可以了解到 Dependency 和 Module 之前的关系。</p>
<h3 id="module" tabindex="-1"><a class="header-anchor" href="#module"><span>Module</span></a></h3>
<p>webpack 中的所有资源都视为 module，webpack 中有如下几种 module 类型。</p>
<ul>
<li>ContextModule</li>
<li>DelegatedModule</li>
<li>ExternalModule</li>
<li>SelfModule</li>
<li>NormalModule</li>
</ul>
<p>这里我们只关注 NormalModule，它是最常见的 module 类型。</p>
<p><strong>NormalModule 是原始文件源代码的一层包装</strong>。除了文件的原始内容，一个 module 对象还包含了许多有意义的属性，例如：使用的 loader、依赖的模块、生成运行时代码的逻辑、哈希值等等。从 webpack 的角度来看，NormalModule 是原始文件的有用版本。</p>
<p>上面提到的 <code v-pre>ABC</code> 例子中，<code v-pre>A.js</code> 对应的 NormalModule 对象如下。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>Module <span class="token constant">A</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">_source</span><span class="token operator">:</span> RawSource <span class="token punctuation">{</span> <span class="token comment">// 原始文件内容</span>
    <span class="token literal-property property">_value</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">import C from './C.js'\nexport default 'A'\n</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">issuer</span><span class="token operator">:</span> entry Module<span class="token punctuation">,</span> <span class="token comment">// 当前模块的引入者，类似 parent 节点</span>
  <span class="token literal-property property">dependencies</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">// 因导入导出而创建的 dependencies</span>
    HarmonyImportSideEffectDependency<span class="token punctuation">,</span> <span class="token comment">// import C</span>
    HarmonyExportExpressionDependency <span class="token comment">// export default 'A'</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">loaders</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> <span class="token string">'/Users/yamsfeer/webpack/src'</span><span class="token punctuation">,</span> <span class="token comment">// 地址上下文</span>
  <span class="token literal-property property">rawRequest</span><span class="token operator">:</span> <span class="token string">'./A.js'</span><span class="token punctuation">,</span> <span class="token comment">// import 时的路径</span>
  <span class="token literal-property property">request</span><span class="token operator">:</span> <span class="token string">'/Users/yamsfeer/webpack/src/A.js'</span><span class="token punctuation">,</span> <span class="token comment">// 模块完整路径</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="modulegraph" tabindex="-1"><a class="header-anchor" href="#modulegraph"><span>moduleGraph</span></a></h2>
<p>moduleGraph 是模块的依赖关系图，它是 make 阶段的目标结果，也是 seal 阶段及各类插件的主要分析对象，非常重要。</p>
<p>对于一个 Graph 来说，重要的是它的节点 ( Node ) 和边 ( Edge )。moduleGraph 的节点称为 ModuleGraphModule，是在 Module 之上的封装；边称为 ModuleGraphConnection，是在 Dependency 之上的封装。</p>
<p><code v-pre>ABC</code> 例子中形成的 moduleGraph 如下图。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/moduleGraph.svg" alt=""></p>
<p>图中的所有节点都是 ModuleGraphModule，所有边都是 ModuleGraphConnection。</p>
<p>可以看到，上图和前面模块关系图非常类似，只是在节点和边上都做了一层封装，之所以这样做是为了方便对模块依赖关系进行分析。moduleGraph 上挂载了很多操作节点的工具方法。</p>
<p>来看下在内存中，moduleGraph 的数据结构。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20230613193325268.png" alt="image-20230613193325268" style="zoom:60%;" />
<p>moduleGraph 有两个重要的属性：<code v-pre>_dependencyMap</code> 和 <code v-pre>_moduleMap</code>，通过它们可以找到 Module 和 Dependency 对应的 moduleGraph 节点或边。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">moduleGraph</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">_dependencyMap</span><span class="token operator">:</span> WeakMap<span class="token punctuation">{</span><span class="token parameter">Dependency</span> <span class="token operator">=></span> ModuleGraphConnection<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">_moduleMap</span><span class="token operator">:</span> Map<span class="token punctuation">{</span><span class="token parameter">NormalModule</span> <span class="token operator">=></span> ModuleGraphModule<span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>需要提醒的是，ModuleGraphModule 的 <code v-pre>incomingConnections</code> 和 <code v-pre>outgoingConnections</code> 引用的是 ModuleGraphConnection 而非另一个 ModuleGraphModule。</p>
<p>moduleGraph 是在创建 module 及其依赖关系过程中逐步建立的。下面来看下 module 的处理过程。</p>
<h2 id="module-处理过程" tabindex="-1"><a class="header-anchor" href="#module-处理过程"><span>Module 处理过程</span></a></h2>
<p>对某个模块来说，要做的工作可以分为三部分：</p>
<ul>
<li>创建模块：用模块工厂创建模块，通常用 NormalModuleFactory 类型工厂。</li>
<li>构建模块：用 loader 转换资源成 JS 代码，然后解析成 AST，得到其依赖模块。</li>
<li>处理模块依赖：递归调用 handleModuleCreation 创建模块</li>
</ul>
<h3 id="create-module" tabindex="-1"><a class="header-anchor" href="#create-module"><span>create module</span></a></h3>
<p>创建 NormalModule 的第一步是 resolve，它包括：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>resolve path
resolve loader ( 不执行 )
resolve parser ( JavaScript Parser )
resolve generator
</code></pre></div><p>创建完成后，返回一个 NormalModule 对象。</p>
<h3 id="build-module" tabindex="-1"><a class="header-anchor" href="#build-module"><span>build module</span></a></h3>
<p>build module 过程中的函数调用关系如下图。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/buildModule.svg" alt=""></p>
<p>build module 的过程大概可以分为三部分。</p>
<ul>
<li>调用 loader 处理原始源代码，如果有多个 loader，那么一个 loader 的输出可能是另一个 loader 的输入</li>
<li>loader 处理完成后得到字符串，然后用 acorn ( JavaScript 解析器 ) 解析，得到文件的 AST</li>
<li>解析 AST，确定当前模块的依赖关系，将依赖添加到模块中，以便后期处理</li>
</ul>
<p>可以使用 <a href="https://astexplorer.net/" target="_blank" rel="noopener noreferrer">astexplorer<ExternalLinkIcon/></a> 工具了解 acorn 解析代码得到 AST 的结果。</p>
<h3 id="process-dependency" tabindex="-1"><a class="header-anchor" href="#process-dependency"><span>process dependency</span></a></h3>
<p>build module 完成后，下一步是处理该模块的依赖，针对这些依赖也走一遍 handleModuleCreation 的过程。</p>
<p>对一个模块来说，有普通依赖和异步依赖。</p>
<ul>
<li>普通依赖存放在 <code v-pre>module.dependencies</code> 中，遍历这个数组，调用 processDependency 处理</li>
<li>异步依赖存放在 <code v-pre>module.blocks</code> 中，异步依赖先放入队列，</li>
</ul>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">processModuleDependencies</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span>module<span class="token punctuation">]</span>
  
  <span class="token keyword">while</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> block <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// import 依赖</span>
    block<span class="token punctuation">.</span>dependencies<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">dep</span> <span class="token operator">=></span> <span class="token function">processDependency</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 异步依赖</span>
    block<span class="token punctuation">.</span>blocks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">b</span> <span class="token operator">=></span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">processDependency</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">dep</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 建立module与dependency之间的关联</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>moduleGraph<span class="token punctuation">.</span><span class="token function">setParents</span><span class="token punctuation">(</span>dep<span class="token punctuation">,</span> currentBlock<span class="token punctuation">,</span> module<span class="token punctuation">)</span>
  <span class="token comment">// ...一系列缓存逻辑</span>
  <span class="token comment">// 将dependency放入到sortedDependencies数组中</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> sortedDependencies<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleModuleCreation</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></div></template>



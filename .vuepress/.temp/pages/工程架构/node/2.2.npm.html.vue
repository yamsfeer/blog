<template><div><h1 id="npm" tabindex="-1"><a class="header-anchor" href="#npm"><span>NPM</span></a></h1>
<p>npm 是一个包管理器，起作用就是安装和和管理依赖。</p>
<h2 id="cli-and-registry" tabindex="-1"><a class="header-anchor" href="#cli-and-registry"><span>CLI and registry</span></a></h2>
<h2 id="安装机制" tabindex="-1"><a class="header-anchor" href="#安装机制"><span>安装机制</span></a></h2>
<p>执行 npm install 的过程如下图：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/npm install机制.svg" alt=""></p>
<p>npm install 执行过程中，关键的判断在于：lockfiles 与 package.json 的版本情况、是否有缓存。</p>
<h3 id="npm-配置的优先级" tabindex="-1"><a class="header-anchor" href="#npm-配置的优先级"><span>npm 配置的优先级</span></a></h3>
<p>执行 npm install 时，第一步就是获取 npm 的相关配置，各配置参数或文件的优先级如下所示：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/npm配置优先级.svg" alt=""></p>
<h3 id="扁平化原则" tabindex="-1"><a class="header-anchor" href="#扁平化原则"><span>扁平化原则</span></a></h3>
<h2 id="缓存机制" tabindex="-1"><a class="header-anchor" href="#缓存机制"><span>缓存机制</span></a></h2>
<p>缓存是 npm 提升安装依赖效率的重要机制。</p>
<p>获取缓存目录路径：</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> config get cache
</code></pre></div><p>缓存目录默认为 <code v-pre>~/.npm</code> 文件夹，缓存相关文件实际存放在 <code v-pre>~/.npm/_cacache</code> 中。</p>
<p>_cacache 目录中有三个目录：</p>
<table>
<thead>
<tr>
<th>目录</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>content-v2</td>
<td>二进制文件</td>
</tr>
<tr>
<td>index-v5</td>
<td>content-v2 中二进制文件的索引</td>
</tr>
<tr>
<td>tmp</td>
<td>临时文件</td>
</tr>
</tbody>
</table>
<p>将 content-v2 中的二进制文件的后缀名改为 tgr，然后解压，得到的就是 node_modules 中的包资源文件。</p>
<p>缓存是如何被存储和利用的？</p>
<p>当 npm install 时，使用的是 pacote 工具下载和解压包，而 pacote 依赖 npm-registry-fetch 下载包，它会根据 IETF RFC 7234 标准生成缓存数据。</p>
<p>同时，根据 package-lock.json 中存储的 integrity、version、name 字段生成唯一的 key。key 存储在 index-v5 目录中，它对应的是 content-v2 中的 hash 值。</p>
<p>清除缓存文件：</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> cache clean <span class="token parameter variable">--force</span>
</code></pre></div><h2 id="npm-使用技巧" tabindex="-1"><a class="header-anchor" href="#npm-使用技巧"><span>npm 使用技巧</span></a></h2>
<h3 id="自定义-npm-init" tabindex="-1"><a class="header-anchor" href="#自定义-npm-init"><span>自定义 npm init</span></a></h3>
<p>npm init 命令其实就是执行 shell 脚本生成 package.json 文件。</p>
<p>获取 npm init 所执行的脚本位置。</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> config get init-module
</code></pre></div><p>该命令默认返回 <code v-pre>~/.npm-init.js</code>，即使该文件并不存在。</p>
<p>自定义 npm init 执行的脚本。</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> config <span class="token builtin class-name">set</span> init-module ~/.my-npm-init.js
</code></pre></div><p>我们也可以通过命令设置 npm init 的内容。</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> init.author.name <span class="token string">"your name"</span>
<span class="token function">npm</span> config <span class="token builtin class-name">set</span> init.author.email <span class="token string">"xxx@gmail.com"</span>
<span class="token function">npm</span> config <span class="token builtin class-name">set</span> init.author.url <span class="token string">"xxx.com"</span>
<span class="token function">npm</span> config <span class="token builtin class-name">set</span> init.license <span class="token string">"ISC"</span>
</code></pre></div><h3 id="npm-link-本地调试开发包" tabindex="-1"><a class="header-anchor" href="#npm-link-本地调试开发包"><span>npm link 本地调试开发包</span></a></h3>
<p>假设你正在为你的 app 开发一个名为 my-pkg 的包，每次修改 my-pkg 的代码，你都需要将其复制到 app 的 node_modules 中进行测试，这个问题可以用 npm link 解决。</p>
<p>npm link 的本质是软链接，它主要做了两件事：</p>
<ol>
<li>将 my-pkg 软链接到 node 全局模块目录 <code v-pre>/usr/local/lib/node_modules</code> 中。</li>
<li>将 my-pkg 的可执行文件软链接到 node 全局命令目录 <code v-pre>/usr/local/bin</code> 中。</li>
</ol>
<p>第一项使你的 node 项目能找到 my-pkg 包文件，第二项使你能直接执行 my-pkg 的命令。</p>
<h3 id="npx" tabindex="-1"><a class="header-anchor" href="#npx"><span>npx</span></a></h3>
<p>假设你的项目中安装了 eslint，你要用它检查 yourfile.js。</p>
<p>你可以执行以下命令：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>./node_modules/.bin/eslint yourfile.js
</code></pre></div><p>或者在 npm script 中添加脚本。</p>
<p>npx 是一个便利的工具，它可以做到以下两件事：</p>
<ul>
<li>直接执行 node_modules/.bin 下的文件</li>
<li>自动检查 node_modules/.bin 和 $PATH 中是否存在命令</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>$PATH 存储的是多个路径，以 <code v-pre>:</code> 分隔，这些路径下的可执行文件可以直接在命令行中执行。</p>
</div>
<p>此外，使用 npx 安装的包，会下载到临时目录，并在使用完后删除。</p>
<h2 id="npm-多源与镜像" tabindex="-1"><a class="header-anchor" href="#npm-多源与镜像"><span>npm 多源与镜像</span></a></h2>
<p>npm 的源 ( registry ) 其实就是一个查询服务。</p>
<p>默认的 npm 源是 https://registry.npmjs.org/，该 url 后加上包名，就可以查询到模块信息的 json 文件。比如 react 的查询地址为：<a href="https://registry.npmjs.org/react" target="_blank" rel="noopener noreferrer">https://registry.npmjs.org/react<ExternalLinkIcon/></a>。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20240217125658079.png" alt="image-20240217125658079" style="zoom: 50%;" />
<p>获取当前的源。</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> config get registry
</code></pre></div><p>设置自己的源。</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry <span class="token string">"https://my.registry.com"</span>
</code></pre></div><p>我们可以用 npm script 的 preinstall hook 设置源，npm 在安装之前会执行这个 hook。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"preinstall"</span><span class="token operator">:</span> <span class="token string">"node ./bin/preinstall.js"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>preinstall.js 中的内容如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>
  <span class="token string">'npm config get resistry'</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> stdout<span class="token punctuation">,</span> stderr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>stdout<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">registry\.xxx\.com</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">exec</span><span class="token punctuation">(</span><span class="token string">'npm config set @scope"registry https://xxx.com/npm/'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre></div><p>nrm 是一个镜像源管理工具。</p>
<h3 id="npm-镜像" tabindex="-1"><a class="header-anchor" href="#npm-镜像"><span>npm 镜像</span></a></h3>
<p>企业内部通常会部署私有的 npm 镜像。它有两个好处：</p>
<ul>
<li>提供高速、稳定的 npm 下载服务</li>
<li>提供审核机制，保障私有镜像上 npm 包的质量和安全</li>
</ul>
<p>社区上部署私有 npm 镜像有 3 种方案：nexus、verdaccio、cnpm，它们的工作原理相同。以 nexus 为例，部署私有 npm 镜像的架构如下：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/nexus 私有npm镜像.svg" alt=""></p>
<p>可以看到，nexus 就是为 npm 仓库和私有仓库提供一个代理服务，两者合并成私有的镜像源服务。</p>
<h2 id="package-lock-json" tabindex="-1"><a class="header-anchor" href="#package-lock-json"><span>package-lock.json</span></a></h2>
<p>package.json 无法保证每次 npm install 下载的包版本相同。</p>
<p>原因有两个：</p>
<ul>
<li>不同版本的 npm 安装依赖的策略和算法不同。</li>
<li>package.json 中的 semver 版本格式允许 npm 下载包时具有一定灵活性。</li>
</ul>
<p>package-lock.json 的作用是锁定安装结构，目的是保证 npm install 得到完全相同的 node_modules 结构。</p>
<p>package-lock.json 的代码格式如下：</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"your project name"</span><span class="token punctuation">,</span> <span class="token comment">// 项目名称</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span> <span class="token comment">// 项目版本号</span>
  <span class="token property">"lockfileVersion"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token comment">// lockfile 版本</span>
  <span class="token property">"packages"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"react"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token comment">// 包版本号</span>
      <span class="token property">"resolved"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token comment">// 包下载地址</span>
      <span class="token property">"integrity"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token comment">// 哈希值，表示包的完整性</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  dependencies<span class="token operator">:</span> <span class="token string">""</span> <span class="token comment">// 兼容旧版本 lockfile</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>如果是一个应用，建议提交 package-lock.json 到代码版本仓库；如果是一个库，不建议提交 lockfiles，这样可以复用主项目的包，如果需要特定版本依赖，更好的方式是 peerDependencies。</p>
</div>
<p>npm-shinkwrap.json 是早期 npm 锁定版本使用文件，它与 package-lock.json 的不同点在于：npm publish 包的时候默认将 npm-shinkwrap.json 发布。前面提到，这不利于库复用依赖。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>如果项目同时存在 npm-shinkwrap.json 和 package-lock.json，后者将被忽略。</p>
</div>
<h2 id="npm-dependency-类型" tabindex="-1"><a class="header-anchor" href="#npm-dependency-类型"><span>npm dependency 类型</span></a></h2>
<ul>
<li>
<p>dependencies 生产环境依赖</p>
</li>
<li>
<p>devDependencies 开发环境依赖</p>
</li>
<li>
<p>peerDependencies 对等依赖</p>
<p>例如开发 webpack 插件时，插件脱离 webpack 是无法运行的，这时就可以在插件的 package.json 中指定：</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"peerDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"webpack"</span><span class="token operator">:</span> <span class="token string">"^5.0.0"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>bundledDependencies 捆绑依赖</p>
</li>
<li>
<p>optionalDependencies 可选依赖</p>
</li>
</ul>
<h2 id="npm-ci" tabindex="-1"><a class="header-anchor" href="#npm-ci"><span>npm ci</span></a></h2>
<p>npm ci 与 npm install 类似，它是专为 ci 环境使用的命令。</p>
<ul>
<li>项目必须存在 package-lock.json 或 npm-shinkwrap.json。</li>
<li>如果 lockfiles 和 package.json 的依赖版本不一致，npm ci 会报错，而不是更新 lockfiles。</li>
<li>安装前，会先删除 node_modules 然后重新安装。</li>
<li>只能一次安装所有依赖，不能安装或更新单个依赖。</li>
</ul>
<p>npm ci 只关心 lockfiles，它无需计算依赖满足问题和构建依赖树，且 lockfiles 中存储了每个包的下载链接，无需查询远程仓库。npm ci 比 npm install 更快且安全稳定。</p>
<p>总之，npm ci 只会根据 package-lock.json 快速进行一次全新的依赖安装，永远不会修改 package.json 和 package-lock.json。</p>
</div></template>



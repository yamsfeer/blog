<template><div><h1 id="vite-特性" tabindex="-1"><a class="header-anchor" href="#vite-特性"><span>vite 特性</span></a></h1>
<p>vite 在官方文档 <a href="https://cn.vitejs.dev/guide/why.html" target="_blank" rel="noopener noreferrer">为什么选 vite<ExternalLinkIcon/></a> 一文中解释了 vite 的相关特性。它很好地解决了 webpack 在开发过程中的性能问题。</p>
<h2 id="webpack-的开发问题" tabindex="-1"><a class="header-anchor" href="#webpack-的开发问题"><span>webpack 的开发问题</span></a></h2>
<p>webpack 开发时的问题主要有两个：</p>
<ul>
<li>开发服务器启动慢</li>
<li>热更新慢</li>
</ul>
<p>webpack 在项目启动阶段，会从入口文件开始，找出所有依赖关系并构建依赖树，然后将所有依赖打包到一起，最后启动开发服务器。</p>
<svg viewBox="0 0 1896 1071" fill="none" xmlns="http://www.w3.org/2000/svg" class="img-mid" style="width: 90%;height: 90%;">
<text fill="#FFAA3E" xml:space="preserve" style="white-space: pre" font-size="80" letter-spacing="0em"><tspan x="46" y="132.344">Bundle based dev server</tspan></text>
<rect x="48" y="239" width="1086" height="767" rx="98" stroke="#FFC36B" stroke-width="4"></rect>
<rect x="108" y="577" width="212" height="83" rx="10" fill="#C3E88C"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="170" y="631.488">entry</tspan></text>
<rect x="476" y="712" width="212" height="88" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0.33em"><tspan x="552.5" y="768.988">···</tspan></text>
<rect x="476" y="438" width="212" height="88" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="537" y="494.988">route</tspan></text>
<rect x="473" y="576" width="212" height="88" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="534" y="632.988">route</tspan></text>
<path d="M472.614 481.699L438.815 489.291L462.289 514.766L472.614 481.699ZM324.582 622.18L454.791 502.201L450.726 497.789L320.516 617.768L324.582 622.18Z" fill="#E06666"></path>
<path d="M469 620L439 602.679V637.321L469 620ZM323 623H442V617H323V623Z" fill="#E06666"></path>
<path d="M472.614 756.105L462.032 723.12L438.757 748.777L472.614 756.105ZM320.533 622.196L450.601 740.186L454.632 735.742L324.565 617.752L320.533 622.196Z" fill="#E06666"></path>
<path d="M822.052 905.098L815.036 871.175L789.166 894.213L822.052 905.098ZM689.041 760.243L801.856 886.929L806.337 882.939L693.521 756.253L689.041 760.243Z" fill="#FFC36B"></path>
<path d="M819.908 756.105L811.894 722.403L786.715 746.195L819.908 756.105ZM689.1 622.034L799.185 738.54L803.546 734.419L693.462 617.914L689.1 622.034Z" fill="#FFC36B"></path>
<path d="M817.765 623.19L788.215 605.112L787.334 639.742L817.765 623.19ZM691.205 622.973L790.697 625.502L790.85 619.504L691.357 616.975L691.205 622.973Z" fill="#FFC36B"></path>
<path d="M818.837 481.699L789.286 463.622L788.406 498.252L818.837 481.699ZM692.277 481.483L791.769 484.012L791.922 478.014L692.429 475.485L692.277 481.483Z" fill="#FFC36B"></path>
<path d="M819.909 340.209L786.924 350.795L812.584 374.067L819.909 340.209ZM696.719 480.499L803.992 362.224L799.547 358.193L692.275 476.468L696.719 480.499Z" fill="#FFC36B"></path>
<path d="M817.765 614.614L810.467 580.751L784.789 604.002L817.765 614.614ZM692.273 480.497L797.418 596.614L801.866 592.587L696.721 476.47L692.273 480.497Z" fill="#FFC36B"></path>
<rect x="822" y="288" width="212" height="88" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="864" y="344.988">module</tspan></text>
<rect x="822" y="435" width="212" height="87" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="864" y="491.488">module</tspan></text>
<rect x="820" y="571" width="212" height="88" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="862" y="627.988">module</tspan></text>
<rect x="822" y="718" width="212" height="87" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="864" y="774.488">module</tspan></text>
<rect x="822" y="864" width="212" height="88" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0.33em"><tspan x="898.5" y="920.988">···</tspan></text>
<path d="M1239 627L1209 609.679V644.321L1239 627ZM1136 630H1212V624H1136V630Z" fill="#FFC36B"></path>
<path d="M1596 627L1566 609.679V644.321L1596 627ZM1493 630H1569V624H1493V630Z" fill="#FFC36B"></path>
<rect x="1239" y="545" width="254" height="144" rx="10" fill="#C692EA"></rect>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1306.5" y="629.988">Bundle</tspan></text>
<rect x="1596" y="543" width="254" height="143" rx="10" fill="#009688"></rect>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1667.71" y="604.988">Server
</tspan><tspan x="1675.76" y="649.988">ready</tspan></text>
</svg>
<p>这个操作非常耗时，而且当文件内容发生改变，webpack 需要重新打包一次。即使采用了 HMR 模式，其热更新速度也会随着应用规模的增长而显著下降。</p>
<h2 id="vite-特性-1" tabindex="-1"><a class="header-anchor" href="#vite-特性-1"><span>vite 特性</span></a></h2>
<p>Vite 以原生 ESM 方式提供源码，Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。</p>
<svg viewBox="0 0 1896 1071" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 85%;height: 85%;" class="img-mid">
<text fill="#FFAA3E" xml:space="preserve" style="white-space: pre" font-size="80" letter-spacing="0em"><tspan x="45" y="129.344">Native ESM based dev server</tspan></text>
<rect x="632" y="526" width="273" height="106" rx="10" fill="#C3E88C"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="724.5" y="591.988">entry</tspan></text>
<rect x="1106" y="699" width="274" height="114" rx="10" fill="#666665"></rect>
<g filter="url(#filter0_d_5_61)">
<text fill="#CCCCCB" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0.33em"><tspan x="1213.5" y="768.988">···</tspan></text>
</g>
<rect x="1106" y="346" width="274" height="113" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1198" y="415.488">route</tspan></text>
<rect x="1102" y="524" width="273" height="114" rx="10" fill="#666665"></rect>
<text fill="#CCCCCB" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1193.5" y="593.988">route</tspan></text>
<path d="M1101.79 402.463L1067.99 410.054L1091.46 435.529L1101.79 402.463ZM910.168 583.106L1083.96 422.965L1079.9 418.553L906.102 578.693L910.168 583.106Z" fill="#C892E9"></path>
<path d="M1097 581L1067 563.679V598.321L1097 581ZM908 584H1070V578H908V584Z" fill="#999899"></path>
<path d="M1101.79 756.57L1091.2 723.584L1067.93 749.242L1101.79 756.57ZM906.119 583.121L1079.77 740.651L1083.8 736.207L910.151 578.677L906.119 583.121Z" fill="#999899"></path>
<path d="M1552.72 948.839L1545.7 914.916L1519.83 937.953L1552.72 948.839ZM1381.73 761.331L1532.52 930.67L1537 926.68L1386.21 757.341L1381.73 761.331Z" fill="#999899"></path>
<path d="M1549.95 756.569L1541.94 722.868L1516.76 746.659L1549.95 756.569ZM1381.79 582.96L1529.23 739.005L1533.59 734.884L1386.15 578.839L1381.79 582.96Z" fill="#999899"></path>
<path d="M1547.19 585.049L1517.64 566.972L1516.76 601.602L1547.19 585.049ZM1383.89 583.898L1520.12 587.362L1520.27 581.364L1384.04 577.9L1383.89 583.898Z" fill="#999899"></path>
<path d="M1548.57 402.463L1519.02 384.386L1518.14 419.015L1548.57 402.463ZM1385.27 401.312L1521.5 404.776L1521.66 398.778L1385.43 395.314L1385.27 401.312Z" fill="#C892E9"></path>
<path d="M631.489 585.049L601.583 567.567L601.396 602.207L631.489 585.049ZM375.576 586.666L604.473 587.903L604.506 581.903L375.608 580.666L375.576 586.666Z" fill="#C892E9"></path>
<path d="M1549.95 219.877L1516.97 230.462L1542.63 253.735L1549.95 219.877ZM1390.34 400.329L1534.04 241.892L1529.59 237.861L1385.89 396.298L1390.34 400.329Z" fill="#C892E9"></path>
<path d="M1547.19 573.983L1539.89 540.12L1514.21 563.372L1547.19 573.983ZM1385.89 400.327L1526.84 555.983L1531.29 551.956L1390.34 396.3L1385.89 400.327Z" fill="#C892E9"></path>
<rect x="1553" y="152" width="274" height="113" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1626" y="221.488">module</tspan></text>
<rect x="1553" y="341" width="274" height="114" rx="10" fill="#4FC08D"></rect>
<text fill="#15505C" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1621.5" y="411.818">module</tspan></text>
<rect x="1550" y="517" width="274" height="114" rx="10" fill="#666665"></rect>
<text fill="#CCCCCB" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1623" y="586.988">module</tspan></text>
<rect x="1553" y="707" width="274" height="113" rx="10" fill="#666665"></rect>
<text fill="#CCCCCB" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="1626" y="776.488">module</tspan></text>
<rect x="1553" y="896" width="274" height="113" rx="10" fill="#666665"></rect>
<text fill="#CCCCCB" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0.33em"><tspan x="1660.5" y="965.488">···</tspan></text>
<rect x="45" y="491" width="330" height="179" rx="10" fill="#029788"></rect>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="38" font-weight="600" letter-spacing="0em"><tspan x="154.707" y="570.988">Server
</tspan><tspan x="162.76" y="615.988">ready</tspan></text>
<line x1="507.615" y1="459.201" x2="506.232" y2="569.859" stroke="#C892E9" stroke-width="4" stroke-dasharray="8 8"></line>
<line x1="1038.78" y1="733.073" x2="1037.37" y2="883.845" stroke="#E06666" stroke-width="4" stroke-dasharray="8 8"></line>
<text fill="#E06666" xml:space="preserve" style="white-space: pre" font-size="38" letter-spacing="0em"><tspan x="918" y="938.988">Dynamic import
</tspan><tspan x="918" y="983.988">(code split point)</tspan></text>
<text fill="#C892E9" xml:space="preserve" style="white-space: pre" font-size="38" letter-spacing="0em"><tspan x="399" y="431.488">HTTP request</tspan></text>
<defs>
<filter id="filter0_d_5_61" x="1212.15" y="752.766" width="60.9863" height="13.2324" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
<feOffset dy="4"></feOffset>
<feGaussianBlur stdDeviation="2"></feGaussianBlur>
<feComposite in2="hardAlpha" operator="out"></feComposite>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5_61"></feBlend>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5_61" result="shape"></feBlend>
</filter>
</defs>
</svg>
<p>vite 将应用中的模块区分为 <strong>依赖</strong> 和 <strong>源码</strong> 两类。</p>
<ul>
<li>依赖通常存放在 <code v-pre>node_modules</code> 中
<ul>
<li>浏览器无法直接访问 <code v-pre>node_modules</code></li>
<li>它们可以能有 ESM、CommonJS 等各种模块化格式</li>
<li>单个模块可能导入了多个文件，比如 <code v-pre>lodash-es</code></li>
</ul>
</li>
<li>源码则是经常改变的
<ul>
<li>并不是所有的源码都需要同时被加载，例如基于路由拆分的代码模块</li>
</ul>
</li>
</ul>
<p>为解决上述问题，vite 提出了两个解决方案：路径解析、依赖预构建。</p>
<h3 id="路径解析" tabindex="-1"><a class="header-anchor" href="#路径解析"><span>路径解析</span></a></h3>
<p>假设我们要在 main.js 中引入 lodash-es。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> lodash <span class="token keyword">from</span> <span class="token string">'lodash-es'</span>
</code></pre></div><p>虽然它是 ESM，但浏览器仅支持引入相对路径或绝对路径的文件。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>Uncaught TypeError: Failed to resolve module specifier "lodash-es". Relative references must start with either "/", "./", or "../".
</code></pre></div><p>因此 vite 需要做路径解析，将 main.js 代码中的地址替换成相对路径或绝对路径。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> lodash <span class="token keyword">from</span> <span class="token string">"/node_modules/.vite/deps/lodash-es.js?v=d45e265f"</span><span class="token punctuation">;</span>
</code></pre></div><p>地址中 <code v-pre>?v=d45e265f</code> 表示的是 vite 预构建 lodash 后的 hash 值。</p>
<h3 id="依赖预构建" tabindex="-1"><a class="header-anchor" href="#依赖预构建"><span>依赖预构建</span></a></h3>
<p>来看一下 <code v-pre>/node_modules/.vite/deps/lodash-es.js?v=d45e265f</code> 文件的内容：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">"/node_modules/.vite/deps/chunk-RSJERJUL.js?v=c2d0f0b4"</span><span class="token punctuation">;</span>

<span class="token comment">// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_freeGlobal.js</span>
<span class="token keyword">var</span> freeGlobal <span class="token operator">=</span> <span class="token keyword">typeof</span> global <span class="token operator">==</span> <span class="token string">"object"</span> <span class="token operator">&amp;&amp;</span> global <span class="token operator">&amp;&amp;</span> global<span class="token punctuation">.</span>Object <span class="token operator">===</span> Object <span class="token operator">&amp;&amp;</span> global<span class="token punctuation">;</span>
<span class="token keyword">var</span> freeGlobal_default <span class="token operator">=</span> freeGlobal<span class="token punctuation">;</span>

<span class="token comment">// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_root.js</span>
<span class="token keyword">var</span> freeSelf <span class="token operator">=</span> <span class="token keyword">typeof</span> self <span class="token operator">==</span> <span class="token string">"object"</span> <span class="token operator">&amp;&amp;</span> self <span class="token operator">&amp;&amp;</span> self<span class="token punctuation">.</span>Object <span class="token operator">===</span> Object <span class="token operator">&amp;&amp;</span> self<span class="token punctuation">;</span>
<span class="token keyword">var</span> root <span class="token operator">=</span> freeGlobal_default <span class="token operator">||</span> freeSelf <span class="token operator">||</span> <span class="token function">Function</span><span class="token punctuation">(</span><span class="token string">"return this"</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>
</code></pre></div><p>对比原本 lodash-es 包的内容：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> add <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./add.js'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> after <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./after.js'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> ary <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./ary.js'</span><span class="token punctuation">;</span>
<span class="token comment">// ... 超过 600 个文件依赖</span>
</code></pre></div><p>可以看到 vite 将 lodash-es 打包成了一个文件，即 <code v-pre>/node_modules/.vite/deps/lodash-es.js?v=d45e265f</code>。</p>
<p>这样做的原因有两个：</p>
<ul>
<li>
<p>依赖合并为单个模块，减少HTTP请求</p>
<p>如果在源代码中这样引入 lodash</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> lodash <span class="token keyword">from</span> <span class="token string">'/node_modules/loadsh-es'</span>
</code></pre></div><p>这样即使不用路径解析，浏览器也能请求到 lodash 的入口文件，但根据入口文件的内容，浏览器还需要发起超过 600 个请求，大量的请求会在浏览器端造成网络拥塞，导致页面加载速度缓慢。</p>
<p>vite 将 lodash 预构建成一个文件，这样就只需要一个请求了。</p>
</li>
<li>
<p>统一模块格式</p>
<p>开发阶段，vite 将所有代码视为原生 ES 模块。因此 vite 先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。</p>
<p>比如 commonjs 格式的 lodash：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> lodash <span class="token keyword">from</span> <span class="token string">'lodash'</span>
</code></pre></div><p>预构建后的代码为：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> __vite__cjsImport3_lodash <span class="token keyword">from</span> <span class="token string">"/node_modules/.vite/deps/lodash.js?v=c2d0f0b4"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> _ <span class="token operator">=</span> __vite__cjsImport3_lodash<span class="token punctuation">.</span>__esModule <span class="token operator">?</span> __vite__cjsImport3_lodash<span class="token punctuation">.</span>default <span class="token operator">:</span> __vite__cjsImport3_lodash<span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<p>预构建的第三方包会保存在本地 <code v-pre>node_modules/.vite/deps</code> 中，只有依赖发生变化，才会重新进行预构建。</p>
<p>第三方依赖请求会通过 <code v-pre>Cache-Control: max-age=31536000,immutable</code> 进行 http 强缓存，以提高在开发时的页面重载性能。一旦被缓存，这些请求将永远不会再到达开发服务器。</p>
<h3 id="esm-的-hmr" tabindex="-1"><a class="header-anchor" href="#esm-的-hmr"><span>ESM 的 HMR</span></a></h3>
<p>在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>vite 开发时不抓取整个应用的依赖，而是以 ESM 的方式提供源码，且当浏览器发起模块请求时才提供，即按需动态编译。</p>
<ul>
<li>
<p>路径解析</p>
<p>通过解析成绝对或相对路径，使浏览器能 import 第三方包。</p>
</li>
<li>
<p>依赖预构建</p>
<ul>
<li>将所有模块统一成 ESM</li>
<li>将单个第三方包打包成一个文件</li>
<li>源码模块的请求会根据 <code v-pre>304 Not Modified</code> 进行协商缓存，第三方依赖模块请求则会进行 http 强缓存</li>
</ul>
</li>
<li>
<p>由于是 ESM 模块，只需将已编辑的模块与其最近的 HMR 边界之间的链失活，即可快速更新</p>
</li>
</ul>
</div></template>



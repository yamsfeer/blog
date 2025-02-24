<template><div><h1 id="渲染引擎基本原理" tabindex="-1"><a class="header-anchor" href="#渲染引擎基本原理"><span>渲染引擎基本原理</span></a></h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2>
<h3 id="浏览器的主要功能" tabindex="-1"><a class="header-anchor" href="#浏览器的主要功能"><span>浏览器的主要功能</span></a></h3>
<p>浏览器的主要功能是展示指定位置的资源。资源一般是 HTML 文档，也可以是 PDF、图片或其他。资源的位置由 URI（统一资源标识符）指定。</p>
<p>浏览器解释并显示 HTML 文件的方式是在 HTML 和 CSS 规范中指定的。这些规范由标准化组织 W3C 维护。</p>
<p>浏览器的用户界面有很多彼此相同的元素，包括：</p>
<ul>
<li>输入 URI 的地址栏</li>
<li>前进、后退按钮</li>
<li>书签选项</li>
<li>刷新、停止按钮</li>
<li>返回主页按钮</li>
</ul>
<p>需要说明的是，浏览器的用户界面没有任何正式的规范，以上是多年来的最佳实践发展和彼此互相模仿的结果。</p>
<p>HTML5 也没有定义浏览器必须具有的用户界面元素，但列出了一些通用元素，比如地址栏、状态栏、工具栏等。</p>
<h3 id="浏览器高层结构" tabindex="-1"><a class="header-anchor" href="#浏览器高层结构"><span>浏览器高层结构</span></a></h3>
<p>浏览器的主要组件为：</p>
<ul>
<li>
<p>用户界面：包括地址栏、前进后退按钮、书签菜单等。除了浏览器主窗口显示请求的页面外，其他部分都属于用户界面。</p>
</li>
<li>
<p>浏览器引擎：在用户界面和渲染引擎之间传送指令。</p>
</li>
<li>
<p>渲染引擎：负责显示请求的内容。如果是 HTML，它就负责解析 HTML 和 CSS，并将解析后的内容显示在主窗口。</p>
</li>
<li>
<p>JavaScript 解释器：解析和执行 JavaScript 代码。</p>
</li>
<li>
<p>网络：用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。</p>
</li>
<li>
<p>用户界面后端：用于绘制基本的窗口小部件，比如组合框。其公开了与平台无关的通用接口，在底层使用操作系统的用户界面方法。</p>
</li>
<li>
<p>数据存储：这是持久层。浏览器需要在硬盘上保存各种数据，比如 Cookie。HTML5 规范定义了 IndexedDB，这是一个完整但轻便的浏览器内数据库。</p>
</li>
</ul>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gvcbi6u94qj60dw09f0t702.jpg" alt="img" style="zoom:90%;" />
<p>值得注意的是，和大多数浏览器不同，Chrome 浏览器的每个标签页都分别对应一个渲染引擎实例。每个标签页都是一个独立的进程。</p>
<h2 id="渲染引擎" tabindex="-1"><a class="header-anchor" href="#渲染引擎"><span>渲染引擎</span></a></h2>
<p>渲染引擎的作用就是在浏览器上显示请求的内容。</p>
<p>默认情况下，渲染引擎可显示 HTML 和 XML 文档与图片。通过插件或扩展程序，还可以显示其他类型的内容；例如，使用 PDF 插件就能显示 PDF 文档。我们将介绍其主要用途：显示使用 CSS 格式化的 HTML 内容和图片。</p>
<h3 id="渲染流程" tabindex="-1"><a class="header-anchor" href="#渲染流程"><span>渲染流程</span></a></h3>
<p>webkit 的渲染流程如下图所示：</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwg6p8iluzj30hc081aai.jpg" style="zoom:90%;" />
<p>firefox 的渲染引擎 Gecko 虽然使用的术语稍有不同，但整体流程是基本相同的。</p>
<h2 id="dom-tree-构建" tabindex="-1"><a class="header-anchor" href="#dom-tree-构建"><span>DOM Tree 构建</span></a></h2>
<h3 id="html-解析" tabindex="-1"><a class="header-anchor" href="#html-解析"><span>HTML 解析</span></a></h3>
<p>对于使用<strong>上下文无关文法</strong>的语言，语法通常可以用 BNF 等格式进行定义。</p>
<p>HTML 的定义是：<em><strong>DTD (Document Type Definition文档类型定义)</strong></em>，但它不属于上下文无关文法。</p>
<p>DTD 格式可用于定义 <em><strong>SGML</strong></em> 族的语言。它包括所有允许使用的元素及其属性和层次结构的定义。</p>
<h4 id="html-和-xml" tabindex="-1"><a class="header-anchor" href="#html-和-xml"><span>HTML 和 XML</span></a></h4>
<p>HTML 和 XML 非常相似，为什么 XML 有很多解析器可以用？</p>
<p>XML 和 HTML 的区别在于 <strong>HTML 更加宽容</strong>，它允许省略某些隐式添加的 tag 或起始结束 tag 等。与 HTML 相比，XML 语法更严格。</p>
<p>HTML 包容的特点可以简化开发，但也使得它很难编写正式的语法。</p>
<p>概括地说，HTML 无法很容易地通过常规解析器解析（因为它的语法不是上下文无关语法），也无法通过 XML 解析器来解析。</p>
<h4 id="dom" tabindex="-1"><a class="header-anchor" href="#dom"><span>DOM</span></a></h4>
<p><a href="http://www.w3.org/DOM/DOMTR" target="_blank" rel="noopener noreferrer">DOM<ExternalLinkIcon/></a> <em><strong>(Document Object Model 文档对象模型)</strong></em> 是 HTML 文档的对象表示，同时也是 JavaScript 与 HTML 元素之间的接口。</p>
<p>DOM 解析器的输出 DOM Tree 是由 DOM 元素和属性节点构成的树结构。DOM 树的根节点是 Document 对象。</p>
<p>DOM 与 HTML 标签之间几乎是一一对应的关系。比如以下代码：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example.png<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p>可翻译成 DOM 树：</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h61hgjmuk1j20m80c60ti.jpg" style="zoom:50%;" />
<p>所谓 DOM 树包含 DOM 节点，指的是树是由实现了某个 DOM 接口的元素构成的。浏览器在具体的实现中会有一些供内部使用的其他属性。</p>
<h3 id="如何解析-html" tabindex="-1"><a class="header-anchor" href="#如何解析-html"><span>如何解析 HTML</span></a></h3>
<p>之前章节已经说过，HTML 无法用常规的自上而下或自下而上的解析器进行解析。</p>
<p>原因在于：</p>
<ol>
<li>语言的宽容本质。</li>
<li>浏览器历来对一些常见的无效 HTML 用法采取包容态度。</li>
<li>解析过程需要不断地反复。源内容在解析过程中通常不会改变，但是在 HTML 中，<code v-pre>document.write</code> 可以在解析过程中改变内容。</li>
</ol>
<p>由于不能使用常规的解析技术，浏览器就创建了<strong>自定义的解析器</strong>来解析 HTML。</p>
<p><a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html" target="_blank" rel="noopener noreferrer">HTML5 规范详细地描述了解析算法<ExternalLinkIcon/></a>。此算法由两个阶段组成：Tokeniser和树构建。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h61hj3ct2vj20h40m874y.jpg" style="zoom:50%;" />
<h4 id="tokeniser" tabindex="-1"><a class="header-anchor" href="#tokeniser"><span>tokeniser</span></a></h4>
<p>将 HTML 文本转成 token 的算法可以用状态机来表示。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h61hjjajs1j20yu0li0u3.jpg" style="zoom:40%;" />
<h4 id="树构建" tabindex="-1"><a class="header-anchor" href="#树构建"><span>树构建</span></a></h4>
<p>创建解析器的同时，也会创建 Document 对象。</p>
<p>在树构建阶段，以 Document 为根的 DOM 树也会不断进行修改，向其中添加各种元素。</p>
<p>构建 DOM 树的算法也可以用状态机描述，另外还需要一个栈用于纠正嵌套错误和处理未关闭的标签。</p>
<p>来看个例子：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>Hello world<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h61hk4szpig20tk16qn0g.gif" style="zoom: 50%;" />
<ul>
<li>初始模式是 <em><strong>initial mode</strong></em>。</li>
<li>接受 <em><strong>html</strong></em> 标签后转为 <em><strong>before html</strong></em> 模式，然后创建一个 <em><strong>HTMLHtmlElement</strong></em> 元素，并作为子节点插入 <em><strong>Document</strong></em> 对象。</li>
<li>状态改为 <em><strong>before head</strong></em>，此时接收的是 <em><strong>body</strong></em> 标签。即时没有 <em><strong>head</strong></em> 标签，系统也会隐式创建一个 <em><strong>HTMLHeadElement</strong></em> 插入树中。</li>
<li>现在进入了 <em><strong>in head</strong></em> 模式，然后转入 <em><strong>after head</strong></em> 模式。系统对 <em><strong>body</strong></em> 标签进行重新处理，创建并插入 <em><strong>HTMLBodyElement</strong></em>，模式转变为 <em><strong>in body</strong></em>。</li>
<li>接收 “Hello world” 第一个字符时会创建并插入 “Text” 节点，其他字符将附加到该节点。</li>
<li>接收 <em><strong>body</strong></em> 结束标签会触发 <em><strong>after body</strong></em> 模式，接收 <em><strong>html</strong></em> 结束标签后 <em><strong>after after body</strong></em> 模式。</li>
<li>接收 <em><strong>文件结束符 EOF</strong></em>，解析过程结束。</li>
</ul>
<h4 id="解析结束后的操作" tabindex="-1"><a class="header-anchor" href="#解析结束后的操作"><span>解析结束后的操作</span></a></h4>
<p>在此阶段，浏览器会将文档标注为交互状态，并开始解析那些处于 <em><strong>deferred</strong></em> 模式的脚本，即应在文档解析完成后才执行的脚本。</p>
<p>然后，文档状态设置为 “complete”，一个 “load” 事件会被触发。</p>
<p>您可以<a href="http://www.w3.org/TR/html5/syntax.html#html-parser" target="_blank" rel="noopener noreferrer">在 HTML5 规范中查看 token 化和树构建的完整算法<ExternalLinkIcon/></a></p>
<h4 id="浏览器的容错机制" tabindex="-1"><a class="header-anchor" href="#浏览器的容错机制"><span>浏览器的容错机制</span></a></h4>
<p>您在浏览 HTML 网页时从来不会看到“语法无效”的错误。这是因为浏览器会纠正任何无效内容，然后继续工作。</p>
<p>HTML5 规范定义了一部分容错要求。WebKit 在 HTML 解析器类的开头注释中对此做了很好的概括。</p>
<blockquote>
<p>解析器对 token 化输入内容进行解析，以构建文档树。如果文档的格式正确，就直接进行解析。</p>
<p>遗憾的是，我们不得不处理很多格式错误的 HTML 文档，所以解析器必须具备一定的容错性。</p>
<p>我们至少要能够处理以下错误情况：</p>
<ol>
<li>明显不能在某些外部 tag 中添加的元素。在此情况下，我们应该关闭所有 tag，直到出现禁止添加的元素，然后再加入该元素。</li>
<li>我们不能直接添加的元素。这很可能是网页作者忘记添加了其中的一些 tag（或者其中的 tag 是可选的）。这些 tag 可能包括：HTML HEAD BODY TBODY TR TD LI（还有遗漏的吗？）。</li>
<li>向 inline 元素内添加 block 元素。关闭所有 inline 元素，直到出现下一个较高级的 block 元素。</li>
<li>如果这样仍然无效，可关闭所有元素，直到可以添加元素为止，或者忽略该 tag。</li>
</ol>
</blockquote>
<h2 id="css解析" tabindex="-1"><a class="header-anchor" href="#css解析"><span>CSS解析</span></a></h2>
<p>css 是上下文无关语法，可以使用 Bison 等工具生成解析器。<a href="http://www.w3.org/TR/CSS2/grammar.html" target="_blank" rel="noopener noreferrer">CSS 规范定义了 CSS 的词法和语法<ExternalLinkIcon/></a>。</p>
<p>词法用正则表达式描述：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>comment   \/\*[^*]*\*+([^/*][^*]*\*+)*\/
num       [0-9]+|[0-9]*"."[0-9]+
nonascii  [\200-\377]
nmstart   [_a-z]|{nonascii}|{escape}
nmchar    [_a-z0-9-]|{nonascii}|{escape}
name      {nmchar}+
ident     {nmstart}{nmchar}*
</code></pre></div><p>“ident”是标识符 (identifier) 的缩写，“name”是 html 元素的 ID。</p>
<p>语法采用 BNF 格式描述：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
selector
  : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
  ;
simple_selector
  : element_name [ HASH | class | attrib | pseudo ]*
  | [ HASH | class | attrib | pseudo ]+
  ;
class
  : '.' IDENT
  ;
element_name
  : IDENT | '*'
  ;
attrib
  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
    [ IDENT | STRING ] S* ] ']'
  ;
pseudo
  : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
  ;
</code></pre></div><p>假设有如下 css 代码，这是一个规则集（ruleset）的结构：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div.error , a.error</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span>red<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span>bold<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>规则集由选择器和大括号内的声明组成。</p>
<p>div.error 和 a.error 是选择器，大括号内是规则集的声明。</p>
<p>此结构的正式定义是这样的：<em>（S 表示空格）</em></p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
</code></pre></div><h4 id="webkit-的-css-解析器" tabindex="-1"><a class="header-anchor" href="#webkit-的-css-解析器"><span>WebKit 的 CSS 解析器</span></a></h4>
<p>WebKit 使用 <a href="https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#parser_generators" target="_blank" rel="noopener noreferrer">Flex 和 Bison<ExternalLinkIcon/></a> 解析器生成器，通过 CSS 语法文件自动创建解析器。</p>
<p>Bison 会创建自下而上的移位 - 归约解析器。Firefox 使用的是人工编写的自上而下的解析器。</p>
<p>这两种解析器都会将 CSS 文件解析成 <em><strong>StyleSheet</strong></em> 对象，每个对1象包含 CSS 规则。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h61hl1spbrj20rs0luq4a.jpg" style="zoom:50%;" />
<h3 id="处理脚本和样式表的顺序" tabindex="-1"><a class="header-anchor" href="#处理脚本和样式表的顺序"><span>处理脚本和样式表的顺序</span></a></h3>
<h4 id="脚本" tabindex="-1"><a class="header-anchor" href="#脚本"><span>脚本</span></a></h4>
<ul>
<li>遇到 <code v-pre>&lt;script&gt;</code> 时，文档的解析将暂停，直到脚本下载并执行完成。</li>
<li><code v-pre>&lt;script defer&gt;</code> 延迟脚本会在文档解析结束后才下载执行</li>
<li><code v-pre>&lt;script async&gt;</code> 异步脚本会由新建线程下载执行。</li>
</ul>
<h4 id="预解析" tabindex="-1"><a class="header-anchor" href="#预解析"><span>预解析</span></a></h4>
<p>在执行脚本时，其他线程会解析文档的其余部分，找出并加载<strong>需要通过网络加载</strong>的其他资源。</p>
<p>请注意，<strong>预解析器不会修改 DOM 树</strong>，预解析器只会解析外部资源（例如外部脚本、样式表和图片）的引用。</p>
<p><em>（WebKit 和 Firefox 都进行了这项优化）</em></p>
<h4 id="样式表" tabindex="-1"><a class="header-anchor" href="#样式表"><span>样式表</span></a></h4>
<p>理论上来说，样式表不会更改 DOM 树，因此似乎没有必要等待样式表并停止文档解析。</p>
<p>但是脚本在文档解析阶段可以请求样式信息。如果当时还没有加载和解析样式，脚本就会获得错误的回复，这样显然会产生很多问题。</p>
<ul>
<li>
<p>Firefox 在样式表加载和解析的过程中，会禁止所有脚本。</p>
</li>
<li>
<p>WebKit 仅当脚本尝试访问的样式属性可能受尚未加载的样式表影响时，才会禁止该脚本。</p>
</li>
</ul>
<h2 id="render-tree-构建" tabindex="-1"><a class="header-anchor" href="#render-tree-构建"><span>Render Tree 构建</span></a></h2>
<p>在 DOM 树构建的同时，浏览器还会构建另一个树结构：渲染树（render tree）。</p>
<p>这是由可视化元素按照其显示顺序而组成的树，也是文档的可视化表示。它的作用是让您按照正确的顺序绘制内容。</p>
<p>WebKit 将渲染树中的元素称为 renderer 或 render object（Firefox 称为“框架 frames”）。渲染器知道如何布局并将自身及其子元素绘制出来。
WebKits RenderObject 类是所有渲染器的基类，其定义如下：</p>
<div class="language-cpp" data-ext="cpp" data-title="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">RenderObject</span><span class="token punctuation">{</span>
  <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">layout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">paint</span><span class="token punctuation">(</span>PaintInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">virtual</span> <span class="token keyword">void</span> rect <span class="token function">repaintRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Node<span class="token operator">*</span> node<span class="token punctuation">;</span>  <span class="token comment">//the DOM node</span>
  RenderStyle<span class="token operator">*</span> style<span class="token punctuation">;</span>  <span class="token comment">// the computed style</span>
  RenderLayer<span class="token operator">*</span> containgLayer<span class="token punctuation">;</span> <span class="token comment">//the containing z-index layer</span>
<span class="token punctuation">}</span>
</code></pre></div><p>每一个渲染器都代表了一个矩形的区域，通常对应于相关节点的 CSS 框，它包含诸如宽度、高度和位置等几何信息。框的类型会受到 “display” 属性的影响。</p>
<p>下面这段 WebKit 代码描述了根据 display 属性的不同，针对同一个 DOM 节点应创建什么类型的器。</p>
<div class="language-cpp" data-ext="cpp" data-title="cpp"><pre v-pre class="language-cpp"><code>RenderObject<span class="token operator">*</span> <span class="token class-name">RenderObject</span><span class="token double-colon punctuation">::</span><span class="token function">createObject</span><span class="token punctuation">(</span>Node<span class="token operator">*</span> node<span class="token punctuation">,</span> RenderStyle<span class="token operator">*</span> style<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Document<span class="token operator">*</span> doc <span class="token operator">=</span> node<span class="token operator">-></span><span class="token function">document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  RenderArena<span class="token operator">*</span> arena <span class="token operator">=</span> doc<span class="token operator">-></span><span class="token function">renderArena</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  RenderObject<span class="token operator">*</span> o <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>style<span class="token operator">-></span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> NONE<span class="token operator">:</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> INLINE<span class="token operator">:</span>
      o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">(</span>arena<span class="token punctuation">)</span> <span class="token function">RenderInline</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> BLOCK<span class="token operator">:</span>
      o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">(</span>arena<span class="token punctuation">)</span> <span class="token function">RenderBlock</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> INLINE_BLOCK<span class="token operator">:</span>
      o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">(</span>arena<span class="token punctuation">)</span> <span class="token function">RenderBlock</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> LIST_ITEM<span class="token operator">:</span>
      o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">(</span>arena<span class="token punctuation">)</span> <span class="token function">RenderListItem</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> o<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>元素类型也是考虑因素之一，例如表单控件和表格都对应特殊的框架。
在 WebKit 中，如果一个元素需要创建特殊的渲染器，就会替换 <code v-pre>createRenderer</code> 方法。</p>
<h3 id="渲染树和dom树的关系" tabindex="-1"><a class="header-anchor" href="#渲染树和dom树的关系"><span>渲染树和DOM树的关系</span></a></h3>
<p>渲染器是和 DOM 元素相对应的，但并非一一对应。</p>
<ul>
<li>非可视化的 dom 元素不会插入渲染树，比如 head</li>
<li><code v-pre>display: none</code> 的元素也不会，<code v-pre>visibility: hidden</code> 的会</li>
</ul>
<p>有一些 DOM 元素对应多个可视化对象。它们往往是具有复杂结构的元素，无法用单一的矩形来描述。例如，select 有 3 个 renderer：分别用于显示区域，下拉列表框，和按钮。</p>
<p>根据 CSS 规范，i<strong>nline 元素只能包含 block 元素或 inline 元素中的一种</strong>。如果出现了混合内容，则应创建匿名的 block 渲染器，以包裹 inline 元素。</p>
<p>有一些呈现对象对应于 DOM 节点，但在树中所在的位置与 DOM 节点不同。比如浮动定位和绝对定位的元素，它们处于正常的流程之外，放置在树中的其他地方，并映射到真正的框架，而放在原位的是占位框架。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h61hmraitxj214m0m0ads.jpg" style="zoom:40%;" />
<h3 id="构建渲染树的流程" tabindex="-1"><a class="header-anchor" href="#构建渲染树的流程"><span>构建渲染树的流程</span></a></h3>
<p>在 WebKit 中，解析样式和创建 renderer 的过程称为 <em>attachment</em>。每个 DOM 节点都有一个 attach 方法。<strong>attach是同步进行的</strong>，将节点插入 DOM 树需要调用新的节点attach 方法。</p>
<p>处理 html 和 body 标签就会构建 Render Tree 的根节点。这个根节点对应于 CSS 规范中的 containing block，它包含了其他所有 block。它的尺寸就是 viewport，即浏览器窗口显示区域的尺寸。Webkit 称之为 RenderView。</p>
<p>这就是文档所指向的 Render Object。Render Tree的其余部分以 DOM 树节点插入的形式来构建。</p>
<h2 id="样式计算" tabindex="-1"><a class="header-anchor" href="#样式计算"><span>样式计算</span></a></h2>
<p>构建 Render Tree 时，需要通过计算每个元素的样式属性，获得每个 Render Object 的可视化属性。</p>
<p>样式包括来自各种来源的样式表、inline 样式元素和 HTML 中的可视化属性（例如“bgcolor”）。</p>
<p>样式表的来源包括：</p>
<ul>
<li>浏览器的默认样式表</li>
<li>网页作者提供的样式表</li>
<li>浏览器用户提供的用户样式表（浏览器允许您定义自己喜欢的样式）</li>
</ul>
<p>样式计算存在以下难点：</p>
<ul>
<li>样式数据是一个超大的结构，存储了无数的样式属性，这可能造成内存问题。</li>
<li>如果不进行优化，为每一个元素查找匹配的规则会造成性能问题。要为每一个元素遍历整个规则列表来寻找匹配规则，这是一项浩大的工程。</li>
<li>应用规则涉及到相当复杂的层叠规则。</li>
</ul>
<p>针对这三个难点，提出以下三种解决方法。</p>
<ul>
<li>共享样式数据</li>
<li>用哈希表分类规则以简化匹配</li>
<li>以正确的层叠顺序应用规则</li>
</ul>
<h3 id="共享样式数据" tabindex="-1"><a class="header-anchor" href="#共享样式数据"><span>共享样式数据</span></a></h3>
<p>WebKit 节点会引用样式对象 (RenderStyle)。这些对象在某些情况下可以由不同节点共享。这些节点是同级关系，并且：</p>
<ol>
<li>这些元素必须处于相同的鼠标状态（例如都是 hover）</li>
<li>任何元素都没有 ID</li>
<li>tag 名称、类属性、链接状态、焦点状态应匹配</li>
<li>映射属性的集合必须是完全相同的</li>
<li>任何元素都不应受属性选择器的影响，这里所说的“影响”是指在选择器中的任何位置有任何使用了属性选择器的选择器匹配</li>
<li>元素中不能有任何 inline 样式属性</li>
<li>不能使用任何同级选择器。WebCore 在遇到任何同级选择器时，只会引发一个全局开关，并停用整个文档的样式共享（如果存在）。这包括 + 选择器以及 :first-child 和 :last-child 等选择器。</li>
</ol>
<h3 id="用哈希表分类规则以简化匹配" tabindex="-1"><a class="header-anchor" href="#用哈希表分类规则以简化匹配"><span>用哈希表分类规则以简化匹配</span></a></h3>
<p>样式规则有一些来源：</p>
<ul>
<li>
<p>样式表或样式元素中的 CSS 规则</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span>blue <span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>inline 样式属性及类似内容</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">color</span><span class="token punctuation">:</span>blue</span><span class="token punctuation">"</span></span></span> <span class="token punctuation">/></span></span>
</code></pre></div></li>
<li>
<p>HTML 可视化属性（映射到相关的样式规则）</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">bgcolor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div></li>
</ul>
<p>后两种很容易和标签进行匹配，因为标签拥有样式属性，而且 HTML 属性可以使用标签作为键值进行映射。</p>
<p>CSS 规则匹配比较棘手。</p>
<p>为了解决这一难题，样式表解析完毕后，系统会根据<strong>选择器</strong>将 CSS 规则添加到哈希表中。</p>
<p>选择器包括 ID、类名、tag 等，如果选择器是 ID，就把规则添加到 ID 表中。</p>
<p>还有一个通用哈希表，存储其他的规则。</p>
<p>举个例子：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">p.error</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> red <span class="token punctuation">}</span>
<span class="token selector">#messageDiv</span> <span class="token punctuation">{</span> <span class="token property">height</span><span class="token punctuation">:</span> 50px <span class="token punctuation">}</span>
<span class="token selector">div</span> <span class="token punctuation">{</span> <span class="token property">margin</span><span class="token punctuation">:</span> 5px <span class="token punctuation">}</span>
</code></pre></div><p>第一条规则插入类表，第二条插入 ID 表，第三条插入 div 表。</p>
<p>对于以下 HTML 代码：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>error<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>an error<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>messageDiv<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>a message<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>类表中有一个“error”键，可以找到“p.error”的规则。div 元素在 ID 表（键为 messageDiv ）和 tag 表中有相关的规则。</p>
<p>剩下的工作就是找出哪些根据键提取的规则是真正匹配的了。</p>
<p>如果 div 的对应规则如下：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">table div</span> <span class="token punctuation">{</span><span class="token property">margin</span><span class="token punctuation">:</span>5px<span class="token punctuation">}</span>
</code></pre></div><p>这条规则仍然会从 tag 表中提取出来，但并不匹配 div 元素，因为 div 没有 table 祖先。</p>
<p>WebKit 和 Firefox 都进行了这一处理。</p>
<h3 id="以正确的层叠顺序应用规则" tabindex="-1"><a class="header-anchor" href="#以正确的层叠顺序应用规则"><span>以正确的层叠顺序应用规则</span></a></h3>
<p>某个样式的声明，比如颜色，可能会出现在多个样式表中，也可能在同一样式表中出现多次。以什么优先级进行“覆盖”很重要，这称为“层叠”顺序。</p>
<p>根据 CSS2 规范，优先级从低到高为：</p>
<ul>
<li>浏览器声明</li>
<li>用户普通声明</li>
<li>作者普通声明</li>
<li>作者重要声明</li>
<li>用户重要声明</li>
</ul>
<h4 id="优先级计算" tabindex="-1"><a class="header-anchor" href="#优先级计算"><span>优先级计算</span></a></h4>
<ul>
<li>a：style （<code v-pre>&lt;div style=&quot;&quot;&gt;&lt;/div&gt;</code>）规则，记为1</li>
<li>b：id 选择器的个数</li>
<li>c：类、伪类选择器个数</li>
<li>d：标签、伪元素选择器个数</li>
</ul>
<p>用 a-b-c-d 形式连接的数字构成优先级。比如：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap red<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap1<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">color</span><span class="token punctuation">:</span> red</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">div.red.level#wrap1</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> // a=1 b=1 c=2 d=1 -> 优先级 1121
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="规则排序" tabindex="-1"><a class="header-anchor" href="#规则排序"><span>规则排序</span></a></h4>
<p>找到匹配的规则之后，应根据级联顺序将其排序。WebKit 对于较小的列表会使用冒泡排序，而对较大的列表则使用归并排序。对于以下规则，WebKit 通过替换“&gt;”运算符来实现排序：</p>
<div class="language-cpp" data-ext="cpp" data-title="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">static</span> <span class="token keyword">bool</span> <span class="token keyword">operator</span> <span class="token operator">></span><span class="token punctuation">(</span>CSSRuleData<span class="token operator">&amp;</span> r1<span class="token punctuation">,</span> CSSRuleData<span class="token operator">&amp;</span> r2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> spec1 <span class="token operator">=</span> r1<span class="token punctuation">.</span><span class="token function">selector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">specificity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> spec2 <span class="token operator">=</span> r2<span class="token punctuation">.</span><span class="token function">selector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">specificity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>spec1 <span class="token operator">==</span> spec2<span class="token punctuation">)</span> <span class="token operator">:</span> r1<span class="token punctuation">.</span><span class="token function">position</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> r2<span class="token punctuation">.</span><span class="token function">position</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> spec1 <span class="token operator">></span> spec2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="渐进式处理样式表" tabindex="-1"><a class="header-anchor" href="#渐进式处理样式表"><span>渐进式处理样式表</span></a></h3>
<p>WebKit 使用一个 flag 来表示是否所有的顶级样式表（包括 @imports）均已加载完毕。如果在 attach 过程中尚未完全加载样式，则使用占位符，并在文档中进行标注，等样式表加载完毕后再重新计算。</p>
<h2 id="布局-layout" tabindex="-1"><a class="header-anchor" href="#布局-layout"><span>布局（layout）</span></a></h2>
<p>renderer 在创建完成并添加到 Render Tree 时，并不包含位置和大小信息。计算这些值得过程称为 layout 或 reflow。</p>
<p>HTML 采用<strong>基于流的布局模型</strong>，从左至右、从上至下的顺序遍历文档计算几何信息。其中，表格的计算需要不止一次的遍历。</p>
<p>layout 是一个递归的过程。它从 root renderer （对应 HTML 文档的 <code v-pre>&lt;html&gt;</code>）开始，递归遍历部分或所有的层次结构，为每一个需要计算的 renderer 计算几何信息。</p>
<p>root renderer 的原点坐标是 (0, 0)，尺寸为 viewport，即浏览器窗口的可视区域。</p>
<p>所有的 renderer 都有一个 layout 或 reflow 方法，每个 renderer 都会调用子代的 layout 方法。</p>
<h3 id="dirty-位系统" tabindex="-1"><a class="header-anchor" href="#dirty-位系统"><span>Dirty 位系统</span></a></h3>
<p>为避免对所有细小更改都进行整体 layout，浏览器采用了一种 <em>dirty</em> 位系统。如果某个 renderer 发生了更改，会将自身及其子代标注为 <em>dirty</em>，则需要进行 layout。</p>
<p>有两种标记：<em>dirty</em> 和 <em>children are dirty</em>。*children are dirty *表示尽管 renderer 自身没有变化，但它至少有一个子代需要 layout。</p>
<h3 id="全局布局和增量布局" tabindex="-1"><a class="header-anchor" href="#全局布局和增量布局"><span>全局布局和增量布局</span></a></h3>
<p>全局布局是指触发了整个 Render Tree 范围的 layout，触发原因可能包括：</p>
<ol>
<li>影响所有 renderer 的全局样式更改，例如字体大小</li>
<li>屏幕大小调整。</li>
</ol>
<p>layout 可以采用增量方式，也就是只对 dirty renderer 进行布局（这样可能存在需要进行额外布局的弊端）。
当 renderer 为 dirty 时，会异步触发增量布局。例如，当来自网络的额外内容添加到 DOM 树之后，新的 renderer 附加到了 Render Tree 中。</p>
<h3 id="异步布局和同步布局" tabindex="-1"><a class="header-anchor" href="#异步布局和同步布局"><span>异步布局和同步布局</span></a></h3>
<p>增量布局是异步执行的。请求样式信息（例如“offsetHeight”）的脚本可同步触发增量布局。</p>
<ul>
<li>
<p>Firefox 将增量布局的 <em>reflow 命令</em> 加入队列，调度程序会触发这些命令的批量执行。</p>
</li>
<li>
<p>WebKit 也有用于执行增量布局的计时器：对 Render Tree 进行遍历，并对 dirty renderer 进行布局。</p>
</li>
</ul>
<p>全局布局往往是同步触发的。初始布局完成之后，如果一些属性（如滚动位置）发生变化，布局就会作为回调而触发。</p>
<h3 id="优化" tabindex="-1"><a class="header-anchor" href="#优化"><span>优化</span></a></h3>
<p>如果布局是由 <em>resize</em> 或 renderer 的位置（非大小）改变而触发的，可以从缓存中获取 renderer 的大小，无需重新计算。</p>
<p>在某些情况下，只有一个子树进行了修改，无需从根节点开始布局。例如在文本中插入文本（否则每次键盘输入都将触发从根节点开始的布局）。</p>
<h3 id="布局处理过程" tabindex="-1"><a class="header-anchor" href="#布局处理过程"><span>布局处理过程</span></a></h3>
<p>布局处理通常具有以下模式：</p>
<ol>
<li>父 renderer 确定自身宽度</li>
<li>父 renderer 依次处理子 renderer ：
<ol>
<li>设置子 renderer 的 x、y 坐标</li>
<li>如果有必要、调用子 renderer 的 layout 方法。比如子 renderer 是 <em>dirty</em> 的，或者是全局布局过程，或其他。这会计算子 renderer 的高度。</li>
</ol>
</li>
<li>父 renderer 根据子 renderer 的累加 height 及 padding、margin 来设置自身高度，这个高度可供自身的父 renderer 使用。</li>
<li>将 <em>dirty</em> 位设置为 false。</li>
</ol>
<h3 id="宽度计算" tabindex="-1"><a class="header-anchor" href="#宽度计算"><span>宽度计算</span></a></h3>
<p>renderer 的宽度是根据容器块的 <em>width</em>、renderer 样式中 <em>width</em>、<em>border</em>、<em>margin</em> 计算得出的。</p>
<p>举个例子：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 30%</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>在 webkit 中计算宽度过程如下：</p>
<ul>
<li>
<p>容器的宽度取容器的 <em>availableWidth</em> 和 0 中的较大值。<em>available</em> 在本例中相当于 <em>contentWidth</em>，计算公式如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">clientWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">paddingLeft</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">paddingRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p><em>（clientWidth、clientHeight 表示一个对象的内部，除去 border 和滚动条）</em></p>
</li>
<li>
<p>元素的宽度是 <em>width</em> 样式属性，它会根据容器宽度百分比计算出一个绝对值</p>
</li>
<li>
<p>然后加上水平方向的 <em>border、margin</em></p>
</li>
</ul>
<p>现在计算得出的是 <em>preferred width</em>，然后需要计算 <em>min-width</em> 和 <em>max-width</em>。这些值会缓存起来，以用于需要布局而宽度不变的情况。</p>
<h3 id="换行" tabindex="-1"><a class="header-anchor" href="#换行"><span>换行</span></a></h3>
<p>如果 renderer 在布局过程中需要换行，会立即停止布局，并告知其父代需要换行。父代会创建<strong>额外的 renderer</strong>，并对其调用布局。</p>
<h2 id="绘制-painting" tabindex="-1"><a class="header-anchor" href="#绘制-painting"><span>绘制（painting）</span></a></h2>
<p>在绘制阶段，系统会遍历 Render Tree，并调用 renderer 的 <em>paint</em> 方法，将 renderer 的内容显示在屏幕上。绘制工作是使用用户界面基础组件完成的。</p>
<h3 id="全局绘制和增量绘制" tabindex="-1"><a class="header-anchor" href="#全局绘制和增量绘制"><span>全局绘制和增量绘制</span></a></h3>
<p>和布局一样，绘制也分为全局（绘制整个 Render Tree ）和增量两种。</p>
<p>在增量绘制中，部分 renderer 发生了更改，但是不会影响整个树。更改后的 renderer 将其在屏幕上对应的矩形区域设为无效，这导致 OS 将其视为一块“dirty 区域”，并生成“paint”事件。OS 会很巧妙地将多个区域合并成一个。</p>
<p>在 Chrome 浏览器中，情况要更复杂一些，因为 Chrome 浏览器的 renderer 不在主进程上。Chrome 浏览器会在某种程度上模拟 OS 的行为。展示层会侦听这些事件，并将消息委托给根节点。然后遍历 Render Tree，直到找到相关的 renderer，该 renderer 会重新绘制自己（通常也包括其子代）。</p>
<h3 id="绘制顺序" tabindex="-1"><a class="header-anchor" href="#绘制顺序"><span>绘制顺序</span></a></h3>
<p>绘制的顺序其实就是元素进入<a href="https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#stackingcontext" target="_blank" rel="noopener noreferrer">堆栈样式上下文<ExternalLinkIcon/></a>的顺序。</p>
<p>堆栈顺序如下：<em>（<a href="http://www.w3.org/TR/CSS21/zindex.html" target="_blank" rel="noopener noreferrer">CSS2 规范<ExternalLinkIcon/></a>定义了绘制流程的顺序）</em></p>
<ol>
<li>背景颜色</li>
<li>背景图片</li>
<li>边框</li>
<li>子代</li>
<li>轮廓</li>
</ol>
<h4 id="webkit-矩形存储" tabindex="-1"><a class="header-anchor" href="#webkit-矩形存储"><span>WebKit 矩形存储</span></a></h4>
<p>在重新绘制之前，WebKit 会将原来的矩形另存为一张位图，然后<strong>只绘制新旧矩形之间的差异部分</strong>。</p>
<h2 id="动态变化最小响应" tabindex="-1"><a class="header-anchor" href="#动态变化最小响应"><span>动态变化最小响应</span></a></h2>
<p>在发生变化时，浏览器会尽可能做出最小的响应。因此:</p>
<ul>
<li>元素的颜色改变后，只会对该元素进行重绘。</li>
<li>元素的位置改变后，只会对该元素及其子元素（可能还有同级元素）进行布局和重绘。</li>
<li>添加 DOM 节点后，会对该节点进行布局和重绘。</li>
<li>一些重大变化（例如增大“html”元素的字体）会导致缓存无效，使得整个呈现树都会进行重新布局和绘制。</li>
</ul>
<h2 id="渲染引擎的线程" tabindex="-1"><a class="header-anchor" href="#渲染引擎的线程"><span>渲染引擎的线程</span></a></h2>
<p>渲染引擎采用了单线程。几乎所有操作（除了网络操作）都是在单线程中进行的。</p>
<p>在 Firefox 和 Safari 中，该线程就是浏览器的主线程。在 Chrome 浏览器中，该线程是<strong>标签进程的主线程</strong>。</p>
<p>网络操作可由多个并行线程执行。并行连接数是有限的（通常为 2 至 6 个，以 Firefox 3 为例是 6 个）。</p>
<h3 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环"><span>事件循环</span></a></h3>
<p>浏览器的主线程是事件循环。它是一个无限循环，永远处于接受处理状态，并等待事件（如布局和绘制事件）发生，并进行处理。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://html5rocks.com/zh/tutorials/internals/howbrowserswork/" target="_blank" rel="noopener noreferrer">浏览器的工作原理：新式网络浏览器幕后揭秘<ExternalLinkIcon/></a></p>
</div></template>



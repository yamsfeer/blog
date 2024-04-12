<template><div><h1 id="盒模型" tabindex="-1"><a class="header-anchor" href="#盒模型"><span>盒模型</span></a></h1>
<p>盒模型有 4 个盒子：content box、padding box、border box、margin box。</p>
<h2 id="content" tabindex="-1"><a class="header-anchor" href="#content"><span>content</span></a></h2>
<h3 id="content-与替换元素" tabindex="-1"><a class="header-anchor" href="#content-与替换元素"><span>content 与替换元素</span></a></h3>
<h4 id="什么是替换元素" tabindex="-1"><a class="header-anchor" href="#什么是替换元素"><span>什么是替换元素</span></a></h4>
<p>根据外在盒子是 inline 还是 block 可以把元素分为内联元素和块级元素；根据是否具有可替换内容，元素可分为替换元素和非替换元素。</p>
<p>典型的替换元素有 img、object、video、textarea、input 等。</p>
<p>替换元素的一些特性：</p>
<ul>
<li>
<p>内容的外观不受页面的 css 影响</p>
<p>替换元素的样式表现在 css 作用域之外。要更改替换元素本身的外观，需要类似 appearance 属性，或浏览器自身暴露的样式接口。比如 -ms-check {} 可以修改 IE 的 checkbox 的内间距、背景色等样式，input[type='checkbox']{} 则无法做到同样功能。</p>
</li>
<li>
<p>有自己的尺寸</p>
<p>在没有明确设定尺寸的情况下，video、iframe、canvas 默认 300 x 150 px，img 默认 0 px，表单替换元素的尺寸和具体浏览器有关。</p>
</li>
<li>
<p>在很多 css 属性上有自己的一套表现规则</p>
<p>典型代表是 vertical-align，vertical-align 的默认值是 baseline，即字符 x 的下边缘，但是替换元素通常不会有字符 x，所以它的 baseline 就是元素的下边缘。</p>
</li>
</ul>
<p>总结来说就是，替换元素的样式外部 css 很难改变、有自己的尺寸、基线是元素的下边缘。</p>
<p><strong>所有替换元素都是 display: inline 或 display: inline-block 的。</strong></p>
<h4 id="替换元素的尺寸计算规则" tabindex="-1"><a class="header-anchor" href="#替换元素的尺寸计算规则"><span>替换元素的尺寸计算规则</span></a></h4>
<p>替换元素有三类规则，优先级从小到大依次是：固有尺寸、html 尺寸和 css 尺寸。</p>
<ul>
<li>
<p>固有尺寸：即替换内容的默认尺寸，比如图片、视频自身的宽高，input 的默认宽高。</p>
</li>
<li>
<p>html 尺寸，html 标签中可以设定尺寸。比如：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>300<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>300<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>30<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>textarea</span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span> <span class="token attr-name">rows</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>5<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div></li>
<li>
<p>css 尺寸：就是 css 文件中的 width / height等。</p>
</li>
</ul>
<p>需要注意的是，我们是无法改变替换元素的固有尺寸的。</p>
<p>以图片为例，图片原本的宽高是固定的，我们设定的 width / height 之所以能表面上有效果是因为：图片中的替换内容默认是 fill 的，具体参考 obejct-fit 属性。可以说，我们改变的不是图片，而是将图片填充进了一个设定大小的容器中。</p>
<h4 id="替换元素和非替换元素的界限" tabindex="-1"><a class="header-anchor" href="#替换元素和非替换元素的界限"><span>替换元素和非替换元素的界限</span></a></h4>
<ul>
<li>
<p>src 属性</p>
<p>以 img 标签为例：</p>
<p>在 firefox 中，如果把 img 标签的 src 属性去掉，img 则变成和 span 类似的普通内联标签，也就是非替换元素。</p>
<p>而在 chrome 中，需要额外的条件是“提供不为空的 alt 属性值”。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- filefox --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>任意值<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> <span class="token comment">&lt;!-- chrome --></span>
</code></pre></div></li>
<li>
<p>css content 属性</p>
<p>替换元素之所以为替换元素，就是因为内容可替换，而这个内容就是 content box，对应 css 属性的 content，所以，content 属性决定了是替换元素还是非替换元素。</p>
<p>前面说了，没有 src 属性的 img 是非替换元素，在 content 中提供 图片会使其变回替换元素。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">img</span> <span class="token punctuation">{</span> <span class="token property">content</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>xx.jpg<span class="token punctuation">)</span></span> <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span><span class="token punctuation">></span></span>
</code></pre></div><p>这里有个小技巧，网站的 logo 通常使用背景图表示，比如：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>《css世界》<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">h1</span> <span class="token punctuation">{</span>
    <span class="token property">with</span><span class="token punctuation">:</span> 180px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 36px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>xx.png<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
    <span class="token property">text-indent</span><span class="token punctuation">:</span> -999px<span class="token punctuation">;</span> <span class="token comment">/* 隐藏文字 */</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre></div><p>如果用 content：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">h1</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>xx.png<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
    <span class="token property">with</span><span class="token punctuation">:</span> 180px<span class="token punctuation">;</span> <span class="token comment">/* 无效 */</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 36px<span class="token punctuation">;</span> <span class="token comment">/* 无效 */</span>
    <span class="token property">text-indent</span><span class="token punctuation">:</span> -999px<span class="token punctuation">;</span> <span class="token comment">/* 不需要 */</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre></div><p>可以看到，使用 content 可以不用特意隐藏文字，因为会自动替换掉，而且也对 SEO 友好。</p>
<p>但是有个问题，替换元素是无法改变固有尺寸的，为此，可以使用 svg 矢量图片。</p>
</li>
</ul>
<p>综上，可以看出替换与非替换元素的界限就是 src 或 content。</p>
<h4 id="content-box-和替换元素的关系" tabindex="-1"><a class="header-anchor" href="#content-box-和替换元素的关系"><span>content box 和替换元素的关系</span></a></h4>
<p>很简单，content 生成的内容就是替换元素，可以称为“匿名替换元素”( anonymous replaced element )。</p>
<p>content 内容和普通元素有几个不同点：</p>
<ul>
<li>
<p>content 生成的文本是无法选中、复制、被屏幕阅读器读取、被搜索引擎抓取。因此，重要的文本不要用 content 生成，这不利于可访问性和 SEO。</p>
</li>
<li>
<p>content 内容不被 :empty 伪类承认。看个例子：</p>

<CodeDemo id="code-demo-154" type="normal" code="eJyFj7sOgkAQRX9lsrY+VmO1ol+yDTobIUHYuKgYY2U0sbCmMZFWCyoLMXwOj9+QDTGho5y559zJHIjlrxzCiGGNZ8X9ml/OeZwYg2riroH2FhaOqdSUk7kXcNJEqlAz2gujNq+Jl89vEaVZ8ijjsM2Dppilr/x8Kt9R9rm1uSCV2KDXOE26ZKFU9WpfxwfuAuxs9C0GI0plMNELaSLa7pLB8L+Ze2sUawZjGYDyHBuhQymtoiN3dRETK+nv67qa7Sl/7wgGaCpLYE2S4w8tNo+j">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>有内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>有内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>无内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>空格也算内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>伪元素不算内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box pseudo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 4px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box:empty</span> <span class="token punctuation">{</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
<li>
<p>content 动态生成值无法获取</p>
<p>参考下节。</p>
</li>
</ul>
<h3 id="content-内容生成技术" tabindex="-1"><a class="header-anchor" href="#content-内容生成技术"><span>content 内容生成技术</span></a></h3>
<h4 id="content-辅助元素" tabindex="-1"><a class="header-anchor" href="#content-辅助元素"><span>content 辅助元素</span></a></h4>
<p>典型应用就是清除浮动：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.clear::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>另一个应用是两端对齐和垂直居中、上边缘、下边缘对齐。</p>

<CodeDemo id="code-demo-181" type="normal" code="eJytVd1OE0EUfpXJEt2tyLaYaEwtTdSY2ES90TvKxXZ32g4MM3V3im0ICQk/AYVojEQFRCSECxX8iRdYUV+mu4W38Mz+lAESjMQ0aWfOzPnO951z5nRcq4pRqmW1nEPGEHEGilqJN4oasqnleckunyOHBsuVhjTJFxlC/+0glwYC8reWz5XqQnAWswnXcM2fXfQ31vzH6+3dyeDNu2Dpc7C4k0tH5wBSA2ftomZ7HqgxgTYal+EeEUdUs+jS5Su1xjVpqGJSqQrVUuKug92+Egek0SzqrzWQY3lV7KAe27bDKwI3RJ9FSYVl0XDdE6TcBPtEkclA2RIucxdH8WzOBGaAX9SKWujrEK9GrWYWEUYJw30lyu2RI1T6M5lzCpxVFtj9d7RYqQpmxTB/dbqUOZadTAQBCR2W+SRlZDjcro8CGfNhHbvN+5hiW3A3FUUYg1BguQFpH0DdmxUsblEslzeaBcfQQZ2eCuOk06izsuPPLwZvv/jbz/yZqc63df/5Qnv3PVRWRbRcT4U8Evw6pYbeI2udRyRGln4UM/ADtxjABENFVMNzKSVmev58fDMWgRDUERkSgTAHNyKMzLXDXS52UEy9A6i/6x8Kk5J+bvgrvzrL05G8gw+v/NYWyNufWghef9qf/3qw/DRYbSVOMc3BBHTI9ESTYjOqBnC4a4mqaWNCDWhbdCHauxZz+KiRSqFepNcaeijvNLiSZY9UXF5nzk1OQekA0nt0cDaOwEk0PWV6lNjY6LsSZRUh6IbwK65e9BajV6iWS7BTGyB8rXGlkkqAy8lKRAcmZzbwGAHMcp3ZgsBYAIZqtqNMnsxwckUSO2MepeuZc6ZQ9OdW/B8ttdPVCKD0JuUMH7brYGbItKXpHnewoYIld4/3R7RQG0C9dlLDMctRusH2pr85Dc3rb7/sfNwKVn4Hixvt3Va7NevP7Pk73wu3rrZ3n8ju3nvR2WwFS3PB2qrafLxhEsawe/vB3TuxLNVkuhjGEWQqXcjnCmlSuYj0Qh7lCnqYSPj0HkrgdZiG0kshGb9v+fS6miXx1Ul/c7k/0/17SM5kpyUzAXwySgfBbK8Sz/SwuC6ES6BBsaHDvLRKFDs6EOuuk4cQPwX4CQ2wkYNy4g9Jmp2G">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>再增加一条数据<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 256px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 256px<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px dashed #ccc<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> justify<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box:before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bar</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>querySelector<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> eleBox <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 目前柱子元素和个数</span>
  <span class="token keyword">var</span> eleBars <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'#box > i'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> lenBar <span class="token operator">=</span> eleBars<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>eleBox <span class="token operator">&amp;&amp;</span> lenBar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> indexBar <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> indexBar <span class="token operator">&lt;</span> lenBar<span class="token punctuation">;</span> indexBar <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 柱形图的柱子高度和背景色随机</span>
      eleBars<span class="token punctuation">[</span>indexBar<span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span><span class="token number">256</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">;</span>
      eleBars<span class="token punctuation">[</span>indexBar<span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'#'</span> <span class="token operator">+</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 增加数据</span>
  <span class="token keyword">var</span> eleBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'button'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>eleBtn <span class="token operator">&amp;&amp;</span> lenBar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    eleBtn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 随机高度和背景色</span>
      <span class="token keyword">var</span> height <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span><span class="token number">256</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">;</span>
      <span class="token keyword">var</span> backgroundColor <span class="token operator">=</span> <span class="token string">'#'</span> <span class="token operator">+</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// 创建柱子元素</span>
      <span class="token keyword">var</span> eleClone <span class="token operator">=</span> eleBars<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      eleClone<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> height<span class="token punctuation">;</span>
      eleClone<span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> backgroundColor<span class="token punctuation">;</span>

      <span class="token comment">// 此处的字符替换为了兼容IE8下的演示效果</span>
      eleBox<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> eleBox<span class="token punctuation">.</span>innerHTML<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">I>&lt;I</span><span class="token regex-delimiter">/</span><span class="token regex-flags">ig</span></span><span class="token punctuation">,</span> <span class="token string">'I> &lt;I'</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> eleClone<span class="token punctuation">.</span>outerHTML<span class="token punctuation">;</span>

      lenBar <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token comment">// 最多10条数据</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>lenBar <span class="token operator">==</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'disabled'</span><span class="token punctuation">,</span> <span class="token string">'disabled'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h4 id="content-字符" tabindex="-1"><a class="header-anchor" href="#content-字符"><span>content 字符</span></a></h4>
<p>content 字符就是直接在 content 中写入字符。</p>
<p>一个常见的例子就是字体图标。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@font-face</span></span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">'myico'</span><span class="token punctuation">;</span>
    <span class="token property">src</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">'...'</span><span class="token punctuation">)</span></span> <span class="token function">format</span><span class="token punctuation">(</span><span class="token string">'...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon-home::before</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> myico<span class="token punctuation">;</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'home'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>除了常规字符，还可以写入 Unicode 字符。下面举一个“正在加载中...”动画的例子。</p>

<CodeDemo id="code-demo-199" type="normal" code="eJx9kN9KwzAUxl8lFGQKpuKKu8iG6GMIvUnb0zUsf0pysI6yF/AZvBC88Wb33uxtnPgYnq5xCMJCCMn3fSf8zumTBo1ORPK1fdu/vO+fX793u8+P7aJyeJum6eJquOQ2uUzKEChHT9bnltGqVGi1XAumrFYWeKFduZqPXgNq2aBg12Cicogc5SgiPCGXWi2tYBpqjPIjeFSl1L8WT6c3x48cubV2nWCNqiqwJG9yS1xCFFA7D//4/oKVziJYQphQd3l+Px6T6HaNQuChlSUI1nrgnZdt9KRVRqJyxDMMIQvUd60sFbCA0PKA0iMrHDYj0d0K1rWXBsIhH6Gy7Iz1DL20gViNGK9aIjyc8ymYizmj2iE5m51I0lzHJO1k8wOXw5pq">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>正在加载中<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dot</span><span class="token punctuation">></span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dot</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">dot</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">vertical-align</span><span class="token punctuation">:</span> -.25em<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">dot::before</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'...\A..\A.'</span><span class="token punctuation">;</span>
    <span class="token property">white-space</span><span class="token punctuation">:</span> pre-wrap<span class="token punctuation">;</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> dot 3s infinite step-start both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> dot</span> <span class="token punctuation">{</span>
    <span class="token selector">33%</span> <span class="token punctuation">{</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-2em<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token selector">66%</span> <span class="token punctuation">{</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-1em<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>原理不难理解，插入三行内容( '\A' 是LF 的 Unicode )，transfromY 控制 Y 方向位置，依次显示每行内容。dot 是一个自定义元素，语义明显。浏览器不不认识但会直接显示三个点。</p>
<h4 id="content-图片" tabindex="-1"><a class="header-anchor" href="#content-图片"><span>content 图片</span></a></h4>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div::before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>xx.jpg<span class="token punctuation">)</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>url 功能符的图片地址支持 png、jpg、ico、svg 和 base64 编码图片，不支持 css3 的渐变。</p>

<CodeDemo id="code-demo-213" type="normal" code="eJx1kF1LAkEUhv/Kst0UFEr0AasJo2lKhSR01UaM6/hB66ysIwQiLHZhYnUjRJFGBt2EqQSSkdqPyR31qr/QWfcyOwwzh3eY5z3v5MUkS6uiJLoznlGvMq0/Tb7ueKs7add52eC18rQ65NfPZq1j1o3p+YDftnmtabYeRsPKt1F0OzIemcJbmQrCuPhhlj7dWEjqJL4li7LoAdio92Iz3A7sMQdVs3w1bXTNi3d+0/npX45rFVhgxN8a1v5YmrRAv58PFBjWE4RBfxJVMT2dYwFMIANn/DoEI6svV82+MeoZvAkWTRAh5n/WEAoCzWKJy6KSzcLfYCFvjcPIGVuJEUXTMUtpVBJyNEZ0NUWJy7pWNFXTJWFBiTmhQCrIFB/9GfhYwnFGdBupaJQRygClq4sxzLCUSuMEcSRScVcUZ8nG2nLEqe6Et9Wk9wAFUAh50b4TzcoXXPciPzR+tGcrAYQO4QgFIyHvKtnNhX0JtLlkTyIWfgF2+umd">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>下面这段话所有链接地址都是本实例。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
  点击<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>这个链接<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>当前页刷新，看看有没有标记；
  点击<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>_blank<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>这个链接<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>，新标签页新打开一次本页面，看看有没有标记。
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">a</span> <span class="token punctuation">{</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> underline<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #cd0000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">a[target="_blank"]:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>data:image/gif;base64,R0lGODlhBQAFAIABAM0AAAAAACH5BAEAAAEALAAAAAAFAAUAAAIHRIB2eKuOCgA7<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h4 id="content-open-quote-close-quote" tabindex="-1"><a class="header-anchor" href="#content-open-quote-close-quote"><span>content open-quote / close-quote</span></a></h4>
<p>不常用，忽略。</p>
<h4 id="content-attr属性值内容" tabindex="-1"><a class="header-anchor" href="#content-attr属性值内容"><span>content attr属性值内容</span></a></h4>
<p>这个功能比较常用，比如用 alt 属性显示图片信息：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">img::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>alt<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>除了原生的 HTML 属性，自定义的 HTML 属性也支持：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.icon::before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>data-title<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="content-计数器" tabindex="-1"><a class="header-anchor" href="#content-计数器"><span>content 计数器</span></a></h4>
<p>content 的计数器效果功能非常强大且实用。所谓 css 计数器效果，就是用 css 实现计算元素数目。</p>
<p>css 计数器有两个属性和方法：</p>
<ul>
<li>
<p>counter-reset：给计数器起个名字和初始值（默认为0）。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.xxx</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 两个计数器 one、two */</span>
  <span class="token property">counter-reset</span><span class="token punctuation">:</span> one 10 two 20<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>counter-increment：将计数器的数字增大一个数值（默认为1）。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.xxx</span> <span class="token punctuation">{</span>
  <span class="token property">counter-reset</span><span class="token punctuation">:</span> one 10 two 20<span class="token punctuation">;</span>
  <span class="token comment">/* 计数器 one 加1，two 加2 */</span>
  <span class="token property">counter-increment</span><span class="token punctuation">:</span> one 1 two 2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>counter()：显示计数器的最终数值，类似于 calc 计算</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token function">counter</span><span class="token punctuation">(</span>name <span class="token comment">/* 计数器名 */</span><span class="token punctuation">,</span> style <span class="token comment">/* 数字形式 */</span><span class="token punctuation">)</span>
</code></pre></div><p>其中，style 支持的值就是 list-style-type 支持的值：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token property">list-style-type</span><span class="token punctuation">:</span> disc | circle | decimal | lower-roman | ...
</code></pre></div><p>看个例子：</p>

<CodeDemo id="code-demo-268" type="normal" code="eJxNjksKwjAURbfyyMQP1UKdxQ+4j0xqjFhMk9BE/JTuQqkLcKCg4FjQ3djiLuwfJ4G8+965J0RL43OE0UgB5a7WY4KoXAvDAoImI1tNiEAWolpnO/0qgZAIgOrTC5hmBgM14GSPA4Nhni6kMD3t7RmGgaO22SwiogZgd9Fg5p5W3N3hGZd0VZzaXUgPl/QVf6+35Pj43OPk9E7PT+jaZW+GEHljCWtTYwGXm1xF+q7oQIuQaesvdixYK9XkRUlt7wkaML/kmdy/NEXRD/7LZ6Q=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.counter</span> <span class="token punctuation">{</span>
  <span class="token property">counter-reset</span><span class="token punctuation">:</span> ct 2 ct2 3<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.counter:after</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span>block<span class="token punctuation">;</span>
  <span class="token comment">/* 用罗马数字显示 */</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">counter</span><span class="token punctuation">(</span>ct<span class="token punctuation">,</span> lower-roman<span class="token punctuation">)</span> <span class="token string">'\A'</span> <span class="token function">counter</span><span class="token punctuation">(</span>ct2<span class="token punctuation">,</span> upper-roman<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">counter-increment</span><span class="token punctuation">:</span> ct ct2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
</ul>
<p>counters() 用于计数器嵌套时，比如文档或书本的目录：</p>

<CodeDemo id="code-demo-277" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RKkotTi2JUbKLyVNQQJFIzi/NK0ktAko92dHwfNdykAI0Jch6MSSR9O/qAeq30QfKEqcUpoiAdfjM2dGJYSXJytFcTLz7kZUi2EgseoUzpuUwWklHKbm4GJgY9MCGK1SDFBUkpqRk5qXr5qSmlVgpGBkUVFiDhKE26IJVWikklwBFa2Py9KDiVkmpaflFqRAjkvOBQnkgVRDJYo3kEh0FdV11TQV1PQV1FPMy85KLUnMhqqFmKtUCADZb6f0=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>reset<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>一级
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>reset<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>二级<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>二级
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>reset<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>三级<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>三级<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>二级<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>一级
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>reset<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>二级<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.reset</span> <span class="token punctuation">{</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">counter-reset</span><span class="token punctuation">:</span> ct<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.counter:before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">counters</span><span class="token punctuation">(</span>ct<span class="token punctuation">,</span> <span class="token string">'-'</span><span class="token punctuation">)</span> <span class="token string">'. '</span><span class="token punctuation">;</span>
  <span class="token property">counter-increment</span><span class="token punctuation">:</span> ct<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h2 id="padding" tabindex="-1"><a class="header-anchor" href="#padding"><span>padding</span></a></h2>
<h3 id="内联元素的padding" tabindex="-1"><a class="header-anchor" href="#内联元素的padding"><span>内联元素的padding</span></a></h3>
<p>css 中默认是 box-sizing: content-box，所以 padding 会增加元素的尺寸。</p>
<p>内联元素没有可视高度和可视宽度的说法( clientHeight、clientWidth 永远为 0 )，垂直方向的表现完全受 line-ehight 和 vertical-align 影响。</p>

<CodeDemo id="code-demo-293" type="normal" code="eJyrVsooyc1RslKySckss4vJU1CwKbB7sqPr2bR2G/0CiECi3cvJ+571LbXRT0So6IarsNGHaFXSUUouLgYaBeQqVIMUlqRWlOgm5mSm51kpJKfmlaQWWcfk1cbkJUKkCxJTUjLz0q0UTA0KKoAyCgpJicnZ6UX5pXkpusn5OflFVgrKFiamrs5GYFmYUFpaGsQcpVoAi7dECw==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>上文<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span><span class="token punctuation">></span></span>链接<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>下文<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">a</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #845EC2<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>可以看到，内联元素的 padding 虽然会生效，但是对上下元素的原本布局没有影响，仅仅是垂直方向发生了层叠。</p>
<p>css 中还有其他场景会出现这种不影响其他元素布局而是出现层叠效果的现象。比如，relative、box-shadow、outline 等。它们可以分为两类：</p>
<ul>
<li>纯视觉层叠，不影响外部尺寸，比如 box-shadow、outline</li>
<li>会影响外部尺寸，比如 inline 元素的 padding</li>
</ul>
<p>可以用 overflow: auto 是否出现滚动条区分它们。</p>
<p>举两个 inline 元素 padding 在实际开发中的例子：</p>
<ul>
<li>
<p>默认情况下，超链接的点击区域是受 font-size 大小控制的，和行高没有关系。为了增加有效点击区域且不影响布局，可以用 padding。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">a</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> .25em 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>padding 实现高度可控分隔线</p>

<CodeDemo id="code-demo-332" type="normal" code="eJxVzrEOgjAQBuBXuXRVI8TEoSJP0qXQKzSBlrQMKGF1cnXwDdwdjY+DvoYHYXG45fvvv1zPyrauGGeJhNKjPgomWPq9v8b3LdnK9I8/z8d4uU4sLFuzPAQqSliB5Blq5xF6YQFyZ1u0LYepdJhEk2yCOSOHaIZGKmVswSGOmg52NHHTzUktfWHspkJNB/YLZs4r9AvSJgRXGQWFlyfKB/pm+AGAvkTN">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>登录<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>注册<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">a + a:before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 3px 1px<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid gray<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>
<CodeDemo id="code-demo-335" type="normal" code="eJyrrgUAAXUA+Q==">
</CodeDemo></CodeDemo></li>
</ul>
<p>​		这里利用了 inline 元素的 padding，使得分隔线小于字体。</p>
<h3 id="padding-百分比值" tabindex="-1"><a class="header-anchor" href="#padding-百分比值"><span>padding 百分比值</span></a></h3>
<p>无论水平方向还是垂直方向，padding 的百分比值都是相对宽度计算的。这种设计可以用于实现自适应的等比例矩形效果。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span> <span class="token property">padding</span><span class="token punctuation">:</span> 25% 50% <span class="token punctuation">}</span>
</code></pre></div><p><em>（以下内容了解即可）</em></p>
<p>上面的例子是针对块级元素的，对于内联元素：</p>
<ul>
<li>
<p>同样相对于宽度计算</p>
</li>
<li>
<p>默认的高度和宽度细节有差异</p>
<p>这是因为内联元素的垂直 padding 会使幽灵空白节点显现，解决办法也简单，由于内联元素默认的高度完全受 font-size 控制，所以只需设置 font-szie: 0</p>
</li>
<li>
<p>padding 会断行</p>
</li>
</ul>
<p>​		这是因为 padding 区域是跟着内联盒模型的行框盒子走的。</p>
<h3 id="padding与图形绘制" tabindex="-1"><a class="header-anchor" href="#padding与图形绘制"><span>padding与图形绘制</span></a></h3>
<p>利用 padding 和 background-clip 配合，可以绘制一些图形。比如</p>

<CodeDemo id="code-demo-385" type="normal" code="eJytkEFuwyAQRa8yQuqubl212ZA0m16DDQZkj4JnEGA1VZS7F4soSiJnESnsPu8z8DiIIY9eSLFBMF6n9K0EGqZmdDQpsd2841bRLbScz0y8CpNSmfB2PgcHRVCWxRS8/pOA5JFc03k2u3Vlv2jzIOHjqw37NQwO+yGXOKdaCNpapF7C5yrsoT3tdhyti03mUMuQ2KO9hh3nzOMS12bXR57INoY9RwlmitFR/pnTQsljuaZY5dIpY+enHRVV0fIHj3i2N54Lohfy1eS+YtQWpyRh1b48100c/wGjTq8r">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-menu<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-dot<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.icon-menu</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 35px 0<span class="token punctuation">;</span>
    <span class="token property">border-top</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>
    <span class="token property">border-bottom</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> currentColor<span class="token punctuation">;</span>
    <span class="token property">background-clip</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon-dot</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> currentColor<span class="token punctuation">;</span>
    <span class="token property">background-clip</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h2 id="margin" tabindex="-1"><a class="header-anchor" href="#margin"><span>margin</span></a></h2>
<h3 id="margin-与元素尺寸与相关布局" tabindex="-1"><a class="header-anchor" href="#margin-与元素尺寸与相关布局"><span>margin 与元素尺寸与相关布局</span></a></h3>
<h4 id="元素尺寸的相关概念" tabindex="-1"><a class="header-anchor" href="#元素尺寸的相关概念"><span>元素尺寸的相关概念</span></a></h4>
<ul>
<li>
<p>元素尺寸：即 border-box，对应 DOM API 的 offsetWidth / offsetHeight</p>
</li>
<li>
<p>元素内部尺寸：padding box，对应 DOM API 的 clientWidth / clientHeight</p>
</li>
<li>
<p>元素外部尺寸：margin-box，没有对应的 DOM API</p>
</li>
</ul>
<h4 id="margin-与-padding-box" tabindex="-1"><a class="header-anchor" href="#margin-与-padding-box"><span>margin 与 padding-box</span></a></h4>
<p>padding 和 margin 都可以改变元素的 padding-box 的大小，只是有点不同：</p>
<ul>
<li>padding 在设定了 width 或表现为包裹性时，会改变 padding-box 的大小。因为宽度被设定，只能往内部压缩大小。</li>
<li>margin 在相同条件下在无影响，除非表现为“充分利用宽度”</li>
</ul>
<p>举个例子：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span> <span class="token comment">/* 300px */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>元素宽度仍是 300px，因为宽度已设定。</p>
<p>怎样才是“充分利用宽度的情况”？可以简单认为就是子元素比父元素小。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span> <span class="token property">width</span><span class="token punctuation">:</span> 300px <span class="token punctuation">}</span>
<span class="token selector">.son</span> <span class="token punctuation">{</span> <span class="token property">margin</span><span class="token punctuation">:</span> -20px <span class="token punctuation">}</span> <span class="token comment">/* 340px */</span>
</code></pre></div><p>此时子元素宽度为 340px。</p>
<p>利用这种特性，可以实现“一侧定宽，两栏自适应布局”。</p>

<CodeDemo id="code-demo-450" type="normal" code="eJzFU8tu00AU/ZXRIDYVqd2qIAgmK7aIH/AmrZ3YkhNbdmgjVZUKgoRUdVJYUKlBQhGIZJMIqS24EQ0fg68TVvwCd2Zi4qTpQ+2iiyieM3PvueecmU1qlAoWTVPFWMnAj6/hoA3NPvQOFAkBtaho5jpZs7Ke90Slq3aZ4C9l6bmSSnGXEMUs5MmGqZUM3F9allVKDN3MGyW2lNly1XY13WVLp0w82zI1ckdmO6LeyTx9/iz6UI1an6Pjl2HQ/ftzF5qDYa2KQ0DvFD52xFiI4zHo7kPlDfROGN44FDi83x21K6N2Dd69Hda/DQ9eQ82HvfqfVh/6jTDYHlWPfm+/UiSHKZJQEv7jF5PMewjJKZxElAybATT8iyxwmcbb8EAIDYMd8I+SHojBR60OGhAG/jVE/3dR1F6qPuVlC3osIXkq98KyxvgVxcUikimGJ59m9IWDX0Jf1P0S7X+fkYhUY5E3TSTuQ+/RNc/Dt7HIdG+yxrxnmtyXZaf8mAH2uu7mLHsjTQxT0/QigltqkRewGZJFS8sPsWg8SJo8esBb4GlpgWC80XEPdjpkQRLl/JGRzKQLsmSxjMETkviUI84Usm7eLHIQ+VbEkGOGxqFgQC/D04pIAJNhHtf8CS2Pdg4vxxPE8blpZo5eRD3Fu1dPPt747rJUZ+bhVw3JFtnVmjZVlu/yIObbM6f68pHPVp4TwozhKZEw70G3/gF3H2UE">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>左侧固定<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>DOM文档流中，图片定宽在左侧，文字内容在右侧，和视觉呈现的前后顺序一致。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>右侧固定-DOM顺序相反<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>DOM文档流中，图片定宽在左侧，视觉上却在右侧，顺序表现不一致。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>右侧固定-DOM顺序和视觉一致<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-right-same<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>full<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>DOM文档流中，图片定宽在右侧，视觉呈现也在右侧，顺便表现此时一致。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 128px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 左浮动 */</span>
<span class="token selector">.box-left > img</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-left > p</span> <span class="token punctuation">{</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 右浮动，但图片DOM在前 */</span>
<span class="token selector">.box-right > img</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-right > p</span> <span class="token punctuation">{</span>
  <span class="token property">margin-right</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 右浮动，图片DOM在后，和视觉表现一致 */</span>
<span class="token selector">.box-right-same > .full</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-right-same > .full > p</span> <span class="token punctuation">{</span>
  <span class="token property">margin-right</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-right-same > img</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -128px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h4 id="margin-与-margin-box" tabindex="-1"><a class="header-anchor" href="#margin-与-margin-box"><span>margin 与 margin-box</span></a></h4>
<p>举一个 margin 实现等高布局的案例。</p>

<CodeDemo id="code-demo-460" type="normal" code="eJydk89rE0EUx/+Vx1q7Kc1P2oquaUBBUGgv4nEvm53ZZNrNzLKZTVNKLxVFQQl48KCXgoInPRWk/j9J9b/wzczO7iZWURdC5v2Yz/u+NzMnzlCOYsdzuoRNIIyD8XjXd0IRZyPe6Iup7/R8DqCjjJjQHo2k76wmx9prsofbvcXnD4u3l98/nV2dXXZb6FABDCU94+t0W4lJbiH71yKP2WB4TZXUuC0NufPZ638rZP9xxXiSSZDHCcUK/UxKwbGklqDa2RcpRXsSxJlKWLy/mH98V21MC/kTRcu9FlOVrTFO3QnHYzyJZjl9OFHCR0E6YNyDIJPirnFMG0eMyKEHt9rtZKqdYkLTKBZHHgwZIZSj89TnFqbaqZem1qXovvRljtpp39QgAMQE0gO1J/fgNpF6cCOKotxjRKFIbHfkQeMOfrkSgCQghPFBES2CK4pMfwD9IDwcpCLjpGErbW3vbN3uL28pVP9mT0ja+Jk9OM4DNc1JkMIa7EKU8VAywaHGyIZlpFRmKQciwmxEuWwOqHwQU7W8f/yIqEwFw1+rBfMXzxfns/mzp1cX5z5X2PwpIHyt5uaGu1FXfn17i4C2XMVCzuLVyx9vvlQ59qqZfGspUnF9TKgwNcuo+jabz74aDuOETnNFnboxrRA1FZ+zCGpW9fp6KRTXhQhcF3XyQdlYU/AwZuHh0jiLYVbLl+tN6JR3SHmajI9pKu+RgyDEQT98sr9Xc/s0Qj7lxK2DWzxdd7MKctVD1p0DqDPB47M6/0KYHUTFWJKmXf+hLUetilM38PQny1vrYg==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>column-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>colLeft<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>column-left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>正方观点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>观点1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>colRight<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>column-right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>反方观点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>观点1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>leftMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多正方观点<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rightMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多反方观点<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.column-box</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.column-left,
.column-right</span> <span class="token punctuation">{</span>
		<span class="token property">width</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> -9999px<span class="token punctuation">;</span>
    <span class="token property">padding-bottom</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.column-left</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #34538b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.column-right</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #cd0000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">$</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 分栏元素</span>
<span class="token keyword">var</span> colLeft <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'colLeft'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> colRight <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'colRight'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 按钮元素</span>
<span class="token keyword">var</span> leftMore <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'leftMore'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rightMore <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'rightMore'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 序号</span>
<span class="token keyword">var</span> indexLeft <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> indexRight <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>colLeft <span class="token operator">&amp;&amp;</span> colRight <span class="token operator">&amp;&amp;</span> leftMore <span class="token operator">&amp;&amp;</span> rightMore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  leftMore<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    indexLeft <span class="token operator">=</span> indexLeft <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    colLeft<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span><span class="token string">'beforeend'</span><span class="token punctuation">,</span> <span class="token string">'&lt;p>观点'</span><span class="token operator">+</span> indexLeft <span class="token operator">+</span><span class="token string">'&lt;/p>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  rightMore<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    indexRight <span class="token operator">=</span> indexRight <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    colRight<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span><span class="token string">'beforeend'</span><span class="token punctuation">,</span> <span class="token string">'&lt;p>观点'</span><span class="token operator">+</span> indexRight <span class="token operator">+</span><span class="token string">'&lt;/p>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h3 id="margin-的百分比值" tabindex="-1"><a class="header-anchor" href="#margin-的百分比值"><span>margin 的百分比值</span></a></h3>
<p>和 padding 一样，margin 的百分比值无论水平还是垂直方向都是相对于宽度计算的。应用价值不大。</p>
<h3 id="margin-合并" tabindex="-1"><a class="header-anchor" href="#margin-合并"><span>margin 合并</span></a></h3>
<p>块级元素的 margin-top 和 margin-bottom 有时会合并。</p>
<p>注意这里是块级元素（不包括浮动和绝对定位元素），且只发生在垂直方向（不考虑 writing-mode）。</p>
<p>margin 合并的作用后面会介绍，先来看下具体的合并场景。</p>
<h4 id="margin-合并的-3-种场景" tabindex="-1"><a class="header-anchor" href="#margin-合并的-3-种场景"><span>margin 合并的 3 种场景</span></a></h4>
<ul>
<li>
<p>相邻兄弟元素 margin 合并</p>
<p>这是 margin 合并中最常见的。比如：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>第 1 行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>第 2 行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span> <span class="token property">margin</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre></div><p>此时第一行和第二行的间距是 1em，因为第一行的 margin-bottom 和第二行的 margin-top 合并了。</p>
</li>
<li>
<p>父级和第一或最后一个子元素</p>
<p>以下 3 中写法渲染效果是一样的。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">margin-top</span><span class="token punctuation">:</span> 100px</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">margin-top</span><span class="token punctuation">:</span> 100px</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">margin-top</span><span class="token punctuation">:</span> 100px</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">margin-top</span><span class="token punctuation">:</span> 100px</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>为了消除这个合并，可以通过设置父级的块级格式化上下文（《流的破坏与保护》介绍）。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>空块级元素的 margin 合并</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>father<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>son<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token comment">&lt;!-->空内容&lt;/--></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span> <span class="token property">overflow</span><span class="token punctuation">:</span> hidden <span class="token punctuation">}</span>
<span class="token selector">.son</span> <span class="token punctuation">{</span> <span class="token property">margin</span><span class="token punctuation">:</span> 1em <span class="token punctuation">}</span>
</code></pre></div><p>此时父级的高度是 1em，因为子元素的 margin-top 和 margin-bottom 合并了。</p>
</li>
</ul>
<h4 id="margin-合并的计算规则" tabindex="-1"><a class="header-anchor" href="#margin-合并的计算规则"><span>margin 合并的计算规则</span></a></h4>
<p>margin 合并的计算规则：总结来说就是“正正取大值”，“正负值相加”，“负负最负值”。</p>
<p>非常容易理解，就不举例子了。</p>
<h4 id="margin-合并的意义" tabindex="-1"><a class="header-anchor" href="#margin-合并的意义"><span>margin 合并的意义</span></a></h4>
<p>margin 合并是 css 有意为之，不是 bug。</p>
<p>css 是为图文而生的，基本离不开以下 html：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>文章标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>文章段落<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>列表...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre></div><p>这些标签都是有默认垂直方向 margin 的，如果没有 margin 合并，它们的间距会变得过大。</p>
<p>因此，margin 合并是方便样式开发的一种策略。</p>
<h3 id="深入理解-margin-auto" tabindex="-1"><a class="header-anchor" href="#深入理解-margin-auto"><span>深入理解 margin: auto</span></a></h3>
<p>margin: auto 的填充规则：</p>
<ul>
<li>如果一侧定值，一侧 auto，则 auto 为剩余空间大小</li>
<li>如果两侧都是 auto，则平分剩余空间</li>
</ul>

<CodeDemo id="code-demo-567" type="normal" code="eJxtjd0KgkAQhV9lmG7LRC1ksyCkt9ibzb9d0jV21wrEd29E+pG6GvjOnPP1KF1TI8MkVzfIamHtnmMpnCwMxwPXALPEtppwsiZG4eviEjNracWbmtCPxbvKnWQQ+v71sRuBLFQlHYPgTc4iu1Sm7XTOYBFHm1MaEB+49kg0W/l0flcaYSqlV3VREhada7+pmb7jv8o0jI7hdlLi8AQFC1ct">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>father<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>son<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #845EC2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.son</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">margin-right</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #C34A36<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面这个例子中，子元素距离左边 20px，距离右边 80px。</p>
<p>css 世界中 margin 的初始值为 0。上面例子中，如果 margin-right 缺省，则最终效果是右对齐。</p>
<p>可以说，margin: auto 就是为了<strong>块级元素</strong>左中右对齐而设计的，对应于 text-align。</p>
<p>一个水平垂直居中的子：</p>

<CodeDemo id="code-demo-583" type="normal" code="eJxljt0KwjAMhV8l1FvR6VSk/oCIb7GbbqtrsWtGm6kgvrvdik7xKuELJ+d7MEW1YZxtS32Fwgjvdxk7C1LSZWyfWYCfi0cb8HYaWDi+JxuzwvvwZRKT8OiCN12S4pAmSXPfdEBJXSniMFu+SYNek0bLwUkjSF9lj3NRXCqHrS05jNaL5ek4D/yZ2Unoj8+HpMg9mpZi0shzKEg24GJV2AibfuZIhHW3fsnNe7nB7ONaC1fp7ntL+O90TBeHdBWd2PMF1pRpyA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>father<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>son<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #845EC2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.son</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #C34A36<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这个例子，先用绝对定位使子元素表现为格式化宽高，然后用 margin: atuo 平分剩余空间。</p>
<p>这个方法比 top: 50% 然后 margin 负一半高度的方法要好，当子元素大于父元素，说明没有剩余空间了，margin 自动计算为 0。</p>
<p><em>这对于块级元素垂直居中非常有用。</em></p>
<h2 id="border" tabindex="-1"><a class="header-anchor" href="#border"><span>border</span></a></h2>
<h3 id="border-图形构建" tabindex="-1"><a class="header-anchor" href="#border-图形构建"><span>border 图形构建</span></a></h3>
<p>典型的 border 图形就是 border 画三角形或梯形了。</p>

<CodeDemo id="code-demo-605" type="normal" code="eJyVkNsOgjAQRH9lU1691BBNRORL+oK00Ca1JW29Ev7dEpQUlRjftrPTOZNtEHdHiRKUUnGGQubW7gkqT1ISlKVLL2ZEjXbO5DW7a0GnDSJXlWTBHs1QYa2nLLpkaIgCuAjqeAIrXF933ZszUXEXCAdtKDO9AFZLQQN5Xmip/TIqYwwRxiVE8XbjpxJ7V0vUYuj5HfeMse4mWfIZH9hh/fbnhcYYg6coW+eGKRfOQ4f+FKMKXcF/+FPo33zUPgCpC6Ew">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>full<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>trapezoid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>triangle<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.full</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #f30 #00f #396 #0f0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.trapezoid</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 10px 50px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #000 transparent transparent<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.triangle</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #000 #000 transparent transparent<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>第一个图形是用来表示 border 的组成的，当其他三个 border 透明时，看起来就像一个梯形。</p>
<p>同时，border-width 可以控制梯形的高。</p>
<h3 id="border-等高布局技术" tabindex="-1"><a class="header-anchor" href="#border-等高布局技术"><span>border 等高布局技术</span></a></h3>
<p>上节提到的用 margin+padding 实现等高布局，用 border 也可以实现。</p>

<CodeDemo id="code-demo-621" type="normal" code="eJyVVE1r20AQ/SuLApEdx3aM20NVJ9BCoIHm1N6qHmRpZW2y3nWllWMTAoW0EIpzaQohDS0EcjA9NARaMPmgfyZy3FP/Qme1+nAgSakuWs2+efPm7Wo2NU+0qWZoDYd0kU2tIFg0tSbvmdqSyRBqMKsbL2Dp1TMARAEQnVxMdr7VGlWvrsDVFN0IsC0IZ2nqNHmbOyHFkD4eHkVf9iEddpP8PC2NwoqwTiiQ6HewlBYKwZmpIeIoHavcBzLUtWgo98eHP6Ljz0pZ3MN96UrKrQxKXMygzWt2EIBH1TmkiCfbg/HBSTQ4a3LfwX60cxidn6G5qskqYB3alM2orTLFrjBQ7eFCp4cCTomDZur1+uMYYdnrLZ+HzCnbnHLfQDPuglt3H8W7AvdE2aKkxQxkYyawD+Etk4GI8ej974Pj8c/v0YdhdHka7e3+uRhcjXYn25dXl7+uPw15F/su5RuGRxwHs0yZYbnAo/TZHDgZaDM1U4srOiToUKtvoCbl9nocsim2QFeTCy+rHo22o9O3V6Pz6/O98dd3edtLCI5DkW8QR3hJ2zFR2/JbhCVulPM4qLQgIuOqQMKUXATFhlDWEFId5WLi84h29idHw+jjQJ2a+lTCMkkIUcJw2cOk5UHFB6kC6URivusmGtS9uC8PUHAt1uSt6Fq+bFzeIrSIHG6HbfC10sJimWK5fNpfcQp6AtGL84o1v3v3ZeUovQhlTUZcVEirzc5OsRRTuYmeadY3Ifb7LzAFU7kfS8lkyCc1++6MBBFrmKqxwhzcg7TafMqRRaaAvsUcCLkhiyGFTKl8fCxCnyHd1VEJFVYt4VUknrcBVkK6XkSVgBIbF8q1tPhW8k5sqHBmA2L9zhKp0FIpSUyCFcIC7Isnzpolf7BnL1efF/QmdoFzmTn6lEEI6XdNP72UG1HS41GYuZQKzQ/pn1qnbbyhN9n4P823jV0UiD6NR2E2fowZ6OKVtL1QnI+PK3+/rqxxwgryIEp6NrQBf+PAZedyXt9oXf4jW38BCiZEAQ==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>导航1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>模块1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多导航<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>moduleMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多模块<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token comment">/* 导航背景区border创建 */</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 150px solid #333<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 清除浮动影响，不能使用overflow:hidden */</span>
<span class="token selector">.box:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 布局主结构 */</span>
<span class="token selector">.box > nav</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -150px<span class="token punctuation">;</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box > section</span> <span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 导航列表和模块列表 */</span>
<span class="token selector">.nav</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.module</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> navMore <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'navMore'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    moduleMore <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'moduleMore'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>navMore <span class="token operator">&amp;&amp;</span> moduleMore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> nav <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'nav'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        section <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'section'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> navIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> sectionIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> <span class="token function-variable function">rand</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">'f'</span> <span class="token operator">+</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    navMore<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        navIndex<span class="token operator">++</span><span class="token punctuation">;</span>
        nav<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span><span class="token string">'beforeEnd'</span><span class="token punctuation">,</span>
          <span class="token string">'&lt;h3 class="nav">导航'</span><span class="token operator">+</span> navIndex <span class="token operator">+</span><span class="token string">'&lt;/h3>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    moduleMore<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sectionIndex<span class="token operator">++</span><span class="token punctuation">;</span>
        section<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span><span class="token string">'beforeEnd'</span><span class="token punctuation">,</span>
          <span class="token string">'&lt;div class="module" style="background:#'</span><span class="token operator">+</span> <span class="token punctuation">[</span><span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span> <span class="token operator">+</span><span class="token string">'">模块'</span><span class="token operator">+</span> sectionIndex <span class="token operator">+</span><span class="token string">'&lt;/div>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>核心 css 代码如下：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 150px solid #333<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box > nav</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -150px<span class="token punctuation">;</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box > section</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>也就是说，左侧导航栏其实是 border-left。元素的边框高度总是和元素自身高度保持一致。</p>
<p>需要注意的是，父容器不能 overflow: hidden，因为它是针对 padding-box 的，会隐藏掉 border-left。</p>
</div></template>



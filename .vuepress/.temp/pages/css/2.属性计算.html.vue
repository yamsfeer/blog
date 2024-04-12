<template><div><h1 id="属性计算-computing-style" tabindex="-1"><a class="header-anchor" href="#属性计算-computing-style"><span>属性计算 Computing Style</span></a></h1>
<p>每个 html 元素的 computed style 都包含了该元素的所有 css 属性，这些 css 属性可以如下图分组。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20230927152834237.png" alt="image-20230927152834237" style="zoom:67%;" />
<p>属性计算就是计算元素的 computed style，这个过程包含以下 4 个部分：</p>
<ul>
<li>确定不冲突部分</li>
<li>层叠</li>
<li>继承</li>
<li>使用默认值</li>
</ul>
<h2 id="确定不冲突部分" tabindex="-1"><a class="header-anchor" href="#确定不冲突部分"><span>确定不冲突部分</span></a></h2>
<p>html 元素的样式来源有两个：开发者样式表、浏览器默认样式表 ( user agent stylesheet )。</p>
<p>这两份样式表中，找出没有冲突的样式，它们可以直接作为 computed style 中的值。</p>
<p>比如假设有如下元素：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
</code></pre></div><p>开发者的样式表为：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.red</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">h1</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 26px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>浏览器的默认样式表为：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">h1</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不难看出，display、font-weight、color 这三条规则是不冲突的，它们可以直接写入这个 h1 元素的 computed style 中。</p>
<p>值得一提的是，写入 computed style 过程中，所有的预设值都会用计算结果替换，比如 color 的关键字 red 会被替换成 rgb。</p>
<h2 id="层叠冲突" tabindex="-1"><a class="header-anchor" href="#层叠冲突"><span>层叠冲突</span></a></h2>
<p>层叠的作用就是判断冲突的样式中哪些规则生效。注意，只有冲突的样式才需要用层叠解决。</p>
<p>层叠也有 3 个步骤：</p>
<ol>
<li>比较优先级</li>
<li>计算权重</li>
<li>比较源代码的先后顺序</li>
</ol>
<h3 id="层叠优先级" tabindex="-1"><a class="header-anchor" href="#层叠优先级"><span>层叠优先级</span></a></h3>
<ol>
<li>带有 important 的开发者样式</li>
<li>带有 important 的默认样式</li>
<li>开发样式</li>
<li>默认样式</li>
</ol>
<h3 id="计算权重" tabindex="-1"><a class="header-anchor" href="#计算权重"><span>计算权重</span></a></h3>
<p>css 选择器的权重计算规则如下表：</p>
<table>
<thead>
<tr>
<th>权重项</th>
<th>值</th>
</tr>
</thead>
<tbody>
<tr>
<td>style</td>
<td>是内联样式则为 1，否则为 0</td>
</tr>
<tr>
<td>id</td>
<td>id 选择器的数量</td>
</tr>
<tr>
<td>属性</td>
<td>属性、类、伪类选择器的数量</td>
</tr>
<tr>
<td>元素</td>
<td>元素、伪元素的数量</td>
</tr>
</tbody>
</table>
<p>按权重项的顺序，计算权重值 <code v-pre>({style},{id},{属性},{元素})</code>。</p>
<p>比如下面这个选择器:</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">body h1.title span:first-child #id</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>它的权重值为 <code v-pre>(0, 1, 1, 4)</code>，即不是 style 内联样式，有 1 个 id 选择器，1 个类选择器，4 个元素伪元素选择器。</p>
<p>在比较两个权重时，依次比较各权重项。权重高的选择器下的样式规则生效。</p>
<h3 id="按源代码顺序" tabindex="-1"><a class="header-anchor" href="#按源代码顺序"><span>按源代码顺序</span></a></h3>
<p>如果经过以上步骤后仍无法确定，则按照源代码的书写顺序生效，即书写位置靠后的生效。</p>
<h2 id="继承" tabindex="-1"><a class="header-anchor" href="#继承"><span>继承</span></a></h2>
<p>继承是整个计算 computed style 的第 3 步，继承有两个前提：</p>
<ul>
<li>computed style 中仍未得到该属性的值</li>
<li>该属性是可以继承的</li>
</ul>
<p>所谓继承就是使用父元素的属性。</p>
<p>一般来说，文字相关的属性是可以被继承的，比如颜色，字体大小等；位置相关的是不可被继承的，比如宽高。</p>
<h2 id="使用默认值" tabindex="-1"><a class="header-anchor" href="#使用默认值"><span>使用默认值</span></a></h2>
<p>经过以上 3 个步骤，仍未能确定的属性，则直接使用浏览器提供的默认值。</p>
<h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2>
<h3 id="inherit" tabindex="-1"><a class="header-anchor" href="#inherit"><span>inherit</span></a></h3>
<p>下面这段代码表示所有 a 元素的 color 和其父元素的一致。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">a</span> <span class="token punctuation">{</span>
 <span class="token property">color</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre></div><p>注意，这个 inherit 继承不是上面第 3 步中的继承，inherit 影响的是第 2 步的层叠过程，相当于将父元素的属性计算值复制粘贴给当前属性。</p>
<h3 id="initial、unset、revert" tabindex="-1"><a class="header-anchor" href="#initial、unset、revert"><span>initial、unset、revert</span></a></h3>
<p>在介绍这三个预设值之前，需要明确一点：在计算 computed style 的 4 步过程中，我们能够影响的只有前两步。</p>
<ul>
<li>initial: 设置属性值为浏览器默认值</li>
<li>unset：相当于直接跳过前两步</li>
<li>revert：该属性回归到浏览器默认值</li>
</ul>
<p>这里 initial 和 revert 容易混淆，它们的区别在于：</p>
<ul>
<li>initial 相当于为属性设置一个和浏览器默认值一样的值，这个值是可以被覆盖的</li>
<li>revert 的意思是，无论之前修改了多少次属性值，最后都回归到默认值。</li>
</ul>
<p>它们最终的结果不一定相同。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>属性计算就是确定一个元素的 computed style 的过程，它包含 4 步：</p>
<ol>
<li>确定不冲突部分：筛选出开发样式表和默认样式表中不冲突的部分</li>
<li>层叠：计算冲突部分的样式
<ol>
<li>层叠优先级
<ol>
<li>带有 important 的开发者样式</li>
<li>带有 important 的默认样式</li>
<li>开发样式</li>
<li>默认样式</li>
</ol>
</li>
<li>计算权重：<code v-pre>({style},{id},{属性},{元素})</code></li>
<li>按源代码书写顺序</li>
</ol>
</li>
<li>继承：继承父元素的属性值</li>
<li>使用默认值：其余样式使用浏览器提供的的默认值</li>
</ol>
<p>最后，在计算 computed style 的 4 步中，我们能够影响的只有前两步。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://www.bilibili.com/video/BV13X4y1q7T8/?vd_source=0de1212e1a5de639602eb19cc0aacc0b" target="_blank" rel="noopener noreferrer">css属性值计算过程<ExternalLinkIcon/></a></p>
</div></template>



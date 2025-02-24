<template><div><h1 id="图片格式" tabindex="-1"><a class="header-anchor" href="#图片格式"><span>图片格式</span></a></h1>
<h2 id="矢量图形" tabindex="-1"><a class="header-anchor" href="#矢量图形"><span>矢量图形</span></a></h2>
<p>矢量图形是<strong>一组关于如何绘制图像的指令</strong>，记录了一系列形状、坐标和路径。</p>
<p>矢量图像在缩放时，图像的点和线会按比例重新绘制，所以矢量图能做到缩放不失真。</p>
<p>SVG ( Scalable Vector Graphics, 可缩放矢量图形 ) 是常见的矢量图像格式。SVG 基于 XML 标记，可以用文本编辑器编辑，也可以用 CSS 和 JavaScript 操作。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">viewbox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 20 20<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>circle</span> <span class="token attr-name">cx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10<span class="token punctuation">"</span></span> <span class="token attr-name">cy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10<span class="token punctuation">"</span></span> <span class="token attr-name">r</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>5<span class="token punctuation">"</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#F17300<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
</code></pre></div><p>与位图基于像素网格相比，SVG 是非常紧凑的，如果用位图描述一个圆，需要把构成圆的所有像素都描述出来。</p>
<p>当然，高度复杂的图像意味着冗长的指令，以及较大的传输尺寸，复杂的 SVG 在渲染时会更加费力。</p>
<p>因此，SVG 适用于图标等具有<strong>鲜明线条、纯色和清晰定义的形状</strong>的场景。</p>
<h2 id="光栅图形" tabindex="-1"><a class="header-anchor" href="#光栅图形"><span>光栅图形</span></a></h2>
<p>光栅图像是一系列渲染二维网格像素的指令。</p>
<p>常见的光栅图像格式包括 GIF、JPEG、PNG、WebP。每种格式压缩和编码这些指令的方式不同，导致了文件大小的巨大差异。以 JPEG 编码的摄影图像可能只有几百 KB，而以 PNG 编码同一图像可能有几百万 KB，但质量却没有明显的差异。</p>
<p>缩放光栅图像超出其固有尺寸，会出现扭曲、块状或模糊的现象。因此，光栅图像适用于<strong>拥有丰富细节</strong>的真实世界。</p>
<p>在传输光栅图像时，服务器发送的是描述该图像的像素网格字节流。</p>
<p>将像素网格编码为字节流数据的过程大概如下：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>从左上角开始
第一行第一列是蓝色
第一行第二列是蓝色
第一行第三列是蓝色
第一行第四列是橙色
</code></pre></div><p>根据这些文字信息，客户端可以重现服务器上的图像。</p>
<div style="display: flex; gap: 5px">
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #F17300"></div>
</div>
<p>这张图片还可以换一种描述方法。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>从左上角开始。
第一行，第一至第三列是蓝色。
第一行，第四列是橙色。
</code></pre></div><p>渲染同一张图片，但传输的指令却变少了，这是一种<strong>无损压缩</strong>的方法。</p>
<p>值得注意的是，人的眼睛没有完美的保真度，对于人眼无法察觉的变化也可以压缩。</p>
<h2 id="图片格式-1" tabindex="-1"><a class="header-anchor" href="#图片格式-1"><span>图片格式</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:center">格式</th>
<th style="text-align:center">Alpha 通道</th>
<th style="text-align:center">动画</th>
<th style="text-align:center">编解码性能</th>
<th style="text-align:center">压缩算法</th>
<th style="text-align:center">颜色</th>
<th style="text-align:center">兼容性</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">GIF</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">高</td>
<td style="text-align:center">无损</td>
<td style="text-align:center">索引色</td>
<td style="text-align:center">ALL</td>
</tr>
<tr>
<td style="text-align:center">PNG</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">不支持</td>
<td style="text-align:center">高</td>
<td style="text-align:center">无损</td>
<td style="text-align:center">索引色</td>
<td style="text-align:center">ALL</td>
</tr>
<tr>
<td style="text-align:center">JPEG</td>
<td style="text-align:center">不支持</td>
<td style="text-align:center">不支持</td>
<td style="text-align:center">高</td>
<td style="text-align:center">有损</td>
<td style="text-align:center">直接色</td>
<td style="text-align:center">ALL</td>
</tr>
<tr>
<td style="text-align:center">WebP</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">差</td>
<td style="text-align:center">有损/无损</td>
<td style="text-align:center">直接色</td>
<td style="text-align:center">高版本</td>
</tr>
<tr>
<td style="text-align:center">AVIF</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">中</td>
<td style="text-align:center">有损/无损</td>
<td style="text-align:center">直接色</td>
<td style="text-align:center">高版本</td>
</tr>
<tr>
<td style="text-align:center">JPEG XL</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">渐进式</td>
<td style="text-align:center">有损/无损</td>
<td style="text-align:center">直接色</td>
<td style="text-align:center">高版本</td>
</tr>
</tbody>
</table>
<ul>
<li>Alpha 通道：是否支持半透明</li>
<li>动画：是否支持多帧率动态图片，GIF 是典型的动态图片格式</li>
<li>编解码性能：图片格式不同正是因为它们使用了不同的编码解码算法，算法性能决定了生成和显示图片的速度</li>
<li>压缩算法：压缩算法分为无损压缩和有损压缩</li>
<li>颜色支持：分为索引色和直接色</li>
<li>兼容性：新的图片格式通常意味着较差的兼容性</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://juejin.cn/post/7208571916155895864" target="_blank" rel="noopener noreferrer">现代图片性能优化及体验优化指南<ExternalLinkIcon/></a></p>
<p><a href="https://www.bilibili.com/video/BV1St4y147PT/" target="_blank" rel="noopener noreferrer">图片与格式：计算机通用图像知识与文件格式<ExternalLinkIcon/></a></p>
</div></template>



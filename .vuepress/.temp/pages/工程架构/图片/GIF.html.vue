<template><div><h3 id="gif" tabindex="-1"><a class="header-anchor" href="#gif"><span>GIF</span></a></h3>
<p>理解 GIF 图像格式，同时解释图像编码的工作原理。</p>
<p>GIF (Graphics Interchange Format) 图像互换格式</p>
<p>虽然在现代网络上不是非常有用，但理解 GIF 有助于理解图像编码的核心概念和工作原理。</p>
<p>GIF 可以被认为是一个图像数据的包装器。它有一个被称为 &quot;逻辑屏幕 &quot;的视口，图像数据的各个帧被绘制在上面，类似图层的概念。</p>
<p>这就是GIF支持翻书式动画的方式：一个单帧被绘制到逻辑屏幕上，然后被另一个，再另一个所取代。当然，当我们处理静态GIF时，这种区别并不重要，它是由绘制在逻辑屏幕上的单帧组成的。</p>
<p>GIF使用一种无损数据压缩方法 Lempel-Ziv-Welch 算法的变种，有点像 &quot;Uglifying &quot;JavaScript，在整个文件中重复的字符串被保存到一种内部字典中，因此它们可以被引用，而不是每次出现都重复。</p>
<img src="https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/AWgIX677XevD9J0ZUBo3.png?auto=format" alt="Visualization of the gif reference using a four-by-four grid." style="zoom:50%;" />
<p>虽然GIF在技术上使用无损压缩，但它确实有一个严重影响图像质量的主要限制：将图像保存为GIF总是会导致保真度降低，除非该图像已经使用256色或更少。</p>
<p>在GIF的逻辑屏幕上绘制的每一帧图像最多只能包含256种颜色。</p>
<p>GIF还支持 &quot;索引透明&quot;，一个透明的像素将参考色表中一个透明 &quot;颜色 &quot;的索引。</p>
<h3 id="量化" tabindex="-1"><a class="header-anchor" href="#量化"><span>量化</span></a></h3>
<p>将一个数值范围缩小到一个较小的、近似的输出值集合的做法被称为量化，在学习图像编码时你会经常看到这个术语。这种调色板量化的结果通常很明显：</p>
<p>图片</p>
<p>为了更好地理解这个过程，回想一下你能够从我的描述中重新创建的光栅图像网格。</p>
<div style="display: flex; gap: 5px">
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #F17300"></div>
</div>
<p>这一次，在那张原始图像上增加一点细节：多几个像素，其中一个是稍微暗一点的蓝色：</p>
<div style="display: flex; gap: 5px">
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #F17300"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #F17300"></div>
</div>
<p>如果没有任何压缩--可以这么说--你可以把这个网格描述为：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>第一行第一列是#0000FF
第一行，第二列是#0000FF
第一行，第三列是#0000FF
第一行，第四列是#FF0000

第二行，第一列是#0000FF
第二行，第二列是#000085
第二行，第三列是#0000FF
第二行，第四列是#FF0000
</code></pre></div><p>使用类似于GIF的无损数据压缩和颜色索引的东西，你可以将其描述为：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>A：#0000ff，B：#ff0000，C：#000085
第一行，第一到第三列是 A
第一行，第四列是 B
第二行，第一列是 A
第二行，第二列是 C
</code></pre></div><p>这设法在一些地方浓缩了逐个像素的描述（&quot;第一列到第三列是......&quot;），并且通过在前面的字典中定义重复的颜色，节省了一些字符。视觉保真度没有任何变化。信息已经被压缩，没有任何损失。</p>
<p>然而，正如你所看到的，单一的深蓝色像素对我们的编码的大小产生了巨大的影响。如果我把自己限制在一个量化的调色板上，它可以被进一步减少：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>A：#0000ff，B：#ff0000
第一行，第一到第三列是A
第一行，第四列是B
</code></pre></div><p>这些节省下来的字节的不幸的最终结果是，你失去了像素的完美性。</p>
<div style="display: flex; gap: 5px">
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #F17300"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #054A91"></div>
  <div style="width: 120px; height: 120px; background: #F17300"></div>
</div>
<p>当然，你，渲染引擎，并不知道这一点--在我对源图像进行编码的过程中，深蓝色像素的细节被忽略了。你已经完全按照我的编码来渲染图像了，这是基于我们对手头的颜色的共同理解。</p>
<p>现在，在这个夸张的例子中，将三种颜色减少到两种，使得质量有了明显的差别。在一个更大、更详细的图像中，这种影响可能不那么明显，但它们仍然是可见的。</p>
<p>当编码为GIF时，微妙的梯度，如阴影变得斑驳，个别像素从其周围突出：</p>
<p>在实践中，无损压缩和调色板量化的结合意味着GIF在现代网络开发中并不十分有用。无损压缩在减少文件大小方面做得不够好，而减少调色板意味着质量的明显下降。</p>
<p>归根结底，GIF只是一种有效的编码简单图像的格式，这些图像已经使用了有限的调色板，硬边缘而不是抗锯齿，纯色而不是梯度--所有的使用情况都被其他格式更好地满足。</p>
<p>更小、更有特色的PNG通常是光栅图像的更好选择，尽管两者在文件大小和视觉保真度方面都远逊于SVG，而在图标或线条艺术等使用案例中，矢量图像是最突出的。GIF最常见的现代用例是动画，但有更有效的、更容易获得的现代视频格式来满足这一目的。</p>
</div></template>



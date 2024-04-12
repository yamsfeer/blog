<template><div><h1 id="png" tabindex="-1"><a class="header-anchor" href="#png"><span>PNG</span></a></h1>
<p>PNG ( Portable Network Graphics, 便携式网络图形 ) 旨在成为GIF的替代品，在几个方面与GIF相似。</p>
<p>PNG 使用无损压缩，图像的调色板可以被量化，一种 &quot;索引颜色&quot;，PNG使用的调色板仅限于256种颜色，就像GIF一样。</p>
<p>更常见的 &quot;真彩 &quot;PNG可以包含很多很多的颜色，最高可达1600万。png-8 png24</p>
<p>PNG和GIF都支持透明度，但有一个重大区别。GIF把透明度当作一个二进制命题，一个像素要么是不透明的颜色，要么是完全透明的。</p>
<p>PNG支持 &quot;阿尔法通道 &quot;透明度，这意味着每个像素可以被设置为0（完全透明）和255（完全不透明）之间的透明度水平。</p>
<img src="https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/PKQ634IdtXzy63TdlfpC.png?auto=format" alt="Two pink flowers showing two levels of transparency." style="zoom: 50%;" />
<p>PNG 使用无损压缩导致文件过大，不合适摄影内容。</p>
<img src="https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/asVXRCrgha5jMqCXwmn6.png" alt="Comparison of JPEG and PNG." style="zoom:50%;" />
<p>PNG 适合需要半透明的场景，比如图标 logo 等。还可以替代 SVG 格式。</p>
<img src="https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/GhNCZEadcuq93fPfuiQJ.png?auto=format" alt="PNG and SVG comparison." style="zoom: 33%;" />
<p>实际操作中，PNG 可以作为一个标准版本用于保存完整的图片，以备将来该图像的版本需要编辑或以其他格式重新保存。</p>
<p>值得注意的是，即使编码是标准化的，不同的编辑工具有不同的编码方法，有些比其他的更有效。</p>
<p>在任何情况下传输PNG之前，一定要通过<a href="https://squoosh.app/" target="_blank" rel="noopener noreferrer">Squoosh<ExternalLinkIcon/></a>或<a href="https://imageoptim.com/" target="_blank" rel="noopener noreferrer">ImageOptim<ExternalLinkIcon/></a>等工具来运行你的文件。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://www.bilibili.com/video/BV1wY4y1P7o7/" target="_blank" rel="noopener noreferrer">PNG 原理——为质量牺牲速度<ExternalLinkIcon/></a></p>
</div></template>



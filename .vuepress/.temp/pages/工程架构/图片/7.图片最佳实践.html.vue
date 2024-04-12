<template><div><h1 id="图片最佳实践" tabindex="-1"><a class="header-anchor" href="#图片最佳实践"><span>图片最佳实践</span></a></h1>
<p>总结：</p>
<p>网络：cdn、压缩</p>
<p>图片格式：用 webp 等新格式</p>
<p>加载方式：看情况</p>
<ul>
<li>loading = lazy</li>
<li>decoding=async</li>
<li>fetchpriority=high</li>
<li><code v-pre>&lt;link rel=&quot;preload&quot; as=&quot;image&quot; href=&quot;important.png&quot;&gt;</code></li>
</ul>
<p>响应式图片：提供多个图片源</p>
<p>图片样式：提供 width height，aspect-ratio、object-fit</p>
<p>可访问性：alt、aria 等</p>
<p>工作流：用工具生成包含相关设置的代码</p>
<h2 id="图片常见问题" tabindex="-1"><a class="header-anchor" href="#图片常见问题"><span>图片常见问题</span></a></h2>
<ul>
<li>大量图片</li>
<li>单个超大图片</li>
<li>多个小图片</li>
<li>图片并发请求：http2</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651261818&amp;idx=1&amp;sn=07a7959b9e835d67ee1e0cf6975db459&amp;chksm=bd48d2fe8a3f5be86d45f33986dd1b4863180419150b33d3175168399ad84dafd85599ab8333#rd" target="_blank" rel="noopener noreferrer">AVIF图片格式在bilibili落地<ExternalLinkIcon/></a></p>
</div></template>



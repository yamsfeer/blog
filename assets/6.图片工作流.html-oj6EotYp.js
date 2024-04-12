import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as c,c as l,b as a,d as n,e as t,a as p}from"./app-BPFsuHku.js";const u={},i=p('<h1 id="工作流" tabindex="-1"><a class="header-anchor" href="#工作流"><span>工作流</span></a></h1><h2 id="自动压缩和编码" tabindex="-1"><a class="header-anchor" href="#自动压缩和编码"><span>自动压缩和编码</span></a></h2><p>现实生活中，用户上传的图片都会通过一个系统对图片进行大小调整、重新编码和压缩等工作。</p><p>自动化图像系统有两个重要部分：</p><ul><li>创建、编码、压缩图片</li><li>生成已填充好 srcset 等属性的 html 标签</li></ul><h3 id="自动压缩和编码-1" tabindex="-1"><a class="header-anchor" href="#自动压缩和编码-1"><span>自动压缩和编码</span></a></h3><p>图像最有效的编码是由其内容决定的。</p><p>对于摄影图片，AVIF 在质量和文件大小方面有优势，但兼容性不足；WebP 提供了一个优化的、现代的后备方案；JPEG 是最可靠的默认值。</p>',8),r={href:"https://web.dev/use-imagemin-to-compress-images/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://imagemagick.org/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://sharp.pixelplumbing.com/",target:"_blank",rel:"noopener noreferrer"},d=p(`<h3 id="开发工具和工作流" tabindex="-1"><a class="header-anchor" href="#开发工具和工作流"><span>开发工具和工作流</span></a></h3><p>使用 Sharp 的 gulp-responsive 插件大概如下：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> src<span class="token punctuation">,</span> dest <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;gulp&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> respimg <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;gulp-responsive&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

exports<span class="token punctuation">.</span><span class="token function-variable function">webp</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">src</span><span class="token punctuation">(</span><span class="token string">&#39;./src-img/*&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">respimg</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token string-property property">&#39;*&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">quality</span><span class="token operator">:</span> <span class="token number">70</span><span class="token punctuation">,</span>
        <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;webp&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jpeg&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">progressive</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">dest</span><span class="token punctuation">(</span><span class="token string">&#39;./img/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>传递多个配置对象。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> src<span class="token punctuation">,</span> dest <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;gulp&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> respimg <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;gulp-responsive&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

exports<span class="token punctuation">.</span><span class="token function-variable function">default</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">src</span><span class="token punctuation">(</span><span class="token string">&#39;./src-img/*&#39;</span><span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">respimg</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  	<span class="token string-property property">&#39;*&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          	<span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;jpeg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;webp&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">progressive</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">rename</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">suffix</span><span class="token operator">:</span> <span class="token string">&#39;-1000&#39;</span> <span class="token punctuation">}</span>
        	<span class="token punctuation">}</span><span class="token punctuation">,</span>
        	<span class="token punctuation">{</span>
          	<span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">800</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;jpeg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;webp&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">progressive</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">rename</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">suffix</span><span class="token operator">:</span> <span class="token string">&#39;-800&#39;</span> <span class="token punctuation">}</span>
        	<span class="token punctuation">}</span><span class="token punctuation">,</span>
        	<span class="token punctuation">{</span>
          	<span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">400</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;jpeg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;webp&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">progressive</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          	<span class="token literal-property property">rename</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">suffix</span><span class="token operator">:</span> <span class="token string">&#39;-400&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      	<span class="token punctuation">}</span><span class="token punctuation">]</span>
    	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">dest</span><span class="token punctuation">(</span><span class="token string">&#39;./img/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>执行结果。</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>[10:30:54] Starting &#39;default&#39;...
[10:30:54] gulp-responsive: monarch.png -&gt; monarch-400.jpeg
[10:30:54] gulp-responsive: monarch.png -&gt; monarch-800.jpeg
[10:30:54] gulp-responsive: monarch.png -&gt; monarch-1000.jpeg
[10:30:54] gulp-responsive: monarch.png -&gt; monarch-400.webp
[10:30:54] gulp-responsive: monarch.png -&gt; monarch-800.webp
[10:30:54] gulp-responsive: monarch.png -&gt; monarch-1000.webp
[10:30:54] gulp-responsive: Created 6 images (matched 1 of 1 image)
[10:30:54] Finished &#39;default&#39; after 374 ms
</code></pre></div><h4 id="响应式图片标签实践" tabindex="-1"><a class="header-anchor" href="#响应式图片标签实践"><span>响应式图片标签实践</span></a></h4><p>填充 srcset 属性通常是手动的。</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/webp<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>filename-1000.webp 1000w,
                  filename-800.webp 800w,
                  filename-400.webp 400w<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>filename-1000.jpg 1000w,
               filename-800.jpg 800w,
               filename-400.jpg 400w<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>sizes 相对更难处理。因为你不能在不知道图片在布局中要占据多少空间的情况下填充这个属性。</p><p>完全省略 sizes 不仅违反 HTML 规范，还会导致 sizes=&quot;100vw&quot;的默认行为，相当于告知浏览器该图像只受视口本身的限制，从而导致最大的候选源被选中。</p><p>关于 sizes 有以下工具。</p>`,13),m={href:"https://github.com/ausi/respimagelint",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/aFarkas/lazysizes",target:"_blank",rel:"noopener noreferrer"},f=p(`<h2 id="网站生成器、框架、cms" tabindex="-1"><a class="header-anchor" href="#网站生成器、框架、cms"><span>网站生成器、框架、CMS</span></a></h2><p>图像管理流程：</p><ul><li>开发层面，构建和维护网站的图片</li><li>使用网站产生的图像资产，根据开发团队定义的设置自动编码和压缩。</li></ul><h3 id="静态网站生成器" tabindex="-1"><a class="header-anchor" href="#静态网站生成器"><span>静态网站生成器</span></a></h3><p>静态网站生成器处理图像的方式相似。</p><p>比如 Eleventy 使用 Sharp 来提供调整大小、生成多种尺寸、重新编码压缩、生成 html 标签等任务。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Image <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;@11ty/eleventy-img&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">eleventyConfig</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">imageShortcode</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> alt<span class="token punctuation">,</span> sizes<span class="token operator">=</span><span class="token string">&quot;100vw&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> metadata <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">Image</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">formats</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;avif&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;webp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jpeg&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">widths</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">800</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">outputDir</span><span class="token operator">:</span> <span class="token string">&quot;_dist/img/&quot;</span><span class="token punctuation">,</span>
      <span class="token function">filenameFormat</span><span class="token punctuation">(</span> <span class="token parameter">id<span class="token punctuation">,</span> src<span class="token punctuation">,</span> width<span class="token punctuation">,</span> format<span class="token punctuation">,</span> options</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> ext <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span> src <span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">const</span> name <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">basename</span><span class="token punctuation">(</span> src<span class="token punctuation">,</span> ext <span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>width<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>format<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> imageAttributes <span class="token operator">=</span> <span class="token punctuation">{</span>
      alt<span class="token punctuation">,</span>
      sizes<span class="token punctuation">,</span>
      <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token string">&quot;lazy&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> Image<span class="token punctuation">.</span><span class="token function">generateHTML</span><span class="token punctuation">(</span>metadata<span class="token punctuation">,</span> imageAttributes<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  eleventyConfig<span class="token punctuation">.</span><span class="token function">addAsyncShortcode</span><span class="token punctuation">(</span><span class="token string">&quot;respimg&quot;</span><span class="token punctuation">,</span> imageShortcode<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>然后可以用这个短码来代替默认的图片语法：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>{% respimg &quot;img/butterfly.jpg&quot;, &quot;Alt attribute.&quot;, &quot;(min-width: 30em) 800px, 80vw&quot; %}
</code></pre></div><p>如果配置为输出多种编码，生成的标签是一个 picture 元素，包含相应的 source 元素、type 属性和 srcset 属性，并且填充了生成 sizes。</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/avif<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/img/butterfly-400.avif 400w,
                  /img/butterfly-800.avif 800w,
                  /img/butterfly-1000.avif 1000w<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(min-width: 30em) 800px, 80vw<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/webp<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/img/butterfly-400.webp 400w,
                  /img/butterfly-800.webp 800w,
                  /img/butterfly-1000.webp 1000w<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(min-width: 30em) 800px, 80vw<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/jpeg<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/img/butterfly-400.jpeg 400w,
                  /img/butterfly-800.jpeg 800w,
                  /img/butterfly-1000.jpeg 1000w<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(min-width: 30em) 800px, 80vw<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Alt attribute.<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name">loading</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>lazy<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/img/butterfly-400.jpeg<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1000<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>846<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>插件无法生成一个可行的尺寸属性，因为它无法知道图片的最终尺寸和位置，但它还是填充了值。</p><h3 id="框架" tabindex="-1"><a class="header-anchor" href="#框架"><span>框架</span></a></h3><p>客户端渲染框架需要一个类似 Webpack 的打包器来执行任务。</p><p>Responsive-loader 也使用 Sharp 库处理图片。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> imageAVIF <span class="token keyword">from</span> <span class="token string">&#39;img/butterfly.jpg?sizes[]=400,sizes[]=800,sizes[]=1000&amp;format=avif&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> imageWebP <span class="token keyword">from</span> <span class="token string">&#39;img/butterfly.jpg?sizes[]=400,sizes[]=800,sizes[]=1000&amp;format=webp&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> imageDefault <span class="token keyword">from</span> <span class="token string">&#39;img/butterfly.jpg?sizes[]=400,sizes[]=800,sizes[]=1000&#39;</span><span class="token punctuation">;</span>
</code></pre></div><p>这些图片会经过 loader 处理，包括编码压缩等任务。在 React 组件中很容易引用这些资源。</p><div class="language-jsx" data-ext="jsx" data-title="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>image/avif<span class="token punctuation">&#39;</span></span> <span class="token attr-name">srcSet</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>imageAVIF<span class="token punctuation">.</span>srcSet<span class="token punctuation">}</span></span> <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span><span class="token punctuation">&#39;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>image/webp<span class="token punctuation">&#39;</span></span> <span class="token attr-name">srcSet</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>imageWebp<span class="token punctuation">.</span>srcSet<span class="token punctuation">}</span></span> <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span><span class="token punctuation">&#39;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
    <span class="token attr-name">src</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>imageDefault<span class="token punctuation">.</span>src<span class="token punctuation">}</span></span>
    <span class="token attr-name">srcSet</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>imageDefault<span class="token punctuation">.</span>srcSet<span class="token punctuation">}</span></span>
    <span class="token attr-name">width</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>imageDefault<span class="token punctuation">.</span>width<span class="token punctuation">}</span></span>
    <span class="token attr-name">height</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>imageDefault<span class="token punctuation">.</span>height<span class="token punctuation">}</span></span>
    <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span><span class="token punctuation">&#39;</span></span>
    <span class="token attr-name">loading</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>lazy<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
</span></code></pre></div><h3 id="cms" tabindex="-1"><a class="header-anchor" href="#cms"><span>CMS</span></a></h3><p>WordPress 是最早采用原生响应式图像标签的公司之一。</p><p>默认情况下，WordPress 会基于你配置的图片尺寸而生成 srcset 属性。</p><p>WordPress 可以配置的两个关键设置是压缩质量和 mime 类型。例如，设置图片默认压缩质量为70：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token function">add_filter</span><span class="token punctuation">(</span> <span class="token string">&#39;wp_editor_set_quality&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">70</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>为了获得更好的压缩效果，用以下方法将 JPEG 图像输出为 WebP：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token function">add_filter</span><span class="token punctuation">(</span> <span class="token string">&#39;image_editor_output_format&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">$mappings</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  $mappings<span class="token punctuation">[</span> <span class="token string">&#39;image/jpeg&#39;</span> <span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;image/webp&#39;</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> $mappings<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="图片cdn" tabindex="-1"><a class="header-anchor" href="#图片cdn"><span>图片CDN</span></a></h2><p>CDN ( content delivery network ) 的核心概念：一个由分布式但相互连接的服务器组成的网络，快速有效地将资产交付给用户。</p><p>当一个文件被上传到 CDN 供应商时，在世界各地的 CDN 网络的其他节点上将会创建一个副本。当用户请求一个文件时，数据将由地理上离该用户最近的节点发送，从而减少延迟。</p><p>CDN 的分布式性质还提供了网络中断或硬件故障时的冗余，以及负载平衡，以减轻流量高峰的影响。</p><p>除此之外，图像 CDN 有一个关键能力：能够根据访问图像的 URL 字符串来转换和优化图像内容。</p><p>用户上传一个规范的、高分辨率的图像，供应商将生成一个用于访问它的 URL：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>https://res.cloudinary.com/demo/image/upload/sample.jpg
</code></pre></div><h3 id="图像设置" tabindex="-1"><a class="header-anchor" href="#图像设置"><span>图像设置</span></a></h3><p>图像 CDN 允许你通过 URL 改变源图像的尺寸、编码和压缩设置 ( 不同供应商有不同语法 )。</p><p>以 Cloudinary 为例，通过以下语法对图像进行动态调整：</p><ul><li><code>w_</code> 后面是宽度</li><li><code>h_</code> 后面是高度</li><li><code>c_</code> 图像应如何缩放或裁剪</li><li><code>q_</code> 后面是图像质量</li></ul><p>在文件名和扩展名之前，可以应用任何数量的转换，每项转换用逗号分隔。</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code>https://res.cloudinary.com/demo/image/upload/w_400,q_60/sample.jpg
</code></pre></div><p>CDN 第一次接收到这个请求，会生成并发送一个按比例缩放为 400px，质量为 60 的新图像，然后在 CDN 上缓存起来，收到相同请求时直接返回。</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://res.cloudinary.com/demo/image/upload/w_1000/sample.jpg 1000w<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://res.cloudinary.com/demo/image/upload/w_1000/sample.jpg 1000w,
          https://res.cloudinary.com/demo/image/upload/w_800/sample.jpg 800w,
          https://res.cloudinary.com/demo/image/upload/w_600/sample.jpg 600w<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="自动压缩" tabindex="-1"><a class="header-anchor" href="#自动压缩"><span>自动压缩</span></a></h3><p>图像 CDN 可以分析图像内容，并相应地微调压缩设置。</p><p>对于 Cloudinary 来说，在 URL 中添加 <code>q_auto</code> 就可以实现这个功能：</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://res.cloudinary.com/demo/image/upload/w_1400/sample.jpg<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 250 KB--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://res.cloudinary.com/demo/image/upload/w_1400,q_auto/sample.jpg<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 134 KB--&gt;</span>
</code></pre></div><h3 id="自动编码和内容协商" tabindex="-1"><a class="header-anchor" href="#自动编码和内容协商"><span>自动编码和内容协商</span></a></h3><p>在收到请求时，CDN 通过 HTTP headers 确定浏览器支持的编码，特别是 <code>Accept</code> 信息。</p><p>在 URL 中加入 <code>f_auto</code> ，明确告诉 Cloudinary 提供浏览器能够理解的最有效的编码：</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://res.cloudinary.com/demo/image/upload/w_1200,q_auto,f_auto/sample.jpg<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>服务器会根据 Accept 提供的编码生成一个图像版本并缓存。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,50),y={href:"https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651261818&idx=1&sn=07a7959b9e835d67ee1e0cf6975db459&chksm=bd48d2fe8a3f5be86d45f33986dd1b4863180419150b33d3175168399ad84dafd85599ab8333#rd",target:"_blank",rel:"noopener noreferrer"};function v(q,w){const s=o("ExternalLinkIcon");return c(),l("div",null,[i,a("p",null,[n("至于图像处理本身，有大量的开源图像处理库，提供了批量转换、修改和编辑图像的方法。例如 "),a("a",r,[n("ImageMin"),t(s)]),n("、"),a("a",k,[n("ImageMagick"),t(s)]),n(" 、"),a("a",g,[n("Sharp"),t(s)]),n(" 。")]),d,a("ul",null,[a("li",null,[a("a",m,[n("respImageLint"),t(s)]),n(" 是一个 code snippet，它会检查 sizes 属性并提供改进建议")]),a("li",null,[a("a",h,[n("Lazysizes"),t(s)]),n(" 将图片请求推迟到布局建立之后，用 JavaScript 生成 sizes")])]),f,a("p",null,[a("a",y,[n("AVIF图片格式在bilibili落地"),t(s)])])])}const x=e(u,[["render",v],["__file","6.图片工作流.html.vue"]]),j=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E5%9B%BE%E7%89%87/6.%E5%9B%BE%E7%89%87%E5%B7%A5%E4%BD%9C%E6%B5%81.html","title":"工作流","lang":"zh-CN","frontmatter":{"description":"工作流 自动压缩和编码 现实生活中，用户上传的图片都会通过一个系统对图片进行大小调整、重新编码和压缩等工作。 自动化图像系统有两个重要部分： 创建、编码、压缩图片 生成已填充好 srcset 等属性的 html 标签 自动压缩和编码 图像最有效的编码是由其内容决定的。 对于摄影图片，AVIF 在质量和文件大小方面有优势，但兼容性不足；WebP 提供了一...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E5%9B%BE%E7%89%87/6.%E5%9B%BE%E7%89%87%E5%B7%A5%E4%BD%9C%E6%B5%81.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"工作流"}],["meta",{"property":"og:description","content":"工作流 自动压缩和编码 现实生活中，用户上传的图片都会通过一个系统对图片进行大小调整、重新编码和压缩等工作。 自动化图像系统有两个重要部分： 创建、编码、压缩图片 生成已填充好 srcset 等属性的 html 标签 自动压缩和编码 图像最有效的编码是由其内容决定的。 对于摄影图片，AVIF 在质量和文件大小方面有优势，但兼容性不足；WebP 提供了一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"工作流\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"自动压缩和编码","slug":"自动压缩和编码","link":"#自动压缩和编码","children":[{"level":3,"title":"自动压缩和编码","slug":"自动压缩和编码-1","link":"#自动压缩和编码-1","children":[]},{"level":3,"title":"开发工具和工作流","slug":"开发工具和工作流","link":"#开发工具和工作流","children":[]}]},{"level":2,"title":"网站生成器、框架、CMS","slug":"网站生成器、框架、cms","link":"#网站生成器、框架、cms","children":[{"level":3,"title":"静态网站生成器","slug":"静态网站生成器","link":"#静态网站生成器","children":[]},{"level":3,"title":"框架","slug":"框架","link":"#框架","children":[]},{"level":3,"title":"CMS","slug":"cms","link":"#cms","children":[]}]},{"level":2,"title":"图片CDN","slug":"图片cdn","link":"#图片cdn","children":[{"level":3,"title":"图像设置","slug":"图像设置","link":"#图像设置","children":[]},{"level":3,"title":"自动压缩","slug":"自动压缩","link":"#自动压缩","children":[]},{"level":3,"title":"自动编码和内容协商","slug":"自动编码和内容协商","link":"#自动编码和内容协商","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":6,"words":1801},"filePathRelative":"工程架构/图片/6.图片工作流.md","localizedDate":"2024年4月12日","autoDesc":true}');export{x as comp,j as data};

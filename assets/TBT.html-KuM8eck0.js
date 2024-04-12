import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as n,c,b as e,d as r,e as a,a as i}from"./app-BPFsuHku.js";const l={},p=i('<h1 id="tbt-总阻塞时间" tabindex="-1"><a class="header-anchor" href="#tbt-总阻塞时间"><span>TBT 总阻塞时间</span></a></h1><p>主线程上运行超过 50ms 的任务称为长任务，超出 50ms 的部分称为任务的阻塞时间。</p><p>TBT ( Total Blocking Time ) 总阻塞时间，FCP 到 TTI 之间，所有长任务的阻塞时间之和。</p><h2 id="什么是-tbt" tabindex="-1"><a class="header-anchor" href="#什么是-tbt"><span>什么是 TBT</span></a></h2><p>执行长任务时，主线程处于<strong>阻塞状态</strong>。在阻塞状态下交互，浏览器必须等到任务完成后才能作出响应。响应时间超过 50ms，用户就会感到卡顿。</p><p>下图是一个页面加载期间主线程的时间轴：</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/clHG8Yv239lXsGWD6Iu6.svg" alt="主线程上的任务时间轴"></p><p>如图所示，有 5 个任务，其中 3 个是长任务，它们的阻塞时间如下图：</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/xKxwKagiz8RliuOI2Xtc.svg" alt="显示阻塞时间的主线程任务时间轴"></p><p>可见，执行任务的时间为 560ms，其中阻塞时间为 345ms。</p><h3 id="tbt-与-tti-有什么关系" tabindex="-1"><a class="header-anchor" href="#tbt-与-tti-有什么关系"><span>TBT 与 TTI 有什么关系</span></a></h3><p>TTI 描述的是页面可交互需要多少时间，TBT 描述的是 TTI 之前，不可交互的程度。</p><p>举个例子，TTI 认为当主线程连续 5s 没有长任务时，页面可交互。10s 里的 3 个 51ms 长任务与 1 个 10s 长任务的 TTI 是相同的。但对用户来说，两种使用体验是截然不同的。第一种情况下，TBT 为 3ms；第二种的 TBT 为 9950ms。</p><h2 id="tbt-阈值" tabindex="-1"><a class="header-anchor" href="#tbt-阈值"><span>TBT 阈值</span></a></h2><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/tbt_ux.svg" alt="TBT"></p><h2 id="如何测量-tbt" tabindex="-1"><a class="header-anchor" href="#如何测量-tbt"><span>如何测量 TBT</span></a></h2><p>TBT 可以线上测量，但用户交互会影响 TBT，所以最好线下测量。</p><h2 id="如何改进-tbt" tabindex="-1"><a class="header-anchor" href="#如何改进-tbt"><span>如何改进 TBT</span></a></h2>',18),m={href:"https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/",target:"_blank",rel:"noopener noreferrer"},T={href:"https://developer.chrome.com/docs/lighthouse/performance/bootup-time/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://developer.chrome.com/docs/lighthouse/performance/resource-summary/",target:"_blank",rel:"noopener noreferrer"};function b(g,u){const t=s("ExternalLinkIcon");return n(),c("div",null,[p,e("ul",null,[e("li",null,[e("a",m,[r("减少第三方代码的影响"),a(t)])]),e("li",null,[e("a",T,[r("减少 JavaScript 执行时间"),a(t)])]),e("li",null,[e("a",h,[r("最小化主线程工作"),a(t)])]),e("li",null,[e("a",d,[r("保持较低的请求数和较小的传输大小"),a(t)])])])])}const _=o(l,[["render",b],["__file","TBT.html.vue"]]),y=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TBT.html","title":"TBT 总阻塞时间","lang":"zh-CN","frontmatter":{"description":"TBT 总阻塞时间 主线程上运行超过 50ms 的任务称为长任务，超出 50ms 的部分称为任务的阻塞时间。 TBT ( Total Blocking Time ) 总阻塞时间，FCP 到 TTI 之间，所有长任务的阻塞时间之和。 什么是 TBT 执行长任务时，主线程处于阻塞状态。在阻塞状态下交互，浏览器必须等到任务完成后才能作出响应。响应时间超过 5...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TBT.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"TBT 总阻塞时间"}],["meta",{"property":"og:description","content":"TBT 总阻塞时间 主线程上运行超过 50ms 的任务称为长任务，超出 50ms 的部分称为任务的阻塞时间。 TBT ( Total Blocking Time ) 总阻塞时间，FCP 到 TTI 之间，所有长任务的阻塞时间之和。 什么是 TBT 执行长任务时，主线程处于阻塞状态。在阻塞状态下交互，浏览器必须等到任务完成后才能作出响应。响应时间超过 5..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/clHG8Yv239lXsGWD6Iu6.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TBT 总阻塞时间\\",\\"image\\":[\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/clHG8Yv239lXsGWD6Iu6.svg\\",\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/xKxwKagiz8RliuOI2Xtc.svg\\",\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/tbt_ux.svg\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是 TBT","slug":"什么是-tbt","link":"#什么是-tbt","children":[{"level":3,"title":"TBT 与 TTI 有什么关系","slug":"tbt-与-tti-有什么关系","link":"#tbt-与-tti-有什么关系","children":[]}]},{"level":2,"title":"TBT 阈值","slug":"tbt-阈值","link":"#tbt-阈值","children":[]},{"level":2,"title":"如何测量 TBT","slug":"如何测量-tbt","link":"#如何测量-tbt","children":[]},{"level":2,"title":"如何改进 TBT","slug":"如何改进-tbt","link":"#如何改进-tbt","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.45,"words":435},"filePathRelative":"工程架构/性能优化/TBT.md","localizedDate":"2024年4月12日","autoDesc":true}');export{_ as comp,y as data};

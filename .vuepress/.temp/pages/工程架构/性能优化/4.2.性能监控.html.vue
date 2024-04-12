<template><div><h1 id="性能监控" tabindex="-1"><a class="header-anchor" href="#性能监控"><span>性能监控</span></a></h1>
<p>性能监控工具：</p>
<ul>
<li><a href="https://github.com/GoogleChrome/lighthouse" target="_blank" rel="noopener noreferrer">Lighthouse<ExternalLinkIcon/></a></li>
<li><a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">PageSpeed Insights<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/devtools/" target="_blank" rel="noopener noreferrer">Chrome 开发者工具<ExternalLinkIcon/></a></li>
<li><a href="https://support.google.com/webmasters/answer/9205520" target="_blank" rel="noopener noreferrer">Google 搜索控制台核心 Web 指标报告<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/crux/" target="_blank" rel="noopener noreferrer">CrUX ( Chrome User Experiment ) Report<ExternalLinkIcon/></a></li>
</ul>
<p>性能监控测量的数据分为两种：实验室数据、现场数据。</p>
<p>实验室数据 ( lab data ) 是在预定义网络和设备条件的受控环境中加载网页测量的。实验室测试的目的是控制尽可能多的因素，以便每次运行的结果一致且可重现。</p>
<p>Lighthouse、PageSpeed Insights 报告的都是实验室数据。</p>
<p>现场数据 ( field data ) 是通过监控访问页面的所有用户，并针对每个用户分别测量得到的。</p>
<p>现场数据基于真实的用户访问，它反映了用户的实际设备、网络条件和地理位置。现场数据也被称为真实用户监测数据 ( Real User Monitoring, RUM )。</p>
<p>CrUX 报告的是 RUM 数据。开发者自行收集数据也很常见，它甚至比 CrUX 更灵活。</p>
</div></template>



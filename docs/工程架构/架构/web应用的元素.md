下面从 7 个方面来衡量一个网站，它们可以很好地描述你需要什么样的网站，从而对架构做出方向指导。

### 性能 ( Performance )

一个网站的性能可以通过 LCP、FID、CLS 等性能指标衡量。

在设计架构时，可以先进行“性能预算”。

### 可移植性 ( Portability )

* 在什么浏览器中运行？
* 在哪些设备上，以何种分辨率运行？
* 移动应用还是桌面应用？
* 是否存在限制？比如有限的带宽、对 Javascript 的支持等。

### 可靠性 ( Reliability )

* 是否需要离线使用？
* 如果后端不可用，前端应该如何反应？

### 可维护性 ( Maintainability )

* 是否在不同的前端中复用视觉组件？
* 如何快速将更改部署到生产中？
* 对故障排除有什么要求？

### 兼容性 ( Compatibility )

* 是否需要与其他前端兼容？
* 是否需要嵌入到其他环境中？ 例如 iFrame、DOM 注入、微前端等。
* 是否需要与爬虫很好地集成，例如内容预览？
* 是否需要更强的 SEO？

### 安全性 ( Security )

是否需要满足特定的安全要求？例如 [OWASP](https://owasp.org/www-project-top-ten/?ref=workingsoftware.dev) 十大安全要求？

### 可用性 ( Usability )

* 前端的交互方式是什么？内容驱动？交互驱动？
* 目标受众是什么？
* 是否需要关注可访问性问题？ [WCAG21](https://www.w3.org/WAI/WCAG21/quickref/?ref=workingsoftware.dev)

关于如何优化可访问性问题的参考 [web.dev](https://web.dev/learn/accessibility/)。

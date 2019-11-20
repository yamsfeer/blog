## 个人技术博客

使用[vuepress](https://vuepress.vuejs.org/)搭建的博客，博客地址:https://melogra.github.io/blog

### 几点说明

* 所有文章的主体都在```/docs/articles/```下，vuepress会自动生成路由。
* vuepress构建完成后的文件存放在```/docs/.vuepress/dist```目录下，通过执行```deploy.sh```可以完成一次更新，[仓库地址](https://github.com/melogra/blog)。
* 由于博客地址不是```melogra.github.io```，需要在```/docs/.vuepress/config.js```中设置```base: '/blog/'```。关于vuepress中base的几点：
  * 应当总是以斜杠开始，并以斜杠结束 
  * 一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中
  * 根据个人测试，在“YAML front matter”中不需要$withBase，比如在设置首页的那个README.md，可以写成heroImage: /logo.png
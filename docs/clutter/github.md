# github

github 除了 git 管理代码仓库的能力，还提供了一些额外的功能。

- Github Actions，用于 CI / CD
- Github Packages，发布 NPM 包等
- Github Pages，发布静态页面
- Github Codespaces，线上代码开发
- Github Gist，记录代码片段

[github docs](https://docs.github.com/) 中对这些功能都有详细介绍。

## github actions

github actions 可以设置你的 github 工作流，主要用于 CI / CD。

- 持续集成 ( Continuous Integration, CI )，将代码集成到共享代码仓库，并自动化构建、测试和验证。
- 持续部署 ( Continuous Deployment, CD )，在 CI 的基础上，将代码自动交付到生产环境。

下面是一个使用 vuepress 的博客仓库的工作流设置。

```yaml
name: build my blog

on: # 执行时机
  push:
    branches: ['master'] # push 代码到 master 分支时执行
  pull_request:
    branches: ['master'] # merge 代码到 master 分支时执行
  workflow_dispatch: # 允许手动执行

jobs: # 一个工作流由一个或多个 job 组成
  build: # 一个称为 build 的 job
    runs-on: ubuntu-latest # 在最新版 Ubuntu 上操作
    steps:
      - uses: actions/checkout@v3 # 从github下载代码

      - uses: pnpm/action-setup@v2.2.2 # 用 pnpm 作为包管理
        with:
          version: 8.1.1

      - name: Use Node.js ${{ matrix.node-version }} # 设置 node 版本
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      - run: pnpm i # 下载依赖

      - name: vuepress build
        env:
          NODE_OPTIONS: --max_old_space_size=4096
        run: pnpm run build # 执行打包命令

      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v3
        with:
          target_branch: gh-pages # 将 gh-pages 分支代码
          build_dir: docs/.vuepress/dist # 将打包结果发布到 github page
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # 在仓库的 setting 里可以设置一些私密信息
```

工作流设置中经常见到类似 `uses: actions/checkout@v3` 的设置，这是官方提供的预设，它们都存放在 [github 官方账号](https://github.com/actions)中。

## github packages

首先明确 npm registry 的概念，npm、yarn、pnpm 等包管理工具下载 npm 包，默认 registry 都是 npm 官方提供的仓库，github 也提供了类似的仓库。此外还有其他镜像库，它们都是 npm registry。

- npm 官方仓库： https://registry.npmjs.org
- github package 仓库：https://npm.pkg.github.com
- 其他 npm 仓库镜像：https://registry.npmmirror.com

当然，无论是什么仓库，我们发布的都是 npm 包 ( 用 package.json 描述 )。

以下是发布 npm 包到 github package 的工作流设置。

```yaml
# For more information see: https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages
name: publish github packages

on:
  release:
    types: [created] # 发布 release 时执行工作流
  workflow_dispatch: # 可手动执行

jobs:
  publish-gpkg:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          # 设置 registry 为 github reigistry
          # 发布到 npm registry 则设置为 https://registry.npmjs.org/
          registry-url: https://npm.pkg.github.com
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

值得注意的是 git tag 和 github release 的区别。

tag 是 git 的概念，github 理所当然的也有 tag；但 release 是 github 提出的概念，主要是方便用户发布版本，版本中通常有 changelog 等信息，**发布一个 release 需要指定一个 tag**。

## github as picbed

一个 github repository 除了可以存放代码之外，还可以专门用来存储图片。

创建名为 pic-bed ( 名称任意 ) 的 repository，提交 photo.png 到 master 分支，然后可以通过以下地址访问到该图片。

```
https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo.png
```

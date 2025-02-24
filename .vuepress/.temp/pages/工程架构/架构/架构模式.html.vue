<template><div><h1 id="架构模式" tabindex="-1"><a class="header-anchor" href="#架构模式"><span>架构模式</span></a></h1>
<p>架构模式是对软件架构中经常出现的问题的一种通用的、可重复使用的解决方案。架构模式类似于设计模式，它是对前人架构的经验总结，也就是架构的套路。</p>
<h2 id="分层-layered" tabindex="-1"><a class="header-anchor" href="#分层-layered"><span>分层 ( Layered )</span></a></h2>
<p>分层架构 ( Layered Architecture ) 是最常见的软件架构，如果你不知道要用什么架构，那就用分层架构。</p>
<p>分层架构由下往上将软件分成若干层，底层为上层提供服务，层与层之间通过接口通信，其中 4 层结构是最常见的。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/bg2016090302.png" alt="img" style="zoom:75%;" />
<p>分层架构的特点在于<strong>关注点分离 (separation of concerns)</strong>。</p>
<p>一个层中的组件只会处理本层的逻辑。展⽰层只会处理展示逻辑，业务层只会处理业务逻辑。分离使得每一层更易于开发，测试，管理和维护。</p>
<p>优点：分离、简单、复用</p>
<ul>
<li>结构简单，容易理解、分工</li>
<li>每层都可以独立测试，层之间的接口通过模拟解决</li>
</ul>
<p>缺点：效率低、灵活性低</p>
<ul>
<li>代码调整或增加功能比较麻烦，即使只修改一个小地方，往往需要整个软件重新部署，不利于持续发布</li>
<li>层内部是耦合的，扩展比较困难</li>
</ul>
<h2 id="管道-pipe-filter" tabindex="-1"><a class="header-anchor" href="#管道-pipe-filter"><span>管道 ( Pipe-Filter )</span></a></h2>
<p>管道模式 ( Pipe-Filter Architecture ) 中，组件之间用管道连接起来，每个组件有一个输入和输出，上一个组件的输出是下一个组件的输入，每个组件的职责单一。</p>
<p>连接组件的通道称为管道 ( pipe )，组件称为过滤器 ( filter)。</p>
<p>典型的管道架构风格例子是编译器的编译流水线。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/n1fdzvuomikukhawzgku.png" />
<h2 id="事件驱动-event-driven" tabindex="-1"><a class="header-anchor" href="#事件驱动-event-driven"><span>事件驱动 ( Event-Driven )</span></a></h2>
<p>事件 ( event ) 是状态发生变化时，软件发出的通知。</p>
<p>事件驱动架构 ( event-driven architecture ) 就是用事件通信的架构。它包含 4 个部分：</p>
<ul>
<li>事件源 ( event source )</li>
<li>监听器 ( event listener )</li>
<li>通道 ( event channel )</li>
<li>总线 ( event bus )</li>
</ul>
<p>事件源将消息发布到总线上的特定通道，订阅事件的 listener 会收到通知。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/1*DOZ4nVR9zkJm-EnXT3KOGQ.png" alt=""></p>
<p>事件驱动模式可以类比为设计模式中的观察者模式或发布订阅模式。它定义了一对多的关系，解除了发布者和订阅者之间的耦合。</p>
<h2 id="mv" tabindex="-1"><a class="header-anchor" href="#mv"><span>MV*</span></a></h2>
<p>MV* 架构及其衍生包含 MVC、MVP、MVVM 等，它们都可以归类为分层架构。</p>
<p>以 MVC 为例，MVC 架构包含 3 部分：</p>
<ul>
<li>Model：应用相关的数据及处理方法</li>
<li>Controller：Model 和 View 之间的纽带</li>
<li>View：显示信息</li>
</ul>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/1*OP0CS6O5Sb66jpc-H-IuRQ.png" alt=""></p>
<h2 id="复制-master-slave" tabindex="-1"><a class="header-anchor" href="#复制-master-slave"><span>复制 ( Master-Slave )</span></a></h2>
<p>顾名思义，复制架构 ( master-slave architecture ) 由 master 和 slave 两部分组成。master 通常只有一个，slave 可以有多个。</p>
<p>master 将工作分配给 slave，并根据从 slave 返回的结果得出最终结果。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/1*lsK9QntZl2d5oLojwRGXDg.png" alt=""></p>
<p>举个例子，为了利用多核资源，Node 可以创建多个 Worker 进程，它们共享一个服务器端口, Master 进程会根据一定的策略将资源分配给 Worker。</p>
<h2 id="微内核-microkernel" tabindex="-1"><a class="header-anchor" href="#微内核-microkernel"><span>微内核 ( Microkernel )</span></a></h2>
<p>微内核架构 ( microkernel architecture ) 又称为插件架构 ( plugin architecture )，指的是内核相对较小，主要功能通过插件实现。</p>
<ul>
<li>内核 ( core )：通常只包含系统运行的最小功能</li>
<li>插件 ( plugin )：互相独立，插件之间的通信应该减少到最低</li>
</ul>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/bg2016090306.png" alt="img" style="zoom:75%;" />
<p>优点</p>
<ul>
<li>需要什么功能，开发一个插件即可</li>
<li>插件可以独立的加载和卸载，容易部署</li>
</ul>
<p>缺点</p>
<ul>
<li>内核通常是一个独立单元，不容易做成分布式</li>
<li>插件与内核的通信，插件登记机制，开发难度较高</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://juejin.cn/post/6844903943068205064" target="_blank" rel="noopener noreferrer">透过现象看本质: 常见的前端架构风格和案例<ExternalLinkIcon/></a></p>
<p><a href="http://www.ruanyifeng.com/blog/2016/09/software-architecture.html" target="_blank" rel="noopener noreferrer">软件架构入门<ExternalLinkIcon/></a></p>
<p><a href="https://towardsdatascience.com/10-common-software-architectural-patterns-in-a-nutshell-a0b47a1e9013" target="_blank" rel="noopener noreferrer">10 Common Software Architectural Patterns in a nutshell<ExternalLinkIcon/></a></p>
</div></template>



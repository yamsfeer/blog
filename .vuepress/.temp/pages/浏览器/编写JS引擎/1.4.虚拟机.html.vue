<template><div><h1 id="虚拟机" tabindex="-1"><a class="header-anchor" href="#虚拟机"><span>虚拟机</span></a></h1>
<p>典型的计算机系统的硬件组织结构图：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwev019jeoj31hc0u0dhq.jpg" style="zoom: 35%;" />
<ol>
<li>二进制代码装载进内存，将第一条指令的地址写入 PC 寄存器</li>
<li>读取指令：根据 PC 指针，取出指令</li>
<li>分析指令：指令解码器分析指令类型，获取操作数</li>
<li>执行指令：根据指令，通过寄存器、ALU 等进行计算</li>
</ol>
<p>解释器就是一个虚拟机，虚拟机有两种，基于栈和基于寄存器。</p>
</div></template>



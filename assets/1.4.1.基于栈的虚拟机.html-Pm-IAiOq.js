import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as a,a as n}from"./app-BPFsuHku.js";const r={},s=n(`<h1 id="基于栈的虚拟机" tabindex="-1"><a class="header-anchor" href="#基于栈的虚拟机"><span>基于栈的虚拟机</span></a></h1><h3 id="如何运行二进制代码" tabindex="-1"><a class="header-anchor" href="#如何运行二进制代码"><span>如何运行二进制代码</span></a></h3><p>假设有如下代码。</p><div class="language-c++" data-ext="c++" data-title="c++"><pre class="language-c++"><code>int main() {
  int x = 1;
  int y = 2;
  int z = x + y;
  return z;
}
</code></pre></div><p>对应的汇编代码如下。</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>proc:	file format mach-o 64-bit x86-64
Disassembly of section __TEXT,__text:
0000000100003f90 &lt;_main&gt;:
100003f90: 55                          	pushq	%rbp
100003f91: 48 89 e5                    	movq	%rsp, %rbp
100003f94: c7 45 fc 00 00 00 00        	movl	$0, -4(%rbp)
100003f9b: c7 45 f8 01 00 00 00        	movl	$1, -8(%rbp)
100003fa2: c7 45 f4 02 00 00 00        	movl	$2, -12(%rbp)
100003fa9: 8b 45 f8                    	movl	-8(%rbp), %eax
100003fac: 03 45 f4                    	addl	-12(%rbp), %eax
100003faf: 89 45 f0                    	movl	%eax, -16(%rbp)
100003fb2: 8b 45 f0                    	movl	-16(%rbp), %eax
100003fb5: 5d                          	popq	%rbp
100003fb6: c3                          	retq
</code></pre></div><h3 id="栈如何管理函数调用" tabindex="-1"><a class="header-anchor" href="#栈如何管理函数调用"><span>栈如何管理函数调用</span></a></h3><p>执行函数时，函数的参数、内部变量都会依次压入到栈中。举个例子：</p><div class="language-c++" data-ext="c++" data-title="c++"><pre class="language-c++"><code>int main() {
  int x = 5;
  int y = 5;
  x = 100;
  int z = x + y;
  return z;
}
</code></pre></div><p>main 函数执行过程中，栈的变化如下图：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gweuzz9xybj31hc0u0di6.jpg" style="zoom:35%;"><p>当一个函数调用另一个函数时：</p><div class="language-c++" data-ext="c++" data-title="c++"><pre class="language-c++"><code>int add(num1, num2) {
  int x = num1;
  int y = num2;
  int ret = x + y;
  return ret;
}
int main() {
  int x = 5;
  int y = 6;
  x = 100;
  int z = add(x + y);
  return z;
}
</code></pre></div><p>调用 add 函数前，栈的状态：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gweuzxh8uwj31hc0u00u1.jpg" style="zoom:35%;"><p>在 add 函数中，我们得到了 add 函数的结果 ret，存放在栈顶：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwev01s4o1j31rg0snjuk.jpg" style="zoom:35%;"><p>add 函数执行完毕后，我们需要将栈的状态恢复到 main 函数上次执行时的状态，这个过程叫恢复现场。</p><p>为了恢复现场，在 main 函数调用 add 函数时，需要将当前栈顶指针 ( f92 ) 保存到 ebp 寄存器中，恢复现场时，只需将 ebp 中的值存放到 esp 即可。</p><p>恢复现场前：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gweuzztinlj31rg0ptn04.jpg" style="zoom:25%;"><p>恢复现场后：</p><p>（注意 esp 的值由 f97 变成了 f92，图里没画出 ebp 寄存器，它的值是 f92）</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwev02pzmvj31rg0ptq65.jpg" style="zoom:25%;"><p>这里还有一个问题，在执行 add 函数前，ebp 中是有值的，它的值是调用 main 函数前的栈顶地址（f91）。</p><p>为了恢复这个值，通常的方法是调用 add 函数前，将当前 main 函数的<strong>栈帧指针</strong>保存在栈中：（总的来说，就是寄存器不够，只能挪来挪去。）</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gweuzxvau0j31rg0tago4.jpg" style="zoom:25%;">`,27),i=[s];function p(o,c){return e(),a("div",null,i)}const l=t(r,[["render",p],["__file","1.4.1.基于栈的虚拟机.html.vue"]]),g=JSON.parse('{"path":"/%E6%B5%8F%E8%A7%88%E5%99%A8/%E7%BC%96%E5%86%99JS%E5%BC%95%E6%93%8E/1.4.1.%E5%9F%BA%E4%BA%8E%E6%A0%88%E7%9A%84%E8%99%9A%E6%8B%9F%E6%9C%BA.html","title":"基于栈的虚拟机","lang":"zh-CN","frontmatter":{"description":"基于栈的虚拟机 如何运行二进制代码 假设有如下代码。 对应的汇编代码如下。 栈如何管理函数调用 执行函数时，函数的参数、内部变量都会依次压入到栈中。举个例子： main 函数执行过程中，栈的变化如下图： 当一个函数调用另一个函数时： 调用 add 函数前，栈的状态： 在 add 函数中，我们得到了 add 函数的结果 ret，存放在栈顶： add 函数...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/%E7%BC%96%E5%86%99JS%E5%BC%95%E6%93%8E/1.4.1.%E5%9F%BA%E4%BA%8E%E6%A0%88%E7%9A%84%E8%99%9A%E6%8B%9F%E6%9C%BA.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"基于栈的虚拟机"}],["meta",{"property":"og:description","content":"基于栈的虚拟机 如何运行二进制代码 假设有如下代码。 对应的汇编代码如下。 栈如何管理函数调用 执行函数时，函数的参数、内部变量都会依次压入到栈中。举个例子： main 函数执行过程中，栈的变化如下图： 当一个函数调用另一个函数时： 调用 add 函数前，栈的状态： 在 add 函数中，我们得到了 add 函数的结果 ret，存放在栈顶： add 函数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基于栈的虚拟机\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"如何运行二进制代码","slug":"如何运行二进制代码","link":"#如何运行二进制代码","children":[]},{"level":3,"title":"栈如何管理函数调用","slug":"栈如何管理函数调用","link":"#栈如何管理函数调用","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.89,"words":567},"filePathRelative":"浏览器/编写JS引擎/1.4.1.基于栈的虚拟机.md","localizedDate":"2024年4月12日","autoDesc":true}');export{l as comp,g as data};

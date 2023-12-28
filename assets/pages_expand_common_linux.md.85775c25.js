import{_ as s,o as n,c as a,S as l}from"./chunks/framework.5a1651ed.js";const u=JSON.parse('{"title":"linux","description":"","frontmatter":{"title":"linux","order":2},"headers":[],"relativePath":"pages/expand/common/linux.md","filePath":"pages/expand/common/linux.md","lastUpdated":1683982947000}'),p={name:"pages/expand/common/linux.md"},e=l(`<h1 id="linux" tabindex="-1">linux <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;linux&quot;">​</a></h1><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">## 新建文件</span></span>
<span class="line"><span style="color:#FFCB6B;">touch</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">fil</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">## 新建文件夹</span></span>
<span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">folde</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="批量替换内容" tabindex="-1">批量替换内容 <a class="header-anchor" href="#批量替换内容" aria-label="Permalink to &quot;批量替换内容&quot;">​</a></h2><p>语法</p><div class="language-v line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">v</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">addr</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">源字符串</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">目的字符串</span><span style="color:#89DDFF;">/[</span><span style="color:#A6ACCD;">option</span><span style="color:#89DDFF;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>[addr]</code>：表示检索范围，省略时表示当前行</p><p>“1,20” ：表示从第 1 行到 20 行；</p><p>“%” ：表示整个文件，同“1,$”；</p><p>“. ,$” ：从当前行到文件尾；</p><p><code>s</code>：表示替换操作</p><p><code>[option]</code>：操作类型</p><p>g - 全局替换;</p><p>c - 进行确认</p><p>p - 替代结果逐行显示</p><blockquote><p>省略 option 时仅对每行第一个匹配串进行替换</p></blockquote><p>全局替换</p><div class="language-v line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">v</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">源字符串</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">目的字符串</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">g</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>替换示例</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 将That or this 换成 This or that</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;">%s/\\(That\\) </span><span style="color:#C3E88D;">or</span><span style="color:#A6ACCD;"> \\(</span><span style="color:#C3E88D;">this</span><span style="color:#A6ACCD;">\\)</span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;">\\u\\2 </span><span style="color:#C3E88D;">or</span><span style="color:#A6ACCD;"> \\l\\1</span><span style="color:#C3E88D;">/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将句尾的child换成children</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;">%s/child\\([ </span><span style="color:#C3E88D;">,.</span><span style="color:#89DDFF;">;!</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;">?]\\)/children\\1/g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将mgi/r/abox换成mgi/r/asquare</span></span>
<span class="line"><span style="color:#FFCB6B;">:g/mg\\([ira]\\</span><span style="color:#A6ACCD;">)box/s//mg//my\\1square/g    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">:g/mg[ira]box/s/box/square/g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将多个空格换成一个空格</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;">%s/  </span><span style="color:#A6ACCD;">*</span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 使用空格替换句号或者冒号后面的一个或者多个空格</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;">%s/\\([</span><span style="color:#82AAFF;">:.</span><span style="color:#A6ACCD;">]\\)  </span><span style="color:#A6ACCD;">*</span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;">\\1 </span><span style="color:#C3E88D;">/g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 删除所有空行</span></span>
<span class="line"><span style="color:#FFCB6B;">:g/^$/d</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 删除所有的空白行和空行</span></span>
<span class="line"><span style="color:#FFCB6B;">:g/^[</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">][</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">]</span><span style="color:#A6ACCD;">*</span><span style="color:#A6ACCD;">$</span><span style="color:#C3E88D;">/d</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 在每行的开始插入两个空白</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;">%s/^/&gt;  </span><span style="color:#C3E88D;">/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 在接下来的6行末尾加入.</span></span>
<span class="line"><span style="color:#82AAFF;">:.</span><span style="color:#A6ACCD;">,5/$/./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 颠倒文件的行序</span></span>
<span class="line"><span style="color:#FFCB6B;">:g/.*/m0O</span><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">:g/^/m0O</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 寻找不是数字的开始行,并将其移到文件尾部</span></span>
<span class="line"><span style="color:#FFCB6B;">:g!/^[0-9]/m$</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">g/^[^0-9]/m</span><span style="color:#A6ACCD;">$</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将文件的第12到17行内容复制10词放到当前文件的尾部</span></span>
<span class="line"><span style="color:#FFCB6B;">:1,10g/^/12,17t$</span></span>
<span class="line"><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">~~~重复次数的作用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将chapter开始行下面的第二行的内容写道begin文件中</span></span>
<span class="line"><span style="color:#FFCB6B;">:g/^chapter/.+2w&gt;&gt;begin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">:/^part2/,/^part3/g/^chapter/.+2w&gt;&gt;begin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">:/^part2/,/^part3/g/^chapter/.+2w&gt;&gt;begin</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">+t$</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>参考：<a href="https://www.cnblogs.com/beenoisy/p/4046074.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/beenoisy/p/4046074.html</a></p><h2 id="行号" tabindex="-1">行号 <a class="header-anchor" href="#行号" aria-label="Permalink to &quot;行号&quot;">​</a></h2><p>打开 vim 编译器，进入命令行模式，输入如下内容</p><div class="language-v line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">v</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">:set nu</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>打开 vim 编译器，进入命令行模式，输入如下内容</p><div class="language-v line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">v</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">:set nonu</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>以上方式都是临时</p></blockquote><h3 id="永久显示行号" tabindex="-1">永久显示行号 <a class="header-anchor" href="#永久显示行号" aria-label="Permalink to &quot;永久显示行号&quot;">​</a></h3><div class="language-v line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">v</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">vim </span><span style="color:#89DDFF;">~/.</span><span style="color:#A6ACCD;">vimrc</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在 .vimrc 中追加如下内容</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">:set num</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="反向搜索" tabindex="-1">反向搜索 <a class="header-anchor" href="#反向搜索" aria-label="Permalink to &quot;反向搜索&quot;">​</a></h2><ol><li>按下 Ctrl + R，进入反向搜索</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Ambit@myqz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MINGW64</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~</span></span>
<span class="line"><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">reverse-i-search</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">&#39;:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="2"><li>输入 git，显示历史命令中一条匹配</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Ambit@myqz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MINGW64</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~</span></span>
<span class="line"><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">reverse-i-search</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">git&#39;: git branch -a</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3"><li>再次按下 Ctrl + R，继续向前搜索</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#FFCB6B;">Ambit@myqz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MINGW64</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~</span></span>
<span class="line"><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">reverse-i-search</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">git&#39;: git diff</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="4"><li>按下 右方向键（<code>-&gt;</code>）或 <code>esc</code> ,退出搜索模式</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#FFCB6B;">Ambit@myqz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MINGW64</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">diff</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,40),o=[e];function r(c,t,i,b,y,C){return n(),a("div",null,o)}const m=s(p,[["render",r]]);export{u as __pageData,m as default};
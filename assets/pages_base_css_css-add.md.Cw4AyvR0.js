import{_ as s,c as i,o as a,a5 as n}from"./chunks/framework.XlwyxPMj.js";const l="/assets/xian.CauRA3EV.jpg",b=JSON.parse('{"title":"CSS 知识扩展","description":"","frontmatter":{"title":"CSS 知识扩展","order":4},"headers":[],"relativePath":"pages/base/css/css-add.md","filePath":"pages/base/css/css-add.md","lastUpdated":1711813192000}'),e={name:"pages/base/css/css-add.md"},t=n(`<h1 id="css-知识扩展" tabindex="-1">CSS 知识扩展 <a class="header-anchor" href="#css-知识扩展" aria-label="Permalink to &quot;CSS 知识扩展&quot;">​</a></h1><h2 id="bfc" tabindex="-1">BFC <a class="header-anchor" href="#bfc" aria-label="Permalink to &quot;BFC&quot;">​</a></h2><p>BFC(Block formatting context)：&quot;块级格式化上下文&quot;。它是一个独立的渲染区域，只有 Block-level box 参与</p><p>哪些情况会产生 BFC:</p><ol><li>根元素</li><li>float 属性不为 none</li><li>position 为 absolute 或 fixed</li><li>display 为 inline-block, table-cell, table-caption, flex, inline-flex</li><li>overflow 不为 visible</li></ol><h2 id="光标形状-cursor" tabindex="-1">光标形状 cursor <a class="header-anchor" href="#光标形状-cursor" aria-label="Permalink to &quot;光标形状 cursor&quot;">​</a></h2><p><code>cursor:值</code></p><table><thead><tr><th>属性值</th><th>描述</th></tr></thead><tbody><tr><td><code>default</code></td><td>箭头（默认）</td></tr><tr><td><code>pointer</code></td><td>小手</td></tr><tr><td><code>move</code></td><td>移动</td></tr><tr><td><code>text</code></td><td>文本</td></tr><tr><td><code>not-allowed</code></td><td>禁止</td></tr><tr><td><code>help</code></td><td>问号</td></tr><tr><td><code>url()</code></td><td>临时替换样式<br><code>cursor:url(&#39;*.ico&#39;),auto;</code></td></tr></tbody></table><h2 id="轮廓线-outline" tabindex="-1">轮廓线 outline <a class="header-anchor" href="#轮廓线-outline" aria-label="Permalink to &quot;轮廓线 outline&quot;">​</a></h2><p><code>outline:值</code></p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">outline: </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">outline-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ||</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">outline-style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> || </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">outline-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>应用： <code>outline: 0;</code> 或者 <code>outline: none;</code></p><h2 id="元素可见性" tabindex="-1">元素可见性 <a class="header-anchor" href="#元素可见性" aria-label="Permalink to &quot;元素可见性&quot;">​</a></h2><p><code>visibility:值</code> （<strong>占空间</strong>）</p><ul><li>hidden 隐藏</li><li>visible 可见</li></ul><p><code>display:none</code>（<strong>不占空间</strong>）</p><blockquote><p>应用：js 特效，下拉菜单</p></blockquote><p><code>overflow:值</code></p><ul><li><strong>auto</strong>：内容溢出时，生成滚动条（<strong>默认</strong>）</li><li><strong>hidden</strong>：内容溢出时超出部分隐藏</li><li><strong>scroll</strong>：右边和下边都有滚动条</li><li><strong>visible</strong>（默认）：不剪切内容，也不加滚动条</li></ul><blockquote><p>水平方向溢出可以使用 overflow-x，纵向溢出使用 overflow-y</p><p>应用：清除浮动，保证内容不超出盒子</p></blockquote><h2 id="行内文字溢出省略号显示" tabindex="-1">行内文字溢出省略号显示 <a class="header-anchor" href="#行内文字溢出省略号显示" aria-label="Permalink to &quot;行内文字溢出省略号显示&quot;">​</a></h2><p><code>white-space</code>：设置或检索对象内文本显示方式</p><ul><li><strong>normal</strong> - 默认</li><li><strong>nowarp</strong> - 一行显示（直到文本结束 or br 标签）</li></ul><p><code>text-overflow</code>：设置或检索是否使用一个省略标记</p><ul><li><strong>clip</strong>：不显示</li><li><strong>ellipsis</strong>：溢出省略号显示</li></ul><h3 id="单行溢出" tabindex="-1">单行溢出 <a class="header-anchor" href="#单行溢出" aria-label="Permalink to &quot;单行溢出&quot;">​</a></h3><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">overflow: hidden;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">white-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: nowrap; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 设置文本不换行，单行显示 */</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">text-overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: ellipsis; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 超出的文本使用省略号代替 */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="多行溢出省略号" tabindex="-1">多行溢出省略号 <a class="header-anchor" href="#多行溢出省略号" aria-label="Permalink to &quot;多行溢出省略号&quot;">​</a></h3><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">display: -webkit-box; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*弹性伸缩盒子模型*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-webkit-box-orient: vertical; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*伸缩盒子子排列方式*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-webkit-line-clamp: 3; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*设置显示文本行数*/</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">text-overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: ellipsis;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">overflow: hidden;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="多栏布局" tabindex="-1">多栏布局 <a class="header-anchor" href="#多栏布局" aria-label="Permalink to &quot;多栏布局&quot;">​</a></h2><p><strong>分栏显示</strong>：<code>column-count:值</code></p><ul><li>值：栏目的数量</li></ul><p><strong>多栏隔断框</strong>：<code>column-rule:值</code></p><ul><li>取值同边框</li></ul><p><strong>每一栏的宽度</strong>：<code>column-width:值</code></p><h2 id="对齐" tabindex="-1">对齐 <a class="header-anchor" href="#对齐" aria-label="Permalink to &quot;对齐&quot;">​</a></h2><h3 id="水平居中" tabindex="-1">水平居中 <a class="header-anchor" href="#水平居中" aria-label="Permalink to &quot;水平居中&quot;">​</a></h3><table><thead><tr><th></th><th>margin:0 auto；</th><th>text-align:center;</th></tr></thead><tbody><tr><td>针对的对象</td><td>块元素</td><td>行元素和行内块</td></tr><tr><td>居中的范围</td><td>盒子本身</td><td>盒子中的文字和行内块</td></tr></tbody></table><h3 id="垂直居中" tabindex="-1">垂直居中 <a class="header-anchor" href="#垂直居中" aria-label="Permalink to &quot;垂直居中&quot;">​</a></h3><p>只针对<strong>行内元素或行内块元素</strong></p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">vertical-align</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: baseline |top |middle |bottom;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>设置在 img 上</p></blockquote><p><strong>应用</strong>：图片/表单与文字的对齐</p><img src="`+l+`" alt="xian" style="zoom:67%;"><h4 id="垂直居中补充" tabindex="-1">垂直居中补充 <a class="header-anchor" href="#垂直居中补充" aria-label="Permalink to &quot;垂直居中补充&quot;">​</a></h4><h5 id="table" tabindex="-1">table <a class="header-anchor" href="#table" aria-label="Permalink to &quot;table&quot;">​</a></h5><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">parent {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">child {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">table-cell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  vertical-align</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">middle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h5 id="弹性布局" tabindex="-1">弹性布局 <a class="header-anchor" href="#弹性布局" aria-label="Permalink to &quot;弹性布局&quot;">​</a></h5><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">parent {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  align-items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h5 id="定位" tabindex="-1">定位 <a class="header-anchor" href="#定位" aria-label="Permalink to &quot;定位&quot;">​</a></h5><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">parent {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">relative</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">child {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">absolute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  transform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">translateY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h5 id="伪元素" tabindex="-1">伪元素 <a class="header-anchor" href="#伪元素" aria-label="Permalink to &quot;伪元素&quot;">​</a></h5><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">parent</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:after</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">inline-block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  vertical-align</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">middle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">child {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">inline-block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  vertical-align</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">middle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="图片底侧空白缝隙问题" tabindex="-1"><strong>图片底侧空白缝隙</strong>问题 <a class="header-anchor" href="#图片底侧空白缝隙问题" aria-label="Permalink to &quot;**图片底侧空白缝隙**问题&quot;">​</a></h3><p>原因：图片或者表单等行内块元素，他的<strong>底线会和父级盒子的基线对齐</strong></p><ul><li>设置图片对齐方式(除了 baseline) - <code>vertical-align:middle | top| bottom</code></li><li>将图片转为块级，<strong>垂直对齐对块级无效</strong> - <code>display:block</code></li></ul><h2 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h2><p><strong>去掉文本域自动拉伸</strong>：<code>resize:none;</code></p><p><strong>透明度</strong>：<code>opacity:值</code> （ 0 - 1）</p><p><strong>背景透明</strong>：<code>rgba(值1，值2，值3，值4)</code></p><ul><li>值 123：颜色（0-255）</li><li>值 4：透明度</li></ul>`,61),p=[t];function h(r,d,k,o,c,E){return a(),i("div",null,p)}const u=s(e,[["render",h]]);export{b as __pageData,u as default};
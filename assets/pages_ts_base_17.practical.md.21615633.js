import{_ as s,c as a,o as n,Q as e}from"./chunks/framework.047f4c6e.js";const A=JSON.parse('{"title":"实战","description":"","frontmatter":{"outline":"deep","title":"实战","order":17},"headers":[],"relativePath":"pages/ts/base/17.practical.md","lastUpdated":1678983192000}'),l={name:"pages/ts/base/17.practical.md"},p=e(`<h1 id="实战" tabindex="-1">实战 <a class="header-anchor" href="#实战" aria-label="Permalink to &quot;实战&quot;">​</a></h1><h2 id="number-值赋空" tabindex="-1">number 值赋空 <a class="header-anchor" href="#number-值赋空" aria-label="Permalink to &quot;number 值赋空&quot;">​</a></h2><p>场景：下拉选项中 value 为 string 或 number。</p><ul><li><p>value 是 string 类型，赋值 <code>&#39;&#39;</code>。</p></li><li><p>value 是 number 类型，赋值为 0，会影响初始值显示，赋值为 null，后面无法赋值 number，因为已被解析为 null 类型。</p></li></ul><p>解决：赋值为可选类型</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">option</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">optionId</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="可选和函数默认值冲突" tabindex="-1">可选和函数默认值冲突 <a class="header-anchor" href="#可选和函数默认值冲突" aria-label="Permalink to &quot;可选和函数默认值冲突&quot;">​</a></h2><p>问题：可选符和默认值同时存在产生冲突</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">useTable</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> TableOptions </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// error: Parameter cannot have question mark and initializer.ts(1015)</span></span>
<span class="line"></span></code></pre></div><p>解决：去掉可选符</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">useTable(</span></span>
<span class="line"><span style="color:#A6ACCD;">  options: TableOptions = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">) =&gt; {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,11),t=[p];function o(c,r,i,d,C,u){return n(),a("div",null,t)}const h=s(l,[["render",o]]);export{A as __pageData,h as default};
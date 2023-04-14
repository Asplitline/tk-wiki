import{_ as s,c as a,o as l,Q as n}from"./chunks/framework.8adc4ca2.js";const d=JSON.parse('{"title":"babel","description":"","frontmatter":{"title":"babel","order":1},"headers":[],"relativePath":"pages/js/es6/1.babel.md","lastUpdated":1681461464000}'),e={name:"pages/js/es6/1.babel.md"},p=n(`<h1 id="babel" tabindex="-1">Babel <a class="header-anchor" href="#babel" aria-label="Permalink to &quot;Babel&quot;">​</a></h1><p><a href="https://babeljs.io/" target="_blank" rel="noreferrer">Babel</a> 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@babel/core</span></span></code></pre></div><h2 id="配置文件-babelrc" tabindex="-1">配置文件 - .babelrc <a class="header-anchor" href="#配置文件-babelrc" aria-label="Permalink to &quot;配置文件 - .babelrc&quot;">​</a></h2><p>存放根目录下</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">presets</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">plugins</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: []</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p><code>presets</code>字段设定转码规则，官方提供以下的规则集</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 最新转码规则</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@babel/preset-env</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># react 转码规则</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@babel/preset-react</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">presets</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: [</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@babel/env</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@babel/preset-react</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">plugins</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: []</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="babel-cli" tabindex="-1">@babel/cli <a class="header-anchor" href="#babel-cli" aria-label="Permalink to &quot;@babel/cli&quot;">​</a></h2><p>Babel 提供命令行工具<code>@babel/cli</code>，用于命令行转码</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@babel/cli</span></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 转码结果输出到标准输出</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">babel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">example.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 转码结果写入一个文件</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># --out-file 或 -o 参数指定输出文件</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">babel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">example.js</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--out-file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compiled.js</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 或者</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">babel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">example.js</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compiled.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 整个目录转码</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># --out-dir 或 -d 参数指定输出目录</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">babel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--out-dir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lib</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 或者</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">babel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -s 参数生成source map文件</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">babel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lib</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span></span></code></pre></div><h2 id="babel-node" tabindex="-1">@babel/node <a class="header-anchor" href="#babel-node" aria-label="Permalink to &quot;@babel/node&quot;">​</a></h2><p><code>@babel/node</code>模块的<code>babel-node</code>命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@babel/node</span></span></code></pre></div><p>进入 REPL 环境</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npx babel</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">node</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#F78C6C;">2</span></span></code></pre></div><p>运行脚本</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npx babel</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">node es6</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js</span></span>
<span class="line"><span style="color:#F78C6C;">2</span></span></code></pre></div><h2 id="babel-register" tabindex="-1">@babel/register <a class="header-anchor" href="#babel-register" aria-label="Permalink to &quot;@babel/register&quot;">​</a></h2><p><code>@babel/register</code>模块改写<code>require</code>命令，为它加上一个钩子。此后，每当使用<code>require</code>加载<code>.js</code>、<code>.jsx</code>、<code>.es</code>和<code>.es6</code>后缀名的文件，就会先用 Babel 进行转码。</p><ul><li>只会对 require 加载命令转码</li><li>实时转码，只适合开发环境</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@babel/register</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// index.js</span></span>
<span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@babel/register</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./es6.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">node index</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js</span></span>
<span class="line"><span style="color:#F78C6C;">2</span></span></code></pre></div><h2 id="babel-standalone" tabindex="-1">@babel/standalone <a class="header-anchor" href="#babel-standalone" aria-label="Permalink to &quot;@babel/standalone&quot;">​</a></h2><p>Babel 也可以用于浏览器环境</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://unpkg.com/@babel/standalone/babel.min.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/babel</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Your ES6 code</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="ployfill" tabindex="-1">ployfill <a class="header-anchor" href="#ployfill" aria-label="Permalink to &quot;ployfill&quot;">​</a></h2><p>Babel 默认转 Javascript 语法，而不转 API，如 Proxy、Set、Map 等全局对象</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">core-js</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">regenerator-runtime</span></span></code></pre></div><p>示例：Array.from 的 Babel 支持，使用<code>core-js</code>和<code>regenerator-runtime</code>(后者提供 generator 函数的转码)，为当前环境提供一个垫片</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">core-js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">regenerator-runtime/runtime</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 进行 generator 函数转码</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 或者</span></span>
<span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">core-js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">regenerator-runtime/runtime</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>Babel 默认不转码的 AP 可以查看<code>babel-plugin-transform-runtime</code>模块的<a href="https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/runtime-corejs3-definitions.js" target="_blank" rel="noreferrer">definitions.js</a>文件。</p><h2 id="相关链接" tabindex="-1">相关链接 <a class="header-anchor" href="#相关链接" aria-label="Permalink to &quot;相关链接&quot;">​</a></h2><p><a href="https://wangdoc.com/es6/intro.html" target="_blank" rel="noreferrer">[-] babel</a></p>`,37),o=[p];function t(c,r,i,y,C,D){return l(),a("div",null,o)}const F=s(e,[["render",t]]);export{d as __pageData,F as default};
import{_ as a,c as s,o as e,Q as l}from"./chunks/framework.7addaa9c.js";const u=JSON.parse('{"title":"介绍","description":"","frontmatter":{"title":"介绍","order":1},"headers":[],"relativePath":"pages/ts/base/1.intro.md","lastUpdated":1680364911000}'),t={name:"pages/ts/base/1.intro.md"},o=l('<h1 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h1><p>TypeScript 是 JavaScript 的超集，因为它扩展了 JavaScript</p><h2 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h2><ul><li>最新的 JavaScript 特性</li><li>代码<strong>静态检查</strong></li><li>支持诸如 C,C++,Java,Go 等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)</li></ul><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><ol><li>安装 typescript</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">typescript</span></span></code></pre></div><ol start="2"><li>安装 ts-node - ts 在 nodejs 上面执行</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ts-node</span></span></code></pre></div><ol start="3"><li>创建一个 tsconfig.json 文件</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">tsc</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--init</span></span></code></pre></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><h3 id="tsconfig-json" tabindex="-1">tsconfig.json <a class="header-anchor" href="#tsconfig-json" aria-label="Permalink to &quot;tsconfig.json&quot;">​</a></h3><p>tsconfig.json 是 TypeScript 项目的配置文件。包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。</p><p>重要字段</p><ul><li>files - 要编译的文件的名称；</li><li>include - 需要进行编译的文件，支持路径模式匹配；</li><li>exclude - 无需进行编译的文件，支持路径模式匹配；</li><li>compilerOptions - 编译流程相关的选项</li></ul><blockquote><p><a href="https://www.typescriptlang.org/tsconfig#compilerOptions" target="_blank" rel="noreferrer">https://www.typescriptlang.org/tsconfig#compilerOptions</a></p></blockquote>',17),n=[o];function p(i,r,c,d,h,C){return e(),s("div",null,n)}const y=a(t,[["render",p]]);export{u as __pageData,y as default};

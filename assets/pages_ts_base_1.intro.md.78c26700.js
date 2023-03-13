import{_ as s,c as a,o as e,a as l}from"./app.972d4c24.js";const u=JSON.parse('{"title":"介绍","description":"","frontmatter":{"title":"介绍","order":1},"headers":[{"level":2,"title":"特点","slug":"特点","link":"#特点","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[{"level":3,"title":"tsconfig.json","slug":"tsconfig-json","link":"#tsconfig-json","children":[]}]}],"relativePath":"pages/ts/base/1.intro.md","lastUpdated":1662219657000}'),n={name:"pages/ts/base/1.intro.md"},t=l(`<h1 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-hidden="true">#</a></h1><p>TypeScript 是 JavaScript 的超集，因为它扩展了 JavaScript</p><h2 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-hidden="true">#</a></h2><ul><li>最新的 JavaScript 特性</li><li>代码<strong>静态检查</strong></li><li>支持诸如 C,C++,Java,Go 等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)</li></ul><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h2><ol><li>安装 typescript</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">typescript</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>安装 ts-node - ts 在 nodejs 上面执行</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ts-node</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>创建一个 tsconfig.json 文件</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">tsc</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--init</span></span>
<span class="line"></span></code></pre></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-hidden="true">#</a></h2><h3 id="tsconfig-json" tabindex="-1">tsconfig.json <a class="header-anchor" href="#tsconfig-json" aria-hidden="true">#</a></h3><p>tsconfig.json 是 TypeScript 项目的配置文件。包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。</p><p>重要字段</p><ul><li>files - 要编译的文件的名称；</li><li>include - 需要进行编译的文件，支持路径模式匹配；</li><li>exclude - 无需进行编译的文件，支持路径模式匹配；</li><li>compilerOptions - 编译流程相关的选项</li></ul><blockquote><p><a href="https://www.typescriptlang.org/tsconfig#compilerOptions" target="_blank" rel="noreferrer">https://www.typescriptlang.org/tsconfig#compilerOptions</a></p></blockquote>`,17),o=[t];function i(p,c,r,d,h,g){return e(),a("div",null,o)}const y=s(n,[["render",i]]);export{u as __pageData,y as default};
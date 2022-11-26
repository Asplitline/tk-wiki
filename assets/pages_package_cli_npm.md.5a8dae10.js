import{_ as s,c as n,o as a,d as l}from"./app.ca898a0e.js";const C=JSON.parse('{"title":"npm","description":"","frontmatter":{"title":"npm","order":1},"headers":[{"level":2,"title":"config - \u914D\u7F6E","slug":"config-\u914D\u7F6E","link":"#config-\u914D\u7F6E","children":[{"level":3,"title":"\u901A\u8FC7 npm config \u4FEE\u6539","slug":"\u901A\u8FC7-npm-config-\u4FEE\u6539","link":"#\u901A\u8FC7-npm-config-\u4FEE\u6539","children":[]},{"level":3,"title":"\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539","slug":"\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539","link":"#\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539","children":[]}]},{"level":2,"title":"install - \u5B89\u88C5","slug":"install-\u5B89\u88C5","link":"#install-\u5B89\u88C5","children":[]},{"level":2,"title":"env - \u73AF\u5883\u53D8\u91CF","slug":"env-\u73AF\u5883\u53D8\u91CF","link":"#env-\u73AF\u5883\u53D8\u91CF","children":[]},{"level":2,"title":"other - \u5176\u4ED6","slug":"other-\u5176\u4ED6","link":"#other-\u5176\u4ED6","children":[]},{"level":2,"title":"publish - \u53D1\u5E03","slug":"publish-\u53D1\u5E03","link":"#publish-\u53D1\u5E03","children":[{"level":3,"title":"\u76EE\u5F55\u7ED3\u6784","slug":"\u76EE\u5F55\u7ED3\u6784","link":"#\u76EE\u5F55\u7ED3\u6784","children":[]},{"level":3,"title":"\u53D1\u5E03\u5305","slug":"\u53D1\u5E03\u5305","link":"#\u53D1\u5E03\u5305","children":[]}]},{"level":2,"title":"package.json","slug":"package-json","link":"#package-json","children":[{"level":3,"title":"resolutions - \u9009\u62E9\u6027\u4F9D\u8D56","slug":"resolutions-\u9009\u62E9\u6027\u4F9D\u8D56","link":"#resolutions-\u9009\u62E9\u6027\u4F9D\u8D56","children":[]}]},{"level":2,"title":"\u76F8\u5173\u94FE\u63A5","slug":"\u76F8\u5173\u94FE\u63A5","link":"#\u76F8\u5173\u94FE\u63A5","children":[]}],"relativePath":"pages/package/cli/npm.md"}'),p={name:"pages/package/cli/npm.md"},o=l(`<h1 id="npm" tabindex="-1">npm <a class="header-anchor" href="#npm" aria-hidden="true">#</a></h1><h2 id="config-\u914D\u7F6E" tabindex="-1">config - \u914D\u7F6E <a class="header-anchor" href="#config-\u914D\u7F6E" aria-hidden="true">#</a></h2><h3 id="\u901A\u8FC7-npm-config-\u4FEE\u6539" tabindex="-1">\u901A\u8FC7 npm config \u4FEE\u6539 <a class="header-anchor" href="#\u901A\u8FC7-npm-config-\u4FEE\u6539" aria-hidden="true">#</a></h3><ul><li><code>proxy, https-proxy</code>\uFF1A\u6307\u5B9A npm \u4F7F\u7528\u7684\u4EE3\u7406</li><li><code>registry</code>\uFF1A \u6307\u5B9A <code>npm</code> \u4E0B\u8F7D\u5B89\u88C5\u5305\u65F6\u7684\u6E90</li><li><code>package-lock</code> \uFF1A\u662F\u5426\u9ED8\u8BA4\u751F\u6210 <code>package-lock</code> \u6587\u4EF6\uFF08\u9ED8\u8BA4 true\uFF09</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#676E95;"># \u6DD8\u5B9D\u6E90</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> registry http://registry.npm.taobao.org/</span></span>
<span class="line"><span style="color:#676E95;"># \u5B98\u65B9\u6E90</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> registry https://registry.npmjs.org/</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#676E95;"># \u67E5\u770Bnpm\u914D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config ls</span></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u914D\u7F6E\u9879</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config get </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;"># \u8BBE\u7F6E\u914D\u7F6E\u9879</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;"># \u5220\u9664\u914D\u7F6E\u9879</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config delete </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539" tabindex="-1">\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539 <a class="header-anchor" href="#\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539" aria-hidden="true">#</a></h3><p><code>npmrc</code> \u6587\u4EF6</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#676E95;"># \u4F7F\u7528 \u547D\u4EE4 \u6253\u5F00 npmrc</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config edit </span><span style="color:#676E95;"># \u5C40\u90E8</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config edit -g </span><span style="color:#676E95;"># \u5168\u5C40\u914D\u7F6E\u6587\u4EF6</span></span>
<span class="line"></span></code></pre></div><p>\u91CD\u65B0\u521D\u59CB\u5316\u9ED8\u8BA4\u8BBE\u7F6E</p><ul><li><p>\u7B2C\u4E00\u884C\u7528\u7A7A\u5B57\u7B26\u4E32\u66FF\u6362\u914D\u7F6E\u6587\u4EF6</p></li><li><p>\u7B2C\u4E8C\u884C\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u91CD\u65B0\u586B\u5145\u914D\u7F6E\u6587\u4EF6</p></li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#676E95;"># \u5C40\u90E8</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">npm config get userconfig</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config edit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5168\u5C40</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">npm config get globalconfig</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config --global edit</span></span>
<span class="line"></span></code></pre></div><p><strong>\u6587\u4EF6\u4F18\u5148\u7EA7</strong> - \u4ECE\u9AD8\u5230\u4F4E</p><ul><li>\u5DE5\u7A0B\u5185\uFF1A<code>/path/to/my/project/.npmrc</code></li><li>\u7528\u6237\u7EA7\uFF1A<code>~/.npmrc</code></li><li>\u5168\u5C40\u914D\u7F6E\uFF1A<code>$PREFIX/etc/npmrc</code></li><li>npm \u5185\u7F6E\u914D\u7F6E\u6587\u4EF6\uFF1A<code>/path/to/npm/npmrc</code></li></ul><p>\u53EF\u4EE5\u914D\u7F6E\u72EC\u6709\u7684\u6E90\uFF0C\u5982\uFF1A\u516C\u53F8\u5185\u7F51\u9700\u8981\u901A\u8FC7\u4EE3\u7406\u624D\u80FD\u8BBF\u95EE<code>npm</code>\u6E90\uFF0C\u521B\u5EFA\u4E00\u4E2A <code>.npmrc</code> \u6587\u4EF6\u6765\u5171\u4EAB\u9700\u8981\u5728\u56E2\u961F\u95F4\u5171\u4EAB\u7684 <code>npm</code> \u8FD0\u884C\u76F8\u5173\u914D\u7F6E\u3002</p><p>\u5E76\u4E14\u4F5C\u7528\u57DF\u4E3A\u9879\u76EE\u7EA7\uFF0C\u66F4\u597D\u9694\u79BB\u516C\u53F8\u548C\u4E2A\u4EBA</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#A6ACCD;">proxy = http://proxy.example.com/</span></span>
<span class="line"><span style="color:#A6ACCD;">https-proxy = http://proxy.example.com/</span></span>
<span class="line"><span style="color:#A6ACCD;">registry = http://registry.example.com/</span></span>
<span class="line"></span></code></pre></div><h2 id="install-\u5B89\u88C5" tabindex="-1">install - \u5B89\u88C5 <a class="header-anchor" href="#install-\u5B89\u88C5" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#676E95;"># \u5F00\u53D1\u4F9D\u8D56</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> --save-dev </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> -D</span></span>
<span class="line"><span style="color:#676E95;"># \u751F\u4EA7\u4F9D\u8D56</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> --save-prod </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> -P</span></span>
<span class="line"><span style="color:#676E95;"># \u91CD\u65B0\u4E0B\u8F7D\u6240\u6709\u5305</span></span>
<span class="line"><span style="color:#A6ACCD;">npm run rebuild</span></span>
<span class="line"></span></code></pre></div><h2 id="env-\u73AF\u5883\u53D8\u91CF" tabindex="-1">env - \u73AF\u5883\u53D8\u91CF <a class="header-anchor" href="#env-\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#676E95;"># \u5217\u51FA\u6240\u6709\u73AF\u5883\u53D8\u91CF</span></span>
<span class="line"><span style="color:#A6ACCD;">npm run env</span></span>
<span class="line"><span style="color:#676E95;"># \u8F93\u51FA\u73AF\u5883\u53D8\u91CF</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> PATH</span></span>
<span class="line"><span style="color:#676E95;"># \u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF - \u7EDD\u5BF9</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> PATH = /usr/local/lib</span></span>
<span class="line"><span style="color:#676E95;"># \u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF - \u76F8\u5BF9</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> PATH = </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">pwd</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">/lib/include  </span><span style="color:#676E95;"># \u4F7F\u7528\${},\u4E5F\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u53CC\u5F15\u53F7</span></span>
<span class="line"></span></code></pre></div><h2 id="other-\u5176\u4ED6" tabindex="-1">other - \u5176\u4ED6 <a class="header-anchor" href="#other-\u5176\u4ED6" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#676E95;"># \u67E5\u770B\u5305\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">npm info axios</span></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u6587\u6863</span></span>
<span class="line"><span style="color:#A6ACCD;">npm docs axios</span></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u6E90\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;">npm repo axios</span></span>
<span class="line"><span style="color:#676E95;"># \u6E05\u9664\u7F13\u5B58</span></span>
<span class="line"><span style="color:#A6ACCD;">npm cache clean --force</span></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">npm view axios versions</span></span>
<span class="line"></span></code></pre></div><h2 id="publish-\u53D1\u5E03" tabindex="-1">publish - \u53D1\u5E03 <a class="header-anchor" href="#publish-\u53D1\u5E03" aria-hidden="true">#</a></h2><h3 id="\u76EE\u5F55\u7ED3\u6784" tabindex="-1">\u76EE\u5F55\u7ED3\u6784 <a class="header-anchor" href="#\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a></h3><p>\u5305\u542B\u4EE5\u4E0B\u76EE\u5F55\uFF1A</p><p><code>bin</code>\uFF1A\u53EF\u6267\u884C\u4E8C\u8FDB\u5236\u6587\u4EF6</p><p><code>lib</code>\uFF1Ajs \u4EE3\u7801</p><p><code>doc</code>\uFF1A\u6587\u6863</p><p><code>test</code>\uFF1A\u5355\u5143\u6D4B\u8BD5\u7528\u4F8B\u4EE3\u7801</p><h3 id="\u53D1\u5E03\u5305" tabindex="-1">\u53D1\u5E03\u5305 <a class="header-anchor" href="#\u53D1\u5E03\u5305" aria-hidden="true">#</a></h3><ol><li>\u6CE8\u518C npm \u8D26\u53F7</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm adduser </span><span style="color:#676E95;">#\u6839\u636E\u63D0\u793A\u8F93\u5165\u7528\u6237\u540D\u5BC6\u7801\u5373\u53EF</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>\u4F7F\u7528\u547D\u4EE4\u53D1\u5E03\u4F60\u7684\u5305</li></ol><p>\u901A\u8FC7\u914D\u7F6E\u4E00\u4E2A <code>.npmignore</code> \u6587\u4EF6\u6765\u6392\u9664\u4E00\u4E9B\u6587\u4EF6, \u9632\u6B62\u5927\u91CF\u7684\u5783\u573E\u6587\u4EF6\u63A8\u9001\u5230 <code>npm</code>\u3002</p><p><code>.gitignore</code> \u6587\u4EF6\u4E5F\u53EF\u4EE5\u5145\u5F53 <code>.npmignore</code> \u6587\u4EF6</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm publish</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>\u5B89\u88C5</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm install </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">package_name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><ol start="4"><li>\u66F4\u65B0\u5305</li></ol><p>\u4F7F\u7528 <code>npm publish</code> \u547D\u4EE4\u53D1\u5E03\uFF0C\u4E0D\u8FC7<strong>\u5FC5\u987B\u66F4\u6539 npm \u5305\u7684\u7248\u672C\u53F7</strong></p><h2 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-hidden="true">#</a></h2><h3 id="resolutions-\u9009\u62E9\u6027\u4F9D\u8D56" tabindex="-1">resolutions - \u9009\u62E9\u6027\u4F9D\u8D56 <a class="header-anchor" href="#resolutions-\u9009\u62E9\u6027\u4F9D\u8D56" aria-hidden="true">#</a></h3><p>resolutions \uFF1A\u9009\u62E9\u6027\u4F9D\u8D56\uFF0C\u63A7\u5236\u4F9D\u8D56\u7684\u7248\u672C</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">project</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">version</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dependencies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">left-pad</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">file:../c-1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">d2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">file:../d2-1</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">resolutions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">d2/left-pad</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1.1.1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">c/**/left-pad</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^1.1.2</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u76F4\u63A5\u4F9D\u8D56\uFF08<code>foo/bar</code>\uFF09\uFF1Afoo \u7684<strong>\u76F4\u63A5</strong>\u4F9D\u8D56 bar\uFF0C\u6307\u5411\u58F0\u660E\u7248\u672C</p><p>\u95F4\u63A5\u4F9D\u8D56\uFF08<code>foo/**/bar</code>\uFF09\uFF1Afoo \u7684<strong>\u95F4\u63A5</strong>\u4F9D\u8D56 bar\uFF0C\u6307\u5411\u58F0\u660E\u7248\u672C</p><p>\u6240\u6709\uFF08<code>bar</code>\uFF09\uFF1A<strong>\u4E0D\u7BA1\u4F4D\u7F6E</strong>\uFF0C\u4F9D\u8D56<code>bar</code>\u90FD\u4F1A\u6307\u5411\u58F0\u660E\u7248\u672C</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">resolutions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u6240\u6709\u4F9D\u8D56bar\uFF0C1.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">foo/bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">// \uFF0C1.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">foo/**/bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1.0.0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u76F8\u5173\u94FE\u63A5" tabindex="-1">\u76F8\u5173\u94FE\u63A5 <a class="header-anchor" href="#\u76F8\u5173\u94FE\u63A5" aria-hidden="true">#</a></h2>`,50),e=[o];function c(t,r,i,y,D,F){return a(),n("div",null,e)}const u=s(p,[["render",c]]);export{C as __pageData,u as default};
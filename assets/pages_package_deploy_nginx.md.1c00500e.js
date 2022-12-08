import{_ as s,c as n,o as a,a as l}from"./app.bb5f0d48.js";const A=JSON.parse('{"title":"Nginx","description":"","frontmatter":{"title":"Nginx","order":2},"headers":[{"level":2,"title":"nginx \u914D\u7F6E history router","slug":"nginx-\u914D\u7F6E-history-router","link":"#nginx-\u914D\u7F6E-history-router","children":[]},{"level":2,"title":"\u542F\u52A8\u672C\u5730\u670D\u52A1\u5668","slug":"\u542F\u52A8\u672C\u5730\u670D\u52A1\u5668","link":"#\u542F\u52A8\u672C\u5730\u670D\u52A1\u5668","children":[]}],"relativePath":"pages/package/deploy/nginx.md"}'),o={name:"pages/package/deploy/nginx.md"},p=l(`<h1 id="nginx-config" tabindex="-1">Nginx Config <a class="header-anchor" href="#nginx-config" aria-hidden="true">#</a></h1><h2 id="nginx-\u914D\u7F6E-history-router" tabindex="-1">nginx \u914D\u7F6E history router <a class="header-anchor" href="#nginx-\u914D\u7F6E-history-router" aria-hidden="true">#</a></h2><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">listen</span><span style="color:#F07178;">       </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">server_name</span><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">localhost</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">location</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">   </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">index</span><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">try_files</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$uri</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$uri</span><span style="color:#89DDFF;">/</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">error_page</span><span style="color:#F07178;">   </span><span style="color:#F78C6C;">500</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">502</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">503</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">504</span><span style="color:#F07178;">  </span><span style="color:#89DDFF;">/</span><span style="color:#F07178;">50</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">location</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/</span><span style="color:#F07178;">50</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">   </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">usr</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">share</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">nginx</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u542F\u52A8\u672C\u5730\u670D\u52A1\u5668" tabindex="-1">\u542F\u52A8\u672C\u5730\u670D\u52A1\u5668 <a class="header-anchor" href="#\u542F\u52A8\u672C\u5730\u670D\u52A1\u5668" aria-hidden="true">#</a></h2><ol><li>\u9879\u76EE\u6253\u5305\uFF1A<code> yarn build</code></li><li>\u5B89\u88C5 serve\uFF1A<code>yarn global add serve</code></li><li>\u542F\u52A8\u672C\u5730\u670D\u52A1\uFF1A<code>npx serve -s build</code> \u6216 <code>npx serve -s build </code></li></ol>`,5),e=[p];function r(t,c,y,i,F,D){return a(),n("div",null,e)}const d=s(o,[["render",r]]);export{A as __pageData,d as default};
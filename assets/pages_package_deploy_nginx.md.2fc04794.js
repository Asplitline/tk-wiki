import{_ as s,c as n,o as a,a as l}from"./app.df2a9689.js";const d=JSON.parse('{"title":"Nginx","description":"","frontmatter":{"title":"Nginx","order":2},"headers":[{"level":2,"title":"nginx 配置 history router","slug":"nginx-配置-history-router","link":"#nginx-配置-history-router","children":[]},{"level":2,"title":"启动本地服务器","slug":"启动本地服务器","link":"#启动本地服务器","children":[]}],"relativePath":"pages/package/deploy/nginx.md","lastUpdated":1669651215000}'),o={name:"pages/package/deploy/nginx.md"},p=l(`<h1 id="nginx-config" tabindex="-1">Nginx Config <a class="header-anchor" href="#nginx-config" aria-hidden="true">#</a></h1><h2 id="nginx-配置-history-router" tabindex="-1">nginx 配置 history router <a class="header-anchor" href="#nginx-配置-history-router" aria-hidden="true">#</a></h2><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
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
<span class="line"></span></code></pre></div><h2 id="启动本地服务器" tabindex="-1">启动本地服务器 <a class="header-anchor" href="#启动本地服务器" aria-hidden="true">#</a></h2><ol><li>项目打包：<code> yarn build</code></li><li>安装 serve：<code>yarn global add serve</code></li><li>启动本地服务：<code>npx serve -s build</code> 或 <code>npx serve -s build </code></li></ol>`,5),e=[p];function r(t,c,y,i,F,D){return a(),n("div",null,e)}const A=s(o,[["render",r]]);export{d as __pageData,A as default};
import{_ as s,c as a,o as n,a as l}from"./app.132376fd.js";const d=JSON.parse('{"title":"vscode","description":"","frontmatter":{"title":"vscode","order":1},"headers":[{"level":2,"title":"live server 配置 https","slug":"live-server-配置-https","link":"#live-server-配置-https","children":[]}],"relativePath":"pages/custom/program/vscode.md","lastUpdated":1672155025000}'),e={name:"pages/custom/program/vscode.md"},p=l(`<h1 id="vscode" tabindex="-1">vscode <a class="header-anchor" href="#vscode" aria-hidden="true">#</a></h1><h2 id="live-server-配置-https" tabindex="-1">live server 配置 https <a class="header-anchor" href="#live-server-配置-https" aria-hidden="true">#</a></h2><p>git bash 自带 openssl</p><ol><li>生成私钥</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">genrsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-out</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">privatekey.pem</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1024</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>根据私钥生成签名</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">genrsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-out</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">privatekey.pem</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1024</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>通过私钥和签名 生成证书</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">x509</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-req</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-in</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">certrequest.csr</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-signkey</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">privatekey.pem</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-out</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">certificate.pem</span></span>
<span class="line"></span></code></pre></div><p>操作后，生成以下三个文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">privatekey.pem</span></span>
<span class="line"><span style="color:#A6ACCD;">certrequest.csr</span></span>
<span class="line"><span style="color:#A6ACCD;">certificate.pem</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ol start="4"><li>在 vscode 安装 Live Server</li><li>配置 settings.json（建议绝对定位）</li></ol><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">liveServer.settings.https</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">enable</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//set it true to enable the feature.</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">cert</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">**</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">certificate.pem</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">key</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">**</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">privatekey.pem</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,13),o=[p];function t(c,r,i,C,y,D){return n(),a("div",null,o)}const F=s(e,[["render",t]]);export{d as __pageData,F as default};
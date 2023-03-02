import{_ as s,c as a,o as n,a as o}from"./app.a5fc93d2.js";const l="/assets/image-20230302231121525.dcc53a23.png",d=JSON.parse('{"title":"vscode","description":"","frontmatter":{"title":"vscode","order":1},"headers":[{"level":2,"title":"live server 配置 https","slug":"live-server-配置-https","link":"#live-server-配置-https","children":[]},{"level":2,"title":"#region folding for VS Code","slug":"region-folding-for-vs-code","link":"#region-folding-for-vs-code","children":[]},{"level":2,"title":"vscode 代码提示未默认选中第一行","slug":"vscode-代码提示未默认选中第一行","link":"#vscode-代码提示未默认选中第一行","children":[]}],"relativePath":"pages/custom/program/vscode.md","lastUpdated":1677772088000}'),p={name:"pages/custom/program/vscode.md"},e=o(`<h1 id="vscode" tabindex="-1">vscode <a class="header-anchor" href="#vscode" aria-hidden="true">#</a></h1><h2 id="live-server-配置-https" tabindex="-1">live server 配置 https <a class="header-anchor" href="#live-server-配置-https" aria-hidden="true">#</a></h2><p>git bash 自带 openssl</p><ol><li>生成私钥</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">genrsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-out</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">privatekey.pem</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1024</span></span>
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
<span class="line"></span></code></pre></div><h2 id="region-folding-for-vs-code" tabindex="-1">#region folding for VS Code <a class="header-anchor" href="#region-folding-for-vs-code" aria-hidden="true">#</a></h2><p>插件说明：用 #region 包裹代码，<a href="https://marketplace.visualstudio.com/items?itemName=maptz.regionfolder" target="_blank" rel="noreferrer">下载地址</a></p><p>默认不支持 vue，以下配置 vue 格式支持</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">maptz.regionfolder</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">[vue]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">defaultFoldStartRegex</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">// [</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">s]*#region</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">(collapsed</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">)[</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">s]*(.*)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">foldEnd</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">// #endregion </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">foldEndRegex</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">//[</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">s]*#endregion</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">foldStart</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">// #region [NAME]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">foldStartRegex</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">// [</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">s]*#region[</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">s]*(.*)</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="vscode-代码提示未默认选中第一行" tabindex="-1">vscode 代码提示未默认选中第一行 <a class="header-anchor" href="#vscode-代码提示未默认选中第一行" aria-hidden="true">#</a></h2><p>问题：vscode 代码提示，为默认选中第一个</p><p>解决：user.json -&gt; 输入 <code>prevent</code> -&gt; 取消勾选 Editor › <code>Suggest: Snippets Prevent Quick Suggestions</code></p><p><img src="`+l+'" alt="image-20230302231121525"></p>',21),t=[e];function c(r,D,y,C,i,F){return n(),a("div",null,t)}const u=s(p,[["render",c]]);export{d as __pageData,u as default};
